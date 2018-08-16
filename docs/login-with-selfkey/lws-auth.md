---
id: lws-auth
title: Authentication Process
sidebar_label: Authentication Process
---

## Ethereum Private Key Signature Authentication

In order for the LWS system to work, the user needs to be able to provide proof of ownership of an Ethereum wallet address.  This is done by creating a signature within the SelfKey Identity Wallet (IDW) and then passing the signature to the server integration where it can be verified.  Without a valid signature, any attempt to authenticate using the public key will fail.  

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