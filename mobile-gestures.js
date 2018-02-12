"use strict";

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleEnd, false);

var x = null;
var y = null;

var movement = "";
var last = "";

function handleTouchStart(evt) {
	// TODO extract condition into method
	if(evt.touches.length == 1) { // only if one finger is used
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
	
	// TODO Magic number
	if(Math.abs(xDiff) > 150 || Math.abs(yDiff) > 150) { // movement more than x px in any direction

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
	// TODO Any way to replace this switch-block?
	switch(movement) {
		case "DR":
			openNewTab();
			break;
		case "DL":
			reloadCurrentTab();
			break;
		case "RL":
			closeCurrentTab();
			break;
		case "RDL":
			goBackInHistory();
			break;
		case "UR":
			switchToNextTab();
			break;
		case "UL":
			switchToPreviousTab();
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

// TODO Duplicate code
function reloadCurrentTab() {
	browser.runtime.sendMessage({"action": "refresh"});
}

function openNewTab() {
	browser.runtime.sendMessage({"action": "open"});
}

function closeCurrentTab() {
	browser.runtime.sendMessage({"action": "close"});
}

function goBackInHistory() {
	browser.runtime.sendMessage({"action": "back"});
}

function switchToNextTab() {
	browser.runtime.sendMessage({"action": "next"});
}

function switchToPreviousTab() {
	browser.runtime.sendMessage({"action": "previous"});
}