angular.module('myApp').controller('homeCtrl', function($scope, $stateParams) {

  $(window).scroll(function(){

    var wScroll = $(this).scrollTop();

    if(wScroll > $('.barOne-imgOne').offset().top - ($(window).height() / 1.2)) {
      $('.barOne-imgOne').addClass('is-showing');
      $('.barOne-ptag').addClass('is-showing');
    }

    if(wScroll > $('.barTwo-ptag').offset().top - ($(window).height() / 1.2)) {
      $('.barTwo-ptag').addClass('is-showing');
    }

  })






});
