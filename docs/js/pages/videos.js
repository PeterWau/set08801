import { Video, Videos } from "../data/video.js";



function initialise() {
   
    const list = document.getElementById("videos");
    const add = document.getElementById("add-video");
    const remove = document.getElementById("remove-video");
    const save = document.getElementById("save-video");
    const form = document.getElementById("video-form");
    const id = document.getElementById("video-id");;
    const url = document.getElementById("video-url");
    const coach = document.getElementById("video-coach");
    const skill = document.getElementById("video-skill");
    const message = document.getElementById("message");

    const player = document.getElementById("player");

    // videos object
    const dataVideos = new Videos();
    dataVideos.load();
    
    const videos = dataVideos.getAllVideos();
    var selectedVideo = new Video(); 

    const addToLibrary = video => {
        const listItem = document.createElement("li");
        
        listItem.innerHTML = `${video.skill}: ${video.coach}`;
        listItem.dataset.videoId = `${video.id}`;
        list.append(listItem);

        listItem.addEventListener("click", () => {
            
            // get video from selected id
            const id = parseInt(event.target.dataset.videoId);
            selectedVideo = dataVideos.getVideo(id);
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
        selectedVideo = new Video();
        fillForm(selectedVideo);
    });

    remove.addEventListener("click", event => {
        dataVideos.remove(selectedVideo);
        const query = `[data-video-id="${selectedVideo.id}"]`;
        const found=document.querySelector(query);
        
        if (found) {
            found.remove();
        }
        dataVideos.save();
        message.innerHTML = "Saved";
    });
    
    save.addEventListener("click", event => {
        event.preventDefault();

        try {
            
            let isNew = (selectedVideo.id === null);
            let updated = new Video();
            
            updated.id=selectedVideo.id;
            updated.url=url.value;
            updated.coach=coach.value;
            updated.skill=skill.value;

            // is it valid data?
            if (!updated.isValid()) {
                message.innerHTML = `Invalid entry - Please Retry`;
                return;
            } 

            const newVideo = dataVideos.update(updated);
            
            fillForm(newVideo);
            
            // only add new entries to library
            if (isNew) {
                addToLibrary(newVideo);
            }
            message.innerHTML = `Saved`;
        
        }
        catch (error)
        {
            // Permissions policy violation: compute-pressure is not allowed in this document.
            message.innerHTML = `Save failed: ${error.message}`;
        } 
    });
}

initialise();