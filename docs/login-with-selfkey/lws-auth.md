---
id: lws-auth
title: Authentication Process
sidebar_label: Authentication Process
---

## Private Key Signature Authentication

In order for the LWS system to work, the user needs to be able to provide proof of ownership of a wallet address.  This is done by creating a signature within the SelfKey Identity Wallet (IDW) and then passing the signature to the server integration where it can be verified.  Without a valid signature, any attempt to authenticate using the public key will fail. 

The authentication process is based on secp256k1 ECDSA signing/verification and key generation. 

https://github.com/bitcoin-core/secp256k1


## Signature Creation
```javascript
// hash the nonce and create the signature

function createSignature(nonce, privKey) {
	const msgHash = ethUtil.hashPersonalMessage(Buffer.from(nonce, 'hex')) 
	const signature = ethUtil.ecsign(msgHash, Buffer.from(privKey, 'hex'))
	return signature
}
```

## Signature Verification
```javascript
// verifies the signature using the nonce
// checks that the signature resolved public key match correctly

function verifySignature(nonce, signature, pubKey) {
	const msgHash = ethUtil.hashPersonalMessage(Buffer.from(nonce, 'hex'))
	const p = JSON.parse(signature)
	const v = p.v
	const r = Buffer.from(p.r, 'hex')
	const s = Buffer.from(p.s, 'hex')
	const sigRecover = ethUtil.ecrecover(msgHash, v, r, s).toString('hex')
	const sigPubKey = ethUtil.publicToAddress(Buffer.from(sigRecover, 'hex'), true).toString('hex')
	if (sigPubKey === pubKey) {
		return true
	} else {
		return false
	}
}
```
## Recover Using secp256k1
```javascript
/**
 * ECDSA public key recovery from signature
 * @param {Buffer} msgHash
 * @param {Number} v
 * @param {Buffer} r
 * @param {Buffer} s
 * @return {Buffer} publicKey
 */
exports.ecrecover = function (msgHash, v, r, s) {
  var signature = Buffer.concat([exports.setLength(r, 32), exports.setLength(s, 32)], 64);
  var recovery = v - 27;
  if (recovery !== 0 && recovery !== 1) {
    throw new Error('Invalid signature v value');
  }
  var senderPubKey = secp256k1.recover(msgHash, signature, recovery);
  return secp256k1.publicKeyConvert(senderPubKey, false).slice(1);
};
```

## Sign Using secp256k1
```javascript
/**
 * ECDSA sign
 * @param {Buffer} msgHash
 * @param {Buffer} privateKey
 * @return {Object}
 */
exports.ecsign = function (msgHash, privateKey) {
  var sig = secp256k1.sign(msgHash, privateKey);

  var ret = {};
  ret.r = sig.signature.slice(0, 32);
  ret.s = sig.signature.slice(32, 64);
  ret.v = sig.recovery + 27;
  return ret;
};
```

## SHA3 Hash
```javascript
/**
 * Returns the keccak-256 hash of `message`, prefixed with the header used by the `eth_sign` RPC call.
 * The output of this function can be fed into `ecsign` to produce the same signature as the `eth_sign`
 * call for a given `message`, or fed to `ecrecover` along with a signature to recover the public key
 * used to produce the signature.
 * @param message
 * @returns {Buffer} hash
 */
exports.hashPersonalMessage = function (message) {
  var prefix = exports.toBuffer('\x19Ethereum Signed Message:\n' + message.length.toString());
  return exports.sha3(Buffer.concat([prefix, message]));
};
```
