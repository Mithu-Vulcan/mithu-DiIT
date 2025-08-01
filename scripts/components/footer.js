import { waitForConfig, replaceElement } from "../utils.js";

class Footer extends HTMLElement {
	connectedCallback() {
		waitForConfig(() => this.render());
	}

	render() {
		const config = window.siteConfig;
		if (!config || !config.nav) return;

        const logo = config.name
        const name = "J.J.Mithushanth"
        const num = config.phone 
        const mail = config.gmail

        const ig = config.ig
        const wp = config.wp
        const gh = config.gh

        const about = config.about


		let navList = "";
		for (const [name, link] of Object.entries(config.nav)) {
			navList += `
                <a href="/pages/${link}" target="_blank"><p class="quicklinkItem">${name}</p></a>
            `;
		}

		const htmlString = `
            <section class="footerSection" id="footer">
                <div class="L">
                    <p class="footerLogo">${logo}</p>
                    <div class="footerMyInfo">
                    <p class="footerName">Made by :</p>
                    <p class="footerName">${name} (E260194)</p>
                    <p class="footerPhone">${num}</p>
                        <p class="footerMail">${mail}</p>
                    </div>
                    <div class="socials">
                        <a href="${gh}" target="_blank">
                            <img src="assets/icons/github.png" alt="GitHub" />
                        </a>
                        <a href="${ig}" target="_blank">
                            <img src="assets/icons/instagram.png" alt="Instagram" />
                        </a>
                        <a href="${wp}" target="_blank">
                            <img src="assets/icons/whatsapp.png" alt="Whatsapp" />
                        </a>
                    </div>
                </div>
                <div class="M">
                    <p class="quicklinkHead">Quick Links</p>
                    ${navList}
                </div>
                <div class="R">
                    <p class="aboutHead">About Us</p>
                    <p class="aboutText">${about}</p>
                </div>
            </section>
        `;

        replaceElement(this, htmlString)
	}
}

customElements.define("custom-footer", Footer);
