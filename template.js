function sizeHighlight() {
	var siz = document.getElementById("textboxSize");
	siz.focus();
	siz.select();
}

function getInitialPosition() {
	var menu = document.getElementById("menu");
	var left = menu.offsetLeft;
	var top = menu.offsetTop + 80;
	return 'left: ' + left + 'px; top: ' + top + 'px; ';
}

function addTextbox() {
	if ( typeof addTextbox.count == 'undefined' ) {
		addTextbox.count = 0;
	} 	
	var playground = document.getElementById("playground");
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', getInitialPosition());
	var name = 'textbox' + addTextbox.count++;
	newdiv.setAttribute('id', name);
	newdiv.setAttribute('class', "textbox");
	var size = document.getElementById("textboxSize").value;
	newdiv.innerHTML = '<div><input class="textstore" type="text" style="width:' + size + 'px; "/></div>';//<a id="del'+name+'" class="delLink">X</a>'
 	playground.appendChild(newdiv);
	initElement(name);
}

function addLabel() {
	var text = prompt("Label text?", "");
	if (text == null || text == "") {
		return;
	}
	if ( typeof addLabel.count == 'undefined' ) {
		addLabel.count = 0;
	} 	
	var playground = document.getElementById("playground");
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', getInitialPosition());
	var name = 'label' + addLabel.count++;
	newdiv.setAttribute('id', name);
	newdiv.setAttribute('class', "label");
	newdiv.innerHTML = '<div>' + text + '</div>';//<a id="del'+name+'" class="delLink">X</a>';
	playground.appendChild(newdiv);
	initElement(name);
}

function addBackground() {
	var url = prompt("URL?", "");
	if (url === "" | url === null) {
		return;
	}
	if ( typeof addBackground.count == 'undefined' ) {
		addBackground.count = 0;
	}
	
	var playground = document.getElementById("playground");
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', getInitialPosition());
	var name = 'background' + addBackground.count++;
	newdiv.setAttribute('id', name);
	newdiv.setAttribute('class', "background");
	newdiv.innerHTML = '<div><img src="' + url + '" /></div>';//<a id="del'+name+'" class="delLink">X</a>'
	playground.appendChild(newdiv);
	initElement(name);
}

function addList() {
	if (typeof addList.count === 'undefined') {
		addList.count = 0;
	}

	var playground = document.getElementById("playground");
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', getInitialPosition());
	var name = 'list' + addList.count++;
	newdiv.setAttribute('id', name);
	newdiv.setAttribute('class', "list");
	var size = document.getElementById("textboxSize").value;
	var minus = document.createElement('img');
	minus.src = 'images/minus.jpg'
	minus.id = 'minus' + name
	minus.setAttribute('onclick', 'decList("'+name+'")');
	var plus = document.createElement('img');
	plus.src = 'images/plus.jpg'
	plus.id = 'plus' + name
	plus.setAttribute('onclick', 'incList("'+name+'", '+textboxSize.value+')');
	
	var innerDiv = document.createElement('div');
	newdiv.appendChild(innerDiv);
	innerDiv.innerHTML = '<input class="textstore" type="text" style="width:' + size + 'px" />';
	innerDiv.appendChild(minus);
	innerDiv.innerHTML += " ";
	innerDiv.appendChild(plus);
	playground.appendChild(newdiv);
	initElement(name);
}

function addCheck() {
	if (typeof addCheck.count === 'undefined') {
		addCheck.count = 0;
	}

	var playground = document.getElementById("playground");
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', getInitialPosition());
	var name = 'check' + addCheck.count++;
	newdiv.setAttribute('id', name);
	newdiv.setAttribute('class', "check");
	var innerDiv = document.createElement('div');
	newdiv.appendChild(innerDiv);
	innerDiv.innerHTML = '<input type="checkbox" />';
	playground.appendChild(newdiv);
	initElement(name);
}

function readPage() {
	var xmlwrapper = document.createElement("div");
	xmlwrapper.innerHTML = document.getElementById("playground").innerHTML;
	var array = xmlwrapper.getElementsByClassName("delLink");
	var array2 = xmlwrapper.getElementsByClassName("keyLink");
	var i = 0;
	while (i < array.length) {
		array[i].parentNode.removeChild(array[i]);
		array2[i].parentNode.removeChild(array2[i]);
	}
	return xmlwrapper.innerHTML;
}

function save() {
	var filename = promptIO("Save as what template name? (a-zA-Z0-9 only)", "save");
	if (filename == undefined) {
		return;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST","templateio.php", true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			savestatus.innerHTML = xmlhttp.responseText;
		} else {
			savestatus.innerHTML = "Failed...";
		}
		setTimeout("savestatus.innerHTML = ''", 1500);
	}
	var tosend = ("name="+filename+"&text="+readPage()).replace(/(&quot;)/g,"'");
	xmlhttp.send(tosend);
}

function getBiggestId(collection, wordLength) {
	var label = 0;
	for (var i = 0; i < collection.length; i++) {
		var nextLabel = parseInt(collection[i].id.substring(wordLength));
		if (nextLabel > label) {
			label = nextLabel;
		}
	}
	return label+1;
}

function loadTemplate(filename) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "templateio.php?name="+filename, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && 
			xmlhttp.responseText != "Failed..." && xmlhttp.responseText != "Login!") {
			document.getElementById("playground").innerHTML = xmlhttp.responseText;
			var playground = document.getElementById("playground").childNodes;
			addTextbox.count = getBiggestId(document.getElementsByClassName("textbox"), 7);
			addLabel.count = getBiggestId(document.getElementsByClassName("label"), 5);
			addList.count = getBiggestId(document.getElementsByClassName("list"), 4);
			addBackground.count = getBiggestId(document.getElementsByClassName("background"),10);
			addCheck.count = getBiggestId(document.getElementsByClassName("check"), 5);
			for (var i=0; i < playground.length; i++) {
//				playground[i].innerHTML += '<a id="del'+playground[i].id+'" class="delLink">X</a>';
				initElement(playground[i].id);
			}
			savestatus.innerHTML = "Loaded!";
		} else if (xmlhttp.responseText == "Failed..." || xmlhttp.responseText == "Login!") {
			savestatus.innerHTML = xmlhttp.responseText;
		}
		setTimeout("savestatus.innerHTML = ''", 1500);
	}
	xmlhttp.send(null);
}

function load() {
	var filename = promptIO("Load what template name? (a-zA-Z0-9 only, or <username>/<filename>)", "load");
	if (filename == undefined) {
		return;
	}
	loadTemplate(filename);
}

function restrictChars() {
	var box = document.getElementById("textboxSize");
	var str = box.value.replace(/[^0-9]+/g,"");
	box.value = str;
}

window.onload = function () {
	initElement('menu');
	document.getElementById("addTextbox").setAttribute('onclick', 'addTextbox()');
	document.getElementById("addLabel").setAttribute('onclick', 'addLabel()');
	document.getElementById("addBackground").setAttribute('onclick', 'addBackground()');
	document.getElementById("addList").setAttribute('onclick', 'addList()');
	document.getElementById("addCheck").setAttribute('onclick', 'addCheck()');
	document.getElementById("save").setAttribute('onclick', 'save()');
	document.getElementById("load").setAttribute('onclick', 'load()');
	document.getElementById("textboxSize").setAttribute('onclick', 'sizeHighlight()');
	document.getElementById("textboxSize").setAttribute('onkeyup', 'restrictChars()');
	var file = $_GET("file");
	if (file != undefined) {
		loadTemplate(file);
	}
}

