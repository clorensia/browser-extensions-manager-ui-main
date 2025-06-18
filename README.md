# Frontend Mentor - Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [https://github.com/clorensia/browser-extensions-manager-ui-main](https://github.com/clorensia/browser-extensions-manager-ui-main)
- Live Site URL: [https://challengefementor-1.netlify.app/](https://challengefementor-1.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript (ES6+) for dynamic content and interactions

### What I learned

During this project, I focused on several key areas:

* **Dynamic Content Generation:** Effectively parsing a JSON file (`data.json`) and using JavaScript to dynamically create and inject HTML elements for each extension. This involved using `forEach` loops and template literals for cleaner code.
* **State Management (Vanilla JS):** Managing the application's data (the `allExtensions` array) in JavaScript to reflect changes like toggling active status or removing an extension. The `applyFilter()` function ensures the UI consistently reflects the current data state.
* **Event Delegation and Dynamic Listeners:** Attaching event listeners to dynamically created elements (like "Remove" buttons and toggle switches) to ensure they are interactive. I used direct `onclick` and `onchange` assignments after rendering, ensuring new elements are interactive.
* **CSS Custom Properties for Theming:** Implementing light and dark themes using CSS custom properties (`--body-bg`, `--card-bg`, etc.). This allowed for easy switching by just toggling a class on the `body` element, significantly simplifying theme management and reducing repetitive CSS.
* **Responsive Grid Layouts:** Utilizing CSS Grid with `repeat(auto-fit, minmax(280px, 1fr))` for a flexible and responsive extension card layout that adapts to different screen sizes. Media queries were used to refine the layout for desktop views.
* **LocalStorage for Persistence:** Saving the user's selected theme preference to `localStorage` so that their choice persists across browser sessions.

```js
// Example of dynamic rendering
const renderExtensions = (extensionsToRender) => {
    extensionsGrid.innerHTML = ''; // Clear existing
    extensionsToRender.forEach(extension => {
        const extensionCard = document.createElement('div');
        extensionCard.classList.add('extension-card');
        extensionCard.innerHTML = `
            <div class="extension-header">
                <img src="${extension.logo}" alt="${extension.name} logo" class="extension-logo">
                <h3 class="extension-name">${extension.name}</h3>
            </div>
            <p class="extension-description">${extension.description}</p>
            <div class="extension-actions">
                <button class="remove-btn" data-name="${extension.name}">Remove</button>
                <label class="toggle-switch">
                    <input type="checkbox" ${extension.isActive ? 'checked' : ''} data-name="${extension.name}">
                    <span class="toggle-slider"></span>
                </label>
            </div>
        `;
        extensionsGrid.appendChild(extensionCard);
    });
    attachActionListeners(); // Re-attach listeners
};

// Example of theme switching logic
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark');
    }
});
