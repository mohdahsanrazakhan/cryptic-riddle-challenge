const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to encrypt text using Vigenère cipher
function encryptVigenere(plainText, key) {
  plainText = plainText.toUpperCase();
  key = key.toUpperCase();

  let encryptedText = '';

  for (let i = 0, j = 0; i < plainText.length; i++) {
    const char = plainText.charCodeAt(i);
    if (char < 65 || char > 90) {
      encryptedText += plainText.charAt(i);
      continue;
    }

    encryptedText += String.fromCharCode(((char - 65 + (key.charCodeAt(j % key.length) - 65)) % 26) + 65);
    j++;
  }

  return encryptedText;
}

// Endpoint to generate encrypted text and key
app.get('/encrypt', (req, res) => {
  try {
    // Generate random text and key
    const plainText = "In shadows deep, secrets keep, Locked away from prying eyes. Through ciphered code, the truth shall seep, Unravel the mystery, and claim your prize.";
    const key = generateRandomKey(5); // Generate a random key of length 5

    // Encrypt the text using the generated key
    const encryptedText = encryptVigenere(plainText, key);

    res.json({ key, encryptedText });
  } catch (error) {
    console.error('Error generating encrypted text:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to verify decrypted text
app.post('/verify', (req, res) => {
  try {
    const { decryptedText, key } = req.body;

    // Decrypt the text using the provided key
    const encryptedText = encryptVigenere(decryptedText, key);

    // Check if the encrypted text matches the original encrypted text
    if (encryptedText === req.body.encryptedText) {
      res.json({ message: 'Verification successful' });
    } else {
      res.status(400).json({ error: 'Verification failed' });
    }
  } catch (error) {
    console.error('Error verifying decrypted text:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to generate a random key of a specified length
function generateRandomKey(length) {
  let key = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return key;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
