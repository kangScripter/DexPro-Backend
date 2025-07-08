
# 📦 Project Requests API

A simple RESTful API built with **Express.js** and **PostgreSQL** to handle project request submissions.

---

## 🚀 Features

- Submit project requests (`POST /requests`)
- View all project requests (`GET /requests`)
- View a single project request by ID (`GET /request/:id`)
- Update request status (`PATCH /status/:id`)
- Delete a request (`DELETE /request/:id`)

---

## 🧠 Tech Stack

- **Node.js** / **Express.js**
- **PostgreSQL**
- **dotenv** for environment configuration

---

## 🛠️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/kangScripter/DexPro-Backend
cd DexPro-Backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASS=your_db_password
DB_PORT=5432
```

### 4. Set up the database table

```sql
CREATE TABLE project_requests (
  id SERIAL PRIMARY KEY,
  project_type TEXT NOT NULL,
  timeline TEXT NOT NULL,
  budget INTEGER NOT NULL,
  features TEXT,
  additional_info TEXT,
  phone BIGINT,
  email TEXT,
  notify BOOLEAN,
  status TEXT DEFAULT 'Requested'
);
```

### 5. Start the server

```bash
node index.js
```

---

## 📘 API Documentation

### 📝 POST `/requests`

**Description**: Submit a new project request.

**Request Body**:

```json
{
  "project_type": "Web App",
  "timeline": "2 months",
  "budget": 50000,
  "features": "Login, Dashboard",
  "additional_info": "Urgent delivery needed",
  "phone": 9876543210,
  "email": "client@example.com",
  "notify": true,
  "status": "Requested"
}
```

**Response**:

```json
{
  "message": "Data saved successfully",
  "data": {
    // Saved request object
  }
}
```

---

### 📥 GET `/requests`

**Description**: Retrieve all project requests.

**Response**:

```json
{
  "message": "Data fetched successfully",
  "data": [
    // List of all requests
  ]
}
```

---

### 📄 GET `/request/:id`

**Description**: Retrieve a specific request by ID.

**Response**:

```json
{
  "message": "Data fetched successfully",
  "data": {
    // Single request object
  }
}
```

---

### 🔁 PATCH `/status/:id`

**Description**: Update the status of a project request.

**Request Body**:

```json
{
  "status": "Reviewed"
}
```

**Response**:

```json
{
  "message": "Status Updated"
}
```

---

### ❌ DELETE `/request/:id`

**Description**: Delete a specific project request.

**Response**:

```json
{
  "message": "Data Deleted"
}
```

---

## 📌 Notes

* `status` can be one of: `"Requested"`, `"Reviewed"`, `"Completed"`.
* `phone` and `email` fields are optional but useful for follow-up.
* `notify` is a checkbox that allows clients to opt-in for updates and offers.

---

