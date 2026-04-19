import { PractiseSession, PractiseSessions } from "../data/practiseSession.js";
import { Clubs, Flights, SkillTags } from "../data/staticData.js" 

function initialise() {

    const dataPractises = new PractiseSessions();
    dataPractises.load();

    const practiseSessions = dataPractises.getAll();

    // actions
    const list = document.getElementById("practises");
    const add = document.getElementById("practise-add");
    const remove = document.getElementById("practise-remove");
    const save = document.getElementById("practise-save");
   
    // inputs
    const id = document.getElementById("data-id");
    const date = document.getElementById("data-date");
    const skill = document.getElementById("data-skill");
    const club = document.getElementById("data-club");
    const distance = document.getElementById("data-distance");
    const shape = document.getElementById("data-shape");

    // message
    const message = document.getElementById("message");

    // selected
    var selected = new PractiseSession();
    let selectedId = null;

    const addToHistory = practise => {
        const listItem = document.createElement("li");
    
        listItem.innerHTML = `${practise.sessionDate}-${practise.club}-${practise.skill}`;
        listItem.id = "his-" + practise.id;
        list.append(listItem);

        listItem.addEventListener("click", () => {
            
            selectedId = practise.id;
            selected = dataPractises.get(selectedId);

            fillForm(selected);

            // deselect
            const listEntries = list.querySelectorAll("li");
            listEntries.forEach(entry => {
                entry.classList.remove("selected");
            });            
            // selected
            listItem.classList.add("selected");

        });

        list.appendChild(listItem);
    }

    // each entry
    practiseSessions.forEach(practise => {
        addToHistory(practise);
    });
    
    // static data
    Clubs.forEach(clb => {
        const selectItem = document.createElement("option");
        selectItem.value = clb;
        selectItem.innerHTML = clb;
        club.appendChild(selectItem);
    });

    Flights.forEach(flt => {
        const selectItem = document.createElement("option");
        selectItem.value = flt;
        selectItem.innerHTML = flt;
        shape.appendChild(selectItem);
    })

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
        const addPractise = new PractiseSession();
        fillForm(addPractise);
    });

    remove.addEventListener("click", event => {
        dataPractises.remove(selected);
        const found=document.getElementById(`his-${selected.id}`);
        
        if (found) {
            found.remove();
        }
        
        selectedId = null;
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

    add.click();
}

initialise();