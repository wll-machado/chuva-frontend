const sideMenu = document.querySelector('.side-menu');
const mobile = document.querySelector('.mobile');
const arrow = document.querySelector('.arrow');

mobile.addEventListener('click', ()=>{
    sideMenu.classList.toggle('left');
    mobile.classList.toggle('mobile-left');
    arrow.classList.toggle('rotate');

})