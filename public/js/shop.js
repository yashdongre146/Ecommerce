const token = localStorage.getItem('token');


window.addEventListener('DOMContentLoaded', async ()=>{
    const response = await axios.get('/getProducts', {headers: {'auth': token}});
    for (const product of response.data) {
        showProductOnScreen(product);
        console.log(product);
    }
})

async function getProducts() {
    try {
      const response = await axios.get('/getProducts', {headers: {'auth': token}});
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

function showProductOnScreen(product) {
    const cardContainer = document.getElementById("card-container");

    var cardInnerHTML = `<div class="card"><h2>${product.title}</h2>
    <img src="${product.imageUrl}" alt="Product Image" height="200" width="150">
    <p>$${product.price}</p>
    <p>${product.description}</p>
    <button class="btn" onclick="showDetails('${product._id}')">Details</button>
    <button class="btn" onclick="addToCart('${product._id}')">Add to Cart</button></div>`;
  
    cardContainer.insertAdjacentHTML("beforeend", cardInnerHTML);
}

async function showDetails(productId) {
    const response = await axios.get(`/showDetails/${productId}`, {headers: {'auth': token}})
    console.log(response);
}
async function addToCart(productId) {
    const response = await axios.get(`/addToCart/${productId}`, {headers: {'auth': token}})
    alert(response.data.message);
}