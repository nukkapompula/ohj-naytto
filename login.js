var loginWindow = document.getElementsByTagName("div")[0];
var loginUsername = document.getElementById("loginUsername");
var loginPassword = document.getElementById("loginPassword");
var signupWindow = document.getElementsByTagName("div")[1];
var signupUsername = document.getElementById("signupUsername");
var signupPassword = document.getElementById("signupPassword");

function loginUser(){
    let matchFound = false;
    if(loginUsername.value == "" || loginPassword.value == ""){
        window.alert("Ole hyvä ja täytä molemmat kentät.");
    } else {
        fetch('http://localhost:3000/api/items')
        .then(response => response.json())
        .then(items => {
            items.users.forEach(user => {
                if(loginUsername.value == user.name && loginPassword.value == user.password){
                    matchFound = true;
                    return;
                }
            })
            if(matchFound == true){
                loginUsername.value = "";
                loginPassword.value = "";
                window.location = "market.html";
            } else {
                window.alert("Käyttäjää ei löydy tai salasana on väärä.");
                loginUsername.value = "";
                loginPassword.value = "";
            }
        })
    }
}

function createNewAccount(){
    loginWindow.style.display = "none";
    loginUsername.value = "";
    loginPassword.value = "";
    signupWindow.style.display = "block";
}

function returnToLogin(){
    signupWindow.style.display = "none";
    signupUsername.value = "";
    signupPassword.value = "";
    loginWindow.style.display = "block";
}

function confirmNewAccount(){
    if(signupUsername.value == "" || signupPassword.value == ""){
        window.alert("Ole hyvä ja täytä molemmat kentät.");
    }
}