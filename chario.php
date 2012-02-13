<?php
	if ($_SERVER['REQUEST_METHOD'] == "POST") {
		require_once("phpbb_php_login.php");
		$dir = "templates/" . $username;
		if (!file_exists($dir) && !mkdir($dir)) {
			echo "Failed...";
		} else {
			$filename = $dir . "/" . trim(preg_replace("/[^a-zA-Z0-9]+/", "", $_POST["name"])) . ".char";
			$fh = fopen($filename, 'w') or die("Failed...");
			fwrite($fh, trim($_POST["text"]));
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
		$filename = $filename . ".char";

		if (!file_exists($filename)) {
			echo "Failed...";
		} else {
			$contents = file_get_contents($filename) or die("Failed...");
			echo $contents;
		}
	}
 
?>
