export class Video {
    
    constructor({
        id = null,
        url = "",
        coach = "",
        skill = "",
        embed = ""
    } = {}) {
        this.id =id;
        this.url = url;
        this.coach = coach;
        this.skill = skill;
        this.embed = embed;
    }

    static fromJson(json = {}) {
        return new Video(json);
    }

    isValid() {
        if (this.url.length === 0) return false;
        if (this.coach.length === 0) return false;
        if (this.skill.length === 0) return false;
        if (!this.url.includes("embed")) return false;
        return true;
    }

}

const videosKey = "pg.videos";
const seed = [{"id":1,"url":"https://www.youtube.com/embed/8MwTdZmicE0?si=rG53Rf710WOvHbfh","coach":"Danny Maude","skill":"Arm Lift","embed":""}];

export class Videos {
    constructor(videos = []) {
        this.videos = (videos ?? []).map(video => video instanceof Video ? video : Video.fromJson(video));
    }

    load() {
        const videoLocal = localStorage.getItem(videosKey);
        if (videoLocal !== null) {
            this.videos  = JSON.parse(videoLocal);
        }
    }
    
    save() {
        localStorage.setItem(videosKey, JSON.stringify(this.videos));
    }

    getAllVideos() {
        return this.videos;
    }

    getVideo(id) { 
        return this.videos.find(video => video.id === id) ?? null;
    }

    update(video) {
        const data = video instanceof Video ? video : Video.fromJson(video);
        const existingIndex = this.videos.findIndex(item => item.id === data.id);

        if (existingIndex >= 0) {
            this.videos[existingIndex] = data;
        } else {
            let newIndex = this.videos.length + 1;
            data.id = newIndex;
            this.videos.push(data);
        }
        
        this.save();
            
        // for page
        return data;
    }

    remove(video) {
        if(!video instanceof Video) return;
        const existingIndex = this.videos.findIndex(item => item.id === video.id);

        if (existingIndex !== -1) {
            this.videos.splice(existingIndex, 1); 
        }
  
        this.save();
    }
}