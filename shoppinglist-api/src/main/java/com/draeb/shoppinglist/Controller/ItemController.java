package com.draeb.shoppinglist.Controller;

import com.draeb.shoppinglist.APIResponse;
import com.draeb.shoppinglist.Model.Item;
import com.draeb.shoppinglist.Repository.ItemRepository;
import com.draeb.shoppinglist.Service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*" )
public class ItemController {

    private final ItemRepository itemRepository;
    private final ItemService itemService;

    public ItemController(ItemRepository itemRepository, ItemService itemService) {
        this.itemRepository = itemRepository;
        this.itemService = itemService;
    }

    @GetMapping("/up")
    public String upCheck() {
        return "\nThe listapp is running\n";
    }

    @GetMapping("/")
    public List<Item> getAllProducts() {
        return itemService.getAllItems();
    }

    @PostMapping("/")
    public ResponseEntity<APIResponse<Item>> createItem(@RequestBody Item item) {
        Item createdItem = itemRepository.save(item);

        URI location = URI.create("/");
        String successMessage = "Item created successfully";
        APIResponse<Item> response = new APIResponse<>(HttpStatus.CREATED.value(), successMessage);
        response.setData(createdItem);
        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/")
    public ResponseEntity<APIResponse<String>> updateItem(@RequestBody Item item) {
        try {
            itemService.updateItem(item);
            String successMessage = "Item name updated successfully";

            APIResponse<String> response = new APIResponse<>(HttpStatus.ACCEPTED.value(), successMessage);
            response.setData(item.toString());
            return ResponseEntity.accepted().body(response);
        } catch (NoSuchFieldException e) {
            APIResponse<String> response = new APIResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PutMapping("/purchase")
    public ResponseEntity<APIResponse<Item>> purchaseItem(@RequestBody Item item) {

        try {
            itemService.purchaseItem(item.getId());
            Item itemFromRepo = itemRepository.getReferenceById(item.getId());

            String successMessage = "Item purchased successfully";
            APIResponse<Item> response = new APIResponse<>(HttpStatus.ACCEPTED.value(), successMessage, itemFromRepo);
            return ResponseEntity.accepted().body(response);

        } catch (NoSuchFieldException e) {
            APIResponse<Item> response = new APIResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage(), null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<APIResponse<String>> deleteItem(@RequestBody Item item) {
        try {
            itemService.deleteItem(item.getId());

            String successMessage = "Item deleted successfully";
            APIResponse<String> response = new APIResponse<>(HttpStatus.ACCEPTED.value(), successMessage);
            return ResponseEntity.accepted().body(response);
        } catch (NoSuchFieldException e) {
            APIResponse<String> response = new APIResponse<>(HttpStatus.BAD_REQUEST.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
