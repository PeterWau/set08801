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
    

    /* 
    sample embed
    <iframe width="560" height="315" 
        src="https://www.youtube.com/embed/8MwTdZmicE0?si=rG53Rf710WOvHbfh&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    */
    playUrl() {
        return `https://www.youtube.com/embed/${this.embed}`;
    }


/*     get url() {
        return this.age;
    }

        // Setter for url
    set url(value) {
        if (typeof value !== 'string') {
            throw new Error("Invalid");
        }
        this.url = value;
    }

*/
    static fromJson(json = {}) {
        return new Video(json);
    }
}

const videosKey = "pg.videos";
export class Videos {
    constructor(videos = []) {
        this.videos = (videos ?? []).map(video => video instanceof Video ? video : Video.fromJson(video));
    }

    load() {
        const videoLocal = localStorage.getItem(videosKey)
        if (videoLocal != null) {
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
        
        this.save()
            
        // for page
        return data;
    }

    remove(video) {
        if(!video instanceof Video) return;
        const existingIndex = this.videos.findIndex(item => item.id === video.id);

        if (existingIndex !== -1) {
            this.videos.splice(existingIndex, 1); 
        }
  
    }
}