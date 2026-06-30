//Menu mobile button
const mobile_button_menu = document.getElementById("mobile_button_menu");
const mobile_menu = document.getElementById("mobile_menu");

mobile_button_menu.addEventListener("click", () =>{
    mobile_button_menu.classList.toggle("closed");
    mobile_menu.classList.toggle("closed");
});