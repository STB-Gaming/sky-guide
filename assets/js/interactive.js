function upNext(name) {
	let upnextContainer = document.createElement("div");
	upnextContainer.classList.add("upnext-container");
	document.body.appendChild(upnextContainer);


	let upNext = document.createElement("div");
	upNext.classList.add("upnext");

	let title = document.createElement("p");
	title.innerText = "Coming next...";
	let text = document.createElement("p");
	text.innerText = name;

	upNext.appendChild(title);
	upNext.appendChild(text);



	upnextContainer.appendChild(upNext);

	upnextContainer.addEventListener("click", () => {
		upnextContainer.remove();
	});

	return upnextContainer;
}


menu.getItems(0).forEach(item => {
	item.addEventListener("click", e => {
		e.preventDefault();

		upNext(item.innerText);
		setTimeout(() => {
			window.location = item.href;
		}, 500);
	});
});
