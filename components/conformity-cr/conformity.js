define(["knockout", "text!./conformity.html"], function(ko, confirmityTemplate) {

  function confirmityViewModel(params) {


    var self =this;

    self.web1Conformity=ko.observable('5%');
    self.web2Conformity=ko.observable('40%');
    self.web3Conformity=ko.observable('35%');
    self.web4Conformity=ko.observable('5%');
    self.web5Conformity=ko.observable('12%');

      console.log('params',params.value);
    // console.log('paramsxxxxxxxxxx',params);

  }

  confirmityViewModel.prototype.doSomething = function() {
    this.message('You invoked doSomething() on the viewmodel.');
  };

  return { viewModel: confirmityViewModel, template: confirmityTemplate };

});