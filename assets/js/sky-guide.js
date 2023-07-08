

let programmes = Array.from(document.querySelectorAll(".programme"));
let channels = Array.from(document.querySelectorAll(".channel"));
let lists = Array.from(document.querySelectorAll(".channel-grid"));

let guideMenu = createMenu({
	pages: lists,
	rows: channels.length,
	columns: 4,
	itemSelector: ".programme",
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
