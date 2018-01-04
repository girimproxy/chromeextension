chrome.webRequest.onBeforeRequest.addListener(
  function(details) {

    // chrome storage get is async process which isn't useful for onBeforeRequest listener
    // because we can't make requests wait
    // that's why we should build a sync way
    // and this is it
    var defaultOptions = {
      autoRedirectionWebsites: ["wikipedia.org", "wikimedia.org"],
      autoRedirection: true
    };

    var localOptions = localStorage.getItem('girim');

    // if there is any option locally saved then return them
    if(localOptions)
    {
      var options = JSON.parse(localOptions);      
    }
    else
    {
      var options =  defaultOptions;
    }

    // so when storage sync, we update our options
    chrome.storage.sync.get(defaultOptions, function(items) {
      options = items;
      localStorage.setItem('girim', JSON.stringify(options));
    });

    // we dont want to interfere other requests
    // if it is the main frame website
    if(details.type == "main_frame")
    {
      // parse the url
      var currentUrl = new URL(details.url);

      // if auto redirection is enabled
      if(options.autoRedirection)
      {
        var autoRedirectionWebsites = options.autoRedirectionWebsites;
        
        for(var x in autoRedirectionWebsites) 
        {
          // the currentUrl should contain .website.com or should start with website.com
          // otherwise otherunwantedwebsite.com will be redirected over gir.im while it isn't intented to do
          if(currentUrl.host.indexOf("."+autoRedirectionWebsites[x]) != -1 || currentUrl.host.indexOf(autoRedirectionWebsites[x]) == 0)
          {
            // gir.im links with protocol seem ugly, soooo remove them
            var urlWithoutProtocol = details.url.replace("http://", "").replace("https://", "");
            return { redirectUrl: "http://gir.im/"+urlWithoutProtocol };
          }
        }
      }
    }
  }, {urls: ["*://*/*"]}, ["blocking"]
);

chrome.browserAction.onClicked.addListener(function(tab) { 
  var currentUrl = new URL(tab.url);

  // if it is not the gir.im
  if(currentUrl.host != "gir.im")
  {
    // gir.im links with protocol seem ugly, soooo remove them
    var urlWithoutProtocol = tab.url.replace("http://", "").replace("https://", "");
    
    // go on over gir.im
    chrome.tabs.update({
        url: "http://gir.im/"+urlWithoutProtocol
    });
  } 
});