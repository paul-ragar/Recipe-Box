var app = require('./index');
var db = app.get('db');

  module.exports = {
    new_user: function(req, res, next) {
      db.users.post_new_user([req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.phone_number, req.body.user_img], function(err, new_user) {
        res.status(200).send(new_user);
      });
    },
    new_category: function(req, res, next) {
      db.category.post_new_category([req.body.category_name, req.body.user_id], function(err, new_category) {
        res.status(200).send(new_category);
      });
    },
    new_recipe: function(req, res, next) {
      db.recipes.post_new_recipe([req.body.recipe_name, req.body.recipe_img, req.body.serving_size, req.body.category_id, req.body.recipe_notes, req.body.user_id], function(err, new_recipe) {
        console.log(err, new_recipe[0].recipe_id);
        var id = new_recipe[0].recipe_id;
        res.status(200).send({id:id});
      });
    },
    delete_category: function(req, res, next) {
      db.category.delete_category([req.params.category_id], function(err, deleted_category) {
        res.status(200).send(deleted_category);
      });
    },
    delete_recipe: function(req, res, next) {
      db.recipes.delete_recipe([req.params.recipe_id], function(err, deleted_recipe) {
        res.status(200).send(deleted_recipe);
      });
    },
    put_category: function(req, res, next) {
      db.category.put_category([req.params.category_id, req.body.category_name], function(err, updated_category) {
        res.status(200).send(updated_category);
      });
    },
    post_ingredient: function(req, res, next) {
      db.ingredients.post_ingredient([req.body.ingredient_name, req.body.measurements, req.body.recipe_id], function(err, new_ingredient) {
        res.status(200).send(new_ingredient);
      });
    },
    post_direction: function(req, res, next) {
      db.directions.post_direction([req.body.directions, req.body.recipe_id], function(err, new_direction){
        res.status(200).send(new_direction);
      });
    },
    get_display_recipe: function(req, res, next) {
      db.recipes.get_display_recipe([req.params.recipe_id], function(err, recipe_display){
        console.log("RECIPE DISPLAY: ", recipe_display);
        var recipe = recipe_display[0];
        db.ingredients.get_ingredients([req.params.recipe_id], function(error, ingredients){
          console.log("INGREDIENTS: ", ingredients);
          recipe.ingredients = ingredients;
          db.directions.get_directions([req.params.recipe_id], function(error2, directions){
            console.log("DIRECTIONS: ", directions);
            recipe.directions = directions;
            res.status(200).send(recipe);
          });
        });
      });
    },
    get_category_recipes: function(req, res, next) {
      db.category.getCategoryRecipes([req.params.category_id], function(err, category_recipes) {
        res.status(200).send(category_recipes);
      });
    },
    get_recipe_images: function(req, res, next) {
      db.recipes.getRecipeImages([req.params.category_id], function(err, category_id) {
        res.status(200).send(category_id);
      })
    }
    // update_user: function(req, res, next) {
    //   db.put_user([req.body.user_id, req.body.column, req.body.update], function(err, update_user) {
    //     res.status(200).send(update_user);
    //   });
    // }
  };
