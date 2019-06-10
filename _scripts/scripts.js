
import React from 'react'
import ReactDOM from 'react-dom'
import Deals from './components/Deals'

let dataBox = document.getElementById("data-box")

ReactDOM.render( <Deals />, dataBox )

const menuToggle = document.querySelector(".sidebar__toggle");
const menuClose = document.querySelector(".sidebar__header .ch-btn");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", function() {
  sidebar.classList.toggle("ch-display--none")
})

menuClose.addEventListener("click", function() {
  sidebar.classList.toggle("ch-display--none")
})