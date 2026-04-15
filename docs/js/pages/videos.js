import { Video, Videos } from "../data/video.js";

function initialise() {
   
    const list = document.querySelector("[data-videos]");
    const add = document.querySelector("[data-new-video]");
   
    const form = document.querySelector("[data-form]");
    const id = document.querySelector("[data-id]");
    const url = document.querySelector("[data-url]");
    const coach = document.querySelector("[data-coach]");
    const skill = document.querySelector("[data-skill]");
   
    const play = document.getElementById("play");

    // video list
    let dataVideos = new Videos();
    dataVideos.load();
    const videos = dataVideos.getAllVideos();

    let selectedId = null;

    const addToLibrary = video => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.innerHTML = video.skill;
        listItem.append(link);

        link.addEventListener("click", () => {
            selectedId = video.id;
            let selectedVideo = dataVideos.getVideo(selectedId);
            fillForm(selectedVideo);
        });

        list.appendChild(listItem);
    }
    
    // each video
    videos.forEach(video => {
        addToLibrary(video);
    });
    
    const fillForm = video => {
        if (!video) {
            // blank
            return;
        }
  
        id.value = video.id;
        url.value = video.url;
        play.href = video.url;
        coach.value = video.coach;
        skill.value = video.skill;
    }

    add.addEventListener("click", event => {
        selectedId = null;
        fillForm(new Video());
    });
    
    form.addEventListener("submit", event => {
        event.preventDefault();

        let updated = new Video();
        
        updated.id=selectedId,
        updated.url=url.value,
        updated.coach=coach.value,
        updated.skill=skill.value
        
        const newVideo = dataVideos.update(updated);
        fillForm(newVideo);
        addToLibrary(newVideo);
    });
    
}

initialise();