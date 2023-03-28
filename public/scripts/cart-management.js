const addToCartBtnElement = document.getElementById('cartbtn');
const cartBadgeElement = document.getElementById('badge');

async function addToCart() {
    const productId = addToCartBtnElement.dataset.productid;
    

    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                productId: productId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        alert('Something went wrong!');
        return;
    }

    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }

    const responseData = await response.json();

    const newTotalQuantity = responseData.newTotalItems;

    cartBadgeElement.textContent = newTotalQuantity;

}

addToCartBtnElement.addEventListener('click', addToCart);