browser.runtime.onMessage.addListener(notify);

function logTabs(tabs) {
  for (let tab of tabs) {
    console.log(tab.url);
	// TODO: Close this tab
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
}