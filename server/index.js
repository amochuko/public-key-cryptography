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


app.post('/send', async (req, res) => {
  const { sender, recipient, amount, signature, msgHash, pubKey } = req.body;
  setInitialBalance(sender);
  setInitialBalance(recipient);

  try {
    const isSigned = await isMsgSigned({ signature, msgHash, pubKey });
    if (!isSigned) {
      throw 'Message not signed!';
    }

    if (balances[sender] < amount) {
      res.status(400).send({ message: 'Not enough funds!' });
    } else {
      balances[sender] -= Number(amount);
      balances[recipient] += Number(amount);

      res.send({
        balance: balances[sender],
      });
    }
  } catch (err) {
    throw err;
  }
});

app.get('/delete-account/:address', (req, res) => {
  const { address } = req.params;

  if (!balances[address]) {
    return;
  } else {
    delete balances[address];
  }

  console.log('balances delete:', balances);
  res.send({ data: 0 });
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

async function isMsgSigned({ signature, msgHash, pubKey }) {
  return secp.verify(signature, msgHash, pubKey);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});