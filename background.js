browser.runtime.onMessage.addListener(notify);

function openTab() {
	browser.tabs.create({url:"about:blank"});
}

function refreshTab() {
	browser.tabs.reload();
}

function closeTab(tabs) {
  for (let tab of tabs) {
	var removing = browser.tabs.remove(tab.id);
  }
}

function goBackInHistory() {
	
}

function switchToNextTab() {
	
}

function switchToPreviousTab() {
	
}

function notify(message) {
	if(message.action=="close"){
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(closeTab, onError);
	}
	if(message.action=="open"){
		openTab();
	}
	if(message.action=="refresh"){
		refreshTab();
	}
	if(message.action=="back"){
		goBackInHistory();
	}
	if(message.action=="next"){
		switchToNextTab();
	}
	if(message.action=="previous"){
		switchToPreviousTab();
	}
}