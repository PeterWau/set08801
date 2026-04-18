import { User } from "../data/user.js";

function initialise() {
 
    const dataUser = new User();
    dataUser.load();

    const registerForm = document.querySelector("[register-form]");
    const register = document.querySelector("[register]");
    const registerUser = document.querySelector("[data-register-user]");
    const welcome = document.querySelector("[welcome]");

    setUser();

    function setUser() {

        if (dataUser.name !== "") {
            welcome.innerHTML = `Welcome ${dataUser.name}`;            
            registerForm.style.display = "none";
            return;
        }
    }
    
    register.addEventListener("click", event => {
        dataUser.register(registerUser.value);
        setUser();
    });
}

initialise();