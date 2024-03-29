angular.module('youtube', [
    'ng'
])
.run(function (user, $youtube) {
    console.log(".run");
    user.init({ appId: '53797a9b5ce08' });
    
    var tag = document.createElement('script');

    // This is a protocol-relative URL as described here:
    //     http://paulirish.com/2010/the-protocol-relative-url/
    // If you're testing a local page accessed via a file:/// URL, please set tag.src to
    //     "https://www.youtube.com/iframe_api" instead.
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    
})
.service('$youtube', ['$window', '$rootScope', function ($window, $rootScope) {
    console.log("youtube service start.");
    var service = {
        // Frame is ready
        ready: false,

        // Element id for player
        playerId: null,

        // Player currently in use
        player: null,

        // Current video id
        videoId: null,

        // Size
        playerHeight: '720',
        playerWidth: '1280',

        createPlayer: function () {
            return new YT.Player(this.playerId, {
                height: this.playerHeight,
                width: this.playerWidth,
                videoId: this.videoId,
                suggestedQuality: 'hd1080',
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange
                },
                playerVars: {
                    modestbranding: 0,
                    //controls: 0, //remove controls
                    showinfo: 0,
                    enablejsapi : 1,
                    iv_load_policy: 3 //turn off annotations
                }
            });
        },

        loadPlayer: function () {
            if (this.ready && this.playerId && this.videoId) {
                if (this.player && typeof this.player.destroy === 'function') {
                    this.player.destroy();
                }

                this.player = this.createPlayer();
            }
        }
    };

    // YT calls callbacks outside of digest cycle
    function applyBroadcast (event) {
        $rootScope.$apply(function () {
            $rootScope.$broadcast(event);
        });
    }

    // from YT.PlayerState
    var stateNames = {
        0: 'ended',
        1: 'playing',
        2: 'paused',
        3: 'buffering',
        5: 'queued'
    };

    var eventPrefix = 'youtube.player.';

    function onPlayerReady (event) {
        applyBroadcast(eventPrefix + 'ready');
    }

    function onPlayerStateChange (event) {
        var state = stateNames[event.data];
        if (typeof state !== undefined) {
            applyBroadcast(eventPrefix + state);
        }
    }

    console.log("creating $window on ready");
    // Youtube callback when API is ready
    $window.onYouTubeIframeAPIReady = function () {
        console.log("youtube api ready!");
        $rootScope.$apply(function () {
            service.ready = true;
        });
    };

    return service;
}])
.directive('youtubePlayer', ['$youtube', function ($youtube) {
    return {
        restrict: 'EA',
        scope: {
            videoId: '='
        },
        link: function (scope, element, attrs) {
            // Attach to element
            $youtube.playerId = element[0].id;

            // Allow us to watch 'player.ready'
            scope.player = $youtube;
            var stopWatchingReady = scope.$watch('player.ready',
                function (ready) {
                    if (ready) {
                        stopWatchingReady();

                        // Change video, load player
                        scope.$watch('videoId', function (id) {
                            $youtube.videoId = id;
                            $youtube.loadPlayer();
                        });
                    }
            });
        }
    };
}]);
