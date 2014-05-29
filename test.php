<?php

/*require __DIR__.'/lib/UserApp/Autoloader.php';
require __DIR__.'/lib/UserAppWidget/Autoloader.php';

UserApp\Autoloader::register();
UserApp\Widget\Autoloader::register();

use \UserApp\Widget\User;

User::setAppId("53797a9b5ce08");

$valid_token = false;

if(!User::authenticated() && isset($_COOKIE["ua_session_token"])){
	$token = $_COOKIE["ua_session_token"];

	try{
		$valid_token = User::loginWithToken($token);
	}catch(\UserApp\Exceptions\ServiceException $exception){
		$valid_token = false;
	}
}

if(!$valid_token){
	// Not authorized
	echo "No auth";
}else{
	// Authorized
	$user = User::current();
	echo ($user);
}*/

//echo 'Hello ' . htmlspecialchars($_GET["uaid"]) . '!';

// i think it might be dangerous to have an ip address?
$con = mysqli_connect("68.178.143.154","Choobi","Munk#y333","Choobi");

// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
else
{
	$userAppId = htmlspecialchars($_GET["uaid"]);

	$query = "SELECT v.* FROM Video v
				INNER JOIN playlistContents plC on plC.videoId = v.vId
				INNER JOIN playlist pl on pl.pId = plC.pId
				INNER JOIN user u on u.userId = pl.owner_Id
				WHERE u.userAppId = '$userAppId'";

	//echo ($query);

	$result = mysqli_query($con, $query);

	//check to see if query was valid.
	if (!$result)
	{
		//early out if if was not.
		die ('Invalid query');
	}

	$rows = array();


	while ($r = $result->fetch_assoc()) 
	{
		$rows[] = $r;
	}

	//cho "test";
	//print "test2";
	//print $result;
	//echo ($result);

	echo json_encode($rows);
}

//mysqli_close($con);


?>