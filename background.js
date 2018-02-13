browser.runtime.onMessage.addListener(notify);

var curTabIndex;

function openTab() {
	browser.tabs.create({url:"about:blank"});
}

function refreshTab() {
	browser.tabs.reload();
}

function closeTab() {
	var querying = browser.tabs.query({currentWindow: true, active: true});
	querying.then(
		function(tabs){
			for (let tab of tabs) {
				var removing = browser.tabs.remove(tab.id);
				removing.then(onSuccess, onError);
			}
		}, 
		function(error) { 
			console.log("Error: " + error); 
		}
	);
}

function goBackInHistory() {
	// TODO Implement method
	// window.history.back();
}

function switchToNextTab() {
	switchTab(1);
}

function switchToPreviousTab() {
	switchTab(-1);
}

function switchTab(offsetFromCurrent) {
	var querying = browser.tabs.query({currentWindow: true, active: true});
	querying.then(
		setCurTabIndex, 
		function(error) {
			console.log("Error: " + error);
		}
	);
	
	querying = browser.tabs.query({currentWindow: true});
	querying.then(
		function(tabs) {
			var updating = browser.tabs.update(
				tabs[curTabIndex + offsetFromCurrent].id,
				{active: true}
			);
		}, 
		function(error) { 
			console.log("Error: " + error); 
		}
	);	
}

function setCurTabIndex(tabs) {
	curTabIndex = tabs[0].index;
}

function notify(message) {
	// TODO Handling of message, other option then if?
	if(message.action=="close"){
		closeTab();
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