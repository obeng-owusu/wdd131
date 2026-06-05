const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Time Circuits" },
    { id: "ac-2000", name: "Low Voltage Reactor" },
    { id: "jj-1969", name: "Warp Equalizer" }
];

document.addEventListener("DOMContentLoaded", () => {

    // Populate product select dropdown
    const select = document.getElementById("product-name");

    if (select) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            select.appendChild(option);
        });
    }

    // Handle review confirmation page
    if (window.location.pathname.includes("review.html")) {

        let count = Number(localStorage.getItem("reviewCount")) || 0;
        count++;
        localStorage.setItem("reviewCount", count);

        const counterElement = document.getElementById("review-counter");
        if (counterElement) {
            counterElement.textContent = count;
        }

        // Display form data in summary
        const urlParams = new URLSearchParams(window.location.search);
        const summaryDiv = document.getElementById('review-summary');

        if (summaryDiv && urlParams.toString()) {
            // Get product name from ID
            let productId = urlParams.get('productName');
            let productName = productId;
            if (productId) {
                const product = products.find(p => p.id === productId);
                if (product) {
                    productName = product.name;
                }
            }

            const rating = urlParams.get('rating');
            const installDate = urlParams.get('installDate');
            const features = urlParams.getAll('features');
            const writtenReview = urlParams.get('writtenReview');
            const username = urlParams.get('username');

            let summaryHTML = '<h3>📋 Review Summary:</h3>';
            summaryHTML += '<div class="summary-details">';
            summaryHTML += `<p><strong>Product:</strong> ${productName || 'Not specified'}</p>`;

            if (rating) {
                const starRating = '★'.repeat(parseInt(rating));
                summaryHTML += `<p><strong>Rating:</strong> ${starRating} (${rating}/5)</p>`;
            } else {
                summaryHTML += `<p><strong>Rating:</strong> Not rated</p>`;
            }

            summaryHTML += `<p><strong>Installation Date:</strong> ${installDate || 'Not specified'}</p>`;

            if (features && features.length > 0) {
                summaryHTML += `<p><strong>Useful Features:</strong> ${features.join(', ')}</p>`;
            } else {
                summaryHTML += `<p><strong>Useful Features:</strong> None selected</p>`;
            }

            if (writtenReview && writtenReview.trim()) {
                summaryHTML += `<p><strong>Written Review:</strong> "${writtenReview}"</p>`;
            }

            if (username && username.trim()) {
                summaryHTML += `<p><strong>Reviewer:</strong> ${username}</p>`;
            }
            summaryHTML += '</div>';

            summaryDiv.innerHTML = summaryHTML;
        }
    }

    // Form validation for required fields
    const form = document.querySelector('.review-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            const productSelect = document.getElementById('product-name');
            const ratingSelected = document.querySelector('input[name="rating"]:checked');
            const installDate = document.getElementById('install-date');

            if (!productSelect.value) {
                e.preventDefault();
                alert('Please select a product.');
                productSelect.focus();
                return false;
            }

            if (!ratingSelected) {
                e.preventDefault();
                alert('Please select an overall rating.');
                return false;
            }

            if (!installDate.value) {
                e.preventDefault();
                alert('Please select the installation date.');
                installDate.focus();
                return false;
            }

            return true;
        });
    }
});

// Console explanation for radio button naming
console.log(`
✅ Why each radio button in the rating group has the same name value:

1. GROUPING: Radio buttons with the same name attribute are grouped together
2. SINGLE SELECTION: Only one radio button in a group can be selected at a time
3. AUTO-DESELECTION: Selecting one automatically deselects others in the same group
4. FORM DATA: Only the selected value is sent with the form submission
5. USER EXPERIENCE: Ensures users can only select one rating level
`);