// import { user } from "../data/user.js"

// const key = "user";
// export let currentUser = new user();

// export function login(username) {
    
//     const storedUser = localStorage.getItem(key);
//     if (storedUser == null) return false;
    
//     let validUser = JSON.parse(storedUser);

//     if (validUser.name != username) return false;
//     currentUser = validUser;
    
//     return true;
// }

// export function register(username) {
    
//     // validate
//     if (username.length == 0 ) return false;
    
//     // create user
//     let newUser = new user(username);
    
//     // save storage
//     localStorage.setItem(key, JSON.stringify(newUser))
//     currentUser = newUser;
//     return true;
// }
