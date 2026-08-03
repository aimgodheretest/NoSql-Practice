document.addEventListener("DOMContentLoaded", loadCart);
const orderBtn = document.getElementById("orderBtn");
orderBtn.addEventListener("click", placeOrder);
if (orderBtn) {
  orderBtn.addEventListener("click", placeOrder);
}
async function loadCart() {
  try {
    const response = await fetch(`${BASE_URL}/cart/${USER_ID}`);

    if (!response.ok) {
      throw new Error("Unable to fetch cart");
    }

    const products = await response.json();

    console.log(products);

    renderCart(products);
  } catch (err) {
    console.log(err);
  }
}

function renderCart(products) {
  const container = document.getElementById("cartContainer");

  if (products.length === 0) {
    container.innerHTML = `
            <h2>Your cart is empty</h2>
        `;

    return;
  }

  let html = "";

  products.forEach((product) => {
    html += `
            <div class="cart-item">

                <img src="${product.productUrl}" alt="${product.title}">

                <div class="cart-details">

                    <h3>${product.title}</h3>

                    <p><strong>₹${product.price}</strong></p>

                    <p><strong>Quantity:</strong> ${product.quantity}</p>

                    <p>${product.description}</p>

                </div>

                <button onclick="deleteFromCart('${product._id}')">
                   Delete
                </button>

            </div>
        `;
  });

  container.innerHTML = html;
}

async function deleteFromCart(productId) {
  try {
    const response = await fetch(`${BASE_URL}/cart/${USER_ID}/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Unable to delete product");
    }

    const data = await response.json();

    alert(data.message);

    loadCart();
  } catch (err) {
    console.log(err);

    alert(err.message);
  }
}

async function placeOrder() {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId: USER_ID,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to place order");
    }

    const data = await response.json();

    alert(data.message);

    loadCart();
  } catch (err) {
    console.log(err);

    alert(err.message);
  }
}
