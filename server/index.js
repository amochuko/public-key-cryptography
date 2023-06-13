const express = require('express');
const app = express();
const cors = require('cors');
const secp = require('ethereum-cryptography/secp256k1');

app.use(cors());
app.use(express.json());

const port = 3042;

const balances = {};

// Public Key Exercises in the Digital Signatures lesson (Recover Keys, Sign Message, Hash Messages)

// client sign message with privKey during Transfer
// server verifies signature, gets out address
// transfer fund to address

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  let balance;

  if (!balances[address]) {
    balances[address] = 100;
  }
  balance = balances[address]; //|| 0;

  res.send({ balance });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});