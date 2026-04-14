import { Clubs, SkillTags, Flights } from "../data/staticData.js" 
import { User } from "../data/user.js"
import { Video } from "../data/video.js"
import { UserService } from "./userService.js";


export class TestService {


    
    // unit tests - kind of
    getAllClubs(){
        return Clubs;
    }

    //testVideo1 = new Video('https://youtu.be/X_6XzQcGLUg','Danny Maude');
    //testVideo2 = new Video("https://www.youtube.com/watch?v=ct19uObcAok&list=PLUo0KpoShpCy1DbWdjLpp-hoD2euxISqG&index=16","Saguto");
  
    getAllVideos(){

        const videoLibrary = []; 
        const videoskey = "pgTest.videos";
        
        videoEntry = localStorage.getItem(videosKey);
        console.log(videoEntry);
        videoLibrary = videoEntry.JSON.Array; 
        //videoLibrary.push(this.testVideo1);
        //videoLibrary.push(this.testVideo2);
        return Array.isArray(videoLibrary) ? videoLibrary : [];
    }

    saveVideos(){
        console.log("Test: Save videos");

        videoLibrary.push(this.testVideo1);
        videoLibrary.push(this.testVideo2);
        localStorage.setItem(videosKey, JSON.stringify(videoLibrary));
    }

    register(username) {
        const user = new User();
        user.name = username;
        UserService.register(user);
    }

    loadUser() {
        return UserService.getUser();
    }
}
