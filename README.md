# MockUBCBookstore

Welcome!<br>

This is a mock bookstore web application I worked on in fourth year to increase my proficiency with client-side JavaScript, HTML5/CSS (with no frameworks) as well as gain familiarity with server-side NodeJS with Express 4 and MongoDB. 

## Adding a user

Upon entering the site, the user will be prompted for their username. This username will be added to the _users_ collection. A random one will be generated if the user decides to navigate away without entering one.  

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen1.png"><br>_Initial state of "users" collection_

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen1-2.png"><br>_Adding a username_

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen2.png"><br>_Username added_

## Adding items to the cart

After entering a username, the user is presented with all the items in the mock UBC bookstore. 

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen2-1.png"><br>_Items in mock bookstore shown_

Items can be filtered according to the menu on the left. 

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen2-1-1.png"><br>_After clicking on "Clothes" filter_

To add an item, first hover over it to allow the "Add" button to appear.

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen2-2.png"><br>_Adding an item to cart_

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen3.png"><br>_Initial state of "orders" collection_

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen4.png"><br>_Initial state of "products" collection_

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen3-2.png"><br>_After adding several items to the cart_

## Checking out

To checkout, the user would click on "Checkout", then a check would be performed to make sure that the items are still in stock in the database, and after the user would be able to click on "Complete purchase". After this, the _orders_ and _products_ collections are updated accordingly.

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen5.png"><br>_Confirming item stock_

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen6.png"><br>_Purchase completion_

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen7.png"><br>_Updated "products" collection_

<img src="https://github.com/snxfz947/MockBookstore/blob/master/public/images/screen8.png"><br>_Updated "orders" collection_

## Local setup

Please ensure the following are installed:
  * Node.js https://nodejs.org/en/
  * MongoDB https://www.mongodb.com/download-center?filter=enterprise#enterprise

Create the following directory: \<datalocation\>/db ex. D:/data/db

Add MongoDB\Server\3.2\bin to your PATH variable

### To start Node app locally:

1. Open a terminal and start MongoDB: ```mongod --dbpath=<datalocation>```
  * Ex. ```mongod --dbpath=/data```
2. Open another terminal, ```cd MockBookstore``` and run ```mongo``` to start a mongo shell
3. In the mongo shell run ```load('initdb.js')``` to initialize the DB (can also do this after first setup to
re-initialize the DB)
4. Open another terminal,  and run ```npm start```

Can now go to [localhost:5000](http://localhost:5000/) to access locally.

Note that there will not be any items in stock, so please click on the link at the bottom of the page to add the default quantities of all the products to the database.




