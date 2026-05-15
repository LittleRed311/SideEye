// App Data (You will add more apps here in the future)
const apps = [
    {
        id: 1,
        name: "Relax",
        category: "Utility",
        description: "A simple breathing meditation app designed for the additive display. Inhale and exhale to the rhythmic animation to center yourself. Specifically optimized for Meta Ray-Ban displays.",
        link: "https://facebook.com/fb_viewapp/web_app_deep_link?appName=Relax&appUrl=https%3A%2F%2Flittlered311.github.io%2Fmeditateonrbmd%2F"
    },
    {
        id: 2,
        name: "Compass",
        category: "Utility",
        description: "Basic, lightweight compass app",
        link: "https://facebook.com/fb_viewapp/web_app_deep_link?appName=Compass&appUrl=https%3A%2F%2Flittlered311.github.io%2FcompassRBMD%2F"
    }
];

// DOM Elements
const appGrid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

const appModal = document.getElementById('appModal');
const closeAppModal = document.getElementById('closeAppModal');
const modalAppName = document.getElementById('modalAppName');
const modalAppDesc = document.getElementById('modalAppDesc');
const sideloadLink = document.getElementById('sideloadLink');
const copyBtn = document.getElementById('copyBtn');

const devModal = document.getElementById('devModal');
const devCtaBtn = document.getElementById('devCtaBtn');
const closeDevModal = document.getElementById('closeDevModal');

const welcomeModal = document.getElementById('welcomeModal');
const closeWelcomeModal = document.getElementById('closeWelcomeModal');
const getStartedBtn = document.getElementById('getStartedBtn');

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

// Search & Filter Functionality
function filterApps() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    
    const filteredApps = apps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm) || app.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || app.category === category;
        return matchesSearch && matchesCategory;
    });
    
    renderApps(filteredApps);
}

searchInput.addEventListener('input', filterApps);
categoryFilter.addEventListener('change', filterApps);

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
    if (e.target === welcomeModal) {
        welcomeModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Welcome Modal Handling
function checkFirstVisit() {
    if (!localStorage.getItem('hasVisitedSideEye')) {
        welcomeModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        localStorage.setItem('hasVisitedSideEye', 'true');
    }
}

closeWelcomeModal.addEventListener('click', () => {
    welcomeModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

getStartedBtn.addEventListener('click', () => {
    welcomeModal.classList.remove('show');
    document.body.style.overflow = 'auto';
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

// Initial Render & Checks
renderApps(apps);
checkFirstVisit();
