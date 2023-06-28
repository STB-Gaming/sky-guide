let lists = Array.from(document.getElementsByClassName("item-list"));
let tabs = Array.from(document.getElementsByClassName("header-item"));
let currentList = 1;

function openList(id) {
	hideAll();
	if (id < 4) {
		currentList = id;
		tabs.forEach(t => t.classList.remove("active"));
		tabs[id].classList.add("active");
	}

	let list = lists[id];

	list.style.display = null;
	list.children[0].focus();
}


function hideAll() {
	lists.forEach(itemList => {
		itemList.style.display = "none";
	});
}



document.addEventListener("keyup", event => {
	if (event.keyCode == 37 && currentList != 0) {
		// go left
		openList(currentList - 1);
	} else if (event.keyCode == 39 && currentList != 3) {
		// go right
		openList(currentList + 1);
	}
});

openList(1);
