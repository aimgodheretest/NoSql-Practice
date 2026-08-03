document.addEventListener("DOMContentLoaded", loadAdminProducts);

async function loadAdminProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("Unable to fetch products");
    }

    const products = await response.json();

    console.log(products);

    renderProducts(products);
  } catch (err) {
    console.log(err);
  }
}

function renderProducts(products) {
  const container = document.getElementById("adminProductsContainer");

  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `
    
      <div class="product-card">

        <img src="${product.productUrl}" alt="${product.title}">

        <h3>${product.title}</h3>

        <p><strong>₹${product.price}</strong></p>

        <p>${product.description}</p>

        <div class="admin-buttons">

            <button onclick="editProduct('${product._id}')">
                Edit
            </button>

            <button class="delete-btn"
                onclick="deleteProduct('${product._id}')">
                Delete
            </button>

        </div>

      </div>

    `;
  });
}

async function deleteProduct(productId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this product?",
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    alert(data.message);

    // Reload products after deletion
    loadAdminProducts();
  } catch (err) {
    console.log(err);
    alert("Unable to delete product");
  }
}
function editProduct(productId) {
  window.location.href = `/add-product?edit=true&productId=${productId}`;
}
