# Undergrad Web Applications Project: UBC Mock Bookstore

This is a mock bookstore NodeJS application I worked on in fourth year built using Express and MongoDB.

It is currently hosted on Heroku: https://ubcmockbookstore.herokuapp.com/ using a cloud hosted MongoDB database via [mLab](https://mlab.com)

## Features

These are the app features, along with how the relevant collections are affected.

### Adding a user

Upon entering the site, the user will be prompted for their username. This username will be added to the _users_ collection. A random one will be generated if the user decides to navigate away without entering one.  

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen1.png"><br>_Initial state of "users" collection_

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen1-2.png"><br>_Adding a username_

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen2.png"><br>_Username added_

### Adding items to the cart

After entering a username, the user is presented with all the items in the mock UBC bookstore. 

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen2-1.png"><br>_Items in mock bookstore shown_

Items can be filtered according to the menu on the left. 

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen2-1-1.png"><br>_After clicking on "Clothes" filter_

To add an item, first hover over it to allow the "Add" button to appear.

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen2-2.png"><br>_Adding an item to cart_

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen3.png"><br>_Initial state of "orders" collection_

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen4.png"><br>_Initial state of "products" collection_

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen3-2.png"><br>_After adding several items to the cart_

### Checking out

To checkout, the user would click on "Checkout", then a check would be performed to make sure that the items are still in stock in the database, and after the user would be able to click on "Complete purchase". After this, the _orders_ and _products_ collections are updated accordingly.

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen5.png"><br>_Confirming item stock_

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen6.png"><br>_Purchase completion_

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen7.png"><br>_Updated "products" collection_

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen8.png"><br>_Updated "orders" collection_

### Restoring items

As a feature for demonstration purposes, the user can restore all the items to their default quantities by clicking on a link at the bottom of the page.

<img src="https://github.com/snxfz947/ubc-mock-bookstore/blob/master/public/images/screen9.png"><br>_Link to restore the item quantities_


## Heroku deployment instructions

Heroku completely handles building the app, all you need to do is push to the Heroku remote. 

After provisioning the mLab add-on which can be done through the Heroku dashboard, to find the connection URI, use the command:

```
heroku config:get MONGODB_URI
```

Enter this in the `config.json` file.

Full instructions can be found here: https://devcenter.heroku.com/articles/mongolab#adding-mlab-as-a-heroku-add-on

After filling in the URI in `config.json`, go ahead and push to Heroku, and the build process will be automatically taken care of. Note that of course, you wouldn't commit the changes to `config.json` to any public repository (like Github) but you'll have to include it in the Heroku build so the correct database configuration will be used.