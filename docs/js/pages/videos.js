import { Video, Videos } from "../data/video.js";

function initialise() {
    const list = document.querySelector("[data-videos]");
    const add = document.querySelector("[data-new-video]");

    const form = document.querySelector("[data-form]");
    const play = document.querySelector("[data-play]");
    const url = document.querySelector("[data-url]");
    const coach = document.querySelector("[data-coach]");
    const skill = document.querySelector("[data-skill]");
    
    // video list
    
    const videosKey = "pgTest.videos";
    const videoLocal = localStorage.getItem(videosKey)
    console.log(videoLocal);

    let dataVideos = new Videos(JSON.parse(videoLocal));
    const videos = dataVideos.getAllVideos();

    let selectedId = null;
    // const populateVideos = () => {
    //     list.innerHTML = "";
    // }

    videos.forEach(video => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.innerHTML = video.skill;
        
        // event
        link.addEventListener("click", () => {
            selectedId = video.id;
            let selectedVideo = dataVideos.getVideo(selectedId);
            console.log(selectedVideo.id);
            fillForm(selectedVideo);
        });
        // add link
        listItem.append(link);

        list.appendChild(listItem);
    });

    const selectVideo = () => {
        selectedId = video.id;
        fillForm(getSelectedVideo());
    }

    const getSelectedVideo = () => {
        dataVideos.getVideo(selectedId);
    } 
    
    const fillForm = video => {
        if (!video) {
            // blank
            return;
        }
        // fill form
        url.value = video.url;
        play.href = video.url;
        coach.value = video.coach;
        skill.value = video.skill;
    }
}

initialise();