---
id: json-schema-intro
title: SelfKey JSON Schema
sidebar_label: SelfKey JSON Schema
---

## SelfKey JSON Schema

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum massa eget nulla aliquet sagittis. Proin odio tortor, vulputate ut odio in, ultrices ultricies augue. Cras ornare ultrices lorem malesuada iaculis. Etiam sit amet libero tempor, pulvinar mauris sed, sollicitudin sapien.

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
