const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname +'/views/partials')

app.use(express.static('public'));



// Adding the route handlers here:

app.get('/', (req, res,next) => {
  res.render('index');
});
app.get("/beers", (req, res, next) => {

  //Getting beers from API
  punkAPI.getBeers()
  // response from database 'beers' placeholder
  .then(beers =>{
    // rendering the data to page with {beers} object
   //console.log(`Response from DB: ${beers}`);
   res.render("beers",{beers});
  })
  .catch(error=>{// =====> holds error callback
    res.send(error)})
});

app.get("/random-beers", (req, res, next) => {
  //getRandom beer using the defined method
  punkAPI.getRandom()
  .then(anyRandomBeer=>{
//rendering and object to page beer variable
// console.log(`A random beer: ${anyRandomBeer}`);
    res.render('random', {random: anyRandomBeer})
  })
  .catch(error => {
    console.log(error)
  });
});
  
app.listen(3500, () => console.log('🏃‍ on port 3500'));
  