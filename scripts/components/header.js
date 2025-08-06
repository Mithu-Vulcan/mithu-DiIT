import { waitForConfig, replaceElement } from "../utils.js";

class CustomHeader extends HTMLElement {
	connectedCallback() {
		waitForConfig(() => this.render());
	}

	render() {
		const config = window.siteConfig;
		if (!config || !config.nav) return;

		let navList = "";
		for (const [name, link] of Object.entries(config.nav)) {
			navList += `
                <a href="${link}" target="_blank"><p class="navItem">${name}</p></a>
            `;
		}

		const htmlString = `
            <section class="headerSection">
                <a href="index.html">
					<div class="logo">${config.name}</div>
				</a>
                <div class="navItems">
                    ${navList}
                </div>
            </section>
        `;

        replaceElement(this, htmlString)
	}
}

customElements.define("custom-header", CustomHeader);
