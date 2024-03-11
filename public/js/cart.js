window.addEventListener('DOMContentLoaded', async ()=>{
  const response = await axios.get('/getCart');
  for (const productInCart of response.data) {
      showCartOnScreen(productInCart);
      console.log(productInCart);
  }
})



function showCartOnScreen(product) {
  // Implement logic to remove item from the cart
  const cartData = document.getElementById("cart-data");
  var cartDataInnerHTML = `
      <tr>
        <td>${product.productTitle}</td>
        <td>${product.quantity}</td>
        <td><button onclick="removeItem()">Delete</button></td>
      </tr>`;

      cartData.insertAdjacentHTML("beforeend", cartDataInnerHTML);
}
function removeItem() {
  // Implement logic to remove item from the cart
  
}

function orderNow() {
  // Implement logic to proceed to order checkout
}
