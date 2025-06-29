# TFM Backend

## Importing the database
You can get the database sql file [here](./database/AtheneaReche_TFM.sql)

# **Book API**

This API allows users to manage and track books within a personal collection. Users can perform CRUD operations on books, authors, publishers, and their personal collections. The API supports user authentication and role-based access control to ensure secure and personalized interactions.

## **Core Features**:

### **Books**:
- View all books, search by author, publisher, or genre.
- Perform CRUD (Create, Read, Update, Delete) operations on books, including managing book details such as title, cover image, author, publisher, genre, and more.

### **Authors**:
- Retrieve and manage author information, including name, biography, and birth/death dates.
- View all books related to a specific author.

### **Publishers**:
- Retrieve and manage publisher information, including name and country.
- Search for books by publisher.

### **Collections**:
- Create, update, and delete custom collections of books.
- Add or remove books from collections, including a special "Favorites" collection for easy access to preferred books.

### **Reading Progress**:
- Start reading a book, update its status, and track reading progress.
- Retrieve a list of books the user is currently reading, along with their progress and status (e.g., "reading", "finished", "not started").
  
## **User Roles**:

### **Admin**:
- Has full access to manage books, authors, publishers, collections, and user data. Admins can perform operations such as adding, deleting, or updating books, authors, and publishers.
  
### **User**:
- Can manage their own book collections, including adding/removing books from their personal collections, tracking reading progress, and accessing their personal reading list.
  
## **Authentication & Authorization**:
- The API uses **JWT authentication** to ensure secure access. 
- Role-based authorization ensures that only users with the appropriate permissions can access or modify data. Admins have elevated privileges, while regular users are limited to their personal data.

---

## **Public vs Private API Endpoints**

### **Public Endpoints**:
These endpoints are available without requiring user authentication:
- `GET /authors`: Retrieve all authors.
- `GET /publishers`: Retrieve all publishers.
- `GET /books`: Search for books by author, publisher, or genre.
- `GET /books/:id`: Get a specific book by its ID.
- `GET /authors/:id`: Get a specific author by ID.
- `GET /publishers/:id`: Get a specific publisher by ID.

### **Private Endpoints**:
These endpoints require **JWT authentication** and are limited to authenticated users:
- `GET /collections`: Get the user's personal collections.
- `POST /collections`: Create a new collection (requires admin role).
- `DELETE /collections/:id`: Delete a collection (requires admin role).
- `POST /collections/add-book`: Add a book to a collection.
- `POST /collections/remove-book`: Remove a book from a collection.
- `POST /reading/start`: Start reading a book.
- `PUT /reading/update`: Update reading progress.
- `GET /reading`: Get the user's reading list with progress and status.

### **Admin-Only Endpoints**:
These endpoints are restricted to users with the **admin role**:
- `POST /books`: Add a new book.
- `PUT /books/:id`: Update an existing book.
- `DELETE /books/:id`: Delete a book.
- `POST /authors`: Add a new author.
- `PUT /authors/:id`: Update an author.
- `DELETE /authors/:id`: Delete an author.
- `POST /publishers`: Add a new publisher.
- `PUT /publishers/:id`: Update a publisher.
- `DELETE /publishers/:id`: Delete a publisher.
