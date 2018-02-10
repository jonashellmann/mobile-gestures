browser.runtime.onMessage.addListener(notify);

function openTab() {
	browser.tabs.create({url:"about:blank"});
}

function refreshTab() {
	browser.tabs.reload();
}

function closeTab(tabs) {
  for (let tab of tabs) {
	var removing = browser.tabs.remove(tab.index);
	removing.then(onSuccess,onError);
  }
}

function openPrivateWindow(){
	var creating = browser.windows.create({
		url: 'https://google.com',
		icognito: true
	});
	creating.then(onSuccess,onError);
}

function onSuccess() {
	
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function notify(message) {
	if(message.action=="close"){
		console.log("Should close tab");
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(closeTab, onError);
	}
	if(message.action=="open"){
		openTab();
	}
	if(message.action=="refresh"){
		refreshTab();
	}
	if(message.action=="openPrivate") {
		console.log("Should open private");
		openPrivateWindow();
	}
}