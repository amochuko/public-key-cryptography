import React from 'react';
import { generateAddress } from './lib';
import server from './server';

function Wallet({
  acctName,
  setAcctName,
  address,
  setAddress,
  balance,
  setBalance,
}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
  }

  async function genAddress() {
    const { address } = generateAddress(acctName);

    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  function deleteAccount() {
    setAddress('');
    setAcctName('');
  }

  return (
    <div className='container wallet'>
      {address ? (
        <>
          <h1>Your Wallet</h1>
          <label>
            Wallet Address
            <input
              placeholder='Type an address, for ex: 0x1'
              value={address}
              onChange={onChange}
            ></input>
          </label>

          <div className='balance'>Balance: {balance}</div>
          <div style={{ marginTop: 10 }}>
            <input
              className='button'
              type='submit'
              value='Delete account'
              onClick={deleteAccount}
            />
          </div>
        </>
      ) : (
        <>
          <label>
            Account Name
            <input
              placeholder='Type name; eg: alice'
              value={acctName}
              onChange={(e) => {
                setAcctName(e.target.value);
              }}
            ></input>
          </label>
          <input
            type='submit'
            className='button'
            value='Generate Address'
            onClick={genAddress}
          />
        </>
      )}
    </div>
  );
}

export default Wallet;
