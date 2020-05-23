# todo-app-test-wedevs

repo contains two seperate folders. one is backend for php. and one is front end made up with reactjs.

## Run the Backend
to run backend app there is a sample db provided for mySQL database, import it through phpmyadmin or as you prefer and app/config/config.js change the db and other configs. go to root
and try to command composer-dumpautoload. run on the browser or run on a php server.

http://localhost/todo-backend/
or
http://localhost:8080

you will get a api output list for all the api used. It is kind of a small documentation for the backend.

## Run the Frontend
running the frontend is simple. on the todo-frontend folder goto src/config.js folder and set the base path for the api without slash.
In my case it is http://localhost/todo-backend

then go to root and 
npm install
npm run
http://localhost:3000

and you are ready to go. Thanks.
There is a sample postman dump added to help out with the API response.

N:B: In any cases or if there is any problem to run the app, Please contact, saniul.ahsan.12@gmail.com
