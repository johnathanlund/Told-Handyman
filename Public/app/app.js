angular.module('handymanApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    url: "/homePage",
    templateUrl: "./app/templates/homeTemp.html",
    controller: ''
  })
  .state('login', {
    url: "/loginPage",
    templateUrl: "",
    controller: ''
  })
  .state('admin', {
    url: "handymanAdmin",
    templateUrl: "",
    controller: ''
  });

  $urlRouterProvider.otherwise('/homePage');

});
