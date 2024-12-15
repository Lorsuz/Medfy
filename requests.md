# ! Variable Configuration

@port = 3001
@host = <http://localhost:{{port}}>
@base = {{host}}/api

# ! Connection Test

### * Test the connection to the configured host

GET {{host}}

# ! User Endpoints

### * Import all pre-admins

- Endpoint: POST {{base}}/user/import-all
- Description: Import predefined admin users to the system.
- Request Body: None
- Response: Status 200 if successful.
- Authentication: Private (requires admin privileges).

### * Register new user

- Endpoint: POST {{base}}/user/register
- Description: Create a new user account.
- Request Body:

  ```json
  {
    "name": "Ariel do Nascimento",
    "email": "hayadav160@rustetic.com",
    "cpf": "893.266.020-44",
    "password": "#A1b2c3d4",
    "phone": "(83) 9 9234-5235"
  }
  ```

- Response: Status 201 with the created user data.
- Authentication: Public.

### * User login

- Endpoint: POST {{base}}/user/login
- Description: Authenticate a user and return a token.
- Request Body:

  ```json
  {
    "email": "hayadav160@rustetic.com",
    "password": "#A1b2c3d4"
  }
  ```

- Response: Status 200 with an authentication token.
- Authentication: Public.

### * Request password reset

- Endpoint: POST {{base}}/user/request-reset
- Description: Initiate a password reset request.
- Request Body:

  ```json
  {
    "email": "john.doe@gmail.com"
  }
  ```

- Response: Status 200 with reset instructions sent to the email.
- Authentication: Public.

### * Change password in settings

- Endpoint: PUT {{base}}/user/change-password
- Description: Update the user's password.
- Request Body:

  ```json
  {
    "oldPassword": "", 
    "newPassword": ""
  }
  ```

- Response: Status 200 if successful.
- Authentication: Private.

### * User logout

- Endpoint: POST {{base}}/user/logout
- Description: Log the user out and invalidate the session.
- Request Body: None
- Response: Status 200 if successful.
- Authentication: Private.

### * Delete user account

- Endpoint: DELETE {{base}}/user/
- Description: Remove the user account from the system.
- Request Body: None
- Response: Status 200 if successful.
- Authentication: Private.

# ! Question Endpoints

### * Process PDF

- Endpoint: POST {{base}}/upload-pdf
- Description: Process and analyze uploaded PDF documents.
- Request Body: A single PDF file (binary).
- Response: Status 200 with analysis results.
- Authentication: Private.

### * Retrieve all questions

- Endpoint: GET {{base}}/question
- Description: Retrieve paginated list of all active questions.
- Request Parameters:
  - `page`: Page number (default: 1).
  - `limit`: Number of items per page (default: 10).
- Response: Status 200 with a list of questions and pagination info.
- Authentication: Private.

### * Retrieve specific question

- Endpoint: GET {{base}}/question/get-one
- Description: Retrieve a single question by ID.
- Request Parameters:
  - `id`: Question ID (required).
- Response: Status 200 with the question details.
- Authentication: Private.

### * Create a question

- Endpoint: POST {{base}}/question
- Description: Add a new question to the database.
- Request Body:

  ```json
  {
    "categoryId": 1,
    "collegeId": 1,
    "question": "What is the capital of France?",
    "justification": "Paris is the capital of France.",
    "year": 2024,
    "options": ["Paris", "London", "Berlin", "Rome"],
    "optionRight": 0
  }
  ```

- Response: Status 201 with the created question ID.
- Authentication: Private (admin-only).

### * Update a question

- Endpoint: PUT {{base}}/question
- Description: Update an existing question.
- Request Body:

  ```json
  {
    "questionId": 1,
    "categoryId": 1,
    "collegeId": 1,
    "question": "Updated question text.",
    "justification": "Updated justification.",
    "year": 2025,
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "optionRight": 1
  }
  ```

- Response: Status 200 if updated successfully.
- Authentication: Private (admin-only).

### * Delete a question

- Endpoint: DELETE {{base}}/question
- Description: Remove a question from the database.
- Request Body:

  ```json
  {
    "id": 1
  }
  ```

- Response: Status 200 if deleted successfully.
- Authentication: Private (admin-only).

### * Retrieve available questions

- Endpoint: GET {{base}}/question/get-available
- Description: Retrieve a list of available questions based on filters.
- Request Body:

  ```json
  {
    "year": 2024,
    "college": 1,
    "category": 1,
    "total": 10
  }
  ```

- Response: Status 200 with the list of questions.
- Authentication: Private.

### * Inactivate a question

- Endpoint: POST {{base}}/question/inative-question
- Description: Mark a question as inactive.
- Request Body:

  ```json
  {
    "id": 1
  }
  ```

- Response: Status 200 if inactivated successfully.
- Authentication: Private (admin-only).
