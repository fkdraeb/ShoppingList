package com.draeb.shoppinglist.Service;

import com.draeb.shoppinglist.Model.Item;
import com.draeb.shoppinglist.Repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAllItems () {
        return itemRepository.findAll();
    }

    public void updateItem (Long id, Item updatedItem) throws NoSuchFieldException {
        Optional<Item> existingItem = itemRepository.findById(id);

        if(existingItem.isPresent()) {
            Item itemToUpdate = existingItem.get();
            boolean hasChanges = false;

            if (updatedItem.getName() != null && !itemToUpdate.getName().equals(updatedItem.getName())) {
                itemToUpdate.setName(updatedItem.getName());
                hasChanges = true;
            }

            if (hasChanges) {
                itemRepository.save(itemToUpdate);
            }
        }
        else
            throw new NoSuchFieldException("There is no product with " + id + " id");
    }

    public void purchaseItem (Long id) throws NoSuchFieldException {
        Optional<Item> itemRepositoryById = itemRepository.findById(id);

        if(itemRepositoryById.isPresent()) {
            Item itemToUpdate = itemRepositoryById.get();
            itemToUpdate.setPurchased(!itemToUpdate.isPurchased());
            itemRepository.flush();
        }
        else
            throw new NoSuchFieldException("There is no product with " + id + " id");

    }

}
