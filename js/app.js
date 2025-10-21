// Mock data - replace with actual API call
const mockData = {
    results: [
        {
            address: {
                street: "25 Seacroft Close",
                sal: "Belmont North",
                state: "NSW"
            },
            attributes: {
                bathrooms: 2,
                bedrooms: 4,
                garage_spaces: 2,
                land_size: "973 m²",
                description: "Positioned on an expansive block with lush bushland to the rear, this incredible property creates a private sanctuary accentuating effortless family living, complemented by multiple living spaces and fabulous resort-style entertaining."
            },
            price: 1250000,
            property_type: "House",
            listing_date: "2025-10-07"
        },
        {
            address: {
                street: "67 Old Belmont Road",
                sal: "Belmont North",
                state: "NSW"
            },
            attributes: {
                bathrooms: 1,
                bedrooms: 3,
                garage_spaces: 2,
                land_size: "556 m²",
                description: "Full of character and warmth, this classic weatherboard cottage is the perfect opportunity for first home buyers or investors. Set in a sought-after Belmont North location, it offers generous living spaces, plenty of potential, and a lifestyle of comfort and convenience."
            },
            price: 890000,
            property_type: "House",
            listing_date: "2025-10-08"
        },
        {
            address: {
                street: "17 Dulungra Avenue",
                sal: "Belmont North",
                state: "NSW"
            },
            attributes: {
                bathrooms: 3,
                bedrooms: 5,
                garage_spaces: 2,
                land_size: "None",
                description: "This beautifully presented five-bedroom, three-bathroom home combines generous proportions, modern finishes, and a flexible design, creating the perfect haven for growing families."
            },
            price: null,
            property_type: "House",
            listing_date: "2025-10-08"
        }
    ]
};

// State
let properties = [];
let currentView = 'grid';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    loadProperties();
    setupEventListeners();
});

// Load properties
async function loadProperties() {
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For real API integration, uncomment:
        // const response = await fetch('https://www.microburbs.com.au/report_generator/api/suburb/properties?suburb=Belmont+North', {
        //     headers: {
        //         'Authorization': 'Bearer test',
        //         'Content-Type': 'application/json'
        //     }
        // });
        // const data = await response.json();
        // properties = data.results;
        
        properties = mockData.results;
        
        hideLoading();
        updateStats();
        renderProperties();
    } catch (error) {
        console.error('Error loading properties:', error);
        hideLoading();
    }
}

// Hide loading screen
function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
}

// Update statistics
function updateStats() {
    const totalListings = properties.length;
    const propertiesWithPrice = properties.filter(p => p.price);
    const avgPrice = propertiesWithPrice.reduce((sum, p) => sum + p.price, 0) / propertiesWithPrice.length;
    const avgBedrooms = properties.reduce((sum, p) => sum + p.attributes.bedrooms, 0) / properties.length;
    const prices = propertiesWithPrice.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    document.getElementById('total-listings').textContent = totalListings;
    document.getElementById('avg-price').textContent = formatPrice(avgPrice);
    document.getElementById('avg-bedrooms').textContent = avgBedrooms.toFixed(1);
    document.getElementById('price-range').textContent = `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
}

// Format price
function formatPrice(price) {
    if (!price) return 'EOI';
    return `$${(price / 1000).toFixed(0)}k`;
}

function formatFullPrice(price) {
    if (!price) return 'Expressions of Interest';
    return `$${price.toLocaleString()}`;
}

// Render properties
function renderProperties() {
    const container = document.getElementById('properties-container');
    container.className = currentView === 'grid' ? 'properties-grid' : 'properties-list';
    container.innerHTML = '';

    properties.forEach((property, index) => {
        const card = createPropertyCard(property, index);
        container.appendChild(card);
    });
}

// Create property card
function createPropertyCard(property, index) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.onclick = () => openModal(property);

    const landSize = property.attributes.land_size !== "None" 
        ? `<div class="feature">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                   <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
               </svg>
               <span>${property.attributes.land_size}</span>
           </div>` 
        : '';

    card.innerHTML = `
        <div class="property-image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        </div>
        <div class="property-body">
            <div class="property-header">
                <span class="property-price">${formatFullPrice(property.price)}</span>
                <span class="property-badge">${property.property_type}</span>
            </div>
            <div class="property-address">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p>${property.address.street}, ${property.address.sal}</p>
            </div>
            <div class="property-features">
                <div class="feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M2 4v16"></path>
                        <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
                        <path d="M2 17h20"></path>
                        <path d="M6 8v9"></path>
                    </svg>
                    <span>${property.attributes.bedrooms}</span>
                </div>
                <div class="feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 6h6"></path>
                        <path d="M12 3v3"></path>
                        <path d="M11 10H2"></path>
                        <path d="M22 10h-9"></path>
                        <path d="M12 10v11"></path>
                        <path d="M8 21h8"></path>
                    </svg>
                    <span>${property.attributes.bathrooms}</span>
                </div>
                <div class="feature">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                        <path d="M6 9h.01"></path>
                        <path d="M10 9h.01"></path>
                    </svg>
                    <span>${property.attributes.garage_spaces}</span>
                </div>
                ${landSize}
            </div>
            <p class="property-description">${property.attributes.description}</p>
            <div class="property-date">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Listed ${formatDate(property.listing_date)}</span>
            </div>
        </div>
    `;

    return card;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Open modal
function openModal(property) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = property.address.street;

    const landSize = property.attributes.land_size !== "None" 
        ? `<div class="modal-feature">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color: var(--orange-400)">
                   <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
               </svg>
               <div class="modal-feature-value">${property.attributes.land_size}</div>
               <div class="modal-feature-label">Land</div>
           </div>` 
        : '';

    modalBody.innerHTML = `
        <div class="modal-image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        </div>

        <div class="modal-stats">
            <div class="modal-stat">
                <div class="modal-stat-label">Price</div>
                <div class="modal-stat-value">${formatFullPrice(property.price)}</div>
            </div>
            <div class="modal-stat">
                <div class="modal-stat-label">Property Type</div>
                <div class="modal-stat-value" style="font-size: 1.25rem;">${property.property_type}</div>
            </div>
        </div>

        <div class="modal-features">
            <div class="modal-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color: var(--emerald-400)">
                    <path d="M2 4v16"></path>
                    <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
                    <path d="M2 17h20"></path>
                    <path d="M6 8v9"></path>
                </svg>
                <div class="modal-feature-value">${property.attributes.bedrooms}</div>
                <div class="modal-feature-label">Bedrooms</div>
            </div>
            <div class="modal-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color: var(--cyan-400)">
                    <path d="M9 6h6"></path>
                    <path d="M12 3v3"></path>
                    <path d="M11 10H2"></path>
                    <path d="M22 10h-9"></path>
                    <path d="M12 10v11"></path>
                    <path d="M8 21h8"></path>
                </svg>
                <div class="modal-feature-value">${property.attributes.bathrooms}</div>
                <div class="modal-feature-label">Bathrooms</div>
            </div>
            <div class="modal-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="color: var(--purple-400)">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <path d="M6 9h.01"></path>
                    <path d="M10 9h.01"></path>
                </svg>
                <div class="modal-feature-value">${property.attributes.garage_spaces}</div>
                <div class="modal-feature-label">Parking</div>
            </div>
            ${landSize}
        </div>

        <div class="modal-section">
            <h3>Description</h3>
            <p>${property.attributes.description}</p>
        </div>

        <div class="property-date" style="display: flex; align-items: center; gap: 0.5rem;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 1rem; height: 1rem;">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Listed ${formatDate(property.listing_date)}</span>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Setup event listeners
function setupEventListeners() {
    // View toggle buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            renderProperties();
        });
    });

    // Modal close button
    document.getElementById('modal-close').addEventListener('click', closeModal);

    // Modal backdrop click
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeModal);
    }

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}