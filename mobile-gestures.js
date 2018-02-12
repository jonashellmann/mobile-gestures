"use strict";

document.addEventListener('mousedown', handleTouchStart, false);
document.addEventListener('mousemove', handleTouchMove, false);
document.addEventListener('mouseup', handleEnd, false);

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleEnd, false);

var x = null;
var y = null;

var movement = "";
var last = "";

function handleMouseStart(evt) {
	x = evt.clientX;
	y = evt.clientY;
}

function handleMouseMove(evt) {
	if( !x || !y ) {
		return;
	}
	
	handleMove(evt.clientX, evt.clientY);
}

function handleTouchStart(evt) {
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
	
	if(Math.abs(xDiff) > 150 || Math.abs(yDiff) > 150) { // movement more than 300px in any direction

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