# Introduction

This is a prototype of a comment system built with React. Users can publish and manage comments through an interactive interface.
![image](https://github.com/user-attachments/assets/4d1673ec-38c3-457b-bc3a-9c0bb764b79d)

# Main Features

## `useGetList()`

- Uses `json-server` to expose a JSON database as a RESTful API.
- `axios` is used to fetch data from the API.
- `useEffect()` handles data fetching when the component mounts.
- `useState()` manages component state.

## `Item()`

- `Item()` is a custom component that encapsulates the structure and logic of a single comment, making it reusable and modular.
- The `onDel` prop is used to pass the `handleDel` function from the `App` component to `Item`, enabling comment deletion.

## Switching Between "Hot" and "Latest"

```jsx
className={`nav-item ${type === item.type ? 'active' : ''}`}
```

This conditional expression dynamically adds the active class to highlight the selected tab.

# Areas for Improvement

- Implement a "like" system to make likes interactive and visually engaging, possibly with animated effects when the like button is clicked.

- Add input validation before publishing a comment to filter out inappropriate or offensive language.

- I didn't upload avatars mainly because I suffer from decision paralysis when it comes to choosing one. 😅
