
const accountBtnElement = document.getElementById('accountbtn');

const accountElement = document.getElementById('account');


function toggleMobileMenu() {
    accountElement.classList.toggle('opn');
}

accountBtnElement.addEventListener('click', toggleMobileMenu);