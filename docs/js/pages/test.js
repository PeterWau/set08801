import { TestService } from "../services/testService.js";

// service
const service = new TestService();

// data
const clubs = service.getAllClubs();
const videos = service.getAllVideos();

// elements
const clubsElement = document.getElementById("allClubs");
const videosEl = document.getElementById("videoLibrary");
const saveBtn = document.getElementById("saveVideosEl");

clubs.forEach(club => {
    
    const li = document.createElement("li");
    li.innerHTML = club;

    clubsElement.appendChild(li);
});

// test videos
videos.forEach(v => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${v.url}" target="_blank">${v.coach}</a>`;

    videosEl.appendChild(li);
});

// Add EventListener to btn
saveBtn.addEventListener("click", function () {
    console.log("test:Save Videos clicked")
    service.saveVideos();
});