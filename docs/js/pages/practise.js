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
    
    const addToHistory = practise => {
        const listItem = document.createElement("li");
    
        listItem.innerHTML = `${practise.club} (${practise.skill})`;
        listItem.dataset.sessionId = `${practise.id}`;
        list.append(listItem);

        listItem.addEventListener("click", () => {
            
            // get practise id
            const id = parseInt(event.target.dataset.sessionId);
            selected = dataPractises.get(id);

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
        selected = new PractiseSession();
        fillForm(selected);
    });

    remove.addEventListener("click", event => {
        dataPractises.remove(selected);
        const query = `[data-session-id="${selected.id}"]`;
        const found=document.querySelector(query);
        if (found) {
            found.remove();
        }
        dataPractises.save();
        message.innerHTML = "Saved";
    });

    save.addEventListener("click", event => {
        event.preventDefault();

        let isNew = (selected.id === null);
        let updated = new PractiseSession();
        
        updated.id=selected.id;
        updated.sessionDate = date.value;
        updated.skill=skill.value;
        updated.club=club.value;
        updated.distance=distance.value;
        updated.shape=shape.value;
        
        // is it valid data?
        if (!updated.isValid()) {
            message.innerHTML = `Invalid entry - Please Retry`;
            return;
        } 

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