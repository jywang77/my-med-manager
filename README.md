# Running mongoDB

1. In terminal, type mongod to run the mongo server
2. With mongod running in one terminal, type mongo in another terminal to run the mongo shell
   _(To exit the mongo shell, run quit(). To exit the mongod, hit ^C)_

## Looking for users in the database

mongo
show databases
use myMedManager
db.users.find()

# Running the back end

npm run devStart
Go to localhost://3001

# Running the front end

cd client
npm start

# To do

- NavBar: icons shift weirdly and don't change colour when clicked
- Finish calendar
