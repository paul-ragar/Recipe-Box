angular.module('myApp').controller('my-recipesCtrl', function(mainService, $scope, $stateParams, recipes) {

  $scope.recipes = recipes;

  $scope.getRecipes = function() {
    if ($stateParams.id) {
      mainService.getCategoryRecipes($stateParams.id).then(function(response) {
        $scope.recipes = response.data;
      })
    } else {
      mainService.getCurrentUser().then(function(response){
        var user_id = response.data.user_id;
        mainService.getRecipes(user_id).then(function(response){
          $scope.recipes = response.data;
        })
      });
    }
  };
  $scope.getRecipes();

  $scope.getCategories = function() {
    mainService.getCurrentUser().then(function(response){
      var user_id = response.data.user_id;
      mainService.getCategories(user_id).then(function(response){
        $scope.categories = response.data
      });
    });
  };

  $scope.popRecipe = function() {
    $('.pop-up-recipe').css('visibility', 'visible');
    $('.pop-recipe-container').css('visibility', 'visible');
  }
  $scope.closePop = function() {
    $('.pop-up-recipe').css('visibility', 'hidden');
    $('.pop-recipe-container').css('visibility', 'hidden');
  }

  $scope.popAddRecipe = function() {
    mainService.getCategories().then(function(response){
      $scope.categories = response.data
      $('.pop-add-recipe').css('visibility', 'visible');
      $('.pop-add-recipe-container').css('visibility', 'visible');
      $('.form-ingredients').val('');

    });
  }
  $scope.closeAddPop = function() {
    $('.pop-add-recipe').css('visibility', 'hidden');
    $('.pop-add-recipe-container').css('visibility', 'hidden');
    $scope.ingredients = [];
    $scope.measurements = [];
    $scope.directions = [];
    $('.form-recipe-name').val('');
    $('.form-image-url').val('');
    $('.form-serving-size').val('');
    $('.form-ingredients').val('');
    $('.form-directions').val('');
    $('.form-notes').val('');
    $('.form-measurement').val('');
  }
  $scope.postNewRecipe = function(name, img, serving, category, notes) {
    mainService.getCurrentUser().then(function(response){
      var id = response.data.user_id;
      mainService.postNewRecipe(name, img, serving, category, notes, id).then(function(response){
        console.log(response.data.id);
        var recipe_id = response.data.id;
        for (var i = 0; i < $scope.ingredients.length; i++) {
          mainService.newIngredient($scope.ingredients[i], $scope.measurements[i], recipe_id);
        }
        for (var i = 0; i < $scope.directions.length; i++) {
          mainService.newDirection($scope.directions[i], recipe_id);
        }
          mainService.getCurrentUser().then(function(response){
            var user_id = response.data.user_id;
            mainService.getRecipes(user_id).then(function(response){
              $scope.recipes = response.data;
              $scope.closeAddPop();
            })
          })
        });

      });
    };
  ////////////////////////////
  $scope.ingredients = [];
  $scope.measurements = [];
  $scope.ingredientArray = function(newIngredient, newMeasurement){
    $scope.ingredients.push(newIngredient);
    $scope.measurements.push(newMeasurement);
    $('.form-ingredients').val('');
    $('.form-measurement').val('');
  }
  //////////////////////////////
  $scope.directions = [];
  $scope.directionArray = function(direction) {
    $scope.directions.push(direction);
    $('.form-directions').val('');
  }

  $scope.newIngredient = function(name, measurement, recipe_id) {
    mainService.newIngredient(name, measurement, recipe_id);
  }

  $scope.getDisplayRecipe = function(id){
    console.log(id);
    mainService.getDisplayRecipe(id).then(function (response){
      console.log(response);
      $scope.displayRecipe = response;
      $scope.displayIngredients = response.ingredient_name
      $scope.displayDirections = response.directions;
      $scope.popRecipe();
    });
  }

});
