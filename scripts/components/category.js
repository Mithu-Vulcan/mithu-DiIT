import { waitForConfig, replaceElement } from "../utils.js";

class CustomCat extends HTMLElement {
	connectedCallback() {
		waitForConfig(() => this.render());
	}

	render() {
		const config = window.siteConfig;
		if (!config || !config.nav) return;

		const cat = this.getAttribute("cat");
		const cats = ["men", "women", "kids", "accessories"];

		let cards = "";

		if (cat == "deals") {
			cats.forEach((cat) => {
				for (const item of config[`${cat}-items`]) {
					// Escape attribute values to handle quotes and special characters
					const escapedName = item.name
						.replace(/"/g, "&quot;")
						.replace(/'/g, "&#39;");
					const escapedPath = item.path
						.replace(/"/g, "&quot;")
						.replace(/'/g, "&#39;");
					if (item.discount) {
						cards += `
						<custom-card name="${escapedName}" price="${item.price}" units="${
							item.stock
						}" path="${escapedPath}" ${
							item.discount ? "disc" : ""
						} percentage="30" uid=${item.uid}></custom-card>`;
					}
				}
			})
		} else if (cat == "new") {
			cats.forEach((cat) => {
				for (let i = 0; i < 1; i++) {
					for (const item of config[`${cat}-items`].slice(0,2)) {
						// Escape attribute values to handle quotes and special characters
						const escapedName = item.name
							.replace(/"/g, "&quot;")
							.replace(/'/g, "&#39;");
						const escapedPath = item.path
							.replace(/"/g, "&quot;")
							.replace(/'/g, "&#39;");

						cards += `
					<custom-card name="${escapedName}" price="${item.price}" units="${
							item.stock
						}" path="${escapedPath}" ${
							item.discount ? "disc" : ""
						} percentage="30"  uid=${item.uid}></custom-card>
				`;
					}
				}
			});
		} else {
			for (const item of config[`${cat}-items`]) {
				// Escape attribute values to handle quotes and special characters
				const escapedName = item.name
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&#39;");
				const escapedPath = item.path
					.replace(/"/g, "&quot;")
					.replace(/'/g, "&#39;");

				cards += `
					<custom-card name="${escapedName}" price="${item.price}" units="${
					item.stock
				}" path="${escapedPath}" ${
					item.discount ? "disc" : ""
				} percentage="30" uid=${item.uid}></custom-card>
				`;
			}
		}

		const htmlString = `
            <section class="category">
			    <div class="itemCards">
                    ${cards}
			    </div>
		    </section>
        `;

		replaceElement(this, htmlString);
	}
}

customElements.define("custom-category", CustomCat);
