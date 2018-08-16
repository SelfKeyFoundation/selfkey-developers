---
id: did-intro
title: Decentralized Identifiers (DID)
sidebar_label: Decentralized Identifiers (DID)
---

## Decentralized Identitifiers (DID)

A Decentralized Identifier is a string of characters that is associated with an entity (whether a person, organization or even a thing), and it’s tied (via a distributed ledger or any sort of consensus network) to a series of attributes upon which only the identity owner can perform any changes. These attributes might include public cryptographic keys, among other relevant data for authentication and authorization purposes.

A SelfKey DID would look like this:

`did:key:0x4d130daf2443c0e622f211e629363b5e689073b8`

An identity owner might generate and manage multiple DIDs according to her needs to provide different “facets” on different contexts. For example, Alice might want to keep a DID for interacting with cryptocurrency exchanges, and another one for keeping credentials related to healthcare records. Furthermore, Alice might even want to create a unique DID per relationship she establishes through her identity wallet, thus avoiding leaking out any correlational information to malicious third parties.

SelfKey implementation of DIDs will provide users with the tools to securely manage their DID-based identities in a self-sovereign manner, by leveraging components such as Ethereum smart contracts, DID resolution libraries, and SDKs for issuing and handling verifiable credentials tied to DIDs.