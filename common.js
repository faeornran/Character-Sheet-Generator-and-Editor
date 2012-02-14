function removeElement(name) {
	var element = document.getElementById(name);
	element.parentNode.removeChild(element);
}

function incList(name, size) {
	var div = document.getElementById(name);
	var top = div.getElementsByClassName("liststore").length * 19;
	div.firstChild.innerHTML += '<input class="nottop liststore textstore" type="text" style="width:' + size + 'px; top:' + top + 'px;" />';
}

function decList(name) {
	var div = document.getElementById(name);
	if (div.firstChild.lastChild.tagName !== "IMG") {
		var size = div.firstChild.firstChild.size;
		div.firstChild.removeChild(div.firstChild.lastChild);
	}
}

function promptIO(message, type) {
	if (promptIO.filename == undefined) {
		promptIO.filename = "";
	}
	var filename = prompt(message, promptIO.filename);
	if (filename == null || filename == "" ) {
		return;
	} else if (type == "load") {
		filename.replace(/[^a-zA-Z\/0-9]+/g,'');
	} else {
		filename.replace(/[^a-zA-Z0-9]+/g,'');
	}
	if (filename.length > 1000) {
		savestatus.innerHTML = "Too long.";
		setTimeout("savestatus.innerHTML = ''", 1500);
		return;
	} else {
		promptIO.filename = filename;
	}
	return filename;
}
