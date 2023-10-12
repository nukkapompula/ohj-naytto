document.addEventListener("DOMContentLoaded", function () {
    const itemName = document.getElementById("item-name");
    const userName = localStorage.getItem("loggedIn");

    function displayInfo() {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(items => {
                items.users.forEach(user => {
                    if (user.name == userName) {
                        document.getElementById("userInfo").innerHTML =
                            `${userName} kirjattu sisään, rahaa ${user.money}€.`;
                    }
                })
            })
    }

    console.log(userName);

    function displayItems() {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(items => {
                itemName.innerHTML = '';
                items.items.forEach(item => {
                    if (item.user != localStorage.getItem("loggedIn")) {
                        const li = document.createElement("li");
                        li.textContent = `${item.name} - €${item.price} - ${item.user} `;

                        const buyButton = document.createElement("button");
                        buyButton.textContent = "Osta";
                        buyButton.addEventListener("click", () => {
                            const userMoney = getUserMoney();
                            console.log("rahat:", userMoney);
                            console.log("hinta:", item.price);
                            if (userMoney >= item.price) {
                                removeItem(item.id);
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

    function getUserMoney() {
        return parseFloat(localStorage.getItem("userMoney")) || 0;

    }

    function removeItem(itemId) {
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
                displayItems();
                addUserHistory(data);
            })
            .catch(error => console.error(error));
    }

    displayItems();
    displayInfo();
});
