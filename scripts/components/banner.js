import { waitForConfig, replaceElement } from "../utils.js";

class Banner extends HTMLElement {
	connectedCallback() {
		waitForConfig(() => this.render());
	}

	render() {
		const config = window.siteConfig;
		if (!config || !config.nav) return;
		const name = this.getAttribute("name") || "Default";
        const lowerName = name.toLowerCase()
		const rev = this.hasAttribute("rev");
		const logo = config.name
		const logoUpper = logo.toUpperCase()

        const desc = config.banner[name]
        console.log(rev)

		const htmlString = `
            <section class="banner ${rev ? "bannerReverse": "" }" id="${lowerName}-banner">
			<div class="bannerText">
				<p class="name ${rev ? "revText": "" }">${logoUpper} ${name}</p>
				<p class="desc ${rev ? "revText": "" }">
					${desc}
				</p>
				<button class="button ${rev ? "revBtn": "" }" onclick="location.href='${lowerName}.html'">
					Go to Page
				</button>
			</div>
			<div class="bannerImg">
				<img src="assets/${lowerName}/${lowerName}-banner.jpg" alt="${lowerName}" />
			</div>
		</section>
        `;

		replaceElement(this, htmlString);
	}
}

customElements.define("custom-banner", Banner);
