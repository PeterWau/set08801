import { PractiseSession, PractiseSessions } from "../data/practiseSession.js";

function initialise() {

    const dataPractises = new PractiseSessions();
    dataPractises.load();

    const practiseSessions = dataPractises.getAll();

    // actions
    const add = document.querySelector("[data-new]");
    const save = document.querySelector("[data-save]");

    // document
    const list = document.querySelector("[data-practises]");

    // inputs
    const id = document.querySelector("[data-id]");
    const date = document.querySelector("[data-date]");
    const skill = document.querySelector("[data-skill]");
    const club = document.querySelector("[data-club]");
    const distance = document.querySelector("[data-distance]");
    const shape = document.querySelector("[data-shape]");
    
    // message
    const message = document.querySelector("[data-message]");

    // selected
    var selected = new PractiseSession();
    let selectedId = null;

    const addToHistory = practise => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        
        link.innerHTML = `${practise.sessionDate}: ${practise.skill}`;
        listItem.id = "his-" + practise.id;
        listItem.append(link);

        link.addEventListener("click", () => {
            selectedId = practise.id;
            selected = dataPractises.get(selectedId);
            fillForm(selected);
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
        date.value = practise.sessionDate;
        skill.value = practise.skill;
        club.value = practise.club;
        distance.value = practise.distance;
        shape.value = practise.shape;
    }
    
    add.addEventListener("click", event => {
        selectedId = null;
        const addPractice = new PractiseSession();

        fillForm(addPractice);
    });

    save.addEventListener("click", event => {
        event.preventDefault();

        let isNew = (selectedId == null);
        let updated = new PractiseSession();
        
        updated.id=selectedId;
        updated.sessionDate = date.value;
        updated.skill=skill.value;
        updated.club=club.value;
        updated.distance=distance.value;
        updated.shape=shape.value;
        
        const newPractise = dataPractises.update(updated);
        fillForm(newPractise);
        
        // only add new entries to library
        if (isNew) {
            addToHistory(newPractise);
        }
        message.innerHTML = "Saved";
    });
}

initialise();