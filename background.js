browser.runtime.onMessage.addListener(notify);

function openTab() {
	browser.tabs.create({url:"about:blank"});
}

function refreshTab() {
	browser.tabs.reload();
}

function logTabs(tabs) {
  for (let tab of tabs) {
	var closedTab = browser.tabs.remove(tab.index + 1);
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function notify(message) {
	if(message.action=="close"){
		var querying = browser.tabs.query({currentWindow: true, active: true});
		querying.then(logTabs, onError);
	}
	if(message.action=="open"){
		openTab();
	}
	if(message.action=="refresh"){
		refreshTab();
	}
}