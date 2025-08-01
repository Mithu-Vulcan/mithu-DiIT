fetch("config.json")
.then((response) => response.json())
.then((config) => {
	window.siteConfig = config;
	document.dispatchEvent(new CustomEvent("configLoaded"));
	console.log("lodaded config")
})
.catch((err) => console.error("Failed to load config: ", err));

import "./components/header.js"
import "./components/banner.js"
import "./components/offer.js"
import "./components/review.js"
import "./components/footer.js"