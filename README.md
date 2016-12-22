# MockUBCBookstore

Welcome! This is a mock bookstore web application I worked on in fourth year to increase my proficiency with client-side JavaScript, HTML5/CSS (pure, no frameworks!) as well as gain familiarity with server-side Node with Express 4 and MongoDB. 

### Local Setup

Please ensure the following are installed:
  * Node.js https://nodejs.org/en/
  * MongoDB https://www.mongodb.com/download-center?filter=enterprise#enterprise

Create the following directory: \<datalocation\>/db ex. D:/data/db

Add MongoDB\Server\3.2\bin to your PATH variable

### To start Node app locally:

1. Start MongoDB: ```mongod --dbpath=<datalocation>```
  * Ex. ```mongod --dbpath=/data```
2. ```cd MockUBCBookstore```
3. Open another terminal and run ```mongo``` to start a mongo shell
4. In the mongo shell run ```load('initdb.js')``` to initialize the DB (can also do this after first setup to
re-initialize the DB)
5. Open another terminal and run ```npm start```

Can now go to [localhost:5000](http://localhost:5000/) to access locally

The following screenshot shows the error page returned when a bad products price range request is made, please
use it as reference for making the request:
<img src="https://github.com/abrahamchanUBC/CPEN400A-2016-L1A-Group13/blob/master/public/images/RangeRequest.png" width="800">




