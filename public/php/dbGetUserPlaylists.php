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
	$uaid = htmlspecialchars($_GET["uaid"]);
	$name = htmlspecialchars($_GET["name"]);

	$isUserThere = (include 'dbUserCheckAdd.php');

	if ($isUserThere == "in db")
	{
		// user was in db.
		$userPlaylist = getUserPlaylist($con, $uaid);
		echo json_encode($userPlaylist);
	}
	elseif ($isUserThere == "added")
	{
		// user was not in db.
	}
	else
	{
		// we had an error?
		die ("error getting/adding user");
	}
}

//DIfzyJkGTf2GBjjGj7CzKw
function getUserPlaylist($con, $uaid)
{
	$query = "SELECT pl.*
				FROM playlist pl
				INNER JOIN user u on u.userId = pl.owner_Id
				WHERE u.userAppId = '$uaid'";

	$result = mysqli_query($con, $query);

	//check to see if query was valid.
	if (!$result)
	{
		//early out if if was not.
		echo ('Invalid query');
	}

	while ($r = $result->fetch_assoc()) 
	{
		$rows[] = $r;
	}

	//cho "test";
	//print "test2";
	//print $result;
	//echo ($result);

	return($rows);
}

?>