
export default class Authentication{
    constructor(){
        // Stub
    }
    static async login(){
        let response = await fetch('http://server-nodejs.cit.byui.edu:3000/login', {
            method: 'POST',
            body: { email: "user1@email.com" , password: "user1" }
          });
        console.log(response);
    }
    static showLogin(){
        // Shouldn't this be called 'buildLogin' or something?
        return `<form class='login'>
        <label for='username'>Username</label>
        <input type='email' name='username' id='username' required>
        <label for='password'>Password</label>
        <input type='password' name='password' id='password' required>
        <button id='submit' type='submit'>Submit</button>
        </form>`;
    }
}