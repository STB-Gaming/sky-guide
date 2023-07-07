let videos = Array.from(document.getElementsByClassName("video-container"));
console.log(`Found ${videos.length} videos`);

let ytSetup = false;
function setupYT() {
	if (ytSetup) return;

	window.onYouTubeIframeAPIReady = function () {
		console.log("YouTube Ready");
		document.dispatchEvent(new Event("youtubeready"));
	};

	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	ytSetup = true;
	console.log("YouTube Player API Setup");
}

videos.forEach(container => {
	let video = container.querySelector("video"),
		youtube = container.querySelector("iframe"),
		playPause = container.querySelector(".play-pause"),
		mute = container.querySelector(".mute"),
		fullscreen = container.querySelector(".fullscreen"),
		controls = container.querySelector(".video-controls"),
		visibilityTimeout;
	if (playPause) {
		playPause.addEventListener("click", () => {
			if (!video) return;
			video.paused ? video.play() : video.pause();
		});
		console.log("added play button functionality");
	}
	if (mute) {
		mute.addEventListener("click", () => {
			if (!video) return;
			video.muted = !video.muted;
		});
		console.log("added mute button functionality");
	}

	if (!document?.fullscreenEnabled) {
		fullscreen.style.display = "none";
	} else if (fullscreen) {
		fullscreen.addEventListener("click", () => {
			if (document.fullscreenElement !== null) {
				document.exitFullscreen();
				container.setAttribute("data-fullscreen", false);
			} else {
				container.requestFullscreen();
				container.setAttribute("data-fullscreen", true);
			}
		});
		console.log("added fullscreen button functionality");
	}

	if (video)
		video.addEventListener("canplay", () => {
			console.log("Video Ready");
		});

	function makeControlsVisiable() {
		if (visibilityTimeout) clearTimeout(visibilityTimeout);
		controls.style.opacity = 1;
		visibilityTimeout = setTimeout(() => {
			controls.style.opacity = 0;
		}, 5000);
	}


	document.addEventListener("mousemove", () => {
		makeControlsVisiable();
	});
	makeControlsVisiable();

	if (!video && !!youtube) {
		controls.style.display = "none";
		document.addEventListener("youtubeready", () => {

			let player = new YT.Player(youtube.id, {

				playerVars: {
					'playsinline': 1
				},
				events: {
					'onStateChange': (event) => {
						if (event.data != -1) {
							controls.style.display = null;

						}

					}
				}
			});
			console.log("Connected player to youtube player api");
			window.YOUTUBE_TEST = player;

			window.CONTROLS = controls;


			video = {
				play: () => {
					player.playVideo();
				},
				pause: () => {
					player.pauseVideo();
				},
				get paused() {
					return [-1, 2, 5, 0].includes(player.getPlayerState());
				},
				get muted() {
					return player.isMuted();
				},
				set muted(value) {
					if (value)
						player.mute();
					else
						player.unMute();
				}
			};
		});
		setupYT();
	}
});
