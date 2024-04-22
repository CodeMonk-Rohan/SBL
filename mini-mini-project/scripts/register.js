
console.log("LOADED register.js");



//Helper function to naive detect duplicate username
function exists(username, existingUsers){
    
    const duplicate = existingUsers.find(user => user.username === username);
    if(duplicate){
        //if this username already exists, return true
        return true
    }else{
        return false
    }

}

//Registration logic
const registerForm = document.getElementById("register-form")
registerForm.addEventListener('submit', function(event){

    //to prevent page from sending some post request
    event.preventDefault()

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === "" || password === ""){
        alert("Invalid Username or Password!");
        return;
    }


    //New user
    const newUser = {
        username:username, 
        password:password,
        borrowed:[]
    }
    //If there are no users (brand new run) then we get a empty array, otherwise the data we expect
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log(existingUsers)
    //Check if this username already exists or not
    if (exists(username, existingUsers)){
        alert("This username is already taken.")
        return;
    }

    //if all edge cases are secure, add it
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    sessionStorage.setItem("username", username)
    
    if(username === "admin"){
        window.location = "./admin.html"
    }else{
        window.location = "./index.html"
    }

    
    console.log(`Added ${username} to users`)
    

})


//aboutus
const aboutUsButton = document.getElementsByClassName("about-us")
console.log("About us buttons: ",aboutUsButton[0])
aboutUsButton[0].addEventListener("click", function(event){
    event.preventDefault()
    window.location = "./aboutus.html";
})