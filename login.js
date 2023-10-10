var loginWindow = document.getElementsByTagName("div")[0];
var loginUsername = document.getElementById("loginUsername");
var loginPassword = document.getElementById("loginPassword");
var signupWindow = document.getElementsByTagName("div")[1];
var signupUsername = document.getElementById("signupUsername");
var signupPassword = document.getElementById("signupPassword");

document.getElementById("loginUser").addEventListener("mousedown", function(){
    let match = 0;
    if(loginUsername.value == "" || loginPassword.value == ""){
        window.alert("Ole hyvä ja täytä molemmat kentät.");
    } else {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(items => {
                items.users.forEach(user => {
                    if(loginUsername.value == user.name && loginPassword.value == user.password){
                        match += 1;
                        return;
                    }
                })
                if(match == 1){
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
})

document.getElementById("createNewAccount").addEventListener("mousedown", function(){
    loginWindow.style.display = "none";
    loginUsername.value = "";
    loginPassword.value = "";
    signupWindow.style.display = "block";
})

document.getElementById("returnToLogin").addEventListener("mousedown", function(){
    signupWindow.style.display = "none";
    signupUsername.value = "";
    signupPassword.value = "";
    loginWindow.style.display = "block";
})

document.getElementById("confirmNewAccount").addEventListener("mousedown", function(){
    if(signupUsername.value == "" || signupPassword.value == ""){
        window.alert("Ole hyvä ja täytä molemmat kentät.");
    }
})