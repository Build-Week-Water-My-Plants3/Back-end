
baseURL: https://water-my-plantss.herokuapp.com/

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

- /api/user \*

| Method | Endpoints            | Actions              | Required                        |
| :----- | :------------------- | :------------------- | :------------------------------ |
| POST   | /:id/plants          | post users plants    | species id, nickname, frequency |
| GET    | /:id/plants          | gets users plants    |                                 |
| PUT    | /:id/plants/:plantid | updates users plants | species id, nickname, frequency |
| DELETE | /:id/plants/plantid  | deletes users plants |                                 |
| PUT    | /:id                 | updates users info   | phonenumber , password          |


