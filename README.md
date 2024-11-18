## Instructions:
a. Clone source code

b. Create a ".env" file in backend directory and write environment variables:
```
MYSQL_HOST=mysql
MYSQL_ROOT_PASSWORD=your_secret_password
MYSQL_DATABASE=notes_db
```

c. Run 
``` 
sudo docker compose --env-file ./backend/.env up --build
``` 

*** if there was error regarding "nodemon" follow below instructions:
``` 
cd backend/
 ```
```  
npm install nodemon
``` 
```
cd .. 
```
``` 
sudo docker compose down
``` 
``` 
sudo docker compose --env-file ./backend/.env up --build
``` 
