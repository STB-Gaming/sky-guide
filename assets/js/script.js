let pages = Array.from(document.getElementsByClassName("item-list")), menu;
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

	function pressUp() {
		menu.up();
	}
	function pressDown() {
		menu.down();
	}

}
