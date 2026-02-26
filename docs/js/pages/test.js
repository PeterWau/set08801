import { TestService } from "../services/testService.js";

// service
const service = new TestService();

// club data
const clubs = service.getAllClubs();

// elements
const clubsElement = document.getElementById("allClubs");

clubs.forEach(club => {
    
    const li = document.createElement("li");
    li.innerHTML = club;

    clubsElement.appendChild(li);
});

export function register()
{
    return "registered";
}