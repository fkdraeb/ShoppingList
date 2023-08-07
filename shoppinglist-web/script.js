document.addEventListener("DOMContentLoaded", function () {
    const addItemBtn = document.getElementById("addItemBtn");
    const itemName = document.getElementById("itemNameInput");
    const shoppingList = document.getElementById("shoppingList");

    fetchItemsFromBackend();

    addItemBtn.addEventListener("click", function () {

        const itemText = itemName.value.trim();
        if (itemText !== "") {
            postItemToBackend({ "name": itemText });

            addItemToShoppingList(itemText);
            itemName.value = "";
        }
    });

    shoppingList.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            const item = event.target.closest("li");
            const itemId = item.getAttribute('data-item-id')

            updatePurchaseItemToBackend({ "id": itemId});


            item.classList.toggle("text-decoration-line-through");
        }
    });


});
