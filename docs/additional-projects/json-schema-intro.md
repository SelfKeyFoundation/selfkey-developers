---
id: json-schema-intro
title: SelfKey JSON Schema
sidebar_label: SelfKey JSON Schema
---

## SelfKey JSON Schema

In order to solve certain issues around the area of data harmonization and compatibility regarding the management of data and documents using the SelfKey Identity Wallet and the transfer of data with 3rd party integrators, SelfKey has developed a JSON Schema to manage requested data formatting.  The schema is available at http://platform.selfkey.org/schema

## Attribute Schema

```json
{
  "id": "http://platform.selfkey.org/schema/attribute/public-key.json",
  "$schema": "http://platform.selfkey.org/schema/identity-attribute.json",
  "title": "Public Key",
  "description": "A cryptographic public key.",
  "type": "string"
}
```


## Document Schema

```json
{
  "id": "http://platform.selfkey.org/schema/attribute/passport.json",
  "$schema": "http://platform.selfkey.org/schema/identity-attribute.json",
  "title": "Passport",
  "description": "A copy of an individuals passport.",
  "type": "object",
  "properties": {
    "image": {
      "anyOf": [
        {
          "type": "string",
          "contentEncoding": "base64",
          "contentMediaType": "image/jpg"
        },
        {
          "type": "string",
          "contentEncoding": "base64",
          "contentMediaType": "image/png"
        },
        {
          "type": "string",
          "contentEncoding": "base64",
          "contentMediaType": "application/pdf"
        }, 
      ]
    }
  },
  "required": [ "image" ]
}
```

## Custom Extended Schema

```json
{
  "id": "http://bigco.com/schema/membership.json",
  "$schema": "http://platform.selfkey.org/schema/identity-attribute.json",
  "title": "BigCo Membership",
  "description": "Membership credentials for the BigCo Membership Programme.",
  "issuers": ["0x19674964C63cc8bd761eB857278aF46f25a80F61"],
  "type": "object",
  "properties": {
    "memberNumber": { "type": "string" },
    "validUntil": { "type": "number", "description": "Unix timestamp at which time this credential expires" },
    "signature": { "type": "string" }
  },
  "required": ["memberNumber", "validUntil", "signature"]
}
```
