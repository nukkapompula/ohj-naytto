const userName = localStorage.getItem("loggedIn");

function displayInfo(){
    fetch('http://localhost:3000/api/items')
    .then(response => response.json())
    .then(items => {
        items.users.forEach(user => {
            if(user.name == userName){
                document.getElementById("userInfo").innerHTML = 
                `${localStorage.getItem("loggedIn")} kirjattu sisään, rahaa ${user.money}€.`;
            }
        })
    })
}

function checkInput(event){
    event.preventDefault();

    let nameitem = document.getElementById("inputname").value;
    let nameprice = document.getElementById("inputprice").value;

    if(nameitem == ""){
        alert("Syötä tuotteen nimi!");
        return;
    }
    if(nameprice == ""){
        alert("Syötä tuotteen hinta!");
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
            })
        })
        console.log("Toimii")
    }
}