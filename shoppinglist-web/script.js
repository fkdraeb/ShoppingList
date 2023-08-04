document.addEventListener("DOMContentLoaded", function () {
    const addItemBtn = document.getElementById("addItemBtn");
    const itemName = document.getElementById("itemNameInput");
    const shoppingList = document.getElementById("shoppingList");

    getItemsFromController();

    addItemBtn.addEventListener("click", function () {

        const itemText = itemName.value.trim();
        if (itemText !== "") {
            postMethodToController({ "name": itemText });

            addItemToShoppingList(itemText);
            itemName.value = "";
        }
    });

    shoppingList.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            const item = event.target.closest("li");
            item.classList.toggle("text-decoration-line-through");
        }
    });


});
