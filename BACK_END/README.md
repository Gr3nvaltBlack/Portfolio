# 🌐 Social Network - Backend

This folder contains the backend part of our social network project.
It includes all the business logic that defines the behavior and operations of our platform, as well as the data management logic that ensures the organization and consistency of stored information.
It is developed with **Node.js + Express** for the application logic, and **MongoDB** — managed through **Mongoose** — for structured and efficient data storage.


## 🛠️ Technologies used
- [NodeJS] → JavaScript runtime built on Chrome's V8 engine, used to run JS code on the server.
- [Express] → fast, minimalist web framework for Node.js to build APIs and handle routes.
- [MongoDB] → NoSQL database used to store and manage data in a flexible, document-based format.
- [Mongoose] → ODM (Object Data Modeling) library for MongoDB, providing schema definitions and easier data validation.


## ⚙️ Configuration

<h4 align="center">PART I</h4>

To configure the project in the BACK_END folder, run the following command:
    <pre>
    ```npm init -y```
    </pre>
This command initializes the project with the default settings, creating a package.json file that manages the project's dependencies and metadata.</br>

To install all the dependencies listed in the package.json file, run the following command:
    <pre>
    ``` npm install ```
    </pre>
This command automatically downloads and installs all required packages and their sub-dependencies.
It also creates a node_modules folder containing all installed libraries, and a package-lock.json file to ensure consistent dependency versions across different environments.</br>

Installing the tools needed to launch our server, we run a new command:
    <pre>
    ```npm install --save express nodemon dotenv ```
    </pre>
This installs the Express web framework for node.js, then nodemon, a tool that automatically restarts our server every time a file is modified, and the dotenv module, which will allow us to manage environment variables from a *.env* file. All three have been added to the dependencies section of your package.json.</br>

To start defining our schemas (user, post, etc...), we run a new command:
    <pre>
    ```npm install --save mongoose ```
    </pre>
It allows you to:
- Define schemas (data structures, types, validations, etc.) for your MongoDB collections,
- Interact more easily with the database (CRUD, queries, relationships, etc.),
- Add business logic directly to your models.</br>

<h4 align="center">PART II</h4>

When creating our user schema in models/user.model.js, we run the command:
    <pre>
    ```npm install -s validator```
    </pre>
Validator is a package that allows you to easily verify and validate data; like our user schemas, we use it for email verification and validation.</br>

To encrypt the user's password, we run again a new command:
    <pre>
    ```npm install -s bcrypt```
    </pre>
When a user creates an account, their password should never be stored in clear text in the database. To do this, bcrypt transforms it before saving it.</br>

To manage secure user logins to our website, we run the command:
    <pre>
    ```npm install -s jsonwebtoken```
    </pre>
Jsonwebtoken allows you to create, sign, and verify JWT tokens. These tokens are used to prove a user's identity without having to reconnect them for each request.</br>

When creating our middleware files, we run the command:
    <pre>
    ```npm install -s cookie-parser```
    </pre>
This will be used to read and manipulate HTTP cookies sent by browsers.</br>

For managing files sent by users, we run the command:
    <pre>
    ```npm install -s multer```
    </pre>
Multer is a node.js middleware specifically designed to handle multipart/form-data, i.e. requests containing files.


### 🌳 Default tree structure
<pre>
backend/
│
├── 📁 node_modules/
│   └── 📁 .../
|
├── 📄 .gitignore
├── 📄 package-lock.json
|
└── 📄 package.json
</pre>


### Files and Folder installed by default:
<h3 align= "center">In the root of the <strong>BACK_END</strong>:</h3>

- node_modules/... → Folder or npm registers all modules.

- .gitignore → A file that tells Git which files or folders not to track.

- package-lock.json → Exact version of all installed dependencies → ensures reproducibility.

- package.json → Declare your project, its scripts and its dependencies.


### 🌿 Tree extension

Creating new folders and files for back logic:
<pre>
├── 📄 server.js
|
├── 📁 config/
│   ├── 📄 db.js
|   └── 📄 .env
│
├── 📁 models/
│   ├── 📄 User.model.js
│   ├── 📄 Post.model.js
|   ├── 📄 Recipe.model.js
│   └── 📄 Comment.model.js
│
├── 📁 controllers/
│   ├── 📄 Auth.controller.js
│   ├── 📄 User.controller.js
│   ├── 📄 Post.controller.js
|   ├── 📄 Recipe.controller.js
│   └── 📄 Comment.controller.js
│
├── 📁 routes/
│   ├── 📄 Auth.routes.js
│   ├── 📄 User.routes.js
│   ├── 📄 Post.routes.js
|   ├── 📄 Recipe.routes.js
│   └── 📄 Comment.routes.js
│
├── 📁 middlewares/
│   ├── 📄 authMiddleware.js
│   └── 📄 errorHandler.js
|
├─ 📁 utils/
│   └─ 📄 generateToken.js
│
└─ 📁 uploads/
    └─ 📂 images/
</pre>


## 💻 To-do list Backend

I.
**config/**</br>
Global Configuration
Contains db.js, the logic for connecting to MongoDB and managing environment variables.

- db.js → Configures and establishes the connection to MongoDB via Mongoose
- .env → Stores sensitive variables
<h5 align="center">In the project root:</h5>

- server.js → Main entry point, starts the Express server and connects to the MongoDB database.

II.
**models/**</br>
Data Structure
Defines Mongoose schemas for each entity (User, Post,...).

- User.model.js → user schema (name, email, hashed password, role, etc.).
- Post.model.js → post schema (content, author, likes, comments).
- Recipe.model.js → recipe schema (title, ingredients, steps, photo, author, etc.).
- Comment.model.js → schema for comments linked to a post or recipe.
- Message.model.js → schema for private messaging (sender, receiver, content, date, etc.).

III.
**controllers/**</br>
Processing Logic
Receives requests, calls services, and returns HTTP responses.

- Auth.controller.js → Manages registration, login, and JWT token generation.
- User.controller.js → Manages profile information and user modifications.
- Post.controller.js → CRUD for feed posts.
- Recipe.controller.js → CRUD for recipes.
- Comment.controller.js → Manages comments (adding, deleting, reading).
- Message.controller.js → Sends and receives private messages.

IV.
**routes/**</br>
API Endpoints
Manages URLs and binds each route to its controller.

- Auth.routes.js → public routes (login, signup).
- User.routes.js → protected routes for profiles.
- Post.routes.js → CRUD routes for posts.
- Recipe.routes.js → CRUD routes for recipes.
- Comment.routes.js → CRUD routes for comments.
- Message.routes.js → routes for messaging.

V.
**middlewares/**</br>
Security and Management
Intercept requests before they reach the routes (auth, errors, logs).

- authMiddleware.js → Verifies JWT tokens to secure routes.
- errorHandler.js → Captures and handles global API errors.

VI.
**utils/**</br>
Utility Functions
Small, reusable functions (validation, token generation, formatting).

- generateToken → functions to generate and verify JWT tokens.

VII.
**uploads/**</br>
Static Files
Contains images or files that users upload.

- images/ → stored uploaded files (recipe photos, avatars, etc.).


## 🚀 Project launch

In the backend there are 2 ways to launch the project:

1. <h4>Run the file directly</h4>
At the root of the **BACK_END** ​​folder, run the command:
    <pre>
    ```node server.js```
    </pre>
This is a straightforward and straightforward way to run a Node.js project. It's simple and fast, and good for testing, but:
- Not practical if the input file changes
- No way to add custom options without retyping
- Can't easily automate multiple commands

2. <h4>Run the "start" script from package.json</h4>
Apres quelques configurations dans le package.json, run the command:
    <pre>
    ```npm start```
    </pre>
The second method does the same as the first but with more flexibility. Why the second method is preferable:
- Ability to change the startup command
- npm manages certain environment variables and the project path for you
- This is an expected standard in Node.js hosting

### Author
- Lentz Gonzalez (Gr3nvaltBlack)
- Georges Menheim (georges479)