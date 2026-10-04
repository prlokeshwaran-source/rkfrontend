# RK Solutions frontend API reference

Base URL for local development: `http://localhost:8080/api` (the React dev server proxies `/api` to port 8080). Configure `REACT_APP_API_BASE_URL` for another environment. All request bodies are JSON.

The React login screen has two choices: **Admin** and **Member**. The member flow uses the registered name and phone number. It does not ask the member to type a member ID or order ID; both are displayed from the API response.

## 1. Admin authentication

### Sign in

`POST /admin/auth/login`

```json
{
  "email": "admin@rkfund.com",
  "password": "ChangeMe123!"
}
```

Success response:

```json
{
  "email": "admin@rkfund.com",
  "role": "ADMIN",
  "message": "Admin login successful"
}
```

The backend currently returns no access token. The frontend keeps the signed-in view in `sessionStorage`; API authorization is not implemented by the current backend.

## 2. Member account authentication

### Register

`POST /users/register`

```json
{
  "name": "Ravi Kumar",
  "phone": "9876543210",
  "email": "ravi@example.com"
}
```

Success response (`200 OK`):

```json
{
  "memberId": "665a2c8e9d671234567890ab",
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "phone": "9876543210",
  "orderId": "ORD-2026-001"
}
```

Phone number must be unique and use 8–15 digits, optionally prefixed with `+`. A duplicate phone returns `409 Conflict`. Email is optional.

### Sign in

`POST /users/login`

```json
{
  "name": "Ravi Kumar",
  "phone": "9876543210"
}
```

Success response:

```json
{
  "memberId": "665a2c8e9d671234567890ab",
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "phone": "9876543210",
  "orderId": "ORD-2026-001"
}
```

`memberId` is generated at registration. `orderId` is the most recently created order whose `customerPhone` matches this phone number; it is `null` when no matching order exists. The member area displays these response values read-only. Name and phone are identity details rather than a strong authentication secret; add a password or verified sign-in method before exposing sensitive account data in production.

## 3. Admin dashboard and reports

### Dashboard summary

`GET /admin/dashboard`

Example response:

```json
{
  "members": 120,
  "pendingApprovals": 5,
  "orders": 32,
  "payments": 48,
  "generatedAt": "2025-05-20T10:00:00Z"
}
```

### Report summary

`GET /admin/reports/summary`

Example response:

```json
{
  "members": 120,
  "orders": 32,
  "paymentCount": 48,
  "paidAmount": 45250,
  "pendingAmount": 12500,
  "generatedAt": "2025-05-20T10:00:00Z"
}
```

## 4. Admin create member, order, and payment

The admin UI sends these requests from the **Add member**, **Add order**, and **Add payment** forms. These module routes accept flexible MongoDB record fields; the backend does not validate a fixed schema for them. `createdAt` and `updatedAt` are added by the backend.

### Create an admin-managed member

`POST /admin/members`

```json
{
  "name": "Ramesh Kumar",
  "phone": "9876543211",
  "city": "Chennai",
  "status": "pending"
}
```

The API generates `memberId` from the MongoDB record ID. It returns `memberId` and `orderId` (null until an order is associated). Neither ID is sent in the request.

Example `201 Created` response:

```json
{
  "_id": "665a2c8e9d671234567890ab",
  "memberId": "665a2c8e9d671234567890ab",
  "name": "Ramesh Kumar",
  "phone": "9876543211",
  "city": "Chennai",
  "status": "pending",
  "orderId": null,
  "createdAt": "2026-10-04T10:00:00Z",
  "updatedAt": "2026-10-04T10:00:00Z"
}
```

### Create an order

`POST /admin/orders`

```json
{
  "customerName": "Ramesh Kumar",
  "customerPhone": "9876543211",
  "type": "membership",
  "amount": 2500,
  "status": "pending"
}
```

The API generates the `orderId` and returns it with the saved order. If `customerPhone` matches a member, the response also includes that `memberId`. Do not send either ID in the create request.

The response includes the submitted order fields plus generated `orderId`, matching `memberId` when found, MongoDB `_id`, and timestamps.

### Create a payment

`POST /admin/payments`

```json
{
  "customerName": "Ramesh Kumar",
  "customerPhone": "9876543211",
  "amount": 2500,
  "method": "cash",
  "status": "pending"
}
```

The API links the latest matching order by `customerPhone` and returns its `orderId` and the matching `memberId` when available. Do not enter either ID in the payment form.

The response includes the submitted payment fields plus linked IDs when found, MongoDB `_id`, and timestamps.

These create calls return the saved record with its MongoDB `_id` and timestamps (`201 Created`). Admin-created records in `/admin/members` are stored in the `members` collection; a record with a matching name and phone can also sign in through `/users/login`. `/users/register` creates a record in the users collection.

## 5. Admin record modules

Supported `{module}` values: `members`, `approvals`, `orders`, `payments`, `notifications`, `followups`, `commissions`, `settings`, and `reports`. Reports are read-only.

| Action | Request |
| --- | --- |
| List records | `GET /admin/{module}` |
| Filter by status | `GET /admin/{module}?status=pending` |
| Read one record | `GET /admin/{module}/{id}` |
| Create record | `POST /admin/{module}` with a JSON object |
| Replace/update fields | `PUT /admin/{module}/{id}` with a JSON object |
| Delete record | `DELETE /admin/{module}/{id}` |

### Approve or reject a member

`PATCH /admin/approvals/{id}`

Approve:

```json
{ "status": "approved", "reason": "Registration verified" }
```

Reject:

```json
{ "status": "rejected", "reason": "Please correct the registration details" }
```

Valid status values are `approved`, `rejected`, and `pending`.

## 6. Partner endpoints in the backend

These endpoints remain available in Spring Boot but are **not connected to the current member frontend**. They require a `phone` query parameter and are separate from `/users/register` and `/users/login`.

| Purpose | Request |
| --- | --- |
| Dashboard | `GET /partner/dashboard?phone={phone}` |
| Customer list | `GET /partner/customers?phone={phone}&status={status}` |
| Add customer | `POST /partner/customers?phone={phone}` |
| Update customer | `PATCH /partner/customers/{id}?phone={phone}` |
| Wallet | `GET /partner/wallet?phone={phone}` |
| Training | `GET /partner/training` |
| Notifications | `GET /partner/notifications?phone={phone}` |
| Profile | `GET /partner/profile?phone={phone}` |
| Update profile | `PATCH /partner/profile?phone={phone}` |
| Change password | `PATCH /partner/profile/password?phone={phone}` |

Add customer body:

```json
{
  "name": "Ramesh Kumar",
  "phone": "9876543211",
  "city": "Chennai",
  "interestedIn": "membership",
  "remarks": "Follow up next week"
}
```

Partner status update body:

```json
{ "status": "called", "remarks": "Follow up Friday" }
```

## Frontend API module

API methods are in `src/api/rkApi.js`: `adminApi.login/dashboard/reportSummary/list/create/update/remove/approval` and `userApi.register/login`. The partner module remains available there for future backend integration but is not selected by the current login screen.
