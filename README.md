WELCOME TO THIS PROJECT DOCS

1- run npm start to run the front-end server.
2- open a new terminal and  run cd server( make sure npm and node are installed in your local machine)
3- once you are in the server folder run php artisan serve( make sure php and composer are installed in your local machine)
4- in your phpMyadmin Panel create a new database name it citeUniv
5- run php artisan migrate to create the tables of our database
6- copy and paste this link to generate some users for test purposes "http://localhost:8000/api/addUser" (you can change 8000 with your laravel port if you change the default 8000 port same applies for the rest of the links)
7- copy and paste this link to generate some rooms data for test purposes "http://localhost:8000/api/addRooms"
8- now you are good once you are logged in as CAE (see users table in phpmyadmin)
9- load the MOCK_DATA.xls file located in the root of this project to load fake student data  to test the application
10- Explore the rest lol