function createMenu({
	pages,
	onFocus = (item) => { },
	itemSelector = "a",
	animations = false
}) {
	let p, i, items = [];


	function gotoPage(newPage) {
		if (!pages[newPage]) return;
		if (pages[p]) pages[p].style.display = "none";
		p = newPage;
		pages[p].style.display = null;
		i = 0;
		items = getItems(p);

		let rows = [], cols = [];
		for (const item of items) {
			let b = item.getBoundingClientRect();
			if (!rows[Math.round(b.y * 10)]) rows[Math.round(b.y * 10)] = [];
			rows[Math.round(b.y * 10)].push(items.indexOf(item));
			if (!cols[Math.round(b.x * 10)]) cols[Math.round(b.x * 10)] = [];
			cols[Math.round(b.x * 10)].push(items.indexOf(item));
		}
		rows = rows.filter(i => !!i);
		cols = cols.filter(i => !!i);
		for (let r in rows) {
			for (let i of rows[r]) {
				items[i].dataset.y = r;
			}
		}
		for (let c in cols) {
			for (let i of cols[c]) {
				items[i].dataset.x = c;
			}
		}
		updateFocus();
	}
	function setPages(newPages) {
		pages = newPages;
		if (!Array.isArray(pages)) pages = Array.from(pages);
		pages.forEach(page => page.style.display = "none");
		gotoPage(0);
	}

	function traverse(dx, dy) {
		let current = items[i],
			cb = current.getBoundingClientRect(),
			cx = (cb.left + cb.right) / 2,
			cy = (cb.top + cb.bottom) / 2;
		//console.log({ current, cx, cy });

		let rels = items.map((e, i) => {
			let eb = e.getBoundingClientRect(),
				ex = (eb.left + eb.right) / 2,
				ey = (eb.top + eb.bottom) / 2,
				mx = dx > 0 // right
					? eb.left - cb.right
					: dx < 0 // left
						? cb.left - eb.right
						: ex - cx,
				my = dy > 0 // down
					? eb.top - cb.bottom
					: dy < 0 //up
						? cb.top - eb.bottom
						: ey - cy,
				m = Math.sqrt(mx * mx + my * my),
				ux = mx / m,
				uy = my / m;

			return { i, e, ux, uy, m, my, mx };

		});
		rels = rels.filter(e => (e.i != i) && (!dx || e.ux > 0) && (!dy || e.uy > 0));
		rels = rels.sort((a, b) => a.m - b.m).sort((a, b) => (dx ? a.mx - b.mx : dy ? a.my - b.my : a.m - b.m));

		//console.log(rels);
		if (!rels.length) return;
		i = rels[0].i;
		let item = rels[0].e;

		if (animations && Math.sqrt(dx * dx + dy * dy) == 1) {
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
		updateFocus();
	}

	function updateFocus() {
		let current = items[i];
		current.focus({ focusVisible: true });
		onFocus(current);
	}

	function init() {
		setPages(pages);
	}



	function nextPage() {
		gotoPage(p++);
	}

	function lastPage() {
		gotoPage(p--);

	}

	function left() {
		traverse(-1, 0);
	}

	function right() {
		traverse(1, 0);
	}

	function up() {
		traverse(0, -1);
	}

	function down() {
		traverse(0, 1);
	}

	function goto(item) {
		i = items.indexOf(item);
		updateFocus();
	}



	function getPages() {
		return pages;
	}

	function getItems(p) {
		return Array.from(pages[p].querySelectorAll(itemSelector));
	}

	function getItem(p, x, y) {
	}

	function getSelected() {
		return items[i];
	}

	function getPos() {
		let current = items[i];
		let { x, y } = current.dataset;
		return { x, y };
	}



	return {
		nextPage, lastPage, left, right, up, down, getSelected, getItems, goto, init, getPages, setPages, getPos
	};
}
