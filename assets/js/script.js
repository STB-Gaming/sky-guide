let pages = Array.from(document.getElementsByClassName("item-list"));
if (pages.length) {


	let menu = createMenu({
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


	function pressLeft() {
		menu.left();
	}
	function pressRight() {
		menu.right();
	}
	function pressUp() {
		menu.up();
	}
	function pressDown() {
		menu.down();
	}

}
