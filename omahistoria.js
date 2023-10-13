document.addEventListener("DOMContentLoaded", function () {
    const userHistory = document.getElementById("user-history");
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
    function displayHistory() {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(history => {
                const user = history.users.find(u => u.name === userName);
                if (user) {
                    userHistory.innerHTML = '';
                    user.history.forEach(item => {
                        const li = document.createElement("li");
                        li.className = "text-center pt-3";
                        li.textContent = `${item.name} - €${item.price} - ${item.user} `;
                        userHistory.appendChild(li);
                    });
                } else {
                    console.log(`User ${userName} not found.`);
                }
            })
            .catch(error => console.error(error));
    }
    displayHistory();
    displayInfo();
}
);