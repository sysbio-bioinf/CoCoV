
const appSettings = require("tns-core-modules/application-settings");

function getSlides(currentTab) {
    let builder = require("ui/builder");
    const { GridLayout, GridUnitType, ItemSpec } = require("ui/layouts/grid-layout");
    //set therapy specific settings of slides
    var slideIdx = require('./slides/index');
    var slides = slideIdx.slides;
    if(appSettings.hasKey("SpecTherapy"))
    {
        if(appSettings.getBoolean("SpecTherapy"))
            slides = slideIdx.slidesSpec;
        else
            slides = slideIdx.slides;
    }
    
    var slidesView;

        let gridLayout = new GridLayout();
        gridLayout.set("iosOverflowSafeArea", false);
        gridLayout.set("padding", 8);
        loadSlides().then((slides) => {
        var row = new ItemSpec(1, GridUnitType.STAR);
        slides.forEach((element, i) => {
            GridLayout.setColumn(element, 0);
            if (i != currentTab)
            { 
                //element.opacity = 0;
                element.visibility = "hidden";
            }
                gridLayout.addChild(element);
        });
        gridLayout.addRow(row);
        });

    slidesView = gridLayout;
    slidesView.noTabs = slides.length;

    
    function loadSlides() {
        return new Promise(function (resolve, reject) {
            const slideViews = [];
            slides.forEach((slide, i) => {
                slideViews.push(builder.Builder.parse(slide));
            });

            resolve(slideViews);
        });
    };

    //disable all buttons per default
    slidesView
    return slidesView;
}

exports.getSlides = getSlides;