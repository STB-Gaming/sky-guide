
if (typeof SkyRemote != 'undefined') {

	SkyRemote.onReleaseButton("tv-guide", () => {
		window.location.href = "https://stb-gaming.github.io/tv-guide/";
	});

	SkyRemote.onReleaseButton("box-office", () => {
		window.location.href = "https://stb-gaming.github.io/box-office/";
	});

	SkyRemote.onReleaseButton("services", () => {
		window.location.href = "https://stb-gaming.github.io/services/";
	});

	SkyRemote.onReleaseButton("interactive", () => {
		window.location.href = "https://stb-gaming.github.io/interactive/";
	});
}
