// Main JavaScript for Architects of Inclusive Digital Education Project

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Initialize GLightbox for video popups
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox'
        });
    }

    // Tab functionality
    function openTab(evt, tabName) {
        // Get all tab content elements
        const tabContents = document.getElementsByClassName('tab-content');
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove('active');
        }

        // Get all tab buttons
        const tabs = document.getElementsByClassName('tab');
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }

        // Show the current tab and add active class to the button
        document.getElementById(tabName).classList.add('active');
        evt.currentTarget.classList.add('active');
    }

    // Attach tab click events
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            openTab(e, tabName);
        });
    });

    // Toggle content functionality
    function toggleContent(contentId) {
        const content = document.getElementById(contentId);
        content.classList.toggle('active');
        
        // Smooth scroll to the content
        if (content.classList.contains('active')) {
            content.style.display = 'block';
            setTimeout(() => {
                content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 50);
        } else {
            content.style.display = 'none';
        }
    }

    // Initialize all hidden content sections as hidden
    const hiddenContents = document.querySelectorAll('.hidden-content');
    hiddenContents.forEach(content => {
        content.style.display = 'none';
    });

    // Comic panel functionality
    let currentPanel = 1;
    const totalPanels = 5; // Update this if you add more panels
    const audioElements = {};

    // Initialize audio elements
    for (let i = 1; i <= totalPanels; i++) {
        audioElements[`audio${i}`] = document.getElementById(`audio${i}`);
    }

    function changePanel(direction) {
        const newPanel = currentPanel + direction;
        
        // Check if new panel is within bounds
        if (newPanel < 1 || newPanel > totalPanels) return;
        
        // Update current panel
        document.getElementById(`panel${currentPanel}`).classList.remove('active-panel');
        currentPanel = newPanel;
        document.getElementById(`panel${currentPanel}`).classList.add('active-panel');
        
        // Update panel counter
        document.getElementById('panelCounter').textContent = `Panel ${currentPanel} of ${totalPanels}`;
        
        // Play audio if audio is toggled on
        if (isAudioOn && audioElements[`audio${currentPanel}`]) {
            audioElements[`audio${currentPanel}`].currentTime = 0;
            audioElements[`audio${currentPanel}`].play();
        }
    }

    // Audio toggle functionality
    let isAudioOn = false;
    function toggleAudioNarration() {
        isAudioOn = !isAudioOn;
        const audioButton = document.getElementById('toggleAudio');
        const audioText = document.getElementById('audioButtonText');
        
        if (isAudioOn) {
            audioButton.classList.add('btn-primary');
            audioButton.classList.remove('btn-outline-primary');
            audioText.textContent = 'Audio On';
            
            // Play current panel's audio
            if (audioElements[`audio${currentPanel}`]) {
                audioElements[`audio${currentPanel}`].play();
            }
        } else {
            audioButton.classList.remove('btn-primary');
            audioButton.classList.add('btn-outline-primary');
            audioText.textContent = 'Audio Off';
            
            // Pause all audio
            for (let i = 1; i <= totalPanels; i++) {
                if (audioElements[`audio${i}`]) {
                    audioElements[`audio${i}`].pause();
                }
            }
        }
    }

    // Video chapter navigation
    function playChapter(timeInSeconds) {
        const video = document.getElementById('designDoc');
        if (video) {
            video.currentTime = timeInSeconds;
            video.play();
        }
    }

    // Accordion functionality
    function setupAccordions() {
        const accordionButtons = document.querySelectorAll('.accordion-button');
        accordionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Close all other accordion items in the same accordion
                const parentAccordion = this.closest('.accordion');
                if (parentAccordion) {
                    const allItems = parentAccordion.querySelectorAll('.accordion-collapse');
                    allItems.forEach(item => {
                        if (item.id !== this.getAttribute('data-bs-target').substring(1)) {
                            item.classList.remove('show');
                        }
                    });
                }
            });
        });
    }

    // Process step toggle functionality
    function toggleStep(stepId) {
        const stepContent = document.getElementById(stepId);
        const stepHeader = stepContent.previousElementSibling;
        const chevron = stepHeader.querySelector('i.fa-chevron-down');
        
        stepContent.classList.toggle('active');
        
        if (stepContent.classList.contains('active')) {
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
            stepContent.style.maxHeight = stepContent.scrollHeight + 'px';
        } else {
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
            stepContent.style.maxHeight = '0';
        }
    }

    // Initialize process steps
    const processSteps = document.querySelectorAll('.process-step .step-header');
    processSteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            toggleStep(stepId);
        });
    });

    // Community map functionality
    function showCommunity(communityId) {
        alert(`Showing details for ${communityId.replace('-', ' ')} community`);
        // In a real implementation, this would load specific content for the selected community
    }

    // Full journey map viewer
    function showJourneyMap() {
        alert('Opening full journey map in a modal or new view');
        // In a real implementation, this would show a detailed journey map
    }

    // Full image viewer
    function showFullImage(imageName) {
        alert(`Opening full view of ${imageName}`);
        // In a real implementation, this would show the image in a lightbox
    }

    // Initialize Swiper for any carousels
    if (typeof Swiper !== 'undefined') {
        const swipers = document.querySelectorAll('.swiper-container');
        swipers.forEach(container => {
            new Swiper(container, {
                loop: true,
                autoplay: {
                    delay: 5000,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        });
    }

    // Initialize Waypoints for counting animations
    if (typeof Waypoint !== 'undefined') {
        const counters = document.querySelectorAll('.purecounter');
        counters.forEach(counter => {
            new Waypoint({
                element: counter,
                handler: function() {
                    if (typeof PureCounter !== 'undefined') {
                        new PureCounter({
                            selector: '.purecounter',
                            duration: 2,
                            delay: 10
                        });
                    }
                    this.destroy(); // Only trigger once
                },
                offset: 'bottom-in-view'
            });
        });
    }

    // Clickable area functionality
    const clickableAreas = document.querySelectorAll('.clickable-area');
    clickableAreas.forEach(area => {
        const contentId = area.getAttribute('onclick').match(/'([^']+)'/)[1];
        area.addEventListener('click', function() {
            toggleContent(contentId);
        });
    });

    // Initialize Isotope for filtering (if needed)
    if (typeof Isotope !== 'undefined') {
        const grid = document.querySelector('.grid');
        if (grid) {
            const iso = new Isotope(grid, {
                itemSelector: '.grid-item',
                layoutMode: 'fitRows'
            });

            // Filter functions would be added here
        }
    }

    // Mobile menu toggle (if you add a mobile menu)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
    }
});

// Helper function for smooth scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize Bootstrap tooltips
if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize Bootstrap popovers
if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Video player quality selector (example function)
function changeVideoQuality(quality) {
    const video = document.getElementById('mainVideo');
    if (video) {
        // This would switch video sources in a real implementation
        console.log(`Changing to ${quality} quality`);
    }
}

// Image gallery functionality
function openImageGallery(index) {
    // This would open a lightbox gallery in a real implementation
    console.log(`Opening image gallery at index ${index}`);
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    }
    return false;
}

// Dark mode toggle (example function)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Tab functionality
function openTab(evt, tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Comic panel navigation
let currentPanel = 1;
const totalPanels = 7;

function changePanel(direction) {
    const newPanel = currentPanel + direction;
    
    if (newPanel > 0 && newPanel <= totalPanels) {
        document.getElementById(`panel${currentPanel}`).classList.remove("active-panel");
        currentPanel = newPanel;
        document.getElementById(`panel${currentPanel}`).classList.add("active-panel");
        document.getElementById("panelCounter").textContent = `Panel ${currentPanel} of ${totalPanels}`;
        
        // Pause all audio
        for (let i = 1; i <= totalPanels; i++) {
            document.getElementById(`audio${i}`).pause();
        }
        
        // If audio is on, play current panel's audio
        if (document.getElementById("toggleAudio").classList.contains("audio-on")) {
            document.getElementById(`audio${currentPanel}`).play();
        }
    }
}

// Audio narration toggle
function toggleAudioNarration() {
    const audioButton = document.getElementById("toggleAudio");
    const audioButtonText = document.getElementById("audioButtonText");
    
    if (audioButton.classList.contains("audio-on")) {
        audioButton.classList.remove("audio-on");
        audioButtonText.textContent = "Audio Off";
        document.getElementById(`audio${currentPanel}`).pause();
    } else {
        audioButton.classList.add("audio-on");
        audioButtonText.textContent = "Audio On";
        document.getElementById(`audio${currentPanel}`).play();
    }
}

// Process step toggles
function toggleStep(stepId) {
    const step = document.getElementById(stepId);
    step.classList.toggle("show");
}

// Video chapter navigation
function playChapter(time) {
    const video = document.getElementById("designDoc");
    video.currentTime = time;
    video.play();
}

// Testimonial carousel
let currentTestimonial = 0;

function nextTestimonial() {
    const testimonials = document.querySelectorAll(".testimonial");
    testimonials[currentTestimonial].classList.remove("active");
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].classList.add("active");
}

function prevTestimonial() {
    const testimonials = document.querySelectorAll(".testimonial");
    testimonials[currentTestimonial].classList.remove("active");
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add("active");
}

// Community map interaction
function showCommunity(community) {
    alert(`Showing details for ${community} community. In a full implementation, this would load specific community data.`);
}

// Additional interactive functions
function showJourneyMap() {
    alert("This would open a modal with Thando's full journey map visualization.");
}

function playCharacterInterview() {
    alert("This would play an audio interview with Thando about her experience.");
}

function showFullImage(image) {
    alert(`This would open a full-screen view of ${image} with detailed annotations.`);
}

function showPrototypeGallery() {
    alert("This would show a gallery of all prototype versions with detailed descriptions.");
}

function showImpactDetails() {
    alert("This would open a detailed impact report with charts and data visualizations.");
}



























