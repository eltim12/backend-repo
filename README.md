# Backend Repository Documentation

## Setup Instructions

### 1. Getting `serviceAccountKey.json`
To use Firebase Firestore in this backend project, you need to generate a service account key from Firebase.

#### **Steps to Get `serviceAccountKey.json`**:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your Firebase project.
3. Click on the **gear icon** ⚙️ in the left sidebar and go to **Project settings**.
4. Navigate to the **Service accounts** tab.
5. Click on **Generate new private key**.
6. This will download a JSON file (`serviceAccountKey.json`).
7. Move this file to the `config/` directory of your project.

#### **Ensure Security:**
- **DO NOT** commit this file to GitHub.
- Add it to `.gitignore` to prevent accidental commits.

```gitignore
config/serviceAccountKey.json
```

---

## API Endpoints

### 1️⃣ **Fetch User Data**
- **Endpoint:** `GET /api/fetch-user-data`
- **Description:** Fetches user data from Firestore based on the authentication token.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```
- **Response:**
  ```json
  {
    "uid": "user123",
    "email": "user@example.com",
    "name": "John Doe"
  }
  ```

### 2️⃣ **Update User Data**
- **Endpoint:** `PUT /api/update-user-data`
- **Description:** Updates Firestore user data for the authenticated user.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <your-token>",
    "Content-Type": "application/json"
  }
  ```
- **Request Body:**
  ```json
  {
    "email": "newemail@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User data updated successfully"
  }
  ```

---

## Run the Project

To start the backend server, run the following command:

```bash
npm run dev
```

- This will start the Express server using **nodemon** for live-reloading.
- By default, the server runs on **port 5000**.

If you need to change the port, modify the `PORT` variable in your environment settings.