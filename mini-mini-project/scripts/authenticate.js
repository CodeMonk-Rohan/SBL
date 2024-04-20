//this is where the login is done, and based on the credentials different site is shown (admin v/s normal user)
// to keep things simple, we should just create separate page for admin where they can add/remove books

console.log("LOADED authenticate.js");
const loginForm = document.getElementById('login-form');

//Deal with new unregistered users
const registerButton = document.getElementById('register')
registerButton.addEventListener('click', function(event){
    event.preventDefault();
    window.location = "./register.html"
})



function exists(username, existingUsers){
    
    const duplicate = existingUsers.find(user => user.username === username);
    if(duplicate){
        //if this username already exists, return true
        return true
    }else{
        return false
    }

}





//Handle login
loginForm.addEventListener('submit', function(event){
    
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = {
        username:username, password:password
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users)


    if(!exists(username, users)){
        alert("Incorrect username!");
    }

    let found = false;
    users.forEach(user => {
        if(user.password === password){
            found = true;
            if(username === "admin"){
                window.location = "./admin.html";
            }else{
                window.location = "./index.html"
            }
        }  
    });

    if(!found){
        alert("Incorrect Password")
    }

    
    



    if(username === "admin" && password === "admin"){
        window.location = "./admin.html"
    }
})
