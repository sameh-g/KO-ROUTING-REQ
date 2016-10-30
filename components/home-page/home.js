define(["knockout", "text!./home.html"], function(ko, homeTemplate) {

  function HomeViewModel(route) {
    
     this.message =ko.observable('10%');
  }

  HomeViewModel.prototype.doSomething = function() {
  //ajax call
   $.ajax({url: "http://10.10.15.157:3000/getValue", success: function(result){
     console.log('SQL Result',result[0])
     alert(result[0].open)

    }});

    this.message('You invoked doSomething() on the viewmodel.');
   };

  return { viewModel: HomeViewModel, template: homeTemplate };

});
