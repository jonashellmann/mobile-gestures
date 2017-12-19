browser.runtime.onMessage.addListener(notify);

function notify(message) {
  console.log(message.url);
  // query for current tab
  // close the queryed tab
}