browser.runtime.onMessage.addListener(notify);

function logTabs(tabs) {
  for (let tab of tabs) {
    // tab.url requires the `tabs` permission
    console.log(tab.url);
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function notify(message) {
  var querying = browser.tabs.query({currentWindow: true, active: true});
  querying.then(logTabs, onError);
}