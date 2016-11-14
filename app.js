angular.module('myApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'homeCtrl',
      templateUrl: './views/home.html'
    })
    .state('login', {
      url: '/login',
      controller: 'loginCtrl',
      templateUrl: './views/login.html'
    })
    .state('my-recipes', {
      url: '/my-recipes/:id',
      controller: 'my-recipesCtrl',
      templateUrl: './views/my-recipes.html',
      resolve: {
        recipes: function (mainService, $stateParams) {
          if (!$stateParams.id) {
            return mainService.getRecipes().then(function(response){
            return response.data;

          })
        } else {
          return mainService.getCategoryRecipes($stateParams.id).then(function(response) {
            return response.data;
          })
        }
        }
      }
    })
    .state('family-page', {
      url: '/family-page/:id',
      controller: 'family-pageCtrl',
      templateUrl: './views/family-page.html'
    })
    .state('recipe-box', {
      url: '/recipe-box',
      controller: 'recipe-boxCtrl',
      templateUrl: './views/recipe-box.html',
      resolve: {
        categories: function (mainService) {
          return mainService.getCategories().then(function(response){
            return response.data;
          })
        }
      }
    })
    .state('sign-up', {
      url: '/sign-up',
      controller: 'sign-upCtrl',
      templateUrl: './views/sign-up.html'
    })
})
