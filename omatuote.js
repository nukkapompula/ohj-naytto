document.getElementById("userInfo").innerHTML = `${localStorage.getItem("loggedIn")} kirjattu sisään.`;
document.addEventListener("DOMContentLoaded", function () {
    const userItems = document.getElementById("user-items");

    function displayItems() {
        console.log('Fetching items from server...');
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(items => {
                console.log('Received items from server:', items);
                userItems.innerHTML = '';
                items.items
                    .filter(item => item.user === localStorage.getItem("loggedIn"))
                    .forEach(item => {
                        const li = document.createElement("li");
                        li.textContent = `${item.name} - €${item.price} - ${item.user} `;
                        userItems.appendChild(li);
                    });
            })
            .catch(error => console.error(error));
    }
    displayItems();
}
);