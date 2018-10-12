---
id: lws-data
title: Data and Document Transfer
sidebar_label: Data and Document Transfer
---

In addition to providing an authentication service, the integration between Login with SelfKey and the SelfKey Identity Wallet facilitates the ability to pass user data associated with a users SelfKey ID profile including data attributes like email, phone numbers and postal address as well as documents like passport copies. This opens the possibility of creating integrations that allow one click onboarding and submission of KYC data.  

Documents are sent as base64 data url encoded strings and must be handled on the server side.  Here is a demo implementation using NodeJS:

```javascript
async function sortDocuments(attributes, publicKey) {
	return new Promise((resolve, reject) => {
		try {
			let docs = []
			for (let item of JSON.parse(attributes)) {
				if (item.document == true) {
					docs.push(base64Img.img(item.data.value, path.join(__dirname, '../', '/public/uploads/', publicKey), item.key, (err, filepath) => {
						if (err) console.log(err)
						console.log('document saved', filepath)
					}))
				} else {
					console.log('not a document')
				}
			}
			resolve(Promise.all(docs))
		} catch (e) {
			reject(e)
		}
	})
}
```