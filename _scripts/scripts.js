
import React from 'react'
import ReactDOM from 'react-dom'
import Deals from './components/Deals'
import SavedDeals from './components/SavedDeals'

let dataBox = document.getElementById("data-box")
let savedDeals = document.getElementById("saved")

ReactDOM.render( <Deals />, dataBox )
ReactDOM.render( <SavedDeals />, savedDeals )

const menuToggle = document.querySelector(".sidebar__toggle");
const menuClose = document.querySelector(".sidebar__header .ch-btn");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", function() {
  sidebar.classList.toggle("ch-display--none")
})

menuClose.addEventListener("click", function() {
  sidebar.classList.toggle("ch-display--none")
})