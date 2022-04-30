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

hbs.registerPartials(__dirname + "/views/partials")
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  // You cannot render twice in the same request. Right now, it is overriding the first render (line 20), and rendering line 26, so its not a problem, but not a good practice
  res.render('index');
  const data = {
    imagen : "images/beer.png",
    boton1 : "Check the Beers!",
    boton2 : "Check a Random Beer"
  }
  // Why are you passing data to index if you are not using it there? For this simple data, there is no need to pass it on the request, just create the view, like you did
  res.render('index', data);
});

// You also are duplicating the app.listem command, which is problematic, because you're running the server twice. Beware of these details
// app.listen(3000, () => console.log('🏃‍ on port 3000'));

// Routes should be named in camel case convention, meaning they always start lower case
app.get("/beers",(req,res)=>{
  punkAPI
  .getBeers()
  .then(beers=>{
    // Variables should be named in camel case convention, meaning they always start lower case
    // On you beers.hbs view you are looping on a variable called beersArr, so you have to pass that exact variable here. They can't be named differently, otherwise hbs won't display the info
    const beersArr = beers
    res.render("beers", {beersArr})
  })
  .catch(error => console.log(error));

})

// app.get is defining a route, not a file path. It should be "/random-beer" and not "/views/random-beer.hbs"
app.get("/random-beer",(req,res)=>{
  punkAPI
  .getRandom()
  .then(beer=>{
    // Again, on you random-beer.hbs view you are looping on a variable called randomObj, so you have to pass that exact variable here
    const randomObj = beer
    // You will need to render the view, which is called random-beer.hbs and not random.hbs
    res.render("random-beer",{randomObj})
  })
  .catch(error=>console.log(error))
})

app.listen(3005, () => console.log('🏃‍ on port 3005')); 
