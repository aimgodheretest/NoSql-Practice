const form = document.getElementById("productForm");

// -------------------------
// Add Product
// -------------------------

if (form) {
  form.addEventListener("submit", addProduct);
}

async function addProduct(e) {
  e.preventDefault();

  const product = {
    title: document.getElementById("title").value,
    productUrl: document.getElementById("productUrl").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value,
  };

  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Unable to create product");
    }

    const data = await response.json();

    alert(data.message);

    form.reset();

    window.location.href = "/products-page";
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

/*
Load Products
*/

const productsContainer = document.getElementById("productsContainer");

if (productsContainer) {
  loadProducts();
}

async function loadProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("Unable to fetch products");
    }

    const products = await response.json();

    let html = "";

    products.forEach((product) => {
      html += `
        <div class="product-card">

            <img src="${product.productUrl}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p><strong>₹${product.price}</strong></p>

            <p>${product.description}</p>

            <button onclick="addToCart('${product._id}')">
                Add To Cart
            </button>

        </div>
      `;
    });

    productsContainer.innerHTML = html;
  } catch (err) {
    console.log(err);
  }
}

/*
Add To Cart 
*/

async function addToCart(productId) {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId: USER_ID,

        productId: productId,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to add product to cart");
    }

    const data = await response.json();

    alert(data.message);
  } catch (err) {
    console.log(err);

    alert(err.message);
  }
}
