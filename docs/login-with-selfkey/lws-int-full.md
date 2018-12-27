---
id: lws-int-full
title: Full LWS Implementation
sidebar_label: GUIDE: Full LWS
---

## Full LWS Implementation

```
3 - Partner page on Marketplace

[ diagram ]

Examples: Exchanges, Banks, ...

Signup

KYCC or RP-KYC

1- GET		/auth/challenge 						=>	200: C-JWT
2- POST	/auth/challenge	C-JWT + { sig }			=>	200: W-JWT		  [ 400, 401 ]
4- GET		/templates/							=>	200: [ templates ]          
5- GET		/templates/{templateId}/schema.json				=>	200: template                [ 404 ]
6- POST	/files			W-JWT + { file }			=>	200: { fileId }                  [ 400, 401 ]
7- POST	/applications		W-JWT + { templateId, attr, files }	=>	201                                [ 400, 401 ]


RP-UMS
3- POST	/users			W-JWT + { attr }			=>	201


Login

KYCC

1- GET		/auth/challenge 						=>	200: C-JWT
2- POST	/auth/challenge	C-JWT + { sig }			=>	200: W-JWT		[ 400, 401 ]

RP-UMS

3- GET		/auth/token		W-JWT				=>	200: User Token	[ 401, 404 ]
```