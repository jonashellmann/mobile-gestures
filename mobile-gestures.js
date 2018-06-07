"use strict";

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleEnd, false);

const minTouchMovement = 150;

var x = null;
var y = null;

var movement = "";
var last = "";

function handleTouchStart(evt) {
	if(evt.touches.length == 1) {
		x = evt.touches[0].clientX;
		y = evt.touches[0].clientY;
	}
}

function handleTouchMove(evt) {
	if( !x || !y ) {
		return;
	}
	
	handleMove(evt.touches[0].clientX, evt.touches[0].clientY);
}

function handleMove(xCur, yCur) {
	var xDiff = xCur - x;
	var yDiff = yCur - y;
	
	if(Math.abs(xDiff) > minTouchMovement || Math.abs(yDiff) > minTouchMovement) { // movement more than x px in any direction

	  var dir = "";

	  if(Math.abs(xDiff) > Math.abs(yDiff)) { // vertical movement
		if(xDiff > 0) { // right
		  dir = "R";
		}
		else { // left
		  dir = "L";
		}
	  }
	  else { // horizontal movement
		if(yDiff > 0) { // down
		  dir = "D";
		}
		else { // up
		  dir = "U";
		}
	  }

	  if(last != dir) {
		x = xCur;
		y = yCur;
		last = dir;
		movement += dir;
	  }

	}
}

function handleEnd(evt) {
	var getSettings =  browser.storage.local.get("settings");
		getSettings.then((res) => {
			const {settings} = res;
			
			// TODO: Any way to replace this switch-block?
			switch(movement) {
				case settings.open:
					openNewTab();
					break;
				case settings.refresh:
					reloadCurrentTab();
					break;
				case settings.close:
					closeCurrentTab();
					break;
				// TODO: Uncomment when functionality added 
				/* case settings.back:
					goBackInHistory();
					break; */
				case settings.next:
					switchToNextTab();
					break;
				case settings.previous:
					switchToPreviousTab();
					break;
				case settings.options:
					openOptionsPage();
					break;
				default:
					break;
			}
			
	});
	
	resetValues();
}

function resetValues() {
	x = null;
	y = null;
	movement = "";
	last="";
}

function reloadCurrentTab() {
	sendMessage("refresh");
}

function openNewTab() {
	sendMessage("open");
}

function closeCurrentTab() {
	sendMessage("close");
}

// TODO: Uncomment when functionality added 
/* function goBackInHistory() {
	sendMessage("back");
} */

function switchToNextTab() {
	sendMessage("next");
}

function switchToPreviousTab() {
	sendMessage("previous");
}

function openOptionsPage() {
	sendMessage("options");
}

function sendMessage(action) {
	browser.runtime.sendMessage({"action": action});
}