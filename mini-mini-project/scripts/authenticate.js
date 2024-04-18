//this is where the login is done, and based on the credentials different site is shown (admin v/s normal user)
// to keep things simple, we should just create separate page for admin where they can add/remove books

console.log("LOADED authenticate.js");
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(event){
    
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //Currently there is no backend so I am going to make it so that theres only two users for now

    if(username === "admin" && password === "admin"){
        window.location = "./admin.html"
    }
    if(username === "user" && password === "user"){
        window.location = "./index.html"
    }
})
