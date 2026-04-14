export class Video {
    
    constructor({
        id = null,
        url = "",
        coach = "",
        skill = ""
    } = {}) {
        this.id =id;
        this.url = url;
        this.coach = coach;
        this.skill = skill
    }
    
    static fromJson(json = {}) {
        return new Video(json);
    }
}

export class Videos {
    constructor(videos = []) {
        this.videos = (videos ?? []).map(video => video instanceof Video ? video : Video.fromJson(video));
    }

    getAllVideos() {
        return this.videos;
    }

    getVideo(id) { 
        return this.videos.find(video => video.id === id) ?? null;
    }

    update() {
        
    }
}