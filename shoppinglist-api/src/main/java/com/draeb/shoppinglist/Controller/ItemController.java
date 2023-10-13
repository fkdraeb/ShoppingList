package com.draeb.shoppinglist.Controller;

import com.draeb.shoppinglist.APIResponse;
import com.draeb.shoppinglist.Model.Item;
import com.draeb.shoppinglist.Repository.ItemRepository;
import com.draeb.shoppinglist.Service.ItemService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:8080"})
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

    //curl -X POST -H 'Content-Type: application/json' localhost:8090 --data '{"name":"Batatas"}'
    @PostMapping("/")
    public ResponseEntity<APIResponse<Item>> createItem(@RequestBody Item item) {
        Item createdItem = itemRepository.save(item);

        URI location = URI.create("/");
        String successMessage = "Item created successfully";
        APIResponse<Item> response = new APIResponse<>(HttpStatus.CREATED.value(), successMessage);
        response.setData(createdItem);
        return ResponseEntity.created(location).body(response);
    }

    //curl -X PUT -H 'Content-Type: application/json' localhost:8090/update/item/52 --data '{"name":"Tomates", "quantity":20}'
    @PutMapping("update/item/{id}")
    public ResponseEntity<APIResponse<String>> updateItem(@PathVariable Long id, @RequestBody Item item) {
        try {
            itemService.updateItem(id, item);

            URI location = URI.create("/update/item/" + id);
            String successMessage = "Item updated successfully";

            APIResponse<String> response = new APIResponse<>(HttpStatus.ACCEPTED.value(), successMessage);
            response.setData(item.toString());
            return ResponseEntity.created(location).body(response);
        } catch (NoSuchFieldException e) {
            APIResponse<String> response = new APIResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    //curl -X PUT -H 'Content-Type: application/json' localhost:8090/purchase --data '{"id":2}'
    @PutMapping("/purchase")
    public ResponseEntity<APIResponse<String>> updateItem(@RequestBody Item item) {

        try {
            itemService.purchaseItem(item.getId());

            String successMessage = "Item purchased successfully";
            APIResponse<String> response = new APIResponse<>(HttpStatus.ACCEPTED.value(), successMessage);
            return ResponseEntity.accepted().body(response);

        } catch (NoSuchFieldException e) {
            APIResponse<String> response = new APIResponse<>(HttpStatus.NOT_FOUND.value(), e.getMessage());
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
