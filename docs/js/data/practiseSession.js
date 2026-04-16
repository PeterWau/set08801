export class PractiseSession {
    constructor({
        id = null, 
        sessionDate="", 
        skill="", 
        club="",
        distance=0} = {}) {
        this.id = this.id;
        this.sessionDate = sessionDate;
        this.skill = skill;
        this.club = club;
        this.distance = distance;
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
            const existingIndex = this.videos.findIndex(item => item.id === data.id);
    
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
}