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

                <img src="${item.productUrl}" alt="${item.title}">

                <div class="order-details">

                    <h3>${item.title}</h3>

                    <p><strong>₹${item.price}</strong></p>

                    <p>Quantity : ${item.quantity}</p>

                    <p>${item.description}</p>

                </div>

            </div>

            `;
    });

    html += `</div>`;
  });

  container.innerHTML = html;
}
