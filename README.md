
## Yoda Quotes powered by yodaspeak.co.uk and api.andrux.net
Thinkful (https://www.thinkful.com) Unit 3 Capstone Project - React and Node.js app integrating with *yodaspeak.co.uk*'s and *api.andrux.net*'s API

### Home Page
![home page no results](https://codysperoff.github.io/final-capstone-yoda-quotes/README-images/home-screen-no-results.png)

### Home Page with some results
![home page with results](https://codysperoff.github.io/final-capstone-yoda-quotes/README-images/home-screen-with-results.png)

### Home Page with some favorites
![home page with favorites](https://codysperoff.github.io/final-capstone-yoda-quotes/README-images/home-screen-with-favorites.png)

## Background

I built this app because I was curious as to what famous quotes would sound like if yoda said them.

## Use Case

This app gives users the ability to search for quotes from movies or famous people and see what they would like if yoda had said them. This app also gives users the ability to type in their own quotes to see how yoda might say it.

## Initial UX

The initial mobile and desktop wireframes can be seen below:

![Initial Wireframes](https://codysperoff.github.io/node-capstone-search-products-bestbuy/README-images/wireframe.png)

## Working Prototype

You can access a working prototype of the app here: https://final-capstone-yoda-quotes.herokuapp.com/

## Functionality
The app's functionality includes:

* Search for quotes from movies or spoken by famous people.
* Returns up to 10 results.
* Results provide the quote, the movie or famous person that the quote is from, the button allowing users to "yodafy" the quote.
* "Yodafy" chosen results and add them to a user's "Yodafied Quotes".
* Delete quotes from the "Yodafied Quotes" section.
* Contains links to the github for the page, the random quotes api, and the yoda speak api.
## Technical

The app is built with HTML, CSS, JavaScript, jQuery and Node.js. It uses AJAX JSON calls to the *http://api.andrux.net* Open Platform API to return the serach results and the *http://www.yodaspeak.co.uk/* Open Platform API to "yodafy" quotes. All data is held in an mLab database during the user's session. It has been built to be fully responsive across mobile, tablet and desktop screen resolutions.

## Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

* Added categories include books, song lyrics, and video game characters
* The ability for a user to simultaneously search with multiple catgeories.
* The ability for a user to take a Yodafied Quote and copy it so they can use it elsewhere.
* The ability for a user to increase the number of searched quotes past 10.
* The ability for a user to obtain quotes that Yoda said in the Star Wars movies and reverse-yodafy them.
