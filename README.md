# Tally Counter REST API

A simple REST API for managing a tally counter with Express.js and Winston logging.

## Features

- ✅ In-memory counter state management
- ✅ RESTful API endpoints
- ✅ Winston logging with file and console transports
- ✅ Comprehensive test suite (Mocha + Chai)
- ✅ JSDoc documentation
- ✅ VS Code REST Client support

## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

## Installation
```bash
# Clone the repository
git clone <repository-url>
cd tally-counter-api

# Install dependencies
npm install
```

## Usage

### Start the Server
```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

The server will start on `http://localhost:3000`

### API Endpoints

#### GET /
Returns API information and available endpoints.

**Response:**
```json
{
  "name": "Tally Counter API",
  "version": "1.0.0",
  "endpoints": {
    "GET /": "API information",
    "GET /counter-read": "Read current counter value",
    "GET /counter-increase": "Increase counter by one",
    "GET /counter-reset": "Reset counter to zero"
  }
}
```

#### GET /counter-read
Reads and returns the current counter value.

**Response:**
```json
{
  "count": 5
}
```

#### GET /counter-increase
Increases the counter by one and returns the new value.

**Response:**
```json
{
  "count": 6
}
```

#### GET /counter-reset
Resets the counter to zero and returns the reset value.

**Response:**
```json
{
  "count": 0
}
```

## Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Test Coverage

The test suite includes:
- **Unit tests** for counter module (8 tests)
- **Integration tests** for API routes (11 tests)
- **Error handling tests**

Expected output: