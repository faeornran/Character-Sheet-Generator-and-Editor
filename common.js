function removeElement(name) {
	var element = document.getElementById(name);
	element.parentNode.removeChild(element);
}

function incList(name, size) {
	var div = document.getElementById(name);
	div.firstChild.innerHTML += '<br /><input class="textstore" type="text" style="width:' + size + 'px" />';
}

function decList(name) {
	var div = document.getElementById(name);
	if (div.firstChild.lastChild.tagName !== "IMG") {
		var size = div.firstChild.firstChild.size;
		div.firstChild.removeChild(div.firstChild.lastChild);
		div.firstChild.removeChild(div.firstChild.lastChild);
	}
}

function promptIO(message, type) {
	var filename = prompt(message, "");
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
	}
	return filename;
}
