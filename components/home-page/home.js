define(["knockout", "text!./home.html"], function(ko, homeTemplate) {

//Authorization popup window code
 function authenticate(options)
{
    options.windowName = options.windowName ||  'ConnectWithOAuth'; // should not include space for IE
    options.windowOptions = options.windowOptions || 'location=0,status=0,width=800,height=400';
    options.callback = options.callback || function(){ window.location.reload(); };
    var that = this;
    log(options.path);
    that._oauthWindow = window.open(options.path, options.windowName, options.windowOptions);
    that._oauthInterval = window.setInterval(function(){
        if (that._oauthWindow.closed) {
            window.clearInterval(that._oauthInterval);
            options.callback();
        }
    }, 1000);
};
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
