browser.runtime.onMessage.addListener(notify);

var curTabIndex;

function openTab() {
	browser.tabs.create({url:"about:blank"});
}

function refreshTab() {
	browser.tabs.reload();
}

function closeTab(tabs) {
  for (let tab of tabs) {
	var removing = browser.tabs.remove(tab.id);
	removing.then(onSuccess, onError);
  }
}

function goBackInHistory() {
	// TODO Implement method
	// window.history.back();
}

function switchToNextTab(tabs) {
	var updating = browser.tabs.update(
		tabs[curTabIndex + 1].id,
		{active: true}
	);
	// TODO Anonymous function for onSuccess
	updating.then(onSuccess, onError);
}

function switchToPreviousTab(tabs) {
	var updating = browser.tabs.update(
		tabs[curTabIndex - 1].id,
		{active: true}
	);
	// TODO Anonymous function for onSuccess
	updating.then(onSuccess, onError);
}

function setCurTabIndex(tabs) {
	curTabIndex = tabs[0].index;
}

// TODO Delete this empty function
function onSuccess() {  }
function onError(error) { console.log("Error: " + error); }

function notify(message) {
	// TODO Handling of message, other option then if?
	if(message.action=="close"){
		// Don't do this here
		// TODO Querying for active tab in seperate function
		var querying = browser.tabs.query({currentWindow: true, active: true});
		// Anonymous function for closeTab after extracting this in a method
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
		// TODO Don't do this here
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(setCurTabIndex, onError);
		
		// TODO Name of variable
		var querying2 = browser.tabs.query({currentWindow: true});
		querying2.then(switchToNextTab, onError);
	}
	if(message.action=="previous"){
		// TODO Don't do this here
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(setCurTabIndex, onError);
		
		// TODO Name of variable
		var querying2 = browser.tabs.query({currentWindow: true});
		querying2.then(switchToPreviousTab, onError);
	}
}