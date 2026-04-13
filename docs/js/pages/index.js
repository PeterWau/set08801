import { register, login, currentUser} from "../services/userService.js";

// elements
const userFormElement = document.getElementById("userFormEl");
const userElement = document.getElementById("userEl");
const registerBtn = document.getElementById("registerEl");
const loginBtn = document.getElementById("loginEl");

function redirect() {
    window.location.href = "dashboard.html";
}

// events
function load() {
    //userFormElement.hidden = currentUser == null;
    //registerBtn.hidden = currentUser == null;
    //loginBtn.hidden = currentUser != null;
};

// login user
loginBtn.addEventListener("click", function () {
    if (login(userElement.value)) redirect();
});

// register user
registerBtn.addEventListener("click", function () {
    if(register(userElement.value)) redirect();
});

