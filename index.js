var express = require('express');
var bodyParser = require('body-parser');
var cors = require ('cors');
var session = require ('express-session');
var massive = require ('massive');

// CONFIG //
var config = require('./config.js');

// EXPRESS //

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

// MASSIVE //

var massiveServer = massive.connectSync({
  connectionString : "postgres://localhost/recipe-box"
});
app.set('db', massiveServer);
var db = app.get('db');

var port = 80;
var nodeController = require('./nodeController.js');

//CONTROLLERS//

var userController = require('./userController.js');

//SERVICES//

var passport = require('./passport.js');

//POLICIES//
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

//SESSION AND PASSPORT//

app.use(session({
	secret: config.sessionSecret,
	saveUninitialized: false,
	resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Endpoints //
app.post('/login', passport.authenticate('local', {
	successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
	req.logout();
	return res.status(200)
		.send('logged out');
});

// User Endpoints //
app.post('/register', userController.register);
app.get('/user', userController.read);
app.get('/me', isAuthed, userController.me);
app.put('/user/:_id', isAuthed, userController.update);




//ENDPOINTS//

/////////////////////////////////////////////// USERS //
app.get('/users', function(req, res) {
  db.users.get_users(function(err, users) {
    res.status(200).send(users);
  })
});

app.post('/new_user', nodeController.new_user);

// app.put('/update_user', nodeController.update_user);

/////////////////////////////////////////////// RECIPES //

app.get('/recipes/:user_id', function(req, res) {
  db.recipes.get_recipes([req.params.user_id], function(err, recipes) {
    res.status(200).send(recipes);
  })

});


app.post('/new_recipe', nodeController.new_recipe)

app.delete('/delete_recipe/:recipe_id', nodeController.delete_recipe);

/////////////////////////////////////////////// CATEGORY //

app.get('/recipe_images/:category_id', nodeController.get_recipe_images);

app.get('/categories/:user_id', function(req, res) {
  db.category.get_category([req.params.user_id], function(err, categories) {
    res.status(200).send(categories);
  })
});
app.post('/new_category', nodeController.new_category);

app.delete('/delete_category/:category_id', nodeController.delete_category);

app.put('/put_category/:category_id', nodeController.put_category);

///////////////////////////////////////////////INGREDIENTS//

app.post('/new_ingredient', nodeController.post_ingredient);

///////////////////////////////////////////////DIRECTIONS//

app.post('/new_direction', nodeController.post_direction);

///////////////////////////////////////////////SUPER-GET//

app.get('/display_recipe/:recipe_id', nodeController.get_display_recipe);

app.get('/get_category_recipes/:category_id', nodeController.get_category_recipes);





app.listen(port, function() {
  console.log("************ Listening on port", port, " ************");
});
