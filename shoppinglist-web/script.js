document.addEventListener("DOMContentLoaded", function () {
    const addItemBtn = document.getElementById("addItemBtn");
    const shoppingList = document.getElementById("shoppingList");
    const itemName = document.getElementById("itemNameInput");

    fetchItemsFromBackend();

    addItemBtn.addEventListener("click", function () {
        addItemToShoppingList();
    });

    itemName.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addItemToShoppingList();
        }
    });



    shoppingList.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            const item = event.target.closest("li");
            const itemId = item.getAttribute('data-item-id')

            updatePurchaseItemToBackend({ "id": itemId });
            item.classList.toggle("text-decoration-line-through");
        }
    });

});
