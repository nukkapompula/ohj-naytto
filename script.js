document.addEventListener("DOMContentLoaded", function () {
    const itemName = document.getElementById("item-name");
    const userName = localStorage.getItem("loggedIn");
    let moneyLeft;

    /* Näytetään käyttäjän tiedot ja päivitetään moneyLeft */
    function displayInfo() {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(items => {
                items.users.forEach(user => {
                    if (user.name == userName) {
                        moneyLeft = user.money;
                        localStorage.setItem("userMoney", moneyLeft);
                        console.log("MoneyLeft:", moneyLeft); 
                        document.getElementById("userInfo").innerHTML =
                            `${userName} kirjattu sisään, rahaa ${moneyLeft}€.`;
                        displayItems();
                    }
                })
            })
    }
    
    displayInfo();

    console.log(moneyLeft);
    console.log(userName);

    /*Näytetään tuotteet*/
    function displayItems() {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(items => {
                itemName.innerHTML = '';
                items.items.forEach(item => {
                    if (item.user != localStorage.getItem("loggedIn")) {
                        const li = document.createElement("li");
                        li.className = "my-3";
                        li.textContent = `${item.name} - €${item.price} - ${item.user} `;
    
                        const buyButton = document.createElement("button");
                        buyButton.className = "bg-dark rounded p-2";
                        buyButton.style.color = "greenyellow";
                        buyButton.style.boxShadow = "2px 2px 8px #222222";
                        buyButton.textContent = "Osta";
                        buyButton.addEventListener("click", () => {
                            console.log("rahat:", localStorage.getItem("userMoney"));
                            console.log("hinta:", item.price);
                            if (Number(localStorage.getItem("userMoney")) >= item.price) {
                                localStorage.setItem("moneyToSeller", item.price);
                                localStorage.setItem("seller", item.user);
                                moneyLeft -= item.price;
                                console.log("rahat miinuksen jälkeen:", moneyLeft);
                                localStorage.setItem("userMoney", moneyLeft);
                                removeItem(item.id);
                                window.alert("Tuote lisätty omaan historiaan.")
                            } else {
                                window.alert("Rahamäärä ei riitä.");
                            }
                        });
    
                        li.appendChild(buyButton);
                        itemName.appendChild(li);
                    }
                });
            })
            .catch(error => console.error(error));
    }


    /*Lisätään tuote historiaan*/
    function addUserHistory(item) {

        if (!item) {
            console.error('No item provided to addUserHistory');
            return;
        }


        const historyItem = {
            name: item.name,
            price: item.price,
            user: item.user
        };

        fetch(`http://localhost:3000/api/users/${userName}/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(historyItem)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add item to user history');
                }
            })
            .catch(error => console.error(error));
    }


    /*Päivitetään käyttäjän rahat*/
    function updateMoney() {

        const userMoney = moneyLeft;
        const userName = localStorage.getItem("loggedIn");
        console.log("userMoney:", userMoney);
    
        fetch(`http://localhost:3000/api/users/${userName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ money: userMoney })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update user money');
            }
            console.log('User money updated successfully');
        })
        .catch(error => console.error(error));
    }

   
    /* Poistetaan tuote ja lisätään myyjälle rahat*/
function removeItem(itemId) {
    
    const sellerName = localStorage.getItem("seller");
    const moneyToSeller = localStorage.getItem("moneyToSeller");

    fetch(`http://localhost:3000/api/users/${sellerName}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(seller => {
        seller.money += parseFloat(moneyToSeller);
        return fetch(`http://localhost:3000/api/users/${sellerName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ money: seller.money })
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update seller money');
        }
        console.log('Seller money updated successfully');

        localStorage.setItem("userMoney", moneyLeft);

      
        fetch(`http://localhost:3000/api/items/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            return response.json();
        })
        .then(data => {
            console.log(`Deleted item with ID ${itemId}`);
            updateMoney();
            displayItems();
            addUserHistory(data);
            
        })
        .catch(error => console.error(error));

        
    })
    .catch(error => console.error(error));
}


    displayItems();
});