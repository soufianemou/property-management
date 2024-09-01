## Overview

Follow the instructions below to set up and run both parts of the application.


## Technologies Used

### Frontend
- **React**
**TypeScript**
**Tailwind CSS**

### Backend
- **Python**
**Django**
**Django REST Framework**
**SQLite**

## Frontend Setup

### Navigate to the Client Directory
``` cd client```


### Install Depedencies
```npm install```


### Run the Development Server
```npm run dev ```


## Backend Setup

### Navigate to the Server Directory
```cd server```


### Create a virtual environment for the backend
```python -m venv env```


### Activate the virtual environment.
```source env/Scripts/activate```


### Navigate to the Backend folder
```cd backend```


### Install the required Python packages
```pip install -r requirements.txt```


### Run Migrations
```python manage.py migrate```


### Start the Server
```python manage.py runserver```

## API Documentation
You can access the Swagger UI by visiting the following URL in your browser:
[http://localhost:8000/swagger/]
(http://localhost:8000/redoc/)


## Email Mock Command

To simulate sending emails and check for due payments, follow these steps:

1. Ensure you are in the server directory and have activated your virtual environment.

2. Run the email mock command:
```python manage.py send_payment_notifications```

This command will check for due payments and send mock notifications 
mock the email sending process
no actual email integration is required


## Testing

1. Ensure you are in the server directory and have activated your virtual environment.

2. Run the test suite:
```python manage.py test```