
# Shopping List

This project focus on a type of a to-do list. A little companion to help you on the boring task of shopping.


## Demo

![](https://github.com/fkdraeb/fkdraeb/blob/main/shopping-list-demo.gif)

## Features

- Add, edit and delete item
- Checkmark to complete items
- Sorting by creation date or alphabetically


## Build and run

The only requirement to build the app from source is Docker. After running the root script run_shoppinglist.sh you should be able to see three docker containers running.

```bash
  sh run_shoppinglist.sh
  docker ps
    
    IMAGE                    NAMES
    shoppinglist-web-image   shoppinglist-web-container
    shoppinglist-image       shoppinglist-container
    postgres:14.3-alpine   
```

