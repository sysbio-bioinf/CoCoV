//const observableModule = require("tns-core-modules/data/observable");
//const Button = require("tns-core-modules/ui/button").Button;
//const SelectedPageService = require("../shared/selected-page-service");

const observableModule = require("data/observable");
const { Animation } = require('ui/animation');
const screen = require("tns-core-modules/platform").Screen;

function BrowseViewModel(slidesView) {
        
    const viewModel = observableModule.fromObject({
        //slideContentView: slideContentView,
        fromSummary: false,
        currentSlideNum: 0,
        healthRecord : [],
        slideCount: slidesView.noTabs,
        slidesView: slidesView,
        screenWidth: screen.mainScreen.widthDIPs,
        init(tabNo) {
            this.currentSlideNum = tabNo;
            this.slidesView.getChildAt(tabNo).visibility = "visible";
        },
        onSwipe(args) {
            let prevSlideNum = this.currentSlideNum;
            let count = this.slideCount;
            if (args.direction == 2) {
                this.currentSlideNum = (this.currentSlideNum + 1) % count;
            } else if (args.direction == 1) {
                this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
            } else {
                // We are interested in left and right directions
                return;
            }

            const currSlide = this.slidesView.getChildAt(prevSlideNum);
            const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);
            this.animate(currSlide, nextSlide, args.direction);
        },
        animate(currSlide, nextSlide, direction) {

            nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
            currSlide.visibility = "hidden";
            nextSlide.visibility = "visible";
            var definitions = new Array();
            definitions.push({
                target: currSlide,
                translate: { x: (direction == 2 ? -this.screenWidth : this.screenWidth), y: 0 },
                duration: 100
            });

            definitions.push({
                target: nextSlide,
                translate: { x: 0, y: 0 },
                duration: 100
            });
            
            var animationSet = new Animation(definitions);
            animationSet.play().then(() => {
            
            })
                .catch((e) => {
                    
                });
        },
        onClick(args) {
            let prevSlideNum = this.currentSlideNum;
            let count = this.slideCount;
            
            this.currentSlideNum = (this.currentSlideNum + 1) % count;
            const currSlide = this.slidesView.getChildAt(prevSlideNum);
            const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);
            this.animate(currSlide, nextSlide, 2);
        },
        jumpToLast(args) 
        {
            
            let prevSlideNum = this.currentSlideNum;
            let count = this.slideCount;
            this.fromSummary = false;
            this.currentSlideNum = count - 1;
            const currSlide = this.slidesView.getChildAt(prevSlideNum);
            const nextSlide = this.slidesView.getChildAt(count - 1);
            
            this.animate(currSlide, nextSlide, 2);
        },
        jumpToIdx(idx)
        {
            let prevSlideNum = this.currentSlideNum;
            let count = this.slideCount;
            
            if(prevSlideNum == (this.slideCount - 1))
                this.fromSummary = true;
            
            this.currentSlideNum = idx % count;
            const currSlide = this.slidesView.getChildAt(prevSlideNum);
            const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);
            this.animate(currSlide, nextSlide, 2);
        },
        getSliderItemClass(item) {
            if (item == this.currentSlideNum)
                return "caro-item-dot caro-item-dot-selected";

            return "caro-item-dot";
        }
    });
    
    return viewModel;
}

module.exports = BrowseViewModel;
