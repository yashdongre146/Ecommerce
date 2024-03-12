const title = document.getElementById('title')
const imageUrl = document.getElementById('imageUrl')
const price = document.getElementById('price')
const description = document.getElementById('description')
const token = localStorage.getItem('token');


async function addProduct() {
  try {
    const productDetails = {
      title: title.value,
      imageUrl: imageUrl.value,
      price: price.value,
      description: description.value
    };
    const response = await axios.post('/addProduct', productDetails, {headers: {'auth': token}});
    console.log(response.data); // Log the response from the server
  } catch (error) {
    console.error("Error adding product:", error);
  }
}
