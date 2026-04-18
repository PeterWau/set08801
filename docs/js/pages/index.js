import { User } from "../data/user.js";
import { PractiseSession, PractiseSessions } from "../data/practiseSession.js";
import { Clubs, Flights, SkillTags } from "../data/staticData.js" 

function initialise() {
 
    // objects
    const dataUser = new User();
    const dataPractices = new PractiseSessions();
    dataUser.load();


    const registerForm = document.querySelector("[register-form]");
    const register = document.querySelector("[register]");
    const registerUser = document.querySelector("[data-register-user]");
    const welcome = document.querySelector("[welcome]");
    const dashboardMissing = document.querySelector("[dashboard-missing]");
    const dashboardDistances = document.querySelector("[dashboard-distances]");

    setUser();

    function setUser() {

        if (dataUser.name !== "") {
            welcome.innerHTML = `Welcome ${dataUser.name}`;            
            registerForm.style.display = "none";
            return;
        }
    }
    
    register.addEventListener("click", event => {
        dataUser.register(registerUser.value);
        setUser();
    });

    // Gaps
    let gaps = dataPractices.dashboardMissing();
    gaps.forEach(missing => {
        const listItem = document.createElement("li");
    
        listItem.innerHTML = `${missing}`;
        dashboardMissing.append(listItem);
    });

    // Distances
    let distances = dataPractices.dashboardDistances(); // latest
    const clubChart = []; 
    const distChart = [];
    distances.forEach(cd => {

        if (cd instanceof PractiseSession) {
            console.log(cd.club);
        
            clubChart.push(cd.club);
            distChart.push(cd.distance);
        }
        
        const bubbleSize = 40; 

        const trace = {
                x: clubChart,
                y: distChart,
                mode: 'markers+text',
                type: 'scatter',
                text: distChart.map(d => `${d} mtrs`),
                textposition: 'top center',
                marker: {
                size: Array(clubChart.length).fill(bubbleSize),         
                color: 'light-blue',
                line: { color: 'black', width: 1 }
            }
        };

        const layout = {
             title: { text: 'Distances', font: { size: 18 } },
             xaxis: { title: 'Club' },
             yaxis: { title: 'Distance (mtrs)', range: [0, 300] },
             showlegend: false
        };

        Plotly.newPlot('distance-chart', [trace], layout);

    });
}

initialise();