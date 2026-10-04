# RK Solutions Frontend

Responsive React client for the Spring Boot API in `D:\rkfund`.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. The frontend uses `https://fundbackend-wsxs.onrender.com/api` by default. Set `REACT_APP_API_BASE_URL` in `.env.local` to use a different API.
3. Run `npm start`. To use a local backend, set `REACT_APP_API_BASE_URL=http://localhost:8080/api` in `.env.local`.

## Login and API

- Admin signs in with email/password via `POST /api/admin/auth/login`.
- Members register with name and phone and sign in with name plus phone via `POST /api/users/register` and `POST /api/users/login`.
- Admin create forms use `POST /api/admin/members`, `/orders`, and `/payments`.
- OTP login has been removed. Member IDs and matching order IDs are displayed from the API response, not entered in forms.

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete URLs, request bodies, and the current backend limitations.
