import { waitForConfig, replaceElement } from "../utils.js";

class Product extends HTMLElement {
  connectedCallback() {
    waitForConfig(() => this.render());
  }

  render() {
    function findProductByUid(config, uid) {
      const categories = [
        "men-items",
        "women-items",
        "kids-items",
        "accessories-items",
      ];

      for (const category of categories) {
        const product = config[category].find((p) => p.uid === uid);
        if (product) {
          return product;
        }
      }

      return null;
    }

    const config = window.siteConfig;
    if (!config) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    if (!productId) {
      console.error("Product ID not found in URL");
      window.location.href = "/";
      return;
    }

    const product = findProductByUid(config, productId);

    if (product) {
      console.log("Found product:", product);
    } else {
      console.log("No product found with uid", productId);
    }

    const productName = product.name || "Product Name";
    const productPrice = product.price || "0.00";
    const stock = product.stock || 0;
    const discount = product.discount || false;
    const productImage =
      product.path ||
      "assets/men/DKDC Basic Embossed Printed Oversize Men's Tshirt.webp";
    const productInfo = product.info || "No description available.";
    const discountedPrice = productPrice * 0.7;

    const htmlString = `
            <section class="product">
			<div class="productDiv">
				<div class="remProductImg">
					<img src="${productImage}" alt="Cap" />
				</div>
				<div class="productTexts">
					<p class="productTitle">${productName}</p>
					<p class="productPrice">Rs.${discount ? discountedPrice : productPrice}.00</p>
					<p class="productAvailability">Availability: ${stock == 0 ? "Not Available" : "In Stock"} (Only ${stock} left)</p>
					<p class="productBrand">Brand: NA</p>
					<div class="productButtons">
						<button class="buyBtn">Buy Now</button>
						<button class="cartBtn">Add to Cart</button>
					</div>
					<div class="productInformationDiv">
						<p class="productInfoTitle">Product Information</p>
						<p class="productInfoText">
							${productInfo}
						</p>
					</div>
					<div class="delivery">
						<p class="deliveryInfoTitle">Delivery Information</p>
						<p class="deliveryInfoSubTitle">
							*2 - 3 Working Days from the date of product availability
						</p>
						<p class="deliveryInfoText">
							We work with trusted and exceptional courier services to make sure
							your order is received safely on time. Delivery times will be from
							Monday to Saturday and will not occur on Sundays & Mercantile
							Holidays. There is an additional cost for delivery. Any orders
							placed on weekends will be dispatched on Monday. We will try our
							best to accommodate any special delivery instructions; however
							this may cause an extra delay from our normal delivery timings. *
							We will try our best to deliver orders within the allocated
							delivery time. However there may be unforeseen circumstances that
							may cause a delivery to be delayed. If this occurs we apologize in
							advance and will aim to get the order to you as soon as we can.
						</p>
					</div>
				</div>
			</div>
		</section>
        `;

    replaceElement(this, htmlString);
  }
}

customElements.define("custom-product", Product);
