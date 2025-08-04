import { waitForConfig, replaceElement } from "../utils.js";

class CustomCat extends HTMLElement {
	connectedCallback() {
		waitForConfig(() => this.render());
	}

	render() {
		const config = window.siteConfig;
		if (!config || !config.nav) return;

		const cat = this.getAttribute("cat");

		let cards = "";

		for (const item of config[`${cat}-items`]) {
			console.log(item.name);
			
			// Escape attribute values to handle quotes and special characters
			const escapedName = item.name.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
			const escapedPath = item.path.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
			
			            cards += `
                <custom-card name="${escapedName}" price="${item.price}" units="${item.stock}" path="${escapedPath}" ${item.discount ? "disc" : ""} percentage="30"></custom-card>
            `;
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