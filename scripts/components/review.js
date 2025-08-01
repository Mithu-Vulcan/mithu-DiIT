import { waitForConfig, replaceElement } from "../utils.js";

class Review extends HTMLElement {
    connectedCallback() {
        waitForConfig(() => this.render());
    }

    render () {
        const config = window.siteConfig
        const text = config.review
        const reviewHead = "What our fans are saying."

        const htmlString = `
            <section class="reviewSection" id="review">
                <p class="reviewHead">${reviewHead.toUpperCase()}</p>
                <p class="reviewText">${text}</p>
                <p class="reviewName">S.Akshe</p>
            </section>
        `

        replaceElement(this, htmlString)
    }
}

customElements.define("custom-review", Review);
