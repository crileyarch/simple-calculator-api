# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**simple-calculator-api** is a minimal REST API that adds two numbers. Built with Node.js/Express with comprehensive test coverage and code quality checks.

## Technology Stack

- **Runtime**: Node.js 14+
- **Web Framework**: Express.js
- **Testing**: Jest + Supertest
- **Linting**: ESLint
- **Development**: Nodemon for auto-reload

## Development Commands

- **Start**: `npm start` (runs `node src/server.js`)
- **Dev**: `npm run dev` (runs with nodemon auto-reload)
- **Test**: `npm test` (runs Jest with coverage report)
- **Test Watch**: `npm run test:watch` (re-runs on file changes)
- **Lint**: `npm run lint` (checks code style with ESLint)
- **Lint Fix**: `npm run lint:fix` (auto-fixes linting errors)

## High-Level Architecture

### API Layer
- **src/app.js**: Express app factory that creates the app without calling `listen()`
- **Endpoints**:
  - `GET /health` - Liveness check (returns `{ status: 'ok' }`)
  - `POST /add` - Adds two numbers from JSON body

### Logic Layer
- **src/calculator.js**: Pure `add(a, b)` function with type and range validation
  - Throws `TypeError` for non-numbers
  - Throws `RangeError` for Infinity/NaN
  - Returns sum of two finite numbers

### Entry Point
- **src/server.js**: Only file that calls `app.listen(PORT)` and binds to the HTTP port
  - Allows tests to run on ephemeral ports without conflicts

### Testing
- **tests/calculator.test.js**: Unit tests for the `add()` function
  - Tests positive, negative, zero, float, and large numbers
  - Tests error handling (TypeError, RangeError)
- **tests/api.test.js**: Integration tests for HTTP endpoints via Supertest
  - Tests successful requests and responses
  - Tests validation errors (400, 404)

## Project Structure

```
simple-calculator-api/
├── src/
│   ├── app.js           # Express app factory (exports function, no listen())
│   ├── server.js        # Entry point (calls app.listen())
│   └── calculator.js    # Pure add() logic with no HTTP dependencies
├── tests/
│   ├── api.test.js      # Integration tests (Supertest)
│   └── calculator.test.js # Unit tests (Jest)
├── package.json         # Dependencies and npm scripts
├── .eslintrc.json       # ESLint configuration
├── .gitignore           # Git ignore rules
└── README.md            # User-facing documentation
```

## Key Architectural Decisions

1. **Separation of App Creation and Server Binding**: `app.js` exports a function that creates the Express app but does not call `listen()`. This allows `server.js` to be the only entry point that binds to a port, and allows tests to spin up the app on ephemeral ports without port conflicts.

2. **Pure Logic**: `calculator.js` contains no HTTP dependencies. It's a pure function that can be easily tested, debugged, and reused.

3. **Comprehensive Testing**: Both unit tests (calculator logic) and integration tests (HTTP API) ensure correctness and catch regressions.

4. **Input Validation**: Validation happens at the HTTP layer in `app.js` before calling the calculator. This separates concerns and keeps the pure logic clean.

5. **Single Responsibility**: Each file has one clear purpose:
   - `calculator.js` - arithmetic
   - `app.js` - HTTP routing and validation
   - `server.js` - process lifecycle

## API Design

### POST /add
Adds two numbers and returns their sum.

**Request body**: JSON with `a` and `b` (both numbers)
```json
{ "a": 3, "b": 7 }
```

**Success (200)**: `{ "result": 10 }`

**Error (400)**: `{ "error": "Both 'a' and 'b' must be valid numbers" }`

## Test Coverage

- Unit tests: 13 test cases covering calculator logic
- Integration tests: 8 test cases covering HTTP API
- Overall coverage: 95.83% (100% for calculator.js)

## Notes

- Currently only supports addition (`POST /add`). Other operations would be added as new endpoints.
- Implementation is minimal and focused on core functionality.
- No external database or authentication required.
- Code follows ESLint conventions (single quotes, 2-space indent, semicolons).
