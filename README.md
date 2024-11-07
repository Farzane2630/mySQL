## Instructions:
a. Clone source code
b. create a ".env" file in backend directory and write environment variables:
```
MYSQL_HOST=mysql
MYSQL_ROOT_PASSWORD=your_secret_password
MYSQL_DATABASE=notes_db
```
c. run 
$ sudo docker compose --env-file ./backend/.env up --build


* if there was error regarding nodemon follow below instructions:
1. $ cd backend/
2. $ npm install nodemon
3. c$ d ..
4. $ sudo docker compose --env-file ./backend/.env up --build
