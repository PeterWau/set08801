import { Clubs, Flights, SkillTags } from "../domain/staticData.js" 


export class StaticDataService {

    getAllClubs(){
        return Clubs;
    }

    getAllFlights(){
        return Flights;
    }

    getAllSkillTags(){
        return SkillTags;
    }
}