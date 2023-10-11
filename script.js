document.addEventListener("DOMContentLoaded", function () {
    const itemName = document.getElementById("item-name");
    

    function displayItems() {
        console.log('Fetching items from server...');
        fetch('http://localhost:3000/api/items')
            .then(response => response.json())
            .then(items => {
                console.log('Received items from server:', items);
                itemName.innerHTML = '';
                items.items.forEach(item => {
                
                const li = document.createElement("li");
                li.textContent = `${item.name} - €${item.price} - ${item.user} `;
        
                const removeButton = document.createElement("button");
                removeButton.textContent = "Osta";
                removeButton.addEventListener("click", () => removeItem(item.id));
                
                li.appendChild(removeButton);
                itemName.appendChild(li);
            });
          })
          .catch(error => console.error(error));
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
        })
        .catch(error => console.error(error));
      }

    displayItems();
});
