# Library-Backend-Typescript-Project
### RestApi Typescript, Node, Express, MongoDB, Jest /Supertest

##### deployed: https://library-server400.herokuapp.com/api
##### get all books: https://library-server400.herokuapp.com/api/books 
##### get all books with data population: https://library-server400.herokuapp.com/api/books/all 


###  endpoints: 


```
all books: https://library-server400.herokuapp.com/api/books
all books with data population: https://library-server400.herokuapp.com/api/books/all
get book by id: https://library-server400.herokuapp.com/api/books/id
update book by id: hhttps://library-server400.herokuapp.com/api/books/id 
delete all book: https://library-server400.herokuapp.com/api/books/all
post new book: https://library-server400.herokuapp.com/api/books

```

### Entity Relationship Diagram (ERD)



![Screenshot 2022-05-27 at 0 27 32](https://user-images.githubusercontent.com/51766137/170583219-af113de7-46b8-4e48-8967-2c51de649452.png)



[Entity Relationship Diagram (ERD)](https://github.com/moscuet/library-server100/files/8782220/Online.Bookstore.pdf)


## Prerequisites
1. Install mongodb
2. Install nodejs

## Setting Up

1. Create a `.env` file in the root directory and copy the content from `.env.example`

2. Make sure mongodb is running
3. Install dependencies: `yarn`
4. Use this command for development mode: `yarn run watch`
5. If you need to customize your env, take a look at `secrets.ts` file

## Requirements

Below are the steps that you need to finish in order to finish this module


1. Explore the code base, start with `server.ts`
2. Create all the mongoose schema for your ERD
3. Create CRUD endpoints for all the schema
4. Separate the routers and controller, controller goes into the controller folders. Controllers only handles request and response
5. Create more controller for your app if needed. Eg: borrow books, add product to order
6. For business logic like saving data to database, filtering, searching or updating, these are services and goes into services folder
7. Add authentication middleware using passport, google and jwt strategy
8. Add tests for your controllers and services. Remember to create the jwt token for your tests, because if your controller is protected, then the test should send the token also
9. Create a client folder in the project root, you will set up your react frontend in here. If there's a problem running the react app after install, try creating a `.env` file inside `client` folder. And put this line in there: `SKIP_PREFLIGHT_CHECK=true`


// "test": "jest --forceExit --detectOpenHandles --coverage --verbose false",
