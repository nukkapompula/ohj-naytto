document.addEventListener("DOMContentLoaded", function () {
    const userItems = document.getElementById("user-items");
    const userName = localStorage.getItem("loggedIn");

    /*Näytetään käyttäjän tiedot*/
    function displayInfo(){
        fetch('http://localhost:3000/api/items')
        .then(response => response.json())
        .then(items => {
            items.users.forEach(user => {
                if(user.name == userName){
                    document.getElementById("userInfo").innerHTML = 
                    `${userName} kirjattu sisään, rahaa ${user.money}€.`;
                }
            })
        })
    }

    /*Näytetään tuotteet*/
    function displayItems() {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(items => {
                userItems.innerHTML = '';
                items.items
                    .filter(item => item.user === userName)
                    .forEach(item => {
                        const li = document.createElement("li");
                        li.className = "text-center pt-3";
                        li.textContent = `${item.name} - €${item.price}`;
                        userItems.appendChild(li);
                    });
            })
            .catch(error => console.error(error));
    }
    displayItems();
    displayInfo();
}
);