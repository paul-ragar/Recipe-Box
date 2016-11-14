angular.module('myApp').controller('recipe-boxCtrl', function(mainService, $scope, $stateParams, $state, categories) {


  $scope.categories = categories;

  // $scope.$watch('categories', function() {
  //       console.log("categories refreshed!");
  //       $scope.editCategories();
  //   });
  $scope.images = [];
  $scope.isEditing = false;

  $scope.editCategories = function() {
    $scope.isEditing = true;
    console.log("Now Editing");
    $scope.navigate = false;
  }
  $scope.stopEditing = function() {
    $scope.isEditing = false;
    console.log("Stop Editing");
    $scope.navigate = true;
  }


  $scope.getCategories = function() {
    mainService.getCurrentUser().then(function (response){
      var id = response.data.user_id;
      mainService.getCategories(id).then(function(response){
        $scope.categories = response.data;
      })
    })

  }
  mainService.getCurrentUser().then(function(response){
    var user_id = response.data.user_id;
    mainService.getCategories(user_id).then(function(response){
      $scope.categories = response.data;
    })
  });
  $scope.getRecipeImages = function(index, category_id) {
    mainService.getRecipeImages(category_id).then(function(response){
      $scope.images[index] = response.data;
     });
  };
  $scope.popAddCategory = function(id) {
    $('.pop-up-category').css('visibility', 'visible');
    $('.pop-category-container').css('visibility', 'visible');
  }
  $scope.goToRecipes = function(id) {
    if ($scope.navigate){
      $state.go("my-recipes", {id: id});
    }
  }
  $scope.addCategory = function(name) {
    mainService.getCurrentUser().then(function(response){
      var user_id = response.data.user_id;
      mainService.addCategory(name, user_id).then(function (response) {
        // console.log(response);
        mainService.getCurrentUser().then(function(response){
          var id = response.data.user_id;
          mainService.getCategories(id).then(function(response){
            $scope.categories = response.data;
            $scope.closeAddCategory();
          });
        });
      });
    });

  }
  $scope.passId = function(to_be_deleted, categoryName) {
    $scope.to_be_deleted = to_be_deleted;
    $scope.categoryName = categoryName
  }
  $scope.deleteCategory = function(deleted_one) {
    deleted_one = $scope.to_be_deleted;
    mainService.deleteCategory(deleted_one).then(function (response) {
      $scope.getCategories();
      $scope.closeDeleteCategory();
    });
  }
  $scope.putNewCategory = function(id, name) {
    mainService.putNewCategory(id, name).then(function (response) {
      mainService.getCurrentUser().then(function (response){
        var id = response.data.user_id;
        mainService.getCategories(id).then(function (response){
          $scope.categories = response.data;
        });
      });
    });
  };

  $scope.closeAddCategory = function() {
    $('.pop-up-category').css('visibility', 'hidden');
    $('.pop-category-container').css('visibility', 'hidden');
    $('.add-category-input').val('');
  }
  $scope.navigate = true;

  $scope.popDelete = function() {
    $('.pop-up-delete').css('visibility', 'visible');
    $('.verify-delete-container').css('visibility', 'visible');
  }
  $scope.closeDeleteCategory = function() {
    $('.pop-up-delete').css('visibility', 'hidden');
    $('.verify-delete-container').css('visibility', 'hidden');
  }

  $scope.getCategoryRecipes = function(id) {
    mainService.getCategoryRecipes(id).then(function(response) {
      $scope.recipes = response.data[0];
    })
  }



});
