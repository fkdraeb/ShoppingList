const callbackURL = ('http://localhost:8090/');

function fetchItemsFromBackend() {
    fetch(callbackURL)
        .then(response => response.json())
        .then(data => {
            const shoppingList = document.getElementById('shoppingList');

            data.forEach(item => {
                const itemList = document.createElement("li");
                itemList.classList.add("list-group-item");
                itemList.setAttribute('data-item-id', item.id);
                itemList.innerHTML = `
                        <input type="checkbox" class="form-check-input me-2" ${item.purchased ? "checked" : ""}>
                        ${item.name}
                        <button class="btn delete-item-btn float-end">
                            <i class="bi bi-trash"></i>                        
                        </button>
                    `;

                if (item.purchased)
                    itemList.classList.toggle("text-decoration-line-through");
                shoppingList.appendChild(itemList);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function postItemToBackend(data) {
    fetch(callbackURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            const itemList = document.createElement("li");
            itemList.classList.add("list-group-item");
            itemList.setAttribute('data-item-id', data.data.id);
            itemList.innerHTML = `
                        <input type="checkbox" class="form-check-input me-2">
                        ${data.data.name}
                        <button class="btn delete-item-btn float-end">
                            <i class="bi bi-trash"></i>                        
                        </button>
                    `;
            if (data.data.purchased)
                itemList.classList.toggle("text-decoration-line-through");
            shoppingList.appendChild(itemList);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
}

function updatePurchaseItemToBackend(data) {
    fetch(callbackURL + 'purchase', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
        })
        .catch(error => {
            console.error('Error updating item:', error);
        });
}

function addItemToShoppingList() {
    const itemName = document.getElementById("itemNameInput");
    const itemText = itemName.value.trim();
    if (itemText !== "") {
        postItemToBackend({ "name": itemText });
        itemName.value = "";
    }
}

function deleteItemToBackend(data, itemElement) {
    fetch(callbackURL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            itemElement.remove();
        })
        .catch(error => {
            console.error('Error updating item:', error);
        });

}