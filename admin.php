<?php
	function deleteAll($directory, $empty = false) { 
		if(substr($directory,-1) == "/") { 
			$directory = substr($directory,0,-1); 
		} 

		if(!file_exists($directory) && !is_dir($directory)) { 
			return false; 
		} elseif(!is_readable($directory)) { 
			echo "2";
			return false; 
		} elseif(!is_dir($directory)) {
			unlink($directory);
			return !file_exists($directory);
		} else { 
			$directoryHandle = opendir($directory); 
        
			while ($contents = readdir($directoryHandle)) { 
				if($contents != '.' && $contents != '..') { 
					$path = $directory . "/" . $contents; 
                
					if(is_dir($path)) { 
						deleteAll($path); 
					} else { 
						unlink($path); 
					} 
				} 
			} 
        
			closedir($directoryHandle); 

			return !(!$empty && !rmdir($directory));
		} 
	} 

	$allowed_group = "charcreate";
	include("phpbb_php_login.php");
	if ($baduser) {
		echo "Invalid user.";
		exit();
	}
	
	$pathname = "templates/";
	if ($_SERVER['REQUEST_METHOD'] == "GET") {
		$subpath = "";
		if ($isAdmin) {
			$subpath = $_GET["dir"];
			$subpath .= ($subpath !== "" && substr($subpath,-1) !== "/") ? "/" : "";
		} else {
			$subpath = $username . '/';
		}
		$pathname .= $subpath;
		

		if (!is_dir($pathname)) {
			echo "Invalid directory.";
			exit();
		}
		
		$dir = opendir($pathname);
		$pre = true;
		while (false !== ($entry = readdir($dir))) {
			$fileList[] = $entry;
		}
		closedir($dir);
		sort($fileList);
		foreach ($fileList as $entry) {
			if ($entry !== "." && $entry !== ".." && substr($entry, -4) !== ".bak") {
				$pre = false;
				echo "<li>";
				$link = $subpath . $entry;
				if (strlen($entry) > 5) {
					if (substr_compare($entry, ".char", -strlen(".char"), strlen(".char")) === 0) {
						$link = "charsheet.php?file=" . substr($link, 0, strlen($link)-5);
					} else if (substr_compare($entry, ".template", -strlen(".template"), strlen(".template")) === 0) {
						$link = "templatemaker.php?file=" . substr($link, 0, strlen($link)-9);
					}
				}
				$href = ($pathname === "templates/") ? "#" : $link;
				echo "<a href=" . $href . " >" . $entry . "</a>";
				echo "<span class='button'><button>Remove</button></span>";
				echo "</li>";
			}
			
		}
		/*
		while (false !== ($entry = readdir($dir))) {
			if ($entry !== "." && $entry !== "..") {
				$pre = false;
				echo "<li>";
				$link = $subpath . $entry;
				if (strlen($entry) > 5) {
					if (substr_compare($entry, ".char", -strlen(".char"), strlen(".char")) === 0) {
						$link = "charsheet.php?file=" . substr($link, 0, strlen($link)-5);
					} else if (substr_compare($entry, ".template", -strlen(".template"), strlen(".template")) === 0) {
						$link = "templatemaker.php?file=" . substr($link, 0, strlen($link)-9);
					}
				}
				$href = ($pathname === "templates/") ? "#" : $link;
				echo "<a href=" . $href . " >" . $entry . "</a>";
				echo "<span class='button'><button>Remove</button></span>";
				echo "</li>";
			}
		}
		*/
		if ($pre) {
			echo "Nothing to display.";
		}
	} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
		if (!$isAdmin) {
			$pathname .= $username . '/'; 
		} else if ($_POST["dir"] === NULL) {
			echo "No directory provided.";
			exit();
		} 
		//$pathname = preg_replace('/templates\//', "", $pathname);
		$pathname .= preg_replace('/\.\.+/', ".", preg_replace('/(%2E)+/', ".", $_POST["dir"]));
		
		if (deleteAll($pathname)) {
			echo "deleted";
		} else {
			echo "Failed.";
		}
	}
?>
