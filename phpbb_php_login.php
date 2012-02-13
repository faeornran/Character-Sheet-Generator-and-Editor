<?php
	define('IN_PHPBB', true);
	define('ROOT_PATH', "../forums");

        if (!defined('IN_PHPBB') || !defined('ROOT_PATH')) {
            exit();
        }

        $phpEx = "php";
        $phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : ROOT_PATH . '/';
        include($phpbb_root_path . 'common.' . $phpEx);

        $user->session_begin();
        $auth->acl($user->data);
        
	$username = $user->data['username'];
	if ($username == "Anonymous") {
		echo "Login!";
		exit();
	} 
?>
