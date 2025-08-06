import { waitForConfig, replaceElement } from "../utils.js";

class CustomCard extends HTMLElement {
	connectedCallback() {
		waitForConfig(() => this.render());
	}

	// Helper function to decode HTML entities
	decodeHtmlEntities(str) {
		const textarea = document.createElement("textarea");
		textarea.innerHTML = str;
		return textarea.value;
	}

	render() {
		const config = window.siteConfig;
		if (!config || !config.nav) return;

		// Decode the HTML entities when reading attributes
		const name = this.decodeHtmlEntities(
			this.getAttribute("name") || "Default name"
		);
		const price = this.getAttribute("price") || 4000;
		const percentage = this.getAttribute("percentage") || 30;
		const units = this.getAttribute("units") || 50;
		const path = this.decodeHtmlEntities(
			this.getAttribute("path") ||
				"assets/men/DKDC College Eagles Long Sleeve Blue T-Shirt.webp"
		);

		const nowPrice = (price * (100 - percentage)) / 100;

		let disc = false;
		let red = false;

		if (this.hasAttribute("disc")) {
			disc = true;
		}

		if (units < 10) {
			red = true;
		}

		const cardPriceDiscDiv = `
            <div class="cardPriceDiv">
				<p class="cardPrice">Rs.${nowPrice}.00</p>
				<p class="cardDisc">Rs.${price}.00</p>
				<p class="cardPercentage">-${percentage}%</p>
			</div>
        `;

		const cardPriceDiv = `
            <div class="cardPriceDiv">
				<p class="cardPrice">Rs.${price}.00</p>
			</div>
        `;

		console.log(path);

		const htmlString = `
            <div class="card">
					<div class="cardImg">
						<img
							src="${path}"
							alt="${name}"
						/>
					</div>
					<div class="cardText">
						<p class="cardDesc">${name}</p>
						${disc ? cardPriceDiscDiv : cardPriceDiv}
						<p class='cardUnits ${red ? "less" : ""}'>Only ${units} left</p>
						<a href="product.html"><p class="cardBuy">Buy Now</p></a>
					</div>
				</div>
        `;

		replaceElement(this, htmlString);
	}
}

customElements.define("custom-card", CustomCard);
