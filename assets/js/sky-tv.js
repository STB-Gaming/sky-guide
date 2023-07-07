let videos = Array.from(document.getElementsByClassName("video-container"));
console.log(`Found ${videos.length} videos`);
videos.forEach(container => {
	let video = container.querySelector("video"),
		playPause = container.querySelector(".play-pause"),
		mute = container.querySelector(".mute"),
		fullscreen = container.querySelector(".fullscreen"),
		controls = container.querySelector(".video-controls"),
		visibilityTimeout;
	if (playPause) {
		playPause.addEventListener("click", () => {
			video.paused ? video.play() : video.pause();
		});
		console.log("added play button functionality");
	}
	if (mute) {
		mute.addEventListener("click", () => {
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

	window.TEST_VIDEO = video;
});
