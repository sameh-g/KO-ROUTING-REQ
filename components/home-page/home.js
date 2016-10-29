define(["knockout", "text!./home.html"], function(ko, homeTemplate) {

  function HomeViewModel(route) {
    
     this.message =ko.observable('10%');
  }

  HomeViewModel.prototype.doSomething = function() {
//ajax call
  $.ajax({url: "http://localhost:3000/getValue", success: function(result){
   alert(result)
    }});

    this.message('You invoked doSomething() on the viewmodel.');
   };

  return { viewModel: HomeViewModel, template: homeTemplate };

});
