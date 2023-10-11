document.getElementById("userInfo").innerHTML = `${localStorage.getItem("loggedIn")} kirjattu sisään.`;

function checkInput(event){
    event.preventDefault();

    let nameitem = document.getElementById("inputname").value;
    let nameprice = document.getElementById("inputprice").value;
    let userName = document.getElementById("inputuser").value;

    if(nameitem == ""){
        alert("Syötä tuotteen nimi!");
        return;
    }
    if(nameprice == ""){
        alert("Syötä tuotteen hinta!");
        return;
    }
    if(userName == ""){
        alert("Syötä käyttäjä!");
        return;
    } 
    else {
        fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameitem,
                price: nameprice,
                user: userName,
                users: ["selling"]
            })
        })
        console.log("Toimii")
    }
}