var loginWindow = document.getElementsByTagName("div")[0];
var loginUsername = document.getElementById("loginUsername");
var loginPassword = document.getElementById("loginPassword");
var signupWindow = document.getElementsByTagName("div")[1];
var signupUsername = document.getElementById("signupUsername");
var signupPassword = document.getElementById("signupPassword");

/* Sisäänkirjautuminen */
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
            if(matchFound){
                localStorage.setItem("loggedIn", loginUsername.value);
                loginUsername.value = "";
                loginPassword.value = "";
                window.location = "market.html";
            } else {
                window.alert("Käyttäjää ei löydy tai salasana on väärä.");
                loginUsername.value = "";
                loginPassword.value = "";
            }
        });
    }
}

/* Uuden käyttäjän luomisikkuna esiin */
function createNewAccount(){
    loginWindow.style.display = "none";
    loginUsername.value = "";
    loginPassword.value = "";
    signupWindow.style.display = "block";
}

/* Palataan kirjautumisikkunaan */
function returnToLogin(){
    signupWindow.style.display = "none";
    signupUsername.value = "";
    signupPassword.value = "";
    loginWindow.style.display = "block";
}

/* Vahvistetaan uuden käyttäjän luominen */
function confirmNewAccount(){
    let matchFound = false;
    if(signupUsername.value == "" || signupPassword.value == ""){
        window.alert("Ole hyvä ja täytä molemmat kentät.");
    } else {
        fetch('http://localhost:3000/api/items')
        .then(response => response.json())
        .then(items => {
            items.users.forEach(user => {
                if(signupUsername.value == user.name){
                    matchFound = true;
                    return;
                }
            })
            if(matchFound){
                window.alert("Käyttäjänimi on varattu.");
                signupUsername.value = "";
                signupPassword.value = "";
            } else {
                window.alert(`Käyttäjä ${signupUsername.value} luotu!`);
                fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: signupUsername.value,
                        password: signupPassword.value,
                        money: 300,
                        history: []
                    })
                })
                signupUsername.value = "";
                signupPassword.value = "";
            }
        })
    }
}