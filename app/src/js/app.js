
const showMenu = document.getElementById('iconMenu')
const hideMenu = document.getElementById('closeMenu')


import '../styles/style.css'
import '../assets/close.svg'
import '../assets/menu.svg'
import '../assets/logo.svg'

function handleShowMenu() {
    //document.getElementById('content').style.display = 'flex'
    //document.getElementById('menu').style.maxWidth = '35%'
    document.getElementById('menu').style.display = 'block'
    
}

function handleHideMenu() {
    //document.getElementById('content').style.display = 'none'
    //document.getElementById('menu').style.maxWidth = '0'
    document.getElementById('menu').style.display = 'none'
    
}


showMenu.addEventListener('click', handleShowMenu );
hideMenu.addEventListener('click', handleHideMenu );

