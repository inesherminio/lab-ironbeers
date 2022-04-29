const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials( __dirname + '/views/partials')

// Add the route handlers here:



app.get('/beers', async (req, res) => {
 const beers = await punkAPI.getBeers();
  res.render('beers', {beers});
});

app.get('/random-beers', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  res.render('random-beers', {randomBeer});
  // res.render('random-beers', {randomBeer}, {layout: false});
  // The above line is what you would do if you didnt want the layout applying to this specific render
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

// Just a small comment that we havent discussed in class yet, so no worries:
// Routes should be written from the most specific to the most general ones
// This is because, sometimes, some random unexplained errors might occur and the server may confuse "/"" with "/beers" because they both start the same
// Unlikely, but may happen. So a best practice is to write the general ones at the end. In this case "/" is the last
