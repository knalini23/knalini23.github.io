const initSlider = () => {
    const herosec = document.querySelector(".slider-wrapper .herosec");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = document.querySelector(".scrollbar-thumb");
    const maxScrollLeft = herosec.scrollWidth - herosec.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX -startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width -scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition)* maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            herosec.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () =>{
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slides images according to the slide button
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 :1;
            const scrollAmount = herosec.clientWidth * direction;
            herosec.scrollBy({left: scrollAmount, behaviour: "smooth"});
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = herosec.scrollLeft <= 0 ? "none" : "block"; 
        slideButtons[1].style.display = herosec.scrollLeft >= maxScrollLeft ? "none" : "block"; 
    }

    // updates scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = herosec.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    herosec.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}

window.addEventListener("load", initSlider);