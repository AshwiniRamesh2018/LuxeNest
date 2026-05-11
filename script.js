const properties = [
    {
        title: "Modern Villa",
        location: "Bangalore, India",
        price: "₹2.5 Crore",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200"
    },
    {
        title: "Luxury Apartment",
        location: "Chennai, India",
        price: "₹1.8 Crore",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200"
    },
    {
        title: "Premium House",
        location: "Hyderabad, India",
        price: "₹3.2 Crore",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200"
    }
];


gsap.registerPlugin(ScrollTrigger);


gsap.from(".navbar", {
    y: -50,
    opacity: 0,
    duration: 1.5
});

gsap.from(".hero h1", {
    y: 30,
    opacity: 0,
    duration: 1.5,
    delay: 0.5
});

gsap.from(".hero p", {
    y: 30,
    opacity: 0,
    duration: 1.5,
    delay: 1
});

gsap.from(".hero a", {
    y: 20,
    opacity: 1,
    duration: 1.5,
    delay: 1
});

gsap.from(".hero img", {
    scrollTrigger: {
        trigger: ".hero img",
        start: "top 80%"
    },
    x: 50,
    duration: 1.5
});
gsap.from(".card", {
    y: 50,
    duration: 1.5,
    stagger: 0.3,
    delay: 1.5
});
gsap.from(".card", {
    scrollTrigger: ".card",
    y: 80,
    duration: 1.2,
    stagger: 0.3
});
gsap.from(".text-warning", {
    scrollTrigger: {
        trigger: ".text-warning",
        start: "top 85%"
    },
    y: 40,
    duration: 1,
    stagger: 0.2
});
const container = document.getElementById("propertyContainer");
const searchInput = document.getElementById("searchInput");
const priceFilter = document.getElementById("priceFilter");

function renderProperties(data) {
    container.innerHTML = "";

    data.forEach((item) => {
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card bg-dark text-white border-0">
                    <img src="${item.image}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.location}</p>
                        <h6 class="text-warning">${item.price}</h6>
                    </div>
                </div>
            </div>
        `;
    });
}

// Convert price to number (for filtering)
function getPriceValue(price) {
    return parseFloat(price.replace(/[^0-9.]/g, ""));
}

function filterData() {
    let filtered = properties;

    let searchText = searchInput.value.toLowerCase();
    let filterValue = priceFilter.value;

    // Search filter
    filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText)
    );

    // Price filter
    filtered = filtered.filter(item => {
        let price = getPriceValue(item.price);

        if (filterValue === "low") return price < 2.5;
        if (filterValue === "mid") return price >= 2.5 && price <= 3;
        if (filterValue === "high") return price > 3;
        return true;
    });

    renderProperties(filtered);
}

// Event listeners
searchInput.addEventListener("input", filterData);
priceFilter.addEventListener("change", filterData);

// initial render
renderProperties(properties);