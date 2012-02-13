window.onload = function() {
	initElement('menu');
	document.getElementById("save").setAttribute('onclick', 'save()');
	document.getElementById("load").setAttribute('onclick', 'load()');
	document.getElementById("loadTemplate").setAttribute('onclick', 'loadTemplate()');
	var file = $_GET("file");
	if (file != undefined) {
		loadCharacter(file);
	}
}

function readPage() {
	var xmlwrapper = document.createElement("div");
	xmlwrapper.innerHTML = document.getElementById("playground").innerHTML;
	return xmlwrapper.innerHTML;
}

function save() {
	var filename = promptIO("Save under what name? (a-zA-Z0-9 only)", "save");
	if (filename == undefined) {
		return;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","chario.php", true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			savestatus.innerHTML = xmlhttp.responseText;
		} else {
			savestatus.innerHTML = "Failed...";
		}
		setTimeout("savestatus.innerHTML = ''", 1500);
	}
	var textboxes = document.getElementsByClassName("textstore");
	for (var i = 0; i < textboxes.length; i++) {
		textboxes[i].setAttribute("value", textboxes[i].value);
	}
	xmlhttp.send("name="+filename+"&text=" + readPage());
}

function loadCharacter(filename) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "chario.php?name="+filename, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && 
			xmlhttp.responseText != "Failed..." && xmlhttp.responseText != "Login!") {
			savestatus.innerHTML = "Loaded!";
			document.getElementById("playground").innerHTML = xmlhttp.responseText;
		} else if (xmlhttp.responseText == "Failed..." || xmlhttp.responseText == "Login!") {
			savestatus.innerHTML = xmlhttp.responseText;
		}
		setTimeout("savestatus.innerHTML = ''", 1500);
	}
	xmlhttp.send(null);
}

function load() {
	var filename = promptIO("Load what file name? (a-zA-Z0-9 only, or <username>/<filename>)", "load");
	if (filename == undefined) {
		return;
	}
	loadCharacter(filename);
}

function loadTemplate() {
	var filename = promptIO("Load what template name? (a-zA-Z0-9 only, or <username>/<filename>)", "load");
	if (filename == undefined) {
		return;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "templateio.php?name="+filename, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && 
			xmlhttp.responseText != "Failed..." && xmlhttp.responseText != "Login!") {
			savestatus.innerHTML = "Loaded!";
			document.getElementById("playground").innerHTML = xmlhttp.responseText;
		} else {
			savestatus.innerHTML = xmlhttp.responseText;
		}
		setTimeout("savestatus.innerHTML = ''", 1500);
	}
	xmlhttp.send(null);
}
