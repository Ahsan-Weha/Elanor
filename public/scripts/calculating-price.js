
const buttonMain = document.getElementById('btn');
const bottleQun = document.getElementById('quantity');


bottleQun.addEventListener('change', totalPrice);

function totalPrice() {
    const price = document.getElementById('price');
    const subTotal = document.getElementById('sub-total');
    subTotal.textContent = bottleQun.value * price.textContent;
    console.log(subTotal);
}

