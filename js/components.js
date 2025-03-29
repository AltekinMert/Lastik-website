// Function to load component into a specific element
async function loadComponent(url, targetId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.innerHTML = content;
        } else {
            console.error(`Target element with ID ${targetId} not found`);
        }
    } catch (error) {
        console.error(`Error loading component from ${url}: ${error.message}`);
    }
}

// Function to load all components when the document is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Define all components to load
    const components = [
        { url: 'components/top-bar.html', targetId: 'top-bar-container' },
        { url: 'components/header.html', targetId: 'header-container' },
        { url: 'components/sidebar.html', targetId: 'sidebar-container' },
        { url: 'components/footer.html', targetId: 'footer-container' }
    ];

    // Load each component
    for (const component of components) {
        await loadComponent(component.url, component.targetId);
    }

    // Load scripts
    const scriptsResponse = await fetch('components/scripts.html');
    if (scriptsResponse.ok) {
        const scriptsContent = await scriptsResponse.text();
        // Create a temporary div to hold the scripts
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = scriptsContent;
        
        // Extract and execute each script
        const scripts = tempDiv.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
        });
    }
}); 