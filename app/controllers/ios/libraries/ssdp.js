var SSDPService = require('CocoaSSDP/SSDPService');
var SSDPServiceBrowser = require('CocoaSSDP/SSDPServiceBrowser');
var browser;

(function(container) {
  
  var BrowserDelegate = Hyperloop.defineClass('BrowserDelegate', 'NSObject', 'SSDPServiceBrowserDelegate');

  BrowserDelegate.addMethod({
  	selector: 'ssdpBrowser:didNotStartBrowsingForServices:',
  	instance: true,
  	arguments: ['SSDPServiceBrowser', 'NSError'],
  	callback: function (browser, error) {
  			if (this.didNotStartBrowsingForServices) {
  					this.didNotStartBrowsingForServices(browser, error);
  			}
  	}
  });

  BrowserDelegate.addMethod({
  	selector: 'ssdpBrowser:didFindService:',
  	instance: true,
  	arguments: ['SSDPServiceBrowser', 'SSDPService'],
  	callback: function (browser, service) {
  			if (this.didFindService) {
  					this.didFindService(browser, service);
  			}
  	}
  });

  BrowserDelegate.addMethod({
  	selector: 'ssdpBrowser:didRemoveService:',
  	instance: true,
  	arguments: ['SSDPServiceBrowser', 'SSDPService'],
  	callback: function (browser, service) {
  			if (this.didRemoveService) {
  					this.didRemoveService(browser, service);
  			}
  	}
  });

  var browserDelegate = new BrowserDelegate();

  // Handle error
  browserDelegate.didNotStartBrowsingForServices = function(browser, error) {
    Ti.API.error('Error: ' + error.localizedDescription);
  };

  // Handle found services, e.g.
  // service.location, service.serviceType, service.uniqueServiceName, service.server
  browserDelegate.didFindService = function(browser, service) {
    Ti.API.info('Found service : ' + service.uniqueServiceName);
  };

  // Handle removed services
  browserDelegate.didRemoveService = function(browser, service) {
    Ti.API.info('Removed service : ' + service.uniqueServiceName);
  };

  browser = new SSDPServiceBrowser(); 
  browser.delegate = browserDelegate; 
})($.window);

function startSearch() {
  browser.startBrowsingForServices('ssdp:all'); 
}

function stopSearch() {
  browser.stopBrowsingForServices();
}
