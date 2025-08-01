import { waitForConfig, replaceElement } from "../utils.js";

class OfferStrip extends HTMLElement {
	connectedCallback() {
		waitForConfig(() => this.render());
	}

    render () {
        const config = window.siteConfig
        const text = config.offerText

        const htmlString = `
            <div class="offerStrip">
                <p>${text}</p>
            </div>
        `

        replaceElement(this, htmlString)
    }
}

customElements.define("custom-strip", OfferStrip);
