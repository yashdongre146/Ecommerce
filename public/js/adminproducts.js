window.addEventListener('DOMContentLoaded', async ()=>{
    const response = await axios.get('/getProducts');
    for (const product of response.data) {
        showProductOnScreen(product);
        console.log(product);
    }
})

async function getProducts() {
    try {
      const response = await axios.get('/getProducts');
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

function showProductOnScreen(product) {
    const card = document.getElementById("card");

    var cardInnerHTML = `<h2>${product.title}</h2>
    <img src="${product.imageUrl}" alt="Product Image">
    <p>$${product.price}</p>
    <p>${product.description}</p>
    <a class="btn" href="/editProduct/${product._id}">Edit</a>
    <button class="btn" onclick="deleteProduct('${product._id}')">Delete</button>`;
  
    card.insertAdjacentHTML("beforeend", cardInnerHTML);
}

async function deleteProduct(productId) {
    const response = await axios.delete(`/deleteProduct/${productId}`)
    alert(response.data.message);
    window.location.href = '/adminproducts'
}