define(["knockout", "text!./test.html"], function(ko, testTemplate) {

  function testTemplateViewModel(params) {
    var self =this;
    self.test=ko.observable('');
  }

  return { viewModel: testTemplateViewModel, template: testTemplate };
});