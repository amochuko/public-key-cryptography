import React, { useState } from 'react';
import './App.scss';
import Transfer from './Transfer';
import Wallet from './Wallet';

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [acctName, setAcctName] = useState('');

  return (
    <div className='app'>
      <Wallet
        acctName={acctName}
        setAcctName={setAcctName}
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} acctName={acctName} />
    </div>
  );
}

export default App;
