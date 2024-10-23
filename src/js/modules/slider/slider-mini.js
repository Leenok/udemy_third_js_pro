import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay){
        super(container, next, prev);
    }

    dicorizeSlides(){
        for(const slide of this.slides){
            slide.classList.remove(this.activeClass);
            if(this.animate){
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        }

        if(!this.slides[0].closest('button')){
        // } else {
            this.slides[0].classList.add(this.activeClass);

        }

        if(this.animate){
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.container.appendChild(this.slides[2]); // Btn
            this.dicorizeSlides();
        } else if (this.slides[1].tagName == "BUTTON"){
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.dicorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.dicorizeSlides(); 
        }
    }

    bindTriggers(){
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () =>{
            let active = this.slides[this.slides.length - 1];
            this.container.insertBefore(active, this.slides[0]);
            this.dicorizeSlides();
        })
    }

    init(){
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoplay) {
                setInterval(() => this.nextSlide(), 5000);
            }
        } catch(e){}
    }
}