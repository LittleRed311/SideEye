// App Data (You will add more apps here in the future)
const apps = [
    {
        id: 1,
        name: "Relax",
        description: "A simple breathing meditation app designed for the additive display. Inhale and exhale to the rhythmic animation to center yourself. Specifically optimized for Meta Ray-Ban displays.",
        link: "https://adamtampio.github.io/relax/"
    }
];

// DOM Elements
const appGrid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');

const appModal = document.getElementById('appModal');
const closeAppModal = document.getElementById('closeAppModal');
const modalAppName = document.getElementById('modalAppName');
const modalAppDesc = document.getElementById('modalAppDesc');
const sideloadLink = document.getElementById('sideloadLink');
const copyBtn = document.getElementById('copyBtn');

const devModal = document.getElementById('devModal');
const devCtaBtn = document.getElementById('devCtaBtn');
const closeDevModal = document.getElementById('closeDevModal');

// Render Apps
function renderApps(appsToRender) {
    appGrid.innerHTML = '';
    
    if (appsToRender.length === 0) {
        appGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; font-size: 1.1rem; padding: 2rem;">No apps found matching your search.</p>';
        return;
    }

    appsToRender.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <h3>${app.name}</h3>
            <p>${app.description}</p>
            <div class="card-action">View Details &rarr;</div>
        `;
        card.addEventListener('click', () => openAppModal(app));
        appGrid.appendChild(card);
    });
}

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredApps = apps.filter(app => 
        app.name.toLowerCase().includes(searchTerm) || 
        app.description.toLowerCase().includes(searchTerm)
    );
    renderApps(filteredApps);
});

// App Modal Handling
function openAppModal(app) {
    modalAppName.textContent = app.name;
    modalAppDesc.textContent = app.description;
    sideloadLink.value = app.link;
    copyBtn.textContent = 'Copy';
    appModal.classList.add('show');
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

closeAppModal.addEventListener('click', () => {
    appModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Dev Modal Handling
devCtaBtn.addEventListener('click', () => {
    devModal.classList.add('show');
    document.body.style.overflow = 'hidden';
});

closeDevModal.addEventListener('click', () => {
    devModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === appModal) {
        appModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    if (e.target === devModal) {
        devModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Copy Button Functionality
copyBtn.addEventListener('click', () => {
    sideloadLink.select();
    sideloadLink.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        navigator.clipboard.writeText(sideloadLink.value).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        });
    } catch (err) {
        // Fallback
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    }
});

// Initial Render
renderApps(apps);
