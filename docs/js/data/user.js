const userKey = "pg.user";
export class User {

    constructor(
        name = "") {
        this.name = name;
    }   
    
    register(username) {
        
        // validate
        if (username.length == 0 ) return false;
        
        this.name = username;
        
        // save storage
        localStorage.setItem(userKey, JSON.stringify(this))
        return true;
    }

    load() {
        const storedUser = localStorage.getItem(userKey);
        if (storedUser == null) return false;
        const parseUser = JSON.parse(storedUser);
        
        this.name =  parseUser.name;
        return true;
    }
}