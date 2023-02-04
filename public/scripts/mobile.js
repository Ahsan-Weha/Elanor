const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');

const mobileMenuElement = document.getElementById('mobile-menu');


function toggleMobileMenu() {
    mobileMenuElement.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);



//
const formElement = document.getElementById('searchform');
const searchbtnElement = document.getElementById('searchbtn');
const icon = document.querySelector('#searchbtn i');

function openSearch() {
    formElement.classList.toggle('openbar');
    icon.classList.toggle("fa-magnifying-glass");
    icon.classList.toggle("fa-xmark");
}


searchbtnElement.addEventListener('click', openSearch);