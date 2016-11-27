# CPEN400A-2016-L1A-Group13


### To start Node app locally for the first time:

1. Create a \<datalocation\>/db directory
2. Start MongoDB: ```mongod --dbpath=<datalocation>```
  * Ex. ```mongod --dbpath=/data```
3. Open another terminal and run ```mongo``` to start a mongo shell
4. In the mongo shell run ```load('initdb.js')``` to initialize the DB (can also do this after first setup to
re-initialize the DB)
5. ```cd CPEN400A-2016-L1A-Group13```
6. ```npm install mongodb --save```
7. ```npm install ejs```
7. ```npm start```

### After the first time, just do the following:

1. ```mongod --dbpath=<datalocation>```
  * Ex. ```mongod --dbpath=/data```
2. ```cd CPEN400A-2016-L1A-Group13```
3. ```npm start```

Can now go to [localhost:5000](http://localhost:5000/) to access locally
Hosted on Heroku at: https://cpen400group13.herokuapp.com/




