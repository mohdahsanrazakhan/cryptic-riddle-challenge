# The Cryptic Riddle Challenge

I've attempted to complete the assignment. This Node.js application provides an API for encrypting text using the Vigenère cipher and verifying the decrypted text.

## How to Use

### 1. Installation

Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

Install dependencies using npm:

```bash
npm install
```

### 2. Start the Server

Start the Node.js server:

```bash
npm start
```

The server will start running at http://localhost:3000.

### 3. Endpoints

`/encrypt` (GET)
Generates encrypted text and a key using the Vigenère cipher.

- Method: GET
- URL: http://localhost:3000/encrypt
- Response Format: JSON
- Response Example:

```json
{
  "key": "ABCDEF",
  "encryptedText": "ENCRYPTED_TEXT_HERE"
}
```

![encrypt image](/encrypt.png)

`/verify` (POST)
Verifies the decrypted text using the provided key.

- Method: POST
- URL: http://localhost:3000/verify
- Request Body:

```json
{
  "decryptedText": "DECRYPTED_TEXT_HERE",
  "key": "ABCDEF",
  "encryptedText": "ENCRYPTED_TEXT_HERE"
}
```

- Response Format: JSON
- Response Example (Success):

```json
{
  "message": "Verification successful"
}
```

![decrypt success image](/decrypt-success.png)

- Response Example (Failure):

```json
{
  "error": "Verification failed"
}
```

![decrypt failed image](/decrypt-failed.png)