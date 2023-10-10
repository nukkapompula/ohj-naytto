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
    } else {
        console.log("Toimii")
    }
}
