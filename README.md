<h1 align="center">
<a style="display:block;">
<img src="https://i.ibb.co/C7vjrDG/covid-black.png" alt="Covid" width="100px">
</a>

COVID Tracking System

[![Version](https://img.shields.io/badge/Version-3.1-blue)](#)

</h1>


## API
+ **Folder:** `backend/`
+ **Status:** *in progress*

<a href="http://nodejs.org" style="margin-right: 10px">
<img src="https://img.shields.io/badge/NodeJS-✓-blue" alt="NodeJS">
</a>
<a href="https://mongodb.com" style="margin-right: 10px">
<img src="https://img.shields.io/badge/MongoDB-✓-blue" alt="MongoDB">
</a>

### 📦️ Packages


<table>
<tr>
<td>

#### Express
+ **[URL](http://expressjs.com)**
+ **How to install**?
  + `npm install express`

</td>
<td>

#### Mongoose
+ **[URL](https://mongoosejs.com)**
+ **How to install**?
  + `npm install mongoose`

</td>
</tr>
<tr>
<td>

#### DotENV
+ **[URL](https://www.npmjs.com/package/dotenv)**
+ **How to install**?
  + `npm install dotenv`

</td>
<td>

#### BCrypt
+ **[URL](https://www.npmjs.com/package/bcryptjs)**
+ **How to install**?
  + `npm install bcryptjs`

</td>
</tr>
<tr>
<td>

#### Nodemon
+ **[URL](http://nodemon.io)**
+ **How to install**?
  + `npm install -D nodemon`
  + `npm install -g nodemon`
    + **`-D`** to install only for dev
    + **`-g`** to install package globally

</td>
<td>

#### Multer
+ **[URL](https://www.npmjs.com/package/multer)**
+ **How to install**?
  + `npm install --save multer`

</td>
</tr>
<tr>
<td>

#### Body Parser
+ **[URL](https://www.npmjs.com/package/body-parser)**
+ **How to install**?
  + `npm install body-parser`

</td>
<td>

#### Cors
+ **[URL](https://www.npmjs.com/package/cors)**
+ **How to install**?
  + `npm install cors`

</td>
</tr>
<tr>
<td>

#### ShortID
+ **[URL](https://www.npmjs.com/package/shortid)**
+ **How to install**?
  + `npm install shortid`

</td>
<td>

#### Nodemailer
+ **[URL](https://www.npmjs.com/package/nodemailer)**
+ **How to install**?
  + `npm install nodemailer`

</td>
</tr>
<tr>
<td>

#### EJS
+ **[URL](https://www.npmjs.com/package/ejs)**
+ **How to install**?
  + `npm install ejs`

</td>
<td>

#### Swagger UI Express
+ **[URL](https://www.npmjs.com/package/swagger-ui-express)**
+ **How to install**?
  + `npm install swagger-ui-express`

</td>
</tr>
<tr>
<td>

#### JSON Web Token (JWT)
+ **[URL](https://www.npmjs.com/package/jsonwebtoken)**
+ **How to install**?
  + `npm install jsonwebtoken`

</td>
<td>

#### Node-cron
+ **[URL](https://www.npmjs.com/package/node-cron)**
+ **How to install**?
  + `npm install node-cron`

</td>
</tr>
<tr>
<td>

#### Request
+ **[URL](https://www.npmjs.com/package/request)**
+ **How to install**?
  + `npm install request`

</td>
</tr>
</table>


### ℹ️ How to run
1. Execute the command `npm install`
1. Create `.env` file with this code:
	```env
	# NODE PORT
	PORT=3000

	# JWT
	SECRET=secret_word_for_jwt
	EXPIRES=1800000

	# MONGO DATA
	MONGO_HOST=localhost
	MONGO_PORT=27017
	MONGO_DB=covidSystem

	# EMAIL DATA
	EMAIL_USER=email@example.com
	EMAIL_PWD=email_pwd

	# USER DATA
	ADMIN_NAME=COVID Tracking System
	ADMIN_EMAIL=admin_email
	ADMIN_PWD=admin_pwd
	```
	+ This code is on `.env.example` file;
	+ The `MONGO_PORT=27017` is default value;

2. To insert default roles and default admin user into **MongoDB**, execute `npm run setup`
3. To run **NodeJS** server (with **Nodemon**) execute `npm run dev`


### 📂 Folder Structure

```diff
├── api
│   ├── controllers
│   │   ├── CovidTestController.js
│   │   ├── GenericController.js
│   │   ├── PatientController.js
│   │   ├── SummaryController.js
│   │   └── UserController.js
│   ├── documentation
│   │   ├── index.js
│   │   └── src
│   ├── index.js
│   ├── middlewares
│   │   ├── authorize.js
│   │   ├── errorHandler.js
│   │   ├── filters.js
│   │   ├── logger.js
│   │   ├── session.js
│   │   └── sort.js
│   ├── models
│   │   ├── CovidTest.js
│   │   ├── Patient.js
│   │   ├── Role.js
│   │   └── User.js
│   └── routes
│       ├── covidTests.js
│       ├── patients.js
│       ├── roles.js
│       ├── summary.js
│       └── users.js
├── app.js
├── config
│   └── mongoose.js
├── package-lock.json
├── package.json
├── public
├── requests
│   ├── covidTests.http
│   ├── filters.http
│   ├── patients.http
│   ├── roles.http
│   ├── sort.http
│   └── users.http
├── scripts
│   ├── emailServer.js
│   ├── resetEmail.js
│   ├── roles.json
│   └── setup.js
└── views
    ├── mail
    │   └── reset.ejs
    └── partials
        ├── copyright.ejs
        ├── footer.ejs
        ├── header.ejs
        ├── logo.ejs
        ├── preheader.ejs
        ├── style.ejs
        └── title.ejs
```

## Frontend
+ **Folder:** `frontend/`
+ **Status:** *in progress*

<a href="https://angular.io">
<img src="https://img.shields.io/badge/Angular-✓-red" alt="Angular" />
</a>

### ℹ️ How to run
1. Change to `frontend/` folder (on terminal: `cd frontend`)
1. Execute the command `npm install`
1. Execute the command `ng serve` to run **Angular** application


### 📂 Folder Structure
```diff
├── src
│   ├── e2e
│   ├── app
│	│   ├── app-routing.module.ts
│	│   ├── app.component.html
│	│   ├── app.component.sass
│	│   ├── app.component.spec.ts
│	│   ├── app.component.ts
│	│   ├── app.module.ts
│	│   ├── auth
│	│   │   ├── change
│	│   │   ├── login
│	│   │   ├── reset
│	│   │   ├── session.service.spec.ts
│	│   │   └── session.service.ts
│	│   ├── components
│	│   │   └── dialogs
│	│   ├── directives
│	│   │   ├── can-use
│	│   │   └── enable-menu
│	│   ├── functions
│	│   │   └── validateScopes.ts
│	│   ├── guards
│	│   │   └── scope
│	│   ├── interceptors
│	│   │   └── session-lost.interceptor.ts
│	│   ├── layout
│	│   │   ├── default
│	│   │   └── landing-page
│	│   ├── models
│	│   │   ├── patient.model.ts
│	│   │   ├── role.model.ts
│	│   │   └── user.model.ts
│	│   ├── pages
│	│   │   ├── dashboard
│	│   │   ├── patients
│	│   │   └── users
│	│   └── services
│	│       ├── covid-api
│	│       ├── patients
│	│       ├── patients.service.spec.ts
│	│       ├── patients.service.ts
│	│       ├── roles
│	│       └── users-service
│	├── assets
│	│   └── images
│	│       ├── add.png
│	│       ├── backgrounds
│	│       ├── logo
│	│       ├── prevention
│	│       ├── symptoms
│	│       └── user.png
│	├── environments
│	│   ├── environment.prod.ts
│	│   └── environment.ts
│	├── favicon.ico
│	├── index.html
│	├── main.ts
│	├── polyfills.ts
│	├── proxy.conf.json
│	├── styles
│	│   ├── _variables.sass
│	│   └── theme.sass
│	├── styles.sass
│	└── test.ts
├── .editorconfig
├── .gitignore
├── angular.json
├── browserslist
├── karma.conf.js
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── tslint.json
```

### 📦️ Packages

<table>
<tr>
<td>

#### Angular Material
+ **[URL](https://material.angular.io)**
+ **How to install**?
  + `ng add @angular/material`

</td>
<td>

#### Angular Flex Layout
+ **[URL](https://github.com/angular/flex-layout)**
+ **How to install**?
  + `npm i -s @angular/flex-layout @angular/cdk`

</td>
</tr>
<tr>
<td>

#### ChartJS
+ **[URL](https://github.com/chartjs/Chart.js)**
+ **How to install**?
  + `npm i -s chart.js`

</td>
<td>

#### NG2-Charts
+ **[URL](https://www.npmjs.com/package/ng2-charts)**
+ **How to install**?
  + `npm i ng2-charts`

</td>
</tr>
<tr>
<td>

#### NG2-Search-Filter
+ **[URL](https://www.npmjs.com/package/ng2-search-filter)**
+ **How to install**?
  + `npm i ng2-search-filter`

</td>
</tr>
</table>
