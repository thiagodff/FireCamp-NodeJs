<h1 align="center">
<br>
  <img src="./.github/logo22.svg" alt="FireCamp" width="190">
<br>
<br>
FireCamp
</h1>

<p align="center">A Software as a Service for campers to subscribe for activities</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

## About the project

Rest API of the **FireCamp System**.<br>
As a instructor, you're able to create and edit activities.
<br>
As a camper, you're able to do subscribe in activities.

To see the **camper interface**, click here to take a look in the mobile aplicattion: [FireCamp Mobile](https://github.com/thiagodff/FireCamp-ReactJs)
<br>
To see the **instructor interface**, click here to take a look in the web aplicattion: [FireCamp Web](https://github.com/thiagodff/FireCamp-ReactNative)

## Features

This app features all the latest tools and practices development!

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Docker](https://www.docker.com/docker-community)
- [Sequelize](http://docs.sequelizejs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Youch](https://www.npmjs.com/package/youch)
- [Yup](https://www.npmjs.com/package/yup)
- [Bee Queue](https://www.npmjs.com/package/bcrypt)
- [Nodemailer](https://nodemailer.com/about/)
- [Date-fns](https://date-fns.org/)
- [Sentry](https://sentry.io/)
- [ESLint](https://eslint.org/)

## Getting started

1. Clone this repo using `git clone https://github.com/thiagodff/FireCamp-NodeJs`
2. Move yourself to the appropriate directory: `cd FireCamp-NodeJs`<br>
3. Run `docker-compose up` to setup all your database and start services<br>

## Routes

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=FireCamp%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fthiagodff%2FFireCamp-NodeJs%2Fmaster%2F.github%2FInsomnia_firecamp.json)

## Status Codes

FireCamp returns the following status codes in its API:

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 401         | `UNAUTHORIZED`          |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

## Future

Create an administrative controller web page, be able to create and edit new plans for campers and enroll them.<br>
Create a mobile app for instructors.<br>
Show the current plan of the camper in your app.

- [x] Modify api
- [ ] Admin page
- [ ] Instructor app
- [ ] Modify camper app

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.

---

Made with ♥ by Thiago :wave: [See my linkedin!](https://www.linkedin.com/in/thiago-fernandes-dornelles/)
