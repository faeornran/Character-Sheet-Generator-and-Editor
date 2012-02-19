<?php
	require_once('phpbb_js_login.php');
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
	<head> 
		<title>Character Sheet Template Maker</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="text/javascript" src="dragdrop.js"></script>
		<script type="text/javascript" src="template.js"></script>
		<script type="text/javascript" src="common.js"></script>
		<script type="text/javascript" src="get.js"></script>
		<link rel="stylesheet" href="templatemaker.css" />
                <link rel="stylesheet" href="common.css" />
	</head>
	<body>
		<div id="menu">
			<button class="menuitem" id="addTextbox">Add Textbox</button>
			<button class="menuitem" id="addLabel">Add Label</button>
			<button class="menuitem" id="addList">Add List</button>
			<button class="menuitem" id="addBackground">Add Background</button>
			<button class="menuitem" id="addCheck">Add Checkbox</button>
			<br />
			<label for="textboxSize">Size</label>
			<input class="menuitem" id="textboxSize" type="text" maxlength=5 value="100"/>
			<span id="pxlabel">px</span>
			<label for="pixelDistance">Key Pixels</label>
			<input class="menuitem" id="pixelDistance" type="text" maxlength=3 value="8"/>
			<span id="pxlabel">px</span>
			<button class="menuitem" id="save" >Save</button>
			<button class="menuitem" id="load" >Load</button>
			<span id="savestatus"></span>
		</div>
		<div id="playground">
		</div>
	</body>
</html>
