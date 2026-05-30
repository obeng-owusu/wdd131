// =========================
// CONSTANTS
// =========================

const FILTERS = {
    HOME: "home",
    OLD: "old",
    NEW: "new",
    LARGE: "large",
    SMALL: "small"
};

// Filter functions object for better scalability
const filterFunctions = {
    [FILTERS.HOME]: () => true,
    [FILTERS.OLD]: (temple) => getDedicationYear(temple.dedicated) < 1900,
    [FILTERS.NEW]: (temple) => getDedicationYear(temple.dedicated) > 2000,
    [FILTERS.LARGE]: (temple) => temple.area > 90000,
    [FILTERS.SMALL]: (temple) => temple.area < 10000
};

// =========================
// TEMPLE DATA ARRAY
// =========================

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Additional temples (total: 10)
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-lds-1220946-wallpaper.jpg"
    },
    {
        templeName: "Nauvoo Illinois",
        location: "Nauvoo, Illinois, United States",
        dedicated: "2002, June, 27",
        area: 54000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nauvoo-illinois/400x250/nauvoo-temple-756947-wallpaper.jpg"
    },
    {
        templeName: "Cardston Alberta",
        location: "Cardston, Alberta, Canada",
        dedicated: "1923, August, 26",
        area: 88650,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cardston-alberta/400x250/cardston-alberta-temple-lds-345694-wallpaper.jpg"
    }
];

// =========================
// DOM ELEMENT CACHING
// =========================

const DOM = {
    gallery: document.getElementById("templeGallery"),
    count: document.getElementById("templeCount"),
    navMenu: document.getElementById("navMenu"),
    hamburger: document.getElementById("hamburgerBtn"),
    currentYear: document.getElementById("currentYear"),
    lastModified: document.getElementById("lastModified")
};

// =========================
// HELPER FUNCTIONS
// =========================

// Simplified year extraction (format: "YYYY, Month, Day")
const getDedicationYear = (dedicated) => Number(dedicated.split(",")[0]);

// Filter temples using the filter functions object
function filterTemples(templesArray, filterType) {
    const filterFn = filterFunctions[filterType];
    return filterFn ? templesArray.filter(filterFn) : [...templesArray];
}

// Create semantic article element for temple card (no innerHTML)
function createTempleCard(temple) {
    const article = document.createElement("article");
    article.className = "temple-card";

    // Image with native lazy loading
    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.loading = "lazy";

    // Improved image error handling
    img.addEventListener("error", () => {
        img.src = "https://via.placeholder.com/400x300?text=Image+Unavailable";
        img.alt = `${temple.templeName} - Image unavailable`;
    });

    // Info container
    const infoDiv = document.createElement("div");
    infoDiv.className = "temple-info";

    // Build elements using DOM methods (no innerHTML)
    const title = document.createElement("h3");
    title.className = "temple-name";
    title.textContent = temple.templeName;

    // Location
    const locationDiv = document.createElement("div");
    locationDiv.className = "temple-detail";
    const locationLabel = document.createElement("span");
    locationLabel.className = "detail-label";
    locationLabel.textContent = "📍 Location:";
    const locationValue = document.createElement("span");
    locationValue.className = "detail-value";
    locationValue.textContent = temple.location;
    locationDiv.appendChild(locationLabel);
    locationDiv.appendChild(locationValue);

    // Dedicated date
    const dedicatedDiv = document.createElement("div");
    dedicatedDiv.className = "temple-detail";
    const dedicatedLabel = document.createElement("span");
    dedicatedLabel.className = "detail-label";
    dedicatedLabel.textContent = "📅 Dedicated:";
    const dedicatedValue = document.createElement("span");
    dedicatedValue.className = "detail-value";
    dedicatedValue.textContent = temple.dedicated;
    dedicatedDiv.appendChild(dedicatedLabel);
    dedicatedDiv.appendChild(dedicatedValue);

    // Area
    const areaDiv = document.createElement("div");
    areaDiv.className = "temple-detail";
    const areaLabel = document.createElement("span");
    areaLabel.className = "detail-label";
    areaLabel.textContent = "📐 Area:";
    const areaValue = document.createElement("span");
    areaValue.className = "detail-value";
    areaValue.textContent = `${temple.area.toLocaleString()} sq ft`;
    areaDiv.appendChild(areaLabel);
    areaDiv.appendChild(areaValue);

    // Assemble card
    infoDiv.appendChild(title);
    infoDiv.appendChild(locationDiv);
    infoDiv.appendChild(dedicatedDiv);
    infoDiv.appendChild(areaDiv);

    article.appendChild(img);
    article.appendChild(infoDiv);

    return article;
}

// Render temples using document fragment for performance
function renderTemples(filteredTemples) {
    if (!DOM.gallery) return;

    // Clear existing content
    DOM.gallery.innerHTML = "";

    // Handle empty results
    if (filteredTemples.length === 0) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "empty-state";
        const message = document.createElement("p");
        message.textContent = "✨ No temples match this filter ✨";
        const suggestion = document.createElement("p");
        suggestion.className = "suggestion";
        suggestion.textContent = "Try selecting a different category from the menu above!";
        emptyDiv.appendChild(message);
        emptyDiv.appendChild(suggestion);
        DOM.gallery.appendChild(emptyDiv);
        DOM.count.textContent = "0 temples found";
        return;
    }

    // Use document fragment to minimize reflows
    const fragment = document.createDocumentFragment();

    filteredTemples.forEach(temple => {
        fragment.appendChild(createTempleCard(temple));
    });

    DOM.gallery.appendChild(fragment);

    // Update counter
    DOM.count.textContent = `${filteredTemples.length} temple${filteredTemples.length !== 1 ? "s" : ""} found`;
}

// Set active button state
function setActiveButton(filterType) {
    const buttons = DOM.navMenu?.querySelectorAll("button");
    buttons?.forEach(button => {
        const buttonFilter = button.getAttribute("data-filter");
        if (buttonFilter === filterType) {
            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
        } else {
            button.classList.remove("active");
            button.setAttribute("aria-pressed", "false");
        }
    });
}

// Handle filter change
function handleFilter(filterType) {
    const filtered = filterTemples(temples, filterType);
    renderTemples(filtered);
    setActiveButton(filterType);
}

// =========================
// EVENT HANDLERS
// =========================

// Hamburger menu toggle
function initHamburgerMenu() {
    if (!DOM.hamburger || !DOM.navMenu) return;

    DOM.hamburger.addEventListener("click", () => {
        const isOpen = DOM.navMenu.classList.toggle("open");
        DOM.hamburger.setAttribute("aria-expanded", isOpen);
        DOM.hamburger.textContent = isOpen ? "✖" : "☰";
    });
}

// Event delegation for filter buttons (single listener)
function initFilterListeners() {
    if (!DOM.navMenu) return;

    DOM.navMenu.addEventListener("click", (e) => {
        const button = e.target.closest("[data-filter]");
        if (!button) return;

        e.preventDefault();
        const filterType = button.getAttribute("data-filter");

        if (filterType && filterFunctions[filterType]) {
            handleFilter(filterType);

            // Close mobile menu if open
            if (window.innerWidth <= 768 && DOM.navMenu.classList.contains("open")) {
                DOM.navMenu.classList.remove("open");
                if (DOM.hamburger) {
                    DOM.hamburger.setAttribute("aria-expanded", "false");
                    DOM.hamburger.textContent = "☰";
                }
            }
        }
    });
}

// Set footer dates
function setFooterDates() {
    if (DOM.currentYear) {
        DOM.currentYear.textContent = new Date().getFullYear();
    }

    if (DOM.lastModified) {
        DOM.lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
}

// Keyboard navigation support - close menu on Escape
function initKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && DOM.navMenu?.classList.contains("open")) {
            DOM.navMenu.classList.remove("open");
            if (DOM.hamburger) {
                DOM.hamburger.setAttribute("aria-expanded", "false");
                DOM.hamburger.textContent = "☰";
            }
        }
    });
}

// =========================
// INITIALIZATION
// =========================

function init() {
    setFooterDates();
    initHamburgerMenu();
    initFilterListeners();
    initKeyboardNavigation();
    handleFilter(FILTERS.HOME);
}

// Start the application (defer attribute guarantees DOM is ready)
init();