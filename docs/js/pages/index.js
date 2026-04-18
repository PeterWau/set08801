import { User } from "../data/user.js";
import { PractiseSession, PractiseSessions } from "../data/practiseSession.js";
import { Clubs, Flights, SkillTags } from "../data/staticData.js" 

function initialise() {
 
    // objects
    const dataUser = new User();
    const dataPractices = new PractiseSessions();
    dataUser.load();


    const registerForm = document.querySelector("[register-form]");
    const register = document.querySelector("[register]");
    const registerUser = document.querySelector("[data-register-user]");
    const welcome = document.querySelector("[welcome]");
    const dashboardMissing = document.querySelector("[dashboard-missing]");

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

    // Gaps
    let gaps = dataPractices.dashboardMissing();

    gaps.forEach(missing => {
        const listItem = document.createElement("li");
    
        listItem.innerHTML = `${missing}`;
        dashboardMissing.append(listItem);
    });

}

initialise();