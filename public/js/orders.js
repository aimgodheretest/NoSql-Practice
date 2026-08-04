document.addEventListener("DOMContentLoaded", loadOrders);

async function loadOrders() {
  try {
    const response = await fetch(`${BASE_URL}/orders/${USER_ID}`);

    if (!response.ok) {
      throw new Error("Unable to fetch orders");
    }

    const orders = await response.json();

    console.log(orders);

    renderOrders(orders);
  } catch (err) {
    console.log(err);
  }
}

function renderOrders(orders) {
  const container = document.getElementById("ordersContainer");

  if (orders.length === 0) {
    container.innerHTML = "<h2>No Orders Yet</h2>";

    return;
  }

  let html = "";

  orders.forEach((order, index) => {
    html += `

        <div class="order-card">

            <h2>Order #${index + 1}</h2>

        `;

    order.items.forEach((item) => {
      html += `
        <div class="order-item">

            <img src="${item.product.productUrl}" alt="${item.product.title}">

            <div class="order-details">

                <h3>${item.product.title}</h3>

                <p><strong>₹${item.product.price}</strong></p>

                <p><strong>Quantity:</strong> ${item.quantity}</p>

                <p>${item.product.description}</p>

            </div>

        </div>
    `;
    });

    html += `</div>`;
  });

  container.innerHTML = html;
}
