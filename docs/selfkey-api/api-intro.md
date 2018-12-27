---
id: api-intro
title: SelfKey API Overview
sidebar_label: Overview
---

## Overview

The SelfKey API manages connections between the SelfKey Identity Wallet (IDW) and third party integrators that are part of the SelfKey Marketplace.  

Currently the SelfKey Marketplace supports the listing of Digital Asset Exchanges and Incorporations Service Providers.  

The SelfKey API is required to manage form submission requirements and data exchange formatting, making use of the SelfKey JSON Schema to manage requested attributes and documents between the 3rd party integrator and the IDW. 

The API does not store any user data and is available to be audited by any Marketplace integrator.

## Definitions

### Challenge Token (C-JWT)

Challenge token as a JWT. The token body contains four claims:

* `sub:` (Subject) The public IP address from which the challenge request originated
* `nbf:` (Not Before) The epoch timestamp that the JWT was issued at
* `exp:` (Expiration) The epoch timestamp at which the JWT expires
* `nonce:` (Number used Once) A random string of bytes (base64-encoded) which must be signed in order to authenticate

### Wallet Token (W-JWT)

Wallet token as a JWT. The token body contains three claims:

* `sub:` (Subject) The wallet’s public key
* `nbf:` (Not Before) The epoch timestamp that the JWT was issued at
* `exp:` (Expiration) The epoch timestamp at which the JWT expires

### User Token

Relying party custom token. Could be JWT, simple bearer or other.


