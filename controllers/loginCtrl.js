angular.module('myApp').controller('loginCtrl', function($scope, mainService, $state, $stateParams) {

  $('.input-username').focus();
  $scope.submitLogin = function() {
    if ($(".input-username").val() === '' || $(".input-password").val() === '') {
      $('.login-warning').css('visibility', 'visible');
    }
  }
  ///////////////////////////////////////////////

  // $scope.currentUserId = null;

  $scope.login = function(user) {
    if ($(".input-username").val() === '' || $(".input-password").val() === '') {
      $('.incorrect-warning').css('display', 'none');
      return $('.login-warning').css('display', 'flex');

    } else {
      $('.login-warning').css('display', 'none');
    }
    mainService.login(user).then(function(response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        $state.go('recipe-box');
      }
    }).catch(function(err) {
      console.log("ERROR: ", err);
      $('.incorrect-warning').css('display', 'flex');
      setTimeout(function(){ $('.incorrect-warning').css('display', 'none'); }, 5000);
    });
  };



});
