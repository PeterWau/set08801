import { Video, Videos } from "../data/video.js";



function initialise() {
   
    const list = document.querySelector("[data-videos]");
    const add = document.querySelector("[data-new-video]");
    const remove = document.querySelector("[data-remove-video]");
    const save = document.querySelector("[data-save-video]");
    const form = document.querySelector("[data-form]");
    const id = document.querySelector("[data-id]");
    const url = document.querySelector("[data-url]");
    const coach = document.querySelector("[data-coach]");
    const skill = document.querySelector("[data-skill]");
   
    const player = document.getElementById("player");

    // videos object
    const dataVideos = new Videos();
    dataVideos.load();
    
    const videos = dataVideos.getAllVideos();

    var selectedVideo = new Video;
    let selectedId = null;

    const addToLibrary = video => {
        const listItem = document.createElement("li");
        
        listItem.innerHTML = `${video.skill}: ${video.coach}`;
        listItem.id = "lib-" + video.id;
        list.append(listItem);

        listItem.addEventListener("click", () => {
            selectedId = video.id;
            selectedVideo = dataVideos.getVideo(selectedId);
            fillForm(selectedVideo);
            
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
    
    // each video
    videos.forEach(video => {
        addToLibrary(video);
    });
    
    const fillForm = video => {
        if (!video) {
            return;
        }
  
        id.value = video.id;
        url.value = video.url;
         
        coach.value = video.coach;
        skill.value = video.skill;

        // errors if invalid 
        player.src = video.url;
    }

    add.addEventListener("click", event => {
        selectedId = null;
        fillForm(new Video());
    });

    remove.addEventListener("click", event => {
        dataVideos.remove(selectedVideo);
        const found=document.getElementById("lib-"+selectedVideo.id);
        
        if (found) {
            found.remove();
        }
        
        selectedId = null;
    });

    
    save.addEventListener("click", event => {
        event.preventDefault();

        let isNew = (selectedId == null);
        let updated = new Video();
        
        updated.id=selectedId;
        updated.url=url.value;
        updated.coach=coach.value;
        updated.skill=skill.value;
        
        const newVideo = dataVideos.update(updated);
        fillForm(newVideo);
        
        // only add new entries to library
        if (isNew) {
            addToLibrary(newVideo);
        }
    });
    
    const topItem = list.querySelector("li");
    if (topItem) {
      topItem.click();
    }
}

initialise();