browser.runtime.onMessage.addListener(notify);

function openTab() {
	browser.tabs.create({url:"about:blank"});
}

function refreshTab() {
	browser.tabs.reload();
}

function closeTab(tabs) {
  for (let tab of tabs) {
	var closedTab = browser.tabs.remove(tab.index + 1);
  }
}

function openPrivateWindow(){
	var creating = browser.windows.create({
		url: 'https://google.com',
		icognito: true;
	});
}

function onError(error) {
  console.log(`Error: ${error}`);
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
	if(message.action=="openPrivate") {
		openPrivateWindow();
	}
}