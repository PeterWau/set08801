import { StaticDataService } from "../services/staticDataService.js";

// service
const service = new StaticDataService();

// reference data
const clubs = service.getAllClubs();
const skills = service.getAllSkillTags();
const flights = service.getAllFlights();

// elements
const videoTagsElement = document.getElementById("videoTagsEl");
const clubsElement = document.getElementById("clubsEl");
const skillsElement = document.getElementById("skillsEl");
const flightsElement = document.getElementById("flightsEl");

// maybe first few for instructions
videoTagsElement.innerText = "(" + skills.join(", ") + ")";
clubsElement.innerText = "(" + clubs.join(", ") + ")";
skillsElement.innerText = "(" + skills.join(", ") + ")";
flightsElement.innerText = "(" + flights.join(", ") + ")";