// Detect Shake using JavaScript: http://qnimate.com/detect-shake-using-javascript/

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
	if(evt.touches == 3) {
		xDown = evt.touches[0].clientX;
		yDown = evt.touches[0].clientY;
	}
}

function handleTouchMove(evt) {
	if( !xDown || !yDown ) {
		return;
	}
	
	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;
	
	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;
	
	if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            swipeLeft(); 
        } else {
            swipeRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            swipeUp(); 
        } else { 
            swipeDown();
        }                                                                 
    }
	
	resetValues();
}

function resetValues() {
	xDown = null;
	yDown = null;
}

function reloadCurrentTab() {
	browser.runtime.sendMessage({"action": "refresh"});
}

function openNewTab() {
	browser.runtime.sendMessage({"action": "open"});
}

function closeCurrentTab() {
	browser.runtime.sendMessage({"action": "close"});
}

function swipeUp() {
	reloadCurrentTab();
}

function swipeDown() {
	openNewTab();
}

function swipeLeft() {
	closeCurrentTab();
}

function swipeRight() {
	
}