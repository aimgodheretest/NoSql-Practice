const form = document.getElementById("productForm");
const params = new URLSearchParams(window.location.search);
const editMode = params.get("edit") === "true";
const productId = params.get("productId");

if (editMode && form) {
  loadProduct();
}
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
    let response;

    if (editMode) {
      // Update existing product
      response = await fetch(`${BASE_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    } else {
      // Create new product
      response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    }

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    alert(data.message);

    form.reset();

    window.location.href = "/admin-products";
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

// -------------------------
// Load Product for Edit
// -------------------------

async function loadProduct() {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);

    if (!response.ok) {
      throw new Error("Unable to fetch product");
    }

    const product = await response.json();

    document.getElementById("title").value = product.title;
    document.getElementById("productUrl").value = product.productUrl;
    document.getElementById("price").value = product.price;
    document.getElementById("description").value = product.description;

    // Update UI
    const title = document.getElementById("pageTitle");
    if (title) {
      title.textContent = "Edit Product";
    }

    document.getElementById("submitBtn").textContent = "Update Product";
  } catch (err) {
    console.log(err);
  }
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
