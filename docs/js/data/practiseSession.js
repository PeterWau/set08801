import { Clubs, Flights, SkillTags } from "../data/staticData.js" 

export class PractiseSession {
    constructor({
        id = null, 
        sessionDate=new Date().toISOString().split('T')[0], 
        skill="", 
        club="",
        distance=0,
        shape=""} = {}) {
        this.id = this.id;
        this.sessionDate = sessionDate;
        this.skill = skill;
        this.club = club;
        this.distance = distance;
        this.shape = shape;
    }
    
    isValid() {
        const maxDistance = 400;
        if (this.club.length === 0) return false;
        if (this.distance > maxDistance || this.distance === 0) return false;
        if (this.skill.length === 0) return false;
        if (this.shape.length === 0) return false;
        return true;
    }

    static fromJson(json = {}) {
        return new PractiseSession(json);
    }
}

const practiseKey = "pg.practise" 
export class PractiseSessions {
    constructor(practiseSessions = []) {
        this.practiseSessions = (practiseSessions ?? [])
            .map(practiseSession => practiseSession instanceof PractiseSession ? practiseSession : PracticeSession.fromJson(practiceSession));
        }

        load() {
            const practiseLocal = localStorage.getItem(practiseKey)
            if (practiseLocal != null) {
                this.practiseSessions  = JSON.parse(practiseLocal);
            }
        }
        
        save() {
            localStorage.setItem(practiseKey, JSON.stringify(this.practiseSessions));
        }
    
        getAll() {
            return this.practiseSessions;
        }
    
        get(id) { 
            return this.practiseSessions.find(ps => ps.id === id) ?? null;
        }
    
        update(practiseSession) {
            const data = practiseSession instanceof PractiseSession ? practiseSession : PractiseSession.fromJson(video);
            const existingIndex = this.practiseSessions.findIndex(item => item.id === data.id);
    
            if (existingIndex >= 0) {
                this.practiseSessions[existingIndex] = data;
            } else {
                let newIndex = this.practiseSessions.length + 1;
                data.id = newIndex;
                this.practiseSessions.push(data);
            }
            
            this.save()
                
            return data;
        }
    
        remove(practiseSession) {
            if(!practiseSession instanceof PractiseSession) return;
            const existingIndex = this.practiseSessions.findIndex(item => item.id === practiseSession.id);
    
            if (existingIndex !== -1) {
                this.practiseSessions.splice(existingIndex, 1); 
            }
      
        }

        dashboardMissing() {
            let missing = [];
            this.load();
            // if (this.practiseSessions.length === 0)
            //     return [];

            Clubs.forEach(clb => {
                
                let found = this.practiseSessions.find(cb => cb.club === clb);
                if (found === undefined) {
                    missing.push(clb);
                }
            });
            return missing;
        }

        dashboardDistances() {
            let distances = [];
            this.load();

            // if (this.practiseSessions.length === 0)
            //     return [];

            Clubs.forEach(clb => {
                
                let found = this.practiseSessions.find(cb => cb.club === clb);
                                
                const ps = new PractiseSession();
                ps.club = clb;
                if (found !== undefined) {
                    ps.distance = found.distance;
                }
                distances.push(ps); // chart uses club, distance but later flight
            });
            return distances;
        }

}