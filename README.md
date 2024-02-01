<p align="center">
  <img src="https://skillicons.dev/icons?i=ts,nodejs,express,mongodb,jest" />
  <br/>
  <a href="https://library-server400.herokuapp.com/api"><kbd>🟢 Live API</kbd></a>
  <br/> 
  <span>Library Backend</span> l <span>REST API</span>
</p>

<br/> <br/> 

# library-server100

This backend application, developed for book borrowing services, harnesses the power of TypeScript, Node.js, Express, and MongoDB. It features an open API for library management, enabling functionalities such as adding, updating, deleting, and retrieving data of author, book and borrowing. For testing, the application utilizes Jest and Supertest to ensure high functionality and reliability.

Check out the live API at [Library Server API](https://library-server100.up.railway.app/)

Frondend Library app powered with library-server100 API:&nbsp;   [Github Repo](https://github.com/moscuet/Lending-Loft) &nbsp; [Live Front End](https://zealous-galileo-0290aa.netlify.app/ )

## 🔥 Features

- **CRUD for Books & Authors**: Manage book and author data with full create, read, update, and delete capabilities.
- **Borrowing & Returns**: Track and manage the lending process efficiently.
- **Secure Login**: Protect user data with JWT authentication.
- **Testing Suite**: Ensure reliability with Jest and Supertest.

<br/>

## 🛠 Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Security**: JWT, Bcrypt
- **Testing**: Jest, Supertest
- **Utilities**: Nodemailer, Winston, dotenv
- **Dev Tools**: TypeScript, ESLint, Prettier, Nodemon

<br/>

## 📖 Entity Relationship Diagram (ERD)

![Entity Relationship Diagram (ERD)](https://user-images.githubusercontent.com/51766137/170583219-af113de7-46b8-4e48-8967-2c51de649452.png)

For a detailed view, check the [ERD documentation](https://github.com/moscuet/library-server100/files/8782220/Online.Bookstore.pdf).

<br/>

## 🚀 Endpoints


```
all books: https://library-server400.herokuapp.com/api/books
all books with data population: https://library-server400.herokuapp.com/api/books/all
get book by id: https://library-server400.herokuapp.com/api/books/id
update book by id: hhttps://library-server400.herokuapp.com/api/books/id 
delete all book: https://library-server400.herokuapp.com/api/books/all
post new book: https://library-server400.herokuapp.com/api/books

```

## Prerequisites
1. Install mongodb
2. Install nodejs

## Setting Up

1. Create a `.env` file in the root directory and copy the content from `.env.example`

2. Make sure mongodb is running
 - brew install mongodb 
3. Install dependencies: `yarn`
4. Use this command for development mode: `yarn run watch`
5. If you need to customize your env, take a look at `secrets.ts` file

### mongodb setup in local env

for mac user:
install: brew install mongodb,  Tap the MongoDB Homebrew Tap:  brew tap mongodb/brew
 Start MongoDB Service: brew services start mongodb-community, Verify Installation: brew services list
Install MongoDB Shell (mongosh): brew install mongosh
 Running the MongoDB Shell: mongosh
Create or Use a Databas: use yourDatabaseName
Experiment with MongoDB: db.createCollection("myCollection")
db.myCollection.insert({ name: "test", value: 1 })
db.myCollection.find()


