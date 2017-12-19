var myElement = $( "body" );
var mc = new Hammer.Manager(myElement[0]);

mc.add( new Hammer.Tap( { event: 'tripletap', taps: 3 } ) );
mc.add( new Hammer.Swipe( { event: 'triple-swipe-down', pointers: 3, direction: Hammer.DIRECTION_DOWN } ) );
mc.add( new Hammer.Swipe( { event: 'triple-swipe-up', pointers: 3, direction: Hammer.DIRECTION_UP } ) );

function reloadCurrentTab() {
	location.reload();
}

function openNewTab() {
	var w = window.open("about:blank", "_blank");
	w.focus();
}

function closeCurrentTab() {
	browser.runtime.sendMessage({"action": "close"});
}

mc.on("triple-swipe-down", function(ev) {
    openNewTab();
});

mc.on("triple-swipe-up", function(ev) {
    reloadCurrentTab();
});

mc.on("tripletap", function(ev) {
    closeCurrentTab();
});


// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/permissions --> Berechtigungen in manifest.json
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/browser_action --> Toolbar
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Examples --> Beispiele
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs --> Tabs