import { Clubs, SkillTags, Flights } from "../domain/staticData.js" 
import { Video } from "../domain/video.js"

export class TestService {

    // unit tests - kind of
    getAllClubs(){
        return Clubs;
    }

    testVideo1 = new Video('https://youtu.be/X_6XzQcGLUg','Danny Maude');
    testVideo2 = new Video("https://www.youtube.com/watch?v=ct19uObcAok&list=PLUo0KpoShpCy1DbWdjLpp-hoD2euxISqG&index=16","Saguto");

    getAllVideos(){
        const videoLibrary = [];
        videoLibrary.push(this.testVideo1);
        videoLibrary.push(this.testVideo2);
        return Array.isArray(videoLibrary) ? videoLibrary : [];
    }

    saveVideos(){
        console.log("Test: Save videos");
        const key = "pgTest.videos";
        const videoLibrary = [];
        videoLibrary.push(this.testVideo1);
        videoLibrary.push(this.testVideo2);
        localStorage.setItem(key, JSON.stringify(videoLibrary));
    }
}
