const title = document.getElementById('title')
const imageUrl = document.getElementById('imageUrl')
const price = document.getElementById('price')
const description = document.getElementById('description')

async function updateProduct(e) {
  e.preventDefault();
    // Extract product ID from the URL
    const productId = window.location.pathname.split('/').pop();
  try {
    const productDetails = {
      title: title.value,
      imageUrl: imageUrl.value,
      price: price.value,
      description: description.value
    };
    const response = await axios.post(`/updateProduct/${productId}`, productDetails);
    alert(response.data.message);
    window.location.href = '/adminproducts'
  } catch (error) {
    console.error("Error adding product:", error);
  }
}
