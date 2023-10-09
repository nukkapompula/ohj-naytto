let loginUsername = document.getElementById("loginUsername").value;
let loginPassword = document.getElementById("loginPassword").value;
let loginWindow = document.getElementsByTagName("div")[0];
let signupWindow = document.getElementsByTagName("div")[1];

document.getElementById("createNewAccount").addEventListener("mousedown", function(){
    loginWindow.style.display = "none";
    signupWindow.style.display = "block";
})

document.getElementById("returnToLogin").addEventListener("mousedown", function(){
    signupWindow.style.display = "none";
    loginWindow.style.display = "block";
})