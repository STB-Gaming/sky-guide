function createMenuGrid({
	pages,
	rows,
	columns = 1,
	onFocus = (item) => { },
	itemSelector = "a",
	animations = false
}) {
	let x = y = p = dx = dy = dp = 0;

	function init() {
		pages.forEach((page, i) => {
			if (i != p) page.style.display = "none";
		});

		updateFocus();
	}

	/*
	using dx dy change the x and y based on the page contents
	*/
	function updateFocus() {
		dx += dp * columns;
		x += dx;
		y += dy;

		//console.log({ dp, x });
		if (x < 0 || x > columns * pages.length - 1) {
			x -= dx;
			dx = 0;
			//console.log("end of row");
		}

		dp = Math.floor(x / columns) - p;
		p += dp;
		//console.log({ dp, x });

		if (p >= pages.length || p < 0) {
			p -= dp;
			x -= dx;
			dp = 0;
			dx = 0;
			//console.log("no more pages");
		}


		let items = getItems(p);

		if (y * columns >= items.length - 1) {
			let localX = x - p * columns;
			let maxX = (items.length - 1) % columns;
			if (maxX < localX) {
				if (dy) {
					y -= dy;
					dy = 0;
				} else {
					let toNextPage = columns - localX + 1;
					//console.log({ localX, maxX, toNextPage });
					//console.log(toNextPage);
					dx += toNextPage - 1;
					x += toNextPage - 1;
					dp += 1;
					p += 1;
					//console.log("to next page");
				}
			}
		}



		// if theres no more pages go back one
		if (p >= pages.length || p < 0) {
			p -= dp;
			x -= dx;
			dp = 0;
			dx = 0;
			//console.log("no more pages");
		}


		// Update Page Focus
		if (dp) {
			if (pages[p - dp]) pages[p - dp].style.display = "none"; //hide last page
			pages[p].style.display = null; // Show new page
			//console.log("change of page");
		}


		// check of column has ended
		if (y < 0) {
			let newY = 0;
			dy -= y - newY;
			y = newY;
			//console.log("end of column");
		}

		items = getItems(p);

		if (y * columns >= items.length - 1) {
			let newY = Math.ceil(items.length / columns - 1);
			dy -= y - newY;
			y = newY;
			//console.log("end of column");
		}


		let item = getSelected();
		if (!item) {
			x -= dx;
			y -= dy;
			p -= dp;
			dx = 0;
			dy = 0;
			dp = 0;
		}



		if (!dp && animations && Math.sqrt(dx * dx + dy * dy) == 1) {
			//Update Animations
			if (dy > 0) item.classList.add("down");
			if (dy < 0) item.classList.add("up");
			if (dx > 0) item.classList.add("right");
			if (dx < 0) item.classList.add("left");
			// fixes a bug where when you mouse over something
			// previously focussed with the keyboard it replays
			// movement animation
			setTimeout(() => {
				item.classList.remove("left", "right", "up", "down");
			}, 0);
		}

		//Update Item Focus
		item.focus({ focusVisible: true });
		onFocus(item);

		dp = dx = dy = 0;
	}

	function nextPage() {
		dp = 1;
		updateFocus();
	}

	function lastPage() {
		dp = -1;
		updateFocus();

	}

	function left() {
		dx = -1;
		updateFocus();
	}

	function right() {
		dx = 1;
		updateFocus();;
	}

	function up() {
		dy = -1;
		updateFocus();
	}

	function down() {
		dy = 1;
		updateFocus();
	}

	function goto(item) {
		let page = pages.indexOf(item.parentElement),
			items = getItems(page),
			i = items.indexOf(item),
			py = Math.floor(i / columns),
			px = i - py * columns,
			gx = page * columns + px;


		dy = py - y;
		dx = gx - x;;
		px = page - p;
		updateFocus();
	}

	function getItems(p) {
		//console.log({ p });
		if (pages[p]) return Array.from(pages[p].querySelectorAll(itemSelector));
	}

	function getPages() {
		return pages;
	}
	function setPages(newPages) {
		pages = newPages;
	}
	function getItem(p, x, y) {
		let localX = x - p * columns,
			i = y * columns + localX;
		let items = getItems(p);
		if (items) return items[i];
	}

	function getSelected() {
		//console.log({ p, x, y });
		return getItem(p, x, y);
	}

	function getPos() {
		let localX = x - p * columns;
		return {
			p, x, y, localX
		};
	}

	return {
		nextPage, lastPage, left, right, up, down, getSelected, getItems, getItem, goto, init, getPages, setPages, getPos
	};
}
