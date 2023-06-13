// @ts-ignore
import * as secp from 'ethereum-cryptography/secp256k1';
import { utf8ToBytes } from 'ethereum-cryptography/utils';

export function getAddressFromPubKey(pubKey) {
  return {
    address: `0x${secp.utils.bytesToHex(pubKey).slice(1).slice(-40)}`,
    rawAddress: secp.utils.bytesToHex(pubKey),
  };
}

export function genPrivateKey() {
  return secp.utils.randomPrivateKey();
}

export function getPublicKey(privKey) {
  return secp.getPublicKey(privKey);
}

export function generateAddress(acctName) {
  const privKey = genPrivateKey();
  const pubKey = getPublicKey(privKey);
  const { address } = getAddressFromPubKey(pubKey);

  return {
    acctName: acctName,
    address,
    pubKey: secp.utils.bytesToHex(pubKey),
    privKey: secp.utils.bytesToHex(privKey),
  };
}

export async function signMessage({ sender, amount, acctName }) {
  try {
    let signature;
    const msgArr = [];

    acctName = utf8ToBytes(acctName);
    msgArr.push(utf8ToBytes(sender), utf8ToBytes(amount), acctName);

    const msg = await secp.utils.sha256(...msgArr);
    const msgHash = secp.utils.bytesToHex(msg);
    let { pubKey, privKey } = generateAddress(acctName);

    if (pubKey) {
      signature = await secp.sign(msgHash, privKey);
      signature = secp.utils.bytesToHex(signature);
    }

    return {
      signature,
      msgHash,
      pubKey,
    };
  } catch (ex) {
    throw ex;
  }
}
