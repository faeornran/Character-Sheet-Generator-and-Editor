<?php
	define('IN_PHPBB', true);
	define('ROOT_PATH', "../forums");

        if (!defined('IN_PHPBB') || !defined('ROOT_PATH')) {
            exit();
        }

        $phpEx = "php";
        $phpbb_root_path = (defined('PHPBB_ROOT_PATH')) ? PHPBB_ROOT_PATH : ROOT_PATH . '/';
        include($phpbb_root_path . 'common.' . $phpEx);
	include($phpbb_root_path . 'includes/functions_user.php');
	include($phpbb_root_path . 'includes/functions_convert.php');

        $user->session_begin();
        $auth->acl($user->data);
        
	$user_id = $user->data['user_id'];
	$baduser = false;
	if ($username == ANONYMOUS) {
		echo "Login!";
		exit();
	} elseif (!group_memberships(get_group_id("charcreate"), $user->data["user_id"], true)) {
		$baduser = true;
	}
?>
