const callbackURL = ('http://localhost:8090/');
const editAndDeleteButtons = `
                        <button type="button" class="btn btn-warning edit-item-btn float-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>           
                        </button>
                        <button type="button" class="btn btn-danger delete-item-btn float-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>             
                        </button>`;

const shoppingList = document.getElementById('shoppingList');
const purchasedShoppingList = document.getElementById('purchasedShoppingList');
let ascendingOrder = true;

function fetchItemsFromBackend() {
    fetch(callbackURL)
        .then(response => response.json())
        .then(data => {

            data.sort((a, b) => a.id - b.id);

            data.forEach(item => {
                const itemList = document.createElement("li");
                itemList.classList.add("list-group-item");
                itemList.setAttribute('data-item-id', item.id);
                itemList.innerHTML = `
                        <input type="checkbox" class="form-check-input me-2" ${item.purchased ? "checked" : ""}>
                        ${item.name}
                        ${editAndDeleteButtons}
                    `;

                if (item.purchased) {
                    itemList.classList.toggle("text-decoration-line-through");
                    purchasedShoppingList.appendChild(itemList);
                }
                else
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
                        ${editAndDeleteButtons}
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
        .then(responseData => {
            movePurchasedItemToCompleteGroup(responseData);
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

function movePurchasedItemToCompleteGroup(item) {
    let itemToMove = item.data;
    let elementWithCustomAttribute = document.querySelector('[data-item-id="' + itemToMove.id + '"]');

    if (itemToMove.purchased) {
        shoppingList.removeChild(elementWithCustomAttribute);
        purchasedShoppingList.appendChild(elementWithCustomAttribute);
    }
    else {
        purchasedShoppingList.removeChild(elementWithCustomAttribute);
        shoppingList.appendChild(elementWithCustomAttribute);
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

function editItemToBackend(data, itemElement) {
    fetch(callbackURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.error('Error updating item:', error);
        });

}

function sortItemsAlphabetically(items) {
    return items.sort((a, b) => {
        const textA = a.textContent.trim().toLocaleLowerCase();
        const textB = b.textContent.trim().toLocaleLowerCase();
        return textA.localeCompare(textB);
    });
}

function sortItemsById(items) {
    return items.sort((a, b) => {
        const idA = a.getAttribute('data-item-id');
        const idB = b.getAttribute('data-item-id');
        return idA.localeCompare(idB);
    });
}

function updateDOM(items) {
    while (shoppingList.firstChild) {
        shoppingList.removeChild(shoppingList.firstChild);
    }

    for (const item of items) {
        shoppingList.appendChild(item);
    }
}

function sortShoppingList(sortingOrder) {
    let items = Array.from(shoppingList.getElementsByClassName("list-group-item"));

    if (sortingOrder === "alphabeticOrder") {
        sortItemsAlphabetically(items);
    } else {
        sortItemsById(items);
    }
    sortDescendingOrderButton();
    ascendingOrder = true;
    updateDOM(items);
}

function reverseSortShoppingList() {
    let items = Array.from(shoppingList.getElementsByClassName("list-group-item"));


    items = items.slice().reverse();
    updateDOM(items);

    if (ascendingOrder)
        sortAscendingOrderButton();

    else
        sortDescendingOrderButton();

    ascendingOrder = !ascendingOrder;

}

let sortOrderButton = document.getElementById('sortOrderButton');

function sortAscendingOrderButton() {
    let ascendingSvgElement = document.createElement('div');
    ascendingSvgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16">
    <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
  </svg>`;

    while (sortOrderButton.firstChild) {
        sortOrderButton.removeChild(sortOrderButton.firstChild);
    }

    sortOrderButton.appendChild(ascendingSvgElement);
}

function sortDescendingOrderButton() {
    let descendingSvgElement = document.createElement('div');
    descendingSvgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
    <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
  </svg>`;

    while (sortOrderButton.firstChild) {
        sortOrderButton.removeChild(sortOrderButton.firstChild);
    }

    sortOrderButton.appendChild(descendingSvgElement);
}

