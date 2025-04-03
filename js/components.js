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

    // Setup contact buttons after loading components
    setupContactButtons();

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
function setupContactButtons() {
    // Contact button functionality
    const phoneElements = document.querySelectorAll('.contact-phone');
    const whatsappElements = document.querySelectorAll('.contact-whatsapp');

    phoneElements.forEach(function(phoneElement) {
        phoneElement.addEventListener('click', function() {
            window.location.href = 'tel:+905376006932';
        });
    });

    whatsappElements.forEach(function(whatsappElement) {
        whatsappElement.addEventListener('click', function() {
            const phoneNumber = '+905376006932';
            const message = 'Merhaba, yardım almak istiyorum!';
            window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        });
    });

    // Scroll-to-top button functionality
    window.addEventListener('scroll', function() {
        const upButton = document.querySelector('.up-button');
        
        if (window.scrollY > 100) {
            upButton.classList.add('visible'); // Show the button
        } else {
            upButton.classList.remove('visible'); // Hide the button
        }
    });
}