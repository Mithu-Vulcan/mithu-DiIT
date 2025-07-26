export function waitForConfig(callback) {
	if (window.siteConfig) {
		callback();
	} else {
		document.addEventListener("configLoaded", callback, { once: true });
	}
}

export function replaceElement(el, htmlString) {
	const temp = document.createElement("div");
	temp.innerHTML = htmlString;

	const parent = el.parentNode;
	while (temp.firstChild) {
		parent.insertBefore(temp.firstChild, el);
	}
	parent.removeChild(el);
}
