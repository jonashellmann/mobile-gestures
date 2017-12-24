document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);

var x = null;
var y = null;

var movement = "";
var last = "";

function handleTouchStart(evt) {
	if(evt.touches == 1) { // only if one finger is used
		x = evt.touches[0].clientX;
		y = evt.touches[0].clientY;
	}
}

function handleTouchMove(evt) {
	if( !x || !y ) {
		return;
	}
	
	var xCur = evt.touches[0].screenX;
	var yCur = evt.touches[0].screenY;
	
	var xDiff = xCur - x;
	var yDiff = yCur - y;
	
	if(Math.abs(diffX) > 300 || Math.abs(diffY) > 300) { // movement more than 300px in any direction

	  var dir = "";

	  if(Math.abs(diffX) > Math.abs(diffY)) { // vertical movement
		if(diffX > 0) { // right
		  dir = "R";
		}
		else { // left
		  dir = "L";
		}
	  }
	  else { // horizontal movement
		if(diffY > 0) { // down
		  dir = "D";
		}
		else { // up
		  dir = "U";
		}
	  }

	  if(last != dir) {
		x = curX;
		y = curY;
		last = dir;
		movement += dir;
	  }

	}
}

function handleTouchEnd(evt) {
	switch(movement) {
		case "DR":
			openNewTab();
			break;
		case "UR":
			reloadCurrentTab();
			break;
		case "RL":
			closeCurrentTab();
			break;
		default:
			break;
	}
	resetValues();
}

function resetValues() {
	x = null;
	y = null;
	movement = "";
	last="";
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