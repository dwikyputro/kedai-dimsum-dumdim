//toggle class active
const navbarNav = document.querySelector('.navbar-nav');
//menu di klik
document.querySelector('#menu').onclick = () =>{
    navbarNav.classList.toggle('active');
};

//toggle class active untuk menu
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-btn').onclick = (e) =>{
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
}

//toggle class active untuk cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-btn').onclick = (e) =>{
    shoppingCart.classList.toggle('active');
    e.preventDefault();
}

//klik di luar elemen
const menu = document.querySelector('#menu');
const sb = document.querySelector('#search-btn');
const sc = document.querySelector('#shopping-cart-btn');

document.addEventListener('click', function(e){
    if(!menu.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
    if(!sb.contains(e.target) && !searchForm.contains(e.target)){
        searchForm.classList.remove('active');
    }
    if(!sc.contains(e.target) && !shoppingCart.contains(e.target)){
        shoppingCart.classList.remove('active');
    }
});

