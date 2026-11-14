/* =========================================================
   SYED STEEL ENGINEERING & FABRICATION
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    if (preloader) {

        window.addEventListener("load", () => {

            setTimeout(() => {
                preloader.classList.add("hide");
            }, 500);

        });

        /* Fallback in case page load event is already completed */

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 2500);

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const navMenu =
        document.getElementById("navMenu");


    function closeMobileMenu() {

        if (!navMenu) return;

        navMenu.classList.remove("open");

        document.body.classList.remove("menu-open");


        if (mobileToggle) {

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon =
                mobileToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        }

    }


    function openMobileMenu() {

        if (!navMenu) return;

        navMenu.classList.add("open");

        document.body.classList.add("menu-open");


        if (mobileToggle) {

            mobileToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            const icon =
                mobileToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            }

        }

    }


    if (mobileToggle && navMenu) {

        mobileToggle.addEventListener(
            "click",
            () => {

                if (
                    navMenu.classList.contains("open")
                ) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );


        const navLinks =
            navMenu.querySelectorAll("a");


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {
                    closeMobileMenu();
                }
            );

        });

    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.getElementById("navbar");


    function handleNavbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-menu a[href^='#']:not(.nav-cta)"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");


            const target =
                link.getAttribute("href");


            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#" ||
                        targetId.length < 2
                    ) {

                        return;

                    }


                    const targetElement =
                        document.querySelector(
                            targetId
                        );


                    if (!targetElement) {
                        return;
                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const targetPosition =
                        targetElement.getBoundingClientRect().top +
                        window.pageYOffset -
                        navbarHeight -
                        10;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       STATS COUNTER
    ===================================================== */

    const statsSection =
        document.querySelector(
            ".stats-section"
        );

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );

    let countersStarted = false;


    function animateCounter(element) {

        const target =
            parseInt(
                element.getAttribute("data-count"),
                10
            );


        if (isNaN(target)) {
            return;
        }


        const suffix =
            element.getAttribute(
                "data-suffix"
            ) || "";


        const duration = 1800;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    target *
                    easedProgress
                );


            element.textContent =
                currentValue.toLocaleString() +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    target.toLocaleString() +
                    suffix;

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    if (
        statsSection &&
        counters.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !countersStarted
                        ) {

                            countersStarted = true;


                            counters.forEach(
                                counter => {

                                    animateCounter(
                                        counter
                                    );

                                }
                            );


                            statsObserver.disconnect();

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        statsObserver.observe(
            statsSection
        );

    } else {

        counters.forEach(counter => {

            const target =
                parseInt(
                    counter.getAttribute(
                        "data-count"
                    ),
                    10
                );

            if (!isNaN(target)) {

                counter.textContent =
                    target.toLocaleString();

            }

        });

    }


    /* =====================================================
       PROJECT DATA
    ===================================================== */

    const projects = [

        {
            country: "Australia",
            title: "Australian Project",
            area: "420 Sqm",
            description:
                "Detailed for Australian client with professional structural steel modeling and detailing services.",
            folder: "project1"
        },

        {
            country: "USA",
            title: "American Project",
            area: "2970 Sqf",
            description:
                "Structural steel detailing project prepared for American standards with accurate BIM coordination.",
            folder: "project2"
        },

        {
            country: "Australia",
            title: "Australian Project",
            area: "600 Sqm",
            description:
                "Complete structural steel detailing and modeling for an Australian construction project.",
            folder: "project3"
        },

        {
            country: "USA",
            title: "American Project",
            area: "2663 Sqf",
            description:
                "Professional steel detailing and BIM modeling delivered for a USA-based project.",
            folder: "project4"
        },

        {
            country: "Africa",
            title: "African Project",
            area: "670 Sqm",
            description:
                "Structural steel engineering and detailing prepared for an African construction project.",
            folder: "project5"
        },

        {
            country: "Australia",
            title: "Forrestfield Berkshire Road",
            area: "265 Sqm",
            description:
                "3D structural steel and precast concrete BIM modeling, rooftop signage framing, and detailed shop drawing preparation for a commercial project in Forrestfield, Australia.",
            folder: "project6"
        },

        {
            country: "Australia",
            title: "Central Regional TAFE Kalgoorlie",
            area: "3500 Sqf",
            description: "Detailed structural steel BIM model and fabrication drawings developed for a project in Kalgoorlie, Australia.",
            folder: "project7"
        }

      

    ];


    /* =====================================================
       PROJECT IMAGE PATHS
    ===================================================== */

    function getProjectImages(project) {

        return [

            `images/projects/${project.folder}/1.jpg`,

            `images/projects/${project.folder}/2.jpg`,

            `images/projects/${project.folder}/3.jpg`,

            `images/projects/${project.folder}/4.jpg`

        ];

    }


    /* =====================================================
       FALLBACK IMAGE
    ===================================================== */

    const fallbackImage =
        "https://placehold.co/1200x700/e9eef5/172033?text=Project+Image";


    /* =====================================================
       PROJECT RENDER
    ===================================================== */

    const projectsGrid =
        document.getElementById(
            "projectsGrid"
        );


    if (projectsGrid) {

        projectsGrid.innerHTML =
            projects
                .map((project, index) => {

                    const images =
                        getProjectImages(
                            project
                        );


                    return `

                        <article
                            class="project-card"
                        >

                            <div
                                class="project-image"
                            >

                                <img
                                    src="${images[0]}"
                                    alt="${project.title} - ${project.country}"
                                    loading="lazy"
                                    data-project-image="true"
                                >

                                <div
                                    class="project-country"
                                >
                                    ${project.country}
                                </div>

                            </div>


                            <div
                                class="project-content"
                            >

                                <div
                                    class="project-number"
                                >
                                    PROJECT
                                    ${String(index + 1).padStart(2, "0")}
                                </div>


                                <h3>
                                    ${project.title}
                                </h3>


                                <p>
                                    ${project.description}
                                </p>


                                <div
                                    class="project-meta"
                                >

                                    <div
                                        class="project-area"
                                    >

                                        <i
                                            class="fa-solid fa-ruler-combined"
                                        ></i>

                                        <span>
                                            ${project.area}
                                        </span>

                                    </div>


                                    <button
                                        class="gallery-btn"
                                        type="button"
                                        data-project="${index}"
                                    >

                                        <i
                                            class="fa-solid fa-images"
                                        ></i>

                                        View Gallery

                                    </button>

                                </div>

                            </div>

                        </article>

                    `;

                })
                .join("");


        /* Project image fallback */

        projectsGrid
            .querySelectorAll(
                "img[data-project-image]"
            )
            .forEach(image => {

                image.addEventListener(
                    "error",
                    function () {

                        if (
                            this.dataset.fallbackUsed
                        ) {
                            return;
                        }

                        this.dataset.fallbackUsed =
                            "true";

                        this.src =
                            fallbackImage;

                    }
                );

            });

    }


    /* =====================================================
       PROJECT CARD STAGGER
    ===================================================== */

    function applyProjectStagger() {

        const projectCards =
            document.querySelectorAll(
                ".project-card"
            );


        projectCards.forEach(
            (card, index) => {

                card.style.transitionDelay =
                    `${Math.min(
                        index * 0.06,
                        0.35
                    )}s`;

            }
        );

    }


    applyProjectStagger();


    /* =====================================================
       GALLERY ELEMENTS
    ===================================================== */

    const galleryModal =
        document.getElementById(
            "galleryModal"
        );

    const galleryClose =
        document.getElementById(
            "galleryClose"
        );

    const galleryPrev =
        document.getElementById(
            "galleryPrev"
        );

    const galleryNext =
        document.getElementById(
            "galleryNext"
        );

    const galleryImage =
        document.getElementById(
            "galleryImage"
        );

    const galleryCounter =
        document.getElementById(
            "galleryCounter"
        );


    let currentProjectIndex = 0;

    let currentImageIndex = 0;


    /* =====================================================
       SHOW GALLERY IMAGE
    ===================================================== */

    function showGalleryImage() {

        if (
            !galleryImage ||
            !projects[currentProjectIndex]
        ) {
            return;
        }


        const project =
            projects[currentProjectIndex];


        const images =
            getProjectImages(
                project
            );


        const imagePath =
            images[currentImageIndex];


        galleryImage.src =
            imagePath;


        galleryImage.alt =
            `${project.title} - Image ${currentImageIndex + 1}`;


        galleryImage.onerror =
            function () {

                this.onerror = null;

                this.src =
                    fallbackImage;

            };


        if (galleryCounter) {

            galleryCounter.textContent =
                `${currentImageIndex + 1} / ${images.length}`;

        }

    }


    /* =====================================================
       OPEN GALLERY
    ===================================================== */

    function openGallery(
        projectIndex
    ) {

        if (!galleryModal) {
            return;
        }


        const parsedIndex =
            parseInt(
                projectIndex,
                10
            );


        if (
            isNaN(parsedIndex) ||
            !projects[parsedIndex]
        ) {
            return;
        }


        currentProjectIndex =
            parsedIndex;

        currentImageIndex = 0;


        showGalleryImage();


        galleryModal.classList.add(
            "active"
        );


        galleryModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CLOSE GALLERY
    ===================================================== */

    function closeGallery() {

        if (!galleryModal) {
            return;
        }


        galleryModal.classList.remove(
            "active"
        );


        galleryModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    /* =====================================================
       NEXT GALLERY IMAGE
    ===================================================== */

    function nextGalleryImage() {

        if (
            !projects[currentProjectIndex]
        ) {
            return;
        }


        const images =
            getProjectImages(
                projects[currentProjectIndex]
            );


        currentImageIndex =
            (
                currentImageIndex + 1
            ) % images.length;


        showGalleryImage();

    }


    /* =====================================================
       PREVIOUS GALLERY IMAGE
    ===================================================== */

    function previousGalleryImage() {

        if (
            !projects[currentProjectIndex]
        ) {
            return;
        }


        const images =
            getProjectImages(
                projects[currentProjectIndex]
            );


        currentImageIndex =
            (
                currentImageIndex -
                1 +
                images.length
            ) % images.length;


        showGalleryImage();

    }


    /* =====================================================
       GALLERY BUTTON EVENT
    ===================================================== */

    if (projectsGrid) {

        projectsGrid.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".gallery-btn"
                    );


                if (!button) {
                    return;
                }


                const projectIndex =
                    button.getAttribute(
                        "data-project"
                    );


                openGallery(
                    projectIndex
                );

            }
        );

    }


    /* =====================================================
       GALLERY CLOSE BUTTON
    ===================================================== */

    if (galleryClose) {

        galleryClose.addEventListener(
            "click",
            closeGallery
        );

    }


    /* =====================================================
       GALLERY NEXT
    ===================================================== */

    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            nextGalleryImage
        );

    }


    /* =====================================================
       GALLERY PREVIOUS
    ===================================================== */

    if (galleryPrev) {

        galleryPrev.addEventListener(
            "click",
            previousGalleryImage
        );

    }


    /* =====================================================
       CLICK OUTSIDE GALLERY
    ===================================================== */

    if (galleryModal) {

        galleryModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    galleryModal
                ) {

                    closeGallery();

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {


            /* ESCAPE */

            if (
                event.key === "Escape"
            ) {

                if (
                    galleryModal &&
                    galleryModal.classList.contains(
                        "active"
                    )
                ) {

                    closeGallery();

                }


                if (
                    navMenu &&
                    navMenu.classList.contains(
                        "open"
                    )
                ) {

                    closeMobileMenu();

                }

            }


            /* RIGHT */

            if (
                galleryModal &&
                galleryModal.classList.contains(
                    "active"
                ) &&
                event.key === "ArrowRight"
            ) {

                nextGalleryImage();

            }


            /* LEFT */

            if (
                galleryModal &&
                galleryModal.classList.contains(
                    "active"
                ) &&
                event.key === "ArrowLeft"
            ) {

                previousGalleryImage();

            }

        }
    );


    /* =====================================================
       MOBILE GALLERY SWIPE
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    if (galleryModal) {

        galleryModal.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        galleryModal.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const swipeDistance =
                    touchEndX -
                    touchStartX;


                if (
                    Math.abs(
                        swipeDistance
                    ) < 50
                ) {
                    return;
                }


                if (
                    swipeDistance < 0
                ) {

                    nextGalleryImage();

                } else {

                    previousGalleryImage();

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       TESTIMONIAL SLIDER
    ===================================================== */

    const testimonials =
        document.querySelectorAll(
            ".testimonial"
        );

    const prevTestimonial =
        document.getElementById(
            "prevTestimonial"
        );

    const nextTestimonial =
        document.getElementById(
            "nextTestimonial"
        );

    const sliderDots =
        document.querySelectorAll(
            ".slider-controls span"
        );


    let currentTestimonial = 0;

    let testimonialTimer;


    function showTestimonial(index) {

        if (
            testimonials.length === 0
        ) {
            return;
        }


        if (
            index >= testimonials.length
        ) {

            index = 0;

        }


        if (index < 0) {

            index =
                testimonials.length - 1;

        }


        currentTestimonial =
            index;


        testimonials.forEach(
            (
                testimonial,
                testimonialIndex
            ) => {

                testimonial.classList.toggle(
                    "active",
                    testimonialIndex ===
                    currentTestimonial
                );

            }
        );


        sliderDots.forEach(
            (
                dot,
                dotIndex
            ) => {

                dot.classList.toggle(
                    "active",
                    dotIndex ===
                    currentTestimonial
                );

            }
        );

    }


    function nextTestimonialSlide() {

        showTestimonial(
            currentTestimonial + 1
        );

    }


    function previousTestimonialSlide() {

        showTestimonial(
            currentTestimonial - 1
        );

    }


    function startTestimonialAutoPlay() {

        clearInterval(
            testimonialTimer
        );


        testimonialTimer =
            setInterval(
                nextTestimonialSlide,
                5000
            );

    }


    if (
        testimonials.length > 0
    ) {

        showTestimonial(0);

        startTestimonialAutoPlay();

    }


    if (nextTestimonial) {

        nextTestimonial.addEventListener(
            "click",
            () => {

                nextTestimonialSlide();

                startTestimonialAutoPlay();

            }
        );

    }


    if (prevTestimonial) {

        prevTestimonial.addEventListener(
            "click",
            () => {

                previousTestimonialSlide();

                startTestimonialAutoPlay();

            }
        );

    }


    sliderDots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showTestimonial(
                        index
                    );

                    startTestimonialAutoPlay();

                }
            );

        }
    );


    /* =====================================================
       QUOTE / CONTACT FORM
    ===================================================== */

    const quoteForm =
        document.getElementById(
            "quoteForm"
        );


    if (quoteForm) {

        quoteForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim() || "";


                const company =
                    document
                        .getElementById("company")
                        ?.value
                        .trim() || "";


                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim() || "";


                const country =
                    document
                        .getElementById("country")
                        ?.value
                        .trim() || "";


                const service =
                    document
                        .getElementById("service")
                        ?.value
                        .trim() || "";


                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim() || "";


                /* =================================================
                   IMPORTANT:
                   Replace this number with your real WhatsApp number
                   ================================================= */

                const whatsappNumber =
                    "923000000000";


                const whatsappMessage =

                    `Hello SYED STEEL ENGINEERING & FABRICATION,

I would like to request a quotation.

Name: ${name}
Company: ${company}
Email: ${email}
Country: ${country}
Service: ${service}

Project Details:
${message}`;


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .service-card,
            .project-card,
            .why-feature,
            .process-item,
            .about-content,
            .about-image,
            .global-content,
            .global-map,
            .contact-info,
            .contact-form
            `
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal"
                );


                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       SERVICE CARD STAGGER
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${Math.min(
                    index * 0.05,
                    0.25
                )}s`;

        }
    );


    /* =====================================================
       PROCESS CARD STAGGER
    ===================================================== */

    const processItems =
        document.querySelectorAll(
            ".process-item"
        );


    processItems.forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${Math.min(
                    index * 0.06,
                    0.25
                )}s`;

        }
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById(
            "year"
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       ESCAPE / CLICK SAFETY
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !navMenu ||
                !mobileToggle
            ) {
                return;
            }


            if (
                !navMenu.classList.contains(
                    "open"
                )
            ) {
                return;
            }


            const clickedInsideMenu =
                navMenu.contains(
                    event.target
                );

            const clickedToggle =
                mobileToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       GENERAL IMAGE FALLBACK
    ===================================================== */

    document
        .querySelectorAll(
            "img"
        )
        .forEach(image => {

            image.addEventListener(
                "error",
                function () {

                    if (
                        this.dataset.fallbackUsed ||
                        this.src.includes(
                            "placehold.co"
                        )
                    ) {
                        return;
                    }


                    this.dataset.fallbackUsed =
                        "true";


                    this.src =
                        fallbackImage;

                }
            );

        });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cSYED STEEL ENGINEERING & FABRICATION",
        "color:#e3a52d;font-size:18px;font-weight:bold;"
    );

    console.log(
        "Website JavaScript loaded successfully."
    );

});