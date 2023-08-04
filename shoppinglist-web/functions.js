function getItemsFromController() {
    fetch('http://localhost:8090/')
        .then(response => response.json())
        .then(data => {
            const shoppingList = document.getElementById('shoppingList');

            data.forEach(item => {
                const itemList = document.createElement("li");
                itemList.classList.add("list-group-item");
                itemList.innerHTML = `
                        <input type="checkbox" class="form-check-input me-2">
                        ${item.name}
                    `;
                    shoppingList.appendChild(itemList);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function postMethodToController(data) {
    fetch('http://localhost:8090/', {
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