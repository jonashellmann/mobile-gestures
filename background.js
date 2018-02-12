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
	// window.history.back();
}

function switchToNextTab(tabs) {
	var updating = browser.tabs.update(
		tabs[curTabIndex + 1].id,
		{active: true}
	);
	updating.then(onSuccess, onError);
}

function switchToPreviousTab(tabs) {
	var updating = browser.tabs.update(
		tabs[curTabIndex - 1].id,
		{active: true}
	);
	updating.then(onSuccess, onError);
}

function setCurTabIndex(tabs) {
	curTabIndex = tabs[0].index;
}

function onSuccess() {  }
function onError(error) { console.log("Error: " + error); }

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
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(setCurTabIndex, onError);
		var querying2 = browser.tabs.query({currentWindow: true});
		querying2.then(switchToNextTab, onError);
	}
	if(message.action=="previous"){
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(setCurTabIndex, onError);
		var querying2 = browser.tabs.query({currentWindow: true});
		querying2.then(switchToPreviousTab, onError);
	}
}