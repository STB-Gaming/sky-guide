

let programmes = Array.from(document.querySelectorAll(".tv-guide > a"));
let channels = Array.from(document.querySelectorAll(".channel"));
let lists = Array.from(document.querySelectorAll(".tv-guide"));

let guideMenu = createMenu({
	pages: lists,
	rows: channels.length,
	columns: 4,
	itemSelector: ".tv-guide > a",
	onFocus: (item) => {
		if (!guideMenu.getPos) return;
		let pos = guideMenu.getPos();
		channels.forEach((c, i) => {
			if (i == pos.y) {
				c.classList.add("active");
			} else {
				c.classList.remove("active");
			}
		});
	}
});



guideMenu.init();


function pressSelect() {
	guideMenu.getSelected().click();
}


function pressLeft() {
	guideMenu.left();
}
function pressRight() {
	guideMenu.right();
}
function pressUp() {
	guideMenu.up();
}
function pressDown() {
	guideMenu.down();
}


lists.forEach((p, i) => {
	guideMenu.getItems(i).forEach(item => {
		item.addEventListener("mouseenter", () => {
			guideMenu.goto(item);
		});
	});
});
