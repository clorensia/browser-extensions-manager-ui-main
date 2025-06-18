document.addEventListener('DOMContentLoaded', () => {
    const extensionsGrid = document.getElementById('extensions-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeToggle = document.getElementById('theme-toggle');
    let allExtensions = []; // Store the original data

    // Function to fetch and render extensions
    const fetchAndRenderExtensions = async () => {
        try {
            const response = await fetch('data.json');
            const data = await response.json();
            allExtensions = data; // Store the original data
            renderExtensions(allExtensions); // Initially render all
        } catch (error) {
            console.error('Error fetching extensions:', error);
        }
    };

    // Function to render extensions based on a given array
    const renderExtensions = (extensionsToRender) => {
        extensionsGrid.innerHTML = ''; // Clear existing extensions
        extensionsToRender.forEach(extension => {
            const extensionCard = document.createElement('div');
            extensionCard.classList.add('extension-card');
            extensionCard.dataset.name = extension.name; // Add data attribute for easy lookup

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

        // Attach event listeners for remove and toggle after rendering
        attachActionListeners();
    };

    // Function to attach event listeners to dynamically created elements
    const attachActionListeners = () => {
        // Remove button functionality
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.onclick = (event) => {
                const extensionName = event.target.dataset.name;
                removeExtension(extensionName);
            };
        });

        // Toggle switch functionality
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
            toggle.onchange = (event) => {
                const extensionName = event.target.dataset.name;
                toggleExtensionStatus(extensionName, event.target.checked);
            };
        });
    };

    // Function to remove an extension
    const removeExtension = (name) => {
        allExtensions = allExtensions.filter(ext => ext.name !== name);
        applyFilter(); // Re-render with the current filter applied
    };

    // Function to toggle extension status
    const toggleExtensionStatus = (name, isActive) => {
        const extension = allExtensions.find(ext => ext.name === name);
        if (extension) {
            extension.isActive = isActive;
            applyFilter(); // Re-render with the current filter applied
        }
    };

    // Filter button functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            event.target.classList.add('active');

            applyFilter();
        });
    });

    // Function to apply the current filter
    const applyFilter = () => {
        const activeFilterButton = document.querySelector('.filter-btn.active');
        const filterType = activeFilterButton ? activeFilterButton.dataset.filter : 'all'; // Default to 'all'

        let filteredExtensions = [];
        if (filterType === 'active') {
            filteredExtensions = allExtensions.filter(ext => ext.isActive);
        } else if (filterType === 'inactive') {
            filteredExtensions = allExtensions.filter(ext => !ext.isActive);
        } else { // 'all'
            filteredExtensions = allExtensions;
        }
        renderExtensions(filteredExtensions);
    };

    // Theme switching functionality
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

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        themeToggle.checked = false;
    }

    // Initial fetch and render
    fetchAndRenderExtensions();
});