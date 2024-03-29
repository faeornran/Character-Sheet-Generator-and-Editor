<?php
	$allowed_group = "charcreate";
	if ($_SERVER['REQUEST_METHOD'] == "POST") {
		require_once("phpbb_php_login.php");
		if (!$loggedIn) {
			exit();
		}
		$dir = "templates/" . $username;
		if (!file_exists($dir) && !mkdir($dir)) {
			echo "Failed...";
		} else if ($baduser) {
			echo "Bad user.";
		} else {
			$filename = $dir . "/" . trim(preg_replace("/[^a-zA-Z0-9]+/", "", $_POST["name"])) . ".template";
			if (file_exists($filename)) {
				$new = $filename . ".bak";
				copy($filename, $new) or die("Failed to copy old file.");
			}
			$fh = fopen($filename, 'w') or die("Failed to write new file.");
			$text = preg_replace('/value=".*"/', '', trim($_POST["text"]));
			fwrite($fh, $text);
			fclose($fh);
			echo "Saved!";
		}
	} else {
		$name = trim(preg_replace("/[^a-zA-Z\/0-9]+/", "", $_GET["name"]));
		$combo = split("/", $name);
		$filename = "";
		$dir = "templates/";
		if (count($combo) == 2) {
			$filename = $dir . $name;
		} else {
			require_once("phpbb_php_login.php");
			$filename = $dir . $username . "/" . $combo[0];
		}
		$filename = $filename . ".template";

		if (!file_exists($filename)) {
			echo "Failed...";
		} else {
			$contents = file_get_contents($filename) or die("Failed...");
			echo $contents;
		}
	}
 
?>
