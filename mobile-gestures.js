var myElement = $( "body" );
var mc = new Hammer.Manager(myElement[0]);

mc.add( new Hammer.Tap( { event: 'tripletap', taps: 3 } ) );
mc.add( new Hammer.Swipe( { event: 'triple-swipe-down', pointers: 3, direction: Hammer.DIRECTION_DOWN } ) );
mc.add( new Hammer.Swipe( { event: 'triple-swipe-up', pointers: 3, direction: Hammer.DIRECTION_UP } ) );
mc.add( new Hammer.Swipe( { event: 'triple-swipe-right', pointers: 3, direction: Hammer.DIRECTION_RIGHT } ) );

function reloadCurrentTab() {
	location.reload();
}

function openNewTab() {
	browser.runtime.sendMessage({"action": "open"});
}

function closeCurrentTab() {
	browser.runtime.sendMessage({"action": "close"});
}

mc.on("triple-swipe-down", function(ev) {
    openNewTab();
});

mc.on("tripletap triple-swipe-up", function(ev) {
    reloadCurrentTab();
});

mc.on("triple-swipe-right", function(ev) {
    closeCurrentTab();
});