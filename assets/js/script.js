let pages = Array.from(document.getElementsByClassName("menu")), menu;
if (pages.length) {


	menu = createMenu({
		pages
	});


	menu.init();

	pages.forEach((p, i) => {
		menu.getItems(i).forEach(item => {
			item.addEventListener("mouseenter", () => {
				menu.goto(item);
			});
		});
	});

}

function pressUp() {
	menu.up();
}
function pressDown() {
	menu.down();
}

function pressSelect() {
	menu.getSelected().click();
}

function pressBack() {
	let things = window.location.pathname.split("/").filter(i => !!i);
	console.log(things);
	things.pop();
	window.location.pathname = things.join("/");
}


let pathParts = window.location.pathname.split("/").filter(i => !!i);
function pressLeft() {
	switch (pathParts[0]) {
		case "box-office":
			window.location.href = "/tv-guide";
			break;
		case "services":
			window.location.href = "/box-office";
			break;
		case "interactive":
			window.location.href = "/services";
			break;
	}
}

function pressRight() {
	switch (pathParts[0]) {
		case "tv-guide":
			window.location.href = "/box-office";
			break;
		case "box-office":
			window.location.href = "/services";
			break;
		case "services":
			window.location.href = "/interactive";
			break;
	}
}



function pressHelp() {
	window.location.pathname = "/services/using-this-website";
}

function presshelp() {

	pressHelp();
}


SkyRemote.createSkyRemote({
	pressSelect, pressLeft, pressRight, pressUp, pressDown, pressHelp, pressBack
});
