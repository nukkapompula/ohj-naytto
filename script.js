document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("item-list");
    const addItemButton = document.getElementById("add-item");

    const items = [
        {
            "id": 1,
            "name": "desk",
            "price": 100,
            "user": "John Doe"
        },
        {
            "id": 2,
            "name": "chair",
            "price": 60,
            "user": "Peter Smith"
        }
    ];

    function displayItems() {
        console.log('Fetching items from server...');
        fetch('http://localhost:3000/api/items')
          .then(response => response.json())
          .then(items => {
            console.log('Received items from server:', items);
            itemList.innerHTML = '';
            items.items.forEach(item => {
              const li = document.createElement("li");
              li.textContent = `${item.name} - $${item.price} - ${item.user}`;
      
              const removeButton = document.createElement("button");
              removeButton.textContent = "Remove";
              removeButton.addEventListener("click", () => removeItem(item.id));
      
              li.appendChild(removeButton);
              itemList.appendChild(li);
            });
          })
          .catch(error => console.error(error));
      }

    function removeItem(itemId) {
        const indexToRemove = items.findIndex(item => item.id === itemId);
        if (indexToRemove !== -1) {
            items.splice(indexToRemove, 1);
            displayItems();
        }
    }

    addItemButton.addEventListener("click", function () {
        items.push({
            "id": items.length + 1,
            "name": "New Item",
            "price": 0
        });
        displayItems();
    });

    displayItems();
});
