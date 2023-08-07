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
                        <input type="checkbox" class="form-check-input me-2">
                        ${item.name}
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
            console.log(data);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
}

function addItemToShoppingList(itemText) {
    const item = document.createElement("li");
    item.classList.add("list-group-item");
    item.innerHTML = `
                <input type="checkbox" class="form-check-input me-2">
                ${itemText}
            `;
    shoppingList.appendChild(item);
}

function updatePurchaseItemToBackend(data) {
    fetch(callbackURL+'purchase', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error updating item:', error);
        });

}