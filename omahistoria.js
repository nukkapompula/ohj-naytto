document.getElementById("userInfo").innerHTML = `${localStorage.getItem("loggedIn")} kirjattu sisään.`;
document.addEventListener("DOMContentLoaded", function () {
    const userHistory = document.getElementById("user-history");

    function displayHistory() {
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(history => {
                const loggedInUser = localStorage.getItem("loggedIn");
                const user = history.users.find(u => u.name === loggedInUser);
                if (user) {
                    userHistory.innerHTML = '';
                    user.history.forEach(item => {
                        const li = document.createElement("li");
                        li.textContent = `${item.name} - €${item.price} - ${item.user} `;
                        userHistory.appendChild(li);
                    });
                } else {
                    console.log(`User ${loggedInUser} not found.`);
                }
            })
            .catch(error => console.error(error));
    }
    displayHistory();
}
);