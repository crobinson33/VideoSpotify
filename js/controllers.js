'use strict';
angular.module('ChoobiApp.controllers', [
		//'com.2fdevs.videogular',
        //'com.2fdevs.videogular.plugins.controls',
        //'com.2fdevs.videogular.plugins.overlayplay',
        //'com.2fdevs.videogular.plugins.buffering',
        //'info.vietnamcode.nampnq.videogular.plugins.youtube'
        //'youtube'
])
.controller('homeController', function($scope, $sce, $youtube) {
    // add logic in here
    console.log("start controller");

    // initial id set.
    $scope.mainVideoPlayer = 'ebXbLfLACGM';

    // plays the videos
	$scope.$on('youtube.player.ready', function () {
		console.log("got here");
		$youtube.player.playVideo();
	});

	// detects end of videos
	$scope.$on('youtube.player.ended', function () {
		console.log("got here2");
		//$youtube.player.stopVideo();
		//$youtube.player.clearVideo();
		$scope.mainVideoPlayer = 'OBl4pp0Sfko';
		//$youtube.loadPlayer();
		//$youtube.player.playVideo(); 
		//$youtube.player.loadVideoById('OBl4pp0Sfko', 'hd1080');
	});
});
    /*$scope.onYouTubeIframeAPIReady = function(id) {
    	console.log("got here");
        var player = new YT.Player('player', {
			width: '1280',
			height: '720',
			videoId: 'ebXbLfLACGM',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
        });
    }
    // autoplay video
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // when video ends
    function onPlayerStateChange(event) {        
        if(event.data === 0) {          
            alert('done');
        }
    }*/


    //$scope.code = "ebXbLfLACGM";
    //$scope.aheight = "720";
    //$scope.awidth = "1280";

    //$scope.src = $sce.trustAsResourceUrl("https://www.youtube.com/embed/ebXbLfLACGM?vq=hd720");

	// create youtube player
    //$scope.youtubePlayer;
    /*$scope.onLoad = function() {
    	console.log("got here");
        player = new YT.Player('player', {
			width: '1280',
			height: '720',

			videoId: 'ebXbLfLACGM',
			events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
			}
        });
    }

    // autoplay video
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // when video ends
    function onPlayerStateChange(event) {        
        if(event.data === 0) {          
            alert('done');
        }
    }*/

    //$scope.video = {};
    //$scope.video.source = $sce.trustAsResourceUrl("https://www.youtube.com/embed/ebXbLfLACGM?vq=hd720");

    /*console.log("start controller");

    $scope.currentTime = 0;
	$scope.totalTime = 0;
	$scope.state = null;
	$scope.volume = 1;
	$scope.isCompleted = false;
	$scope.API = null;

	$scope.onPlayerReady = function(API) {
		$scope.API = API;
	};

	$scope.onCompleteVideo = function() {
		console.log("video is over!");
		$scope.isCompleted = true;


		$scope.changeSource();
		
		
	};

	$scope.onUpdateState = function(state) {
		$scope.state = state;
	};

	$scope.onUpdateTime = function(currentTime, totalTime) {
		$scope.currentTime = currentTime;
		$scope.totalTime = totalTime;
	};

	$scope.onUpdateVolume = function(newVol) {
		$scope.volume = newVol;
	};

	$scope.onUpdateSize = function(width, height) {
		$scope.config.width = width;
		$scope.config.height = height;
	};

	$scope.stretchModes = [
		{label: "None", value: "none"},
		{label: "Fit", value: "fit"},
		{label: "Fill", value: "fill"}
	];

    $scope.config = {
		width: 1280,
		height: 720,
		autoHide: true,
		autoHideTime: 3000,
		autoPlay: false,
		responsive: false,
		sources:  [
			//{src: $sce.trustAsResourceUrl("http://codybayrobinson.com/VideoSpotify/assets/YONAS-PumpedUpKicks.mp4"), type: "video/mp4"}
			{src: $sce.trustAsResourceUrl("www.youtube.com/embed/ebXbLfLACGM?vq=hd720"), type: "video/youtube"}//,
			//{src: $sce.trustAsResourceUrl("www.youtube.com/embed/dGghkjpNCQ8?vq=hd720"), type: "video/youtube"}
		],
		transclude: true,			
		theme: {
			url: "js/lib/videogular/themes/default/videogular.css"
		},
		plugins: {
			poster: {
				url: "assets/images/videogular.png"
			},
			ads: {
				companion: "companionAd",
				companionSize: [728, 90],
				network: "6062",
				unitPath: "iab_vast_samples",
				adTagUrl: "http://pubads.g.doubleclick.net/gampad/ads?sz=400x300&iu=%2F6062%2Fiab_vast_samples&ciu_szs=300x250%2C728x90&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]&cust_params=iab_vast_samples%3Dlinear"
			}
		}
	};

	$scope.changeSource = function() {
		$scope.config.sources = [
			//{src: $sce.trustAsResourceUrl("www.youtube.com/embed/ebXbLfLACGM?vq=hd720"), type: "video/youtube"},
			{src: $sce.trustAsResourceUrl("www.youtube.com/embed/dGghkjpNCQ8?vq=hd720"), type: "video/youtube"}
		];
		//console.log($scope.config.sources);
		$scope.currentTime = 0;
		$scope.totalTime = 0;
		$scope.state = null;
		$scope.isCompleted = false;
		$scope.API = null;
		$scope.config.autoPlay = true;
		console.log("new video loaded!");
	};

	//console.log($scope.config.sources);
	console.log("end controller");*/


/*.directive('myIframe', function(){
    var linkFn = function(scope, element, attrs) {
        element.find('iframe').bind('load', function (event) {
          event.target.contentWindow.scrollTo(0,400);
        });
    };
    return {
      restrict: 'EA',
      scope: {
        src:'@src',
        height: '@height',
        width: '@width',
        scrolling: '@scrolling'
      },
      template: '<iframe class="frame" height="{{height}}" width="{{width}}" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="{{scrolling}}" src="{{src}}"></iframe>',
      link : linkFn
    };
  })*/
/*.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { 
    	code:'=',
    	aheight: '=',
        awidth: '='
	},
    replace: true,
    template: '<iframe name="{{player}}" height="{{newHeight}}" width="{{newWidth}}" src="{{url}}" frameborder="0" allowfullscreen></iframe>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
        	console.log(newVal);
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal + "?vq=hd1080");
           }
        });
        scope.$watch('aheight', function (newVal) {
           console.log(newVal);
           if (newVal) {
           		console.log("new height");
               scope.newHeight = newVal;
           }
        });
        scope.$watch('awidth', function (newVal) {
        	console.log(newVal);
           if (newVal) {
           		console.log("new width");
               scope.newWidth = newVal;
           }
        });

        
        $window.onYouTubeIframeAPIReady = new function () {
        	console.log("loading player?");
	        scope.player = new YT.Player('player', {
				width: '1280',
				height: '720',

				videoId: 'ebXbLfLACGM'//,
				//events: {
				//	'onReady': onPlayerReady,
				//	'onStateChange': onPlayerStateChange
				//}
	        });
    	}
    }
  };
})*/