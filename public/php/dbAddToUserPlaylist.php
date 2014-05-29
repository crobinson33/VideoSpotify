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
	$playlistId = htmlspecialchars($_GET["pid"]);
	$videoId = htmlspecialchars($_GET["vid"]);
	$videoName = htmlspecialchars($_GET["vn"]);

	$isUserThere = (include 'dbUserCheckAdd.php');

	if ($isUserThere == "in db")
	{
		// user was in db.

		//se if video is already in db.
		$isVideoInDb = checkIfVideoIsInDb($con, $videoId);

		if ($isVideoInDb == false)
		{
			// video is not in db. lets add it
			addVideoToDb($con, $videoName, $videoId);
		}

		//now we know for fact db has video. 
		// lets add it to the user playlist.

		// first we need the video id.
		$dbVideoId = getVideoId($con, $videoId);


		// add to given playlist.
		addToUserPlaylistContent($con, $playlistId, $dbVideoId);

		
		// return full playlist.
		$userPlaylist = getUserPlaylistContents($con, $playlistId);
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

function checkIfVideoIsInDb($con, $videoId)
{
	$query = "SELECT COUNT(*) as videoCount
				FROM Video
				WHERE youtubeId = '$videoId'";

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

	if ($rows[0]['videoCount'] > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function getVideoId($con, $videoId)
{

	$query = "SELECT vId
				FROM Video
				WHERE youtubeId = '$videoId'";

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

	$trueVideoId = $rows[0]['vId'];

	return $trueVideoId;
}

function addVideoToDb($con, $videoName, $videoId)
{
	$query = "INSERT INTO Video
				(
				name
				, youtubeId
				)
				SELECT
				'$videoName'
				, '$videoId'";

	$result = mysqli_query($con, $query);

	//check to see if query was valid.
	if (!$result)
	{
		//early out if if was not.
		echo ('Invalid query');
	}
}

//DIfzyJkGTf2GBjjGj7CzKw
function addToUserPlaylistContent($con, $playlistId, $dbVideoId)
{
	$query = "INSERT INTO playlistContents
				(
				pId
				, videoId
				)
				SELECT
				$playlistId
				, $dbVideoId";

	$result = mysqli_query($con, $query);

	//check to see if query was valid.
	if (!$result)
	{
		//early out if if was not.
		echo ('Invalid query');
	}
}

//DIfzyJkGTf2GBjjGj7CzKw
function getUserPlaylistContents($con, $playlistId)
{
	$query = "SELECT * 
			FROM playlistContents 
			WHERE pid = '$playlistId'";

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