window.addEventListener('DOMContentLoaded', async ()=>{
    const response = await axios.get('/getOrders');
    for (const order of response.data) {
        showOrderOnScreen(order);
        console.log(order);
    }
})

function showOrderOnScreen(order) {
    // Get the container element
    var container = document.querySelector('.container');

    // Create a new order div
    var orderDiv = document.createElement('div');
    orderDiv.classList.add('order');

    // Create and append order header
    var orderHeader = document.createElement('div');
    orderHeader.classList.add('order-header');
    orderHeader.textContent = 'Order - #' + order._id;
    orderDiv.appendChild(orderHeader);

    // Loop through each product in the order and create product divs
    order.products.forEach(function(product) {
        var productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.textContent = product.productTitle + ' (' + product.quantity + ')';
        orderDiv.appendChild(productDiv);
    });

    // Append the order div to the container
    container.appendChild(orderDiv);
}
