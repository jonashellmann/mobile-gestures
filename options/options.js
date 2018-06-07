var getSettings = browser.storage.local.get("settings");
getSettings.then((res) => {
	const {settings} = res;
	document.getElementById("open").value = settings.open;
	document.getElementById("refresh").value = settings.refresh;
	document.getElementById("close").value = settings.close;
	// TODO: Uncomment when functionality added
	// document.getElementById("back").value = settings.back;
	document.getElementById("next").value = settings.next;
	document.getElementById("previous").value = settings.previous;
	document.getElementById("options").value = settings.options;
});

function saveOptions(e) {
	
	var open = document.getElementById('open').value;
	var refresh = document.getElementById('refresh').value;
	var close = document.getElementById('close').value;
	// TODO: Uncomment when functionality added
	// var back = document.getElementById('back').value;
	var next = document.getElementById('next').value;
	var previous = document.getElementById('previous').value;
	var options = document.getElementById('options').value;
	
	var settings = {
		settings: {
			open: open,
			refresh: refresh,
			close: close,
			// TODO: Uncomment when functionality added
			// back: back,
			next: next,
			previous: previous,
			options: options
		},
	};
	    
	var result = browser.storage.local.set(settings);
	e.preventDefault();
}

document.querySelector("form").addEventListener("submit", saveOptions);