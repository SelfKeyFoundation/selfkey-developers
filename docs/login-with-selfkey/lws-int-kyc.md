---
id: lws-int-kyc
title: KYC Only LWS Implementation
sidebar_label: GUIDE: KYC Only LWS
---

## KYC Only LWS Implementation

```

2 - LWS button on KYCC signup/login page (Non-MKT, KYCC)

[ diagram ]

Examples: ICO
Flows:

Signup

RP-Website

Redirects to KYCC signup page

KYCC

1- GET		/auth/challenge 						=>	200: C-JWT              
2- POST	/auth/challenge	C-JWT + { sig }			=>	200: W-JWT  	               [ 400, 401 ]
3- POST	/users			W-JWT + { attr }			=>	201                                [ 400, 401 ]
5- GET		/auth/token		W-JWT				=>	200: User Token            [ 401, 404 ]

Login

RP-Website

Redirects to KYCC login page

KYCC

1- GET		/auth/challenge 						=>	200: C-JWT                  
2- POST	/auth/challenge	C-JWT + { sig }			=>	200: W-JWT                 [ 400, 401 ]
3- GET		/auth/token		W-JWT				=>	200: User Token           [ 401, 404 ]
```

```
4 - LWS button on RP Website (Non-MKT, KYCC)

[ diagram ]

Examples: Exchange with basic and verified accounts

Signup

KYCC

1- GET		/auth/challenge 						=>	200: C-JWT
2- POST	/auth/challenge	C-JWT + { sig }			=>	200: W-JWT		[ 400, 401 ]

RP-UMS

3- POST	/users			W-JWT + { attr }			=>	201			[ 400, 401 ]
4- GET		/auth/token		W-JWT				=>	200: User Token         [ 401, 404 ]
 
Login

KYCC

1- GET		/auth/challenge 						=>	200: C-JWT		
2- POST	/auth/challenge	C-JWT + { sig }			=>	200: W-JWT		[ 400, 401 ]

RP-UMS

3- GET		/auth/token		W-JWT				=>	200: User Token         [ 401, 404 ]

KYC

KYCC

1- GET		/auth/challenge 						=>	200: C-JWT
2- POST	/auth/challenge	C-JWT + { sig }			=>	200: W-JWT		[ 400, 401 ]
5- GET		/templates							=>	200: [ templates ]	[ 404 ]
6- GET		/templates/{templateId}schema.json				=>	200: template		
7- POST	/files			W-JWT + { file }			=>	200: { fileId }		[ 400, 401 ]
8- POST	/applications		W-JWT + { templateId, attr, files }	=>	201			[ 400, 401 ]
```