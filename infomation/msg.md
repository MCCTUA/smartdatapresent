

Hi Danny / Julian,

Thank you for the access token and endpoints. We've set everything up in Postman and run several tests. The connection works and the server responds, but we're hitting two server-side issues we can't resolve on our end:

**1. Admin API — 500 Internal Server Error**
- `GET https://cardiacsense-cloud.com/app/integrators/patients_list`
- Token sent in the `Authorization` header.
- Response: `{ "statusCode": 500, "message": "Internal server error" }`
- The token passes authentication (otherwise we'd get a 401), so this looks like a backend error. Our guess: our integrator account (token id **11**) may have no patients linked yet, or still needs setup on your side.

**2. FHIR API — 401 Invalid access token**
- `GET https://fhir.cardiacsense-cloud.com/v2/reports/generate?...`
- Same token, tried both as a plain header and as `Bearer` — both return: `{ "statusCode": 401, "message": "Invalid access token" }`
- The same token is accepted on the admin host but rejected here. Could you confirm whether this token is meant to work on both the admin and FHIR systems, or whether the FHIR endpoint needs separate provisioning?

**Summary of our tests:**

| Endpoint | Host | Result |
|---|---|---|
| `/app/integrators/patients_list` | cardiacsense-cloud.com | 500 Internal Server Error |
| `/v2/reports/generate` | cardiacsense-cloud.com | 404 Not Found |
| `/v2/reports/generate` | fhir.cardiacsense-cloud.com | 401 Invalid access token |

Could you please check on your side: (a) why the admin API returns 500 for account id 11, (b) whether our token is valid for the FHIR host, and (c) link at least one consented test patient so we can start testing data retrieval?

Thanks for your help.