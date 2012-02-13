<?php
        require_once('phpbb_js_login.php');
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
        <head>
                <title>Character Sheet Editor</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <script type="text/javascript" src="dragdrop.js"></script>
                <script type="text/javascript" src="common.js"></script>
                <script type="text/javascript" src="charsheet.js"></script>
		<script type="text/javascript" src="get.js"></script>
                <link rel="stylesheet" href="charsheet.css" />
                <link rel="stylesheet" href="common.css" />
        </head>
        <body>
                <div id="menu">
                        <button class="menuitem" id="save">Save</button>
                        <button class="menuitem" id="load">Load</button>
                        <button class="menuitem" id="loadTemplate">Load Template</button>
                        <span id="savestatus"></span>
                </div>
                <div id="playground">
                </div>
        </body>
</html>

