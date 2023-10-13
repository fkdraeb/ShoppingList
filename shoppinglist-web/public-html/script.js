$(document).ready(function () {              //document.addEventListener("DOMContentLoaded", function () {
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

    $(document).on("click", '.delete-item-btn', function (event) {
        const item = event.target.closest("li");
        const itemId = item.getAttribute('data-item-id')

        deleteItemToBackend({ "id": itemId }, item);
    });

    $(document).on("click", '.edit-item-btn', function (event) {
        const item = event.target.closest("li");
        const itemId = item.getAttribute('data-item-id')

        if (item) {
            const text = item.textContent.trim(); // Get the current text content
            const input = document.createElement("input");
            input.value = text;
            input.classList.add("form-control");
            
            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.classList.add("btn", "btn-success", "mr-2");
      
            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel";
            cancelButton.classList.add("btn", "btn-secondary");
      
            item.textContent = ""; // Clear the content of the <li>
            item.appendChild(input);
            item.appendChild(saveButton);
            item.appendChild(cancelButton);
            input.focus();
      
            // Add an event listener to save the changes
            saveButton.addEventListener("click", function () {
              const newText = input.value;
              // Send newText to the backend via an AJAX request or any suitable method
              // After sending the data, you can update the item with the new text
              item.textContent = newText;
            });
      
            // Add an event listener to cancel the editing
            cancelButton.addEventListener("click", function () {
              item.textContent = text;
            });
          }


        //editItemToBackend({ "id": itemId }, item);
    });

});
