package com.draeb.shoppinglist.Repository;

import com.draeb.shoppinglist.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
