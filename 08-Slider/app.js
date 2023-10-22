import data from "./data.js";

const container = document.querySelector('.slide-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

if (data.length === 1) {
    nextBtn.style.display = 'none'
    prevBtn.style.display = 'none'
}

let people = [...data];

container.innerHTML = people.map((person, slideIndex) => {
    const { img, name, job, text } = person;

    let position = 'next';
    if(slideIndex === 0) {
        position = 'active';
    }
    if(slideIndex === people.length - 1) {
        position = 'last';
    }
    if(data.length <= 1) {
        position = 'active';
    }

    return `<article class="slide ${position}">
        <img src=${img} class="img" alt="${name}"/>
        <h4>${name}</h4>
        <p class="title">${job}</p>
        <p class="text">
            ${text}
        </p>
        <div class="quote-icon">
            <i class="fas fa-quote-right"></i>
        </div>
    </article>`
}).join('');

const onSlide = (type) => {

    const activeSlide = document.querySelector('.active');
    const previousSlide = document.querySelector('.last');
    let nextSlide = activeSlide.nextElementSibling;
    if(!nextSlide) {
        nextSlide = container.firstElementChild;
    }

    activeSlide.classList.remove('active');
    previousSlide.classList.remove('last');
    nextSlide.classList.remove('next');

    if(type === 'prev') {

        activeSlide.classList.add('next');
        previousSlide.classList.add('active');
        nextSlide = previousSlide.previousElementSibling;
        if(!nextSlide) {
            nextSlide = container.lastElementChild;
        }
        nextSlide.classList.remove('next');
        nextSlide.classList.add('last');
        return;
    }

    activeSlide.classList.add('last');
    nextSlide.classList.add('active');
    previousSlide.classList.add('next');
}

nextBtn.addEventListener("click", () => {
    onSlide();
});

prevBtn.addEventListener("click", () => {
    onSlide('prev');
});
