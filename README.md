# RK Solutions Frontend

Responsive React client for the Spring Boot API in `D:\rkfund`.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. The default `/api` base URL is proxied to `http://localhost:8080` by the React development server.
3. Start the Spring backend, then run `npm start`.

## Login and API

- Admin signs in with email/password via `POST /api/admin/auth/login`.
- Members register with name and phone and sign in with name plus phone via `POST /api/users/register` and `POST /api/users/login`.
- Admin create forms use `POST /api/admin/members`, `/orders`, and `/payments`.
- OTP login has been removed. Member IDs and matching order IDs are displayed from the API response, not entered in forms.

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete URLs, request bodies, and the current backend limitations.
