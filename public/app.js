const hamburger = document.getElementById ("hamburger")
const collapsed_menu = document.getElementById ("collapsed-menu")
const close = document.getElementById ("close")
hamburger.addEventListener("click", ()=> {
    collapsed_menu.classList.toggle('hidden')
    hamburger.classList.toggle('hidden')
    close.classList.toggle('hidden')
})
close.addEventListener("click", ()=> {
    collapsed_menu.classList.toggle('hidden')
    hamburger.classList.toggle('hidden')
    close.classList.toggle('hidden')
})