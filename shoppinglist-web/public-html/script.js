$(document).ready(function () {
    const addItemBtn = document.getElementById("addItemBtn");
    const shoppingList = document.getElementById("shoppingList");
    const purchasedShoppingList = document.getElementById("purchasedShoppingList");
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

    purchasedShoppingList.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            const item = event.target.closest("li");
            const itemId = item.getAttribute('data-item-id')

            updatePurchaseItemToBackend({ "id": itemId });
            item.classList.remove("text-decoration-line-through");
        }
    });

    $(document).on("click", '.delete-item-btn', function (event) {
        const item = event.target.closest("li");
        const itemId = item.getAttribute('data-item-id')

        deleteItemToBackend({ "id": itemId }, item);
    });

    $(document).on("click", '.edit-item-btn', function (event) {
        const item = event.target.closest("li");
        const itemId = item.getAttribute('data-item-id')

        if (item) {
            const originalContent = item.innerHTML;

            const text = item.textContent.trim();
            const input = document.createElement("input");
            input.style.marginRight = "10px"
            input.style.marginLeft = "12px"
            input.value = text;
            input.classList.add("form-control");

            const saveButton = document.createElement("button");
            saveButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg> `;
            saveButton.classList.add("btn", "btn-success");

            const cancelButton = document.createElement("button");
            cancelButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg> `;
            cancelButton.style.marginLeft = "10px";
            cancelButton.classList.add("btn", "btn-secondary");

            item.textContent = "";
            item.appendChild(input);
            item.appendChild(saveButton);
            item.appendChild(cancelButton);
            input.focus();

            saveButton.addEventListener("click", function () {
                const newText = input.value;
                editItemToBackend({ "id": itemId, "name": newText }, item);
                item.innerHTML = originalContent.replace(text, newText);
            });

            cancelButton.addEventListener("click", function () {
                item.innerHTML = originalContent;
            });
        }
    });



});
