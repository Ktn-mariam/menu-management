Prerequisites

Run the following command to install the dependencies:
npm install

Envirnoment variables

This project is connected to a mongodb database. Create a project in mongodb and host a cluster. Get the uri of the cluster

Here are the required variables:

MONGO_URI=

Run the project

Run the following command to run the project

nodemon app.ts

Project Structure

Following is the project structure of this application

├── src/
│   ├── controllers/    # API logic
│   ├── db/             # To connect to db
│   ├── errors/         # Error functions
│   ├── middlewares/    # Custom middleware
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # Express routes
│   ├── utils/          # Helper functions
├── package.json
├── package-lock.json
├── README.md
├── .env
├── app.ts              # Main file
├── .gitignore
├── tsconfig.json

API Endpoints

This application has 3 APIs

1. Category API:
The category API has the following 4 endpoints:

| Action |  Route  | Method |
|:-----|:--------:|------:|
| Create Category   | `/api/v1/category` | POST |
| Get All Category   |  `/api/v1/category`  |   GET |
| Get Category   | `/api/v1/category/:categoryId` |    GET |
| Get Category   | `/api/v1/category/:categoryId` |    GET |