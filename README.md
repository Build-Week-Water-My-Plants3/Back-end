## Frameworks

- bcryptjs
- cors
- dotenv
- express
- helmet
- jsonwebtoken
- knex
- knex-cleaner
- sqlite3

* /api/auth \*

| Method | Endpoints | Actions                   | Required                       |
| :----- | :-------- | :------------------------ | :----------------------------- |
| POST   | /register | registers a new user      | username,password, phonenumber |
| POST   | /login    | signs in registered users | username,password              |

- /api/plantRouter \*
  | POST | /:id/plants | gets users plants | |
  | GET | /:id/plants | registers a new user | username,password, phonenumber |
  | PUT | /:id/plants/plantid| registers a new user | |
  | DELETE | /:id/plants/plantid| registers a new user | |
