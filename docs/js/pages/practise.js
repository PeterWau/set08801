import { PractiseSession, PractiseSessions } from "../data/practiseSession.js";

function initialise() {

    const dataPractises = new PractiseSessions();
    dataPractises.load();

    const practiseSessions = dataPractises.getAll();

    // document
    const list = document.querySelector("[data-practises]");
    const id = document.querySelector("[data-id]");
    const skill = document.querySelector("[data-skill]");

    const addToHistory = practise => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        
        link.innerHTML = practise.id;
        listItem.id = "his-" + practise.id;
        listItem.append(link);

        link.addEventListener("click", () => {
            selectedId = practise.id;
            selectedPractise = dataPractises.get(selectedId);
            fillForm(selectedPractise);
        });

        list.appendChild(listItem);
    }

    // each entry
    practiseSessions.forEach(practise => {
        addToHistory(practise);
    });
    
    const fillForm = practise => {
        if (!practise) {
            return;
        }
  
        id.value = practise.id;
        skill.value = practise.skill;
    }
}

initialise();