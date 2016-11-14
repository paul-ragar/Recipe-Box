angular.module('myApp').controller('sign-upCtrl', function($scope, mainService, $state, $stateParams) {

  $scope.register = function(user) {
    if ($("#signup-fn").val() === '' || $("#signup-ln").val() === '' || $("#signup-un").val() === '' || $("#signup-pass").val() === '' || $("#signup-rpass").val() === '') {
      return $('#fill-form').css('display', 'flex');

    } else {
      $('.signup-warning').css('display', 'none');
      mainService.registerUser(user).then(function(response) {
        if (!response.data) {
          $('#invalid-user').css('display', 'flex');
          // alert('Unable to create user');
        } else {
          // alert('User Created');
          $scope.newUser = {};
          $state.go('login');
        }
      }).catch(function(err) {
        alert('Unable to create user');
      });
    }

  };

});

//
// $scope.login = function(user) {
//   if ($(".input-username").val() === '' || $(".input-password").val() === '') {
//     $('.incorrect-warning').css('display', 'none');
//     return $('.login-warning').css('display', 'flex');
//
//   } else {
//     $('.login-warning').css('display', 'none');
//   }
//   mainService.login(user).then(function(response) {
//     if (!response.data) {
//       alert('User does not exist');
//       $scope.user.password = '';
//     } else {
//       $state.go('recipe-box');
//     }
//   }).catch(function(err) {
//     console.log("ERROR: ", err);
//     $('.incorrect-warning').css('display', 'flex');
//     setTimeout(function(){ $('.incorrect-warning').css('display', 'none'); }, 5000);
//   });
// };
