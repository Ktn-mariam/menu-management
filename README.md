<h1 display="flex" align="center">Menu Management NodeJS Application</h1>

<div display="flex" align="center">
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
</div>

## Introduction
This backend application is built with Node.js and Express.js, utilizing MongoDB as its database to simplify menu management.

## Prerequisites
The v22.12.0 version of Node is required for the installation and building of this application.

## Installation

1. Clone this repository by running the following command in your terminal:
```
git clone https://github.com/Ktn-mariam/menu-management.git
cd menu-management
```
2. Run the following command to install the dependencies:
```
npm install
```

## Envirnoment variables

This project is connected to a mongodb database. Create a project in mongodb and host a cluster. Get the uri of the cluster and add it to your .env file. Here are the required variables:
```
MONGO_URI=
```


## Run the project
Run the following command to run the project:

```
nodemon app.ts
```


## Project Structure
Following is the project structure of this application:

```
├── src/
│   ├── controllers/    # API logic
│   ├── config/         # To connect to db
│   ├── errors/         # Error functions
│   ├── middlewares/    # Custom middleware
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # Express routes
├── package.json
├── package-lock.json
├── README.md
├── .env
├── app.ts              # Main file
├── .gitignore
├── tsconfig.json
```

## Schema Design

![Blank diagram (2)](https://github.com/user-attachments/assets/3d919838-3efa-4996-a693-dd77ac939b1d)

## API Endpoints

This NodeJS application has 3 APIs. The menu is divided into 3 parts: Category, SubCategory, and Item. Categories have subcategories. Items can be created under categories and subCategories.

### 1. Category API:

The category API has the following 4 endpoints:

| Action |  Route  | Method |
|:-----|:--------:|------:|
| Create Category   | `/api/v1/category` | **POST** |
| Get All Categories   |  `/api/v1/category`  |   **GET** |
| Get Category   | `/api/v1/category/:categoryId` |    **GET** |
| Update Category   | `/api/v1/category/:categoryId` |    **PATCH** |

### 2. SubCategory API:

The subCategory API has the following 4 endpoints:

| Action |  Route  | Method |
|:-----|:--------:|------:|
| Create SubCategory   | `/api/v1/subCategory` | **POST** |
| Get All SubCategories   |  `/api/v1/subCategory`  |   **GET** |
| Get All SubCategories Under Category   | `/api/v1/subCategory/category/:categoryId` |    **GET** |
| Get SubCategory   | `/api/v1/subCategory/:subCategoryId` |    **GET** |
| Update SubCategory   | `/api/v1/subCategory/:subCategoryId` |    **PATCH** |



### 3. Item API:

The item API has the following 7 endpoints:

| Action |  Route  | Method |
|:-----|:--------:|------:|
| Create Item   | `/api/v1/item` | **POST** |
| Get All Items   |  `/api/v1/item`  |   **GET** |
| Get All Items Under Category   | `/api/v1/item/category/:categoryId` |    **GET** |
| Get All Items Under SubCategory   | `/api/v1/item/subCategory/:subCategoryId` |    **GET** |
| Search Item by name   | `/api/v1/item/search?searchName=` |    **GET** |
| Get Item   | `/api/v1/item/:itemId` |    **GET** |
| Update Item   | `/api/v1/item/:itemId` |    **PATCH** |


## Deployment

This application was deployed on Render. Make sure you enter the Environment Variables before deploying it.