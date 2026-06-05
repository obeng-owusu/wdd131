// Product array
const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Time Circuits" },
    { id: "ac-2000", name: "Low Voltage Reactor" },
    { id: "jj-1969", name: "Warp Equalizer" }
];

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {

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

        // Increment and display review count
        let count = Number(localStorage.getItem("reviewCount")) || 0;
        count++;
        localStorage.setItem("reviewCount", count);

        const counterElement = document.getElementById("review-counter");
        if (counterElement) {
            counterElement.textContent = count;
        }

        // Display form data summary
        const urlParams = new URLSearchParams(window.location.search);
        const summaryDiv = document.getElementById('review-summary');

        if (summaryDiv && urlParams.toString()) {
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

            let summaryHTML = '<h3>Review Summary:</h3>';
            summaryHTML += '<div style="background: #f9f9f9; padding: 10px; border-radius: 6px; margin-top: 10px;">';
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

console.log('form.js loaded successfully');