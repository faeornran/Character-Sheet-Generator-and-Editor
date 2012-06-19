window.onload = function() {
	loadingFunc.loading = false;
	initElement('menu');
	document.getElementById("save").setAttribute('onclick', 'save()');
	document.getElementById("load").setAttribute('onclick', 'load()');
	document.getElementById("loadTemplate").setAttribute('onclick', 'loadTemplate()');
	var file = $_GET("file");
	var template = $_GET("template");
	if (file != undefined) {
		loadCharacter(file);
		promptIO.filename = file.split("/")[file.split("/").length-1];
	} else if (template != undefined) {
		getTemplate(template);
		promptIO.filename = template.split("/")[template.split("/").length-1];
	}
	$("#close").click(function() { 
		$("#admin").css("visibility", "hidden"); 
	});
	load.url = "charsheet.php";
}

function checked(checkboxDiv) {
	if (typeof checkboxDiv == 'string')
		checkboxDiv = document.getElementById(checkboxDiv);
	var checkbox = checkboxDiv.firstChild.firstChild;
	if (checkbox.getAttribute("checked") == null) {
		checkbox.setAttribute("checked", "checked");
	} else {
		checkbox.removeAttribute("checked");
	}
}

function readPage() {
	var xmlwrapper = document.createElement("div");
	xmlwrapper.innerHTML = document.getElementById("playground").innerHTML;
	var s = xmlwrapper.innerHTML;
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
	savingFunc.saving = true;
	savingFunc();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			savestatus.innerHTML = xmlhttp.responseText;
			savingFunc.saving = false;
			setTimeout("savestatus.innerHTML = ''", 1500);
		} else if (xmlhttp.readyState == 4) {
			savestatus.innerHTML = "Failed...";
			savingFunc.saving = false;
			setTimeout("savestatus.innerHTML = ''", 1500);
		}
	}
	var textboxes = document.getElementsByClassName("textstore");
	for (var i = 0; i < textboxes.length; i++) {
		textboxes[i].setAttribute("value", textboxes[i].value);
	}
	var s = readPage().replace(/&/g, "%26").replace(/\+/g, "%2B");
	xmlhttp.send("name="+filename+"&text=" + s);
}


function loadingFunc() {
	var savestatus = $("#savestatus")[0];
	if (loadingFunc.loading) {
		if (savestatus.innerHTML === "Loading   ") {
			savestatus.innerHTML = "Loading.  ";
		} else if (savestatus.innerHTML === "Loading.  ") {
			savestatus.innerHTML = "Loading.. ";
		} else if (savestatus.innerHTML === "Loading.. ") {
			savestatus.innerHTML = "Loading...";
		} else if (savestatus.innerHTML === "Loading...") {
			savestatus.innerHTML = "Loading ..";
		} else if (savestatus.innerHTML === "Loading ..") {
			savestatus.innerHTML = "Loading  .";
		} else {
			savestatus.innerHTML = "Loading   ";
		}
		setTimeout("loadingFunc()", 200);
	}
	
}

function savingFunc() {
	if (savingFunc.saving) {
		if (savestatus.innerHTML === "Saving   ") {
			savestatus.innerHTML = "Saving.  ";
		} else if (savestatus.innerHTML === "Saving.  ") {
			savestatus.innerHTML = "Saving.. ";
		} else if (savestatus.innerHTML === "Saving.. ") {
			savestatus.innerHTML = "Saving...";
		} else if (savestatus.innerHTML === "Saving...") {
			savestatus.innerHTML = "Saving ..";
		} else if (savestatus.innerHTML === "Saving ..") {
			savestatus.innerHTML = "Saving  .";
		} else {
			savestatus.innerHTML = "Saving   ";
		}
		setTimeout("savingFunc()", 200);
	}
	
}

function loadCharacter(filename) {
	loadingFunc.loading = true;
	loadingFunc();
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "chario.php?name="+filename, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function() {
		var savestatus = $("#savestatus")[0];
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && 
			xmlhttp.responseText != "No such file, failed..." && xmlhttp.responseText != "Login!") {
			loadingFunc.loading = false;
			savestatus.innerHTML = "Loaded!";
			document.getElementById("playground").innerHTML = xmlhttp.responseText;
			var checks = document.getElementsByClassName("check");
			for (var i = 0; i < checks.length; i++) {
				checks[i].setAttribute('onclick', 'checked('+checks[i].id+')');
			}
			setTimeout("$('#savestatus')[0].innerHTML = ''", 1500);
		} else if (xmlhttp.responseText === "No such file, failed..." || xmlhttp.responseText === "Login!") {
			loadingFunc.loading = false;
			savestatus.innerHTML = xmlhttp.responseText;
			setTimeout("$('#savestatus')[0].innerHTML = ''", 1500);
		}
	}
	xmlhttp.send(null);
}

function load() {
	//var filename = promptIO("Load what file name? (a-zA-Z0-9 only, or <username>/<filename>)", "load");
	//if (filename == undefined) {
	//	return;
	//}
	//loadCharacter(filename);
	if (load.type === ".template" || $("#admin").css("visibility") === "hidden") {
		load.type = ".char";
		getListing("");
		$("#admin").css("visibility", "visible");
	} else {
		$("#admin").css("visibility", "hidden");
	}
}

function loadTemplate() {
	//var filename = promptIO("Load what template name? (a-zA-Z0-9 only, or <username>/<filename>)", "load");
	//if (filename == undefined) {
	//	return;
	//}
	//getTemplate(filename);
	if (load.type === ".char" || $("#admin").css("visibility") === "hidden") {
		load.type = ".template";
		getListing("");
		$("#admin").css("visibility", "visible");
	} else {
		$("#admin").css("visibility", "hidden");
	}
}

function getTemplate(filename) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "templateio.php?name="+filename, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function() {
		var savestatus = $("#savestatus")[0];
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && 
			xmlhttp.responseText != "Failed..." && xmlhttp.responseText != "Login!") {
			savestatus.innerHTML = "Loaded!";
			document.getElementById("playground").innerHTML = xmlhttp.responseText;
		} else {
			savestatus.innerHTML = xmlhttp.responseText;
		}
		setTimeout("$('#savestatus')[0].innerHTML = ''", 1500);
	}
	xmlhttp.send(null);
	
}
