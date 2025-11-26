// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Load external portfolio HTML
fetch("portfolio.html")
  .then(res => res.text())
  .then(data => {
      document.getElementById("portfolio-container").innerHTML = data;
      activateFilters();
  });



// function activateFilters() {
//     const buttons = document.querySelectorAll(".filter-btn");
//     const items = document.querySelectorAll(".portfolio-item");

//     buttons.forEach(btn => {
//         btn.addEventListener("click", () => {

//             // update button active state
//             buttons.forEach(b => b.classList.remove("active"));
//             btn.classList.add("active");

//             const filter = btn.getAttribute("data-filter");

//             items.forEach(item => {
//                 const category = item.getAttribute("data-category");

//                 if (filter === "All" || category === filter) {
//                     item.style.display = "block";
//                 } else {
//                     item.style.display = "none";
//                 }
//             });
//         });
//     });
// }

function sortPortfolioItems() {
    const grids = document.querySelectorAll(".thumbnails-grid");

    grids.forEach(grid => {
        const items = Array.from(grid.querySelectorAll(".portfolio-item"));

        items.sort((a, b) => {
            const dateA = a.getAttribute("data-date");
            const dateB = b.getAttribute("data-date");
            
            // Handle missing dates
            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;
            
            // Convert to Date objects for more reliable comparison
            const timeA = new Date(dateA + "-01").getTime(); // Add day for complete date
            const timeB = new Date(dateB + "-01").getTime();
            
            return timeB - timeA; // Newest first
        });

        // Re-append in sorted order
        items.forEach(item => grid.appendChild(item));
    });
}

function activateFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".portfolio-item");

    sortPortfolioItems()
    
    let emptyMsg = document.createElement("div");
    emptyMsg.id = "no-results-msg";
    emptyMsg.textContent = "Not Yet Available";
    emptyMsg.style.textAlign = "center";
    emptyMsg.style.fontSize = "18px";
    emptyMsg.style.marginTop = "20px";
    emptyMsg.style.display = "none";

    const grid = document.querySelector(".thumbnails-grid");
    grid.parentNode.insertBefore(emptyMsg, grid.nextSibling);

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            let visibleCount = 0;

            items.forEach(item => {
                const categoryList = item.getAttribute("data-category").split(" ");

                if (filter === "All" || categoryList.includes(filter)) {
                    item.style.display = "block"; // Change to block
                    visibleCount++;
                } else {
                    item.style.display = "none";
                }
            });
            // call sort 
            sortPortfolioItems()
            
            if (visibleCount === 0) {
                emptyMsg.style.display = "block";
            } else {
                emptyMsg.style.display = "none";
            }
        });
    });
}

