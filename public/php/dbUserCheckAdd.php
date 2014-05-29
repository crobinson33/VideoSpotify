<?php

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
	$name = htmlspecialchars($_GET["name"]);


	$userResult = checkUser($con, $userAppId);

	if ($userResult == 1)
	{
		return ("in db");
	}
	else
	{
		//echo ("nope");
		addUser($con, $userAppId, $name);
		return ("added");
	}
}

//mysqli_close($con);
function addUser($con, $userAppId, $name)
{
	$query = "INSERT INTO user
				(
				firstName,
				userAppId
				)
				SELECT
				  '$name',  
				  '$userAppId'";

	$result = mysqli_query($con, $query);

	//check to see if query was valid.
	if (!$result)
	{
		//early out if if was not.
		echo ('Invalid query');
	}	
}

// see if user is in our db.
function checkUser($con, $userAppId)
{
	

	$query = "SELECT COUNT(*) as userCount
				FROM user
				WHERE userAppId = '$userAppId'";

	$result = mysqli_query($con, $query);

	//check to see if query was valid.
	if (!$result)
	{
		//early out if if was not.
		echo ('Invalid query');
	}

	$rows = array();


	while ($r = $result->fetch_assoc()) 
	{
		$rows[] = $r;
	}

	//echo ($result);
	return($rows[0]['userCount']);
}


?>