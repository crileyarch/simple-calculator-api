# simple-calculator-api

A minimal REST API that adds two numbers. Built with Node.js and Express.

## Setup

### Prerequisites
- Node.js 14+ and npm

### Installation

```bash
npm install
```

### Running the Server

**Development** (with auto-reload via nodemon):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### GET `/health`

Liveness check endpoint.

**Response** (200 OK):
```json
{ "status": "ok" }
```

### POST `/add`

Adds two numbers.

**Request**:
```bash
curl -X POST http://localhost:3000/add \
  -H "Content-Type: application/json" \
  -d '{"a": 3, "b": 7}'
```

**Request Body**:
```json
{
  "a": 3,
  "b": 7
}
```

**Success Response** (200 OK):
```json
{
  "result": 10
}
```

**Error Response** (400 Bad Request):
```json
{
  "error": "Both 'a' and 'b' must be valid numbers"
}
```

## Development

### Running Tests

**Run all tests with coverage**:
```bash
npm test
```

**Watch mode** (re-run on file changes):
```bash
npm run test:watch
```

### Linting

**Check for linting errors**:
```bash
npm run lint
```

**Auto-fix linting errors**:
```bash
npm run lint:fix
```

## Project Structure

```
simple-calculator-api/
├── src/
│   ├── app.js           # Express app factory (no listen())
│   ├── server.js        # Entry point (calls app.listen())
│   └── calculator.js    # Pure add() logic
├── tests/
│   ├── api.test.js      # Integration tests (Supertest)
│   └── calculator.test.js # Unit tests
├── package.json
├── .eslintrc.json
├── .gitignore
└── README.md
```

## Architecture

- **Separation of Concerns**: `app.js` creates the Express app without listening; `server.js` is the only file that binds to a port. This allows tests to run on ephemeral ports without conflicts.
- **Pure Logic**: `calculator.js` contains no HTTP dependencies, making it easy to test and reuse.
- **Comprehensive Testing**: Unit tests verify calculation logic; integration tests verify API behavior.
- **Code Quality**: ESLint configured for consistent code style.
