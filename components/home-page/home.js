define(["knockout", "text!./home.html"], function(ko, homeTemplate) {

  function HomeViewModel(route) {
     this.isLoading= ko.observable(true);
     this.message =ko.observable('10%');
  }

  HomeViewModel.prototype.doSomething = function() {

 this.isLoading(false)
    this.message('You invoked doSomething() on the viewmodel.'); };

  return { viewModel: HomeViewModel, template: homeTemplate };

});
