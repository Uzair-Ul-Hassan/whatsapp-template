# WhatsApp Template Management API

This project provides an API for managing WhatsApp message templates. Built with **Next.js**, it simplifies development and deployment while leveraging a modern framework.

---

## Features

- Manage WhatsApp message templates with ease.
- RESTful API endpoints for creating, reading, updating, and retrieving templates.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Getting Started](#getting-started)
3. [API Documentation](#api-documentation)
4. [License](#license)

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Deployment**: Vercel (or other serverless platforms)

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 18)
- MongoDB (local or cloud)
- A package manager like npm or yarn

### Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup enviroment variables**

   Create .env file in the root directory and add the following

   ```bash
   DATABASE_URL==mongodb+srv://<username>:<password>@<cluster-url>/<dbname>
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

## API Documentation

### Endpoints

### 1. Create WhatsApp Template

Create a new WhatsApp template.

- **URL:** `/api/whatsapp-template`
- **Method:** `POST`
- **Request Body:**

  {
  "name": "string",
  "description": "string",
  "category": "string",
  "template": "string"
  }

- **Success Response:**

  - **Code:** 201 Created

### 2. List WhatsApp Templates

Retrieve a list of all WhatsApp templates.

- **URL:** `/api/whatsapp-template`
- **Method:** `GET`

- **Success Response:**

  - **Code:** 200 OK

### 3. Update WhatsApp Template

Update an existing WhatsApp template.

- **URL:** `/api/whatsapp-template/:templateId`
- **Method:** `PATCH`
- **URL Parameters:**

  - `templateId`: ID of the template to update

- **Success Response:**

  - **Code:** 200 OK

### 4. Get WhatsApp Template

Retrieve details of a specific WhatsApp template.

- **URL:** `/api/whatsapp-template/:templateId`
- **Method:** `GET`
- **URL Parameters:**

  - `templateId`: ID of the template to retrieve

- **Success Response:**

## Error Responses

All endpoints may return the following error responses:

- **Code:** 400 Bad Request

- **Code:** 404 Not Found

- **Code:** 500 Internal Server Error

# Placeholder Validation Rules

### Valid Placeholder Format

- Only placeholders in the exact format `{{var}}` are considered valid.
- `{{var}}` should consist of a double opening curly brace `{{`, followed by a variable name (`var`), and then a double closing curly brace `}}`.
- There must be **no spaces** around the variable name (`var`). For example:
  - Valid: `{{var}}`
  - Invalid: `{{ var }}`, `{{ var}}`, `{{var }}`

### Invalid Placeholder Formats

- Placeholders with single curly braces are invalid:
  - Invalid: `{var}`, `{{}`, `{}`, `}}`
- Placeholders with spaces around the variable are invalid:
  - Invalid: `{{ var }}`
- Placeholders with mismatched or additional curly braces are invalid:
  - Invalid: `{{{var}}}`, `{{}}`, `{{,}}`

### Example Valid and Invalid Placeholders

**Valid Examples**:

```text
{{username}}, {{orderId}}, {{productName}}
```

**Invalid Examples**:

```text
{username}, {{ username }}, {{ orderId }}, {{{productName}}}
```
