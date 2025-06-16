# Introduction
This is a sample food delivery application built with React. Below is an overview of the key features and logic.

# Features Overview
- Category Selection:
  - Users can browse and select different types of food. Clicking on a food item adds it to the cart and activates the checkout functionality.

- Cart Interaction:

  - Clicking on the same food item multiple times will increase its quantity in the cart.

  - Clicking on a different food item will add a new entry to the cart.

- Quantity Adjustment:

  - Users can decrease the quantity of any food item in the cart.

  - If the quantity reaches zero, the item is automatically removed from the cart.

- Cart Overlay:
  - When the cart is opened, a gray overlay appears on the main page to help users focus on the cart content.
  - 
# Main function logic
## Tab Switching (Category Selection)
```js 
onClick={()=>dispatch(changeActiveIndex(index))}
```
- Define the initialState and reducer using createSlice.

- Read the current activeIndex using useSelector.

- Bind the click event with onClick, and dispatch changeActiveIndex(index) to update the selected category.

- Use conditional class styling to highlight the selected tab
```js
  className={activeIndex === index ? 'active' : ''}
```

## Total price count logic
```js
const totalPrice = cartList.reduce((a,c)=>a+c.price*c.count,0)
```

- Uses the reduce method to calculate the total amount based on price and quantity of each item.
## Add and reduce count logic
```js
decreCount(state,action){
            const item = state.cartList.find(item=>item.id === action.payload.id)
            if(item.count<1){
                state.cartList.pop(action.payload)
            }
            item.count--
        }
```

- Finds the item in the cart by id.

- If its count is less than 1, removes it from the cart.

- Otherwise, decreases the count by 1.

>Note: Ensure that the logic to remove an item is included when the count drops below 1.