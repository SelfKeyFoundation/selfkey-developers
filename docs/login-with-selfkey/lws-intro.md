---
id: lws-intro
title: Login with SelfKey
sidebar_label: About Login with SelfKey
---

## Overview
Login with SelfKey (LWS) is a decentralized authentication solution that leverages the SelfKey Identity Wallet and a user's Ethereum address to provide secure, one-click authentication to web apps and websites.

Implementing websites can request users' identity data from the SelfKey Identity Wallet and users may choose which data they wish to share.

Users must install the SelfKey Connect browser extension to use Login with SelfKey.

Login with SelfKey uses a challenge/response mechanism with private key signing to identify users. The SelfKey Identity Wallet running on the user's device acts as a credential store for identity informaiton which may be provided as part of the login or registration process.

The SelfKey Foundation provides server libraries for popular languages and web application frameworks to make implementation easier. Please refer to the detailed implementation documentation below if there is no server library available for your preferred language or framework.

## Benefits of Login with SelfKey
* No passwords
* No private authentication credentials required to be stored in a database
* One click onboarding with marketplace services
* Can send data and documents to any 3rd party requester
* No API keys or developer account required
* Works with hardware and software managed private keys

## Feature Competitor Matrix
<img src='/img/lws-matrix.png'>

