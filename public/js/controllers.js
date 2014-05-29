'use strict';
angular.module('ChoobiApp.controllers', [
		//'com.2fdevs.videogular',
        //'com.2fdevs.videogular.plugins.controls',
        //'com.2fdevs.videogular.plugins.overlayplay',
        //'com.2fdevs.videogular.plugins.buffering',
        //'info.vietnamcode.nampnq.videogular.plugins.youtube'
        //'youtube'
])
.controller('homeController', function($scope, $sce, $youtube, $http, user) {
    // add logic in here
    console.log("start controller");
    $scope.index = 0;
    $scope.videoArray = [];
    //$scope.mainVideoPlayer = '';

    // do an initial load
    console.log("lets try a GET on /VideoSpotify/test.php");
	console.log(user);
	$http({method: 'GET', url: '/VideoSpotify/test.php?uaid=' + user.current.user_id})
		.success(function(data, status, headers, config) {
	      // this callback will be called asynchronously
	      // when the response is available
	    	console.log(data);

	    	angular.forEach(data, function(value, key) {
	    		this.push(value.youtubeId);
	    	}, $scope.videoArray)

	    	console.log($scope.videoArray);

	    	$scope.mainVideoPlayer = $scope.videoArray[$scope.index];
	    	$scope.index++;
	    })
	    .error(function(data, status, headers, config) {
	      // called asynchronously if an error occurs
	      // or server returns response with an error status.
	      console.log("error");
    });

    // initial id set.
    //$scope.mainVideoPlayer = 'ebXbLfLACGM';


    // plays the videos
	$scope.$on('youtube.player.ready', function () {
		//console.log("got here");
		$youtube.player.playVideo();
		console.log("playing: " + $youtube.player.getVideoData().title);
	});

	// detects end of videos
	$scope.$on('youtube.player.ended', function () {
		console.log("ended: " + $youtube.player.getVideoData().title);
		//$youtube.player.stopVideo();
		//$youtube.player.clearVideo();
		//$scope.mainVideoPlayer = 'WcM14Al83Ls';
		//$youtube.loadPlayer();
		//$youtube.player.playVideo(); 
		//$youtube.player.loadVideoById('OBl4pp0Sfko', 'hd1080');

		if ($scope.index < $scope.videoArray.length)
		{
			$scope.mainVideoPlayer = $scope.videoArray[$scope.index];
			$scope.index++;
		}
	});

	
});
    