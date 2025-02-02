<h1 display="flex" align="center">Menu Management NodeJS Application</h1>

## Prerequisites

Run the following command to install the dependencies:

```npm install```


## Envirnoment variables

This project is connected to a mongodb database. Create a project in mongodb and host a cluster. Get the uri of the cluster

Here are the required variables:

```MONGO_URI=```


## Run the project

Run the following command to run the project

```nodemon app.ts```


## Project Structure

Following is the project structure of this application

```
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
```

## Schema Design

![Blank diagram](https://github.com/user-attachments/assets/45e1ada6-7bcf-4f3d-aeb1-51fbd24da7d8)

## API Endpoints

This NodeJS application has 3 APIs. The menu is divided into 3 parts: Category, SubCategory, and Item. Categories have subcategories. Items can be created under categories and subCategories.

### Category API:

The category API has the following 4 endpoints:

| Action |  Route  | Method |
|:-----|:--------:|------:|
| Create Category   | `/api/v1/category` | **POST** |
| Get All Categories   |  `/api/v1/category`  |   **GET** |
| Get Category   | `/api/v1/category/:categoryId` |    **GET** |
| Update Category   | `/api/v1/category/:categoryId` |    **GET** |

### SubCategory API:

The subCategory API has the following 4 endpoints:

| Action |  Route  | Method |
|:-----|:--------:|------:|
| Create SubCategory   | `/api/v1/subCategory` | **POST** |
| Get All SubCategories   |  `/api/v1/subCategory`  |   **GET** |
| Get All SubCategories Under Category   | `/api/v1/subCategory/category/:categoryId` |    **GET** |
| Get SubCategory   | `/api/v1/subCategory/:subCategoryId` |    **GET** |
| Update SubCategory   | `/api/v1/subCategory/:subCategoryId` |    **PATCH** |



### Item API:

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

<table width="100%">
  <tr>
    <th>Action</th>
    <td>Route</td>
    <td>Method</td>
  </tr>
  <tr>
    <td>Create Item</td>
    <td>`/api/v1/item`</td>
    <td>**POST**</td>
  </tr>
  <tr>
    <th>Get All Items</th>
    <td>`/api/v1/item`</td>
    <td>**GET**</td>
  </tr>
  <tr>
    <th>Get All Items Under Category</th>
    <td>`/api/v1/item/category/:categoryId`</td>
    <td>**GET**</td>
  </tr>
  <tr>
    <th>Get All Items Under SubCategory</th>
    <td>`/api/v1/item/subCategory/:subCategoryId`</td>
    <td>**GET**</td>
  </tr>
  <tr>
    <th>Search Item by name</th>
    <td>`/api/v1/item/search?searchName=`</td>
    <td>**GET**</td>
  </tr>
  <tr>
    <th>Get Item</th>
    <td>`/api/v1/item/:itemId`</td>
    <td>**GET**</td>
  </tr>
  <tr>
    <th>Update Item</th>
    <td>`/api/v1/item/:itemId`</td>
    <td>**PATCH**</td>
  </tr>
</table>
