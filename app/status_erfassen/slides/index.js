const { slide: slide1 } = require('./slideVaccDose');
const { slide: slide2 } = require('./slideInjectionPain');
const { slide: slide3 } = require('./slideRedness');
const { slide: slide4 } = require('./slideSwelling');
const { slide: slide5 } = require('./slideFatigue');
const { slide: slide6 } = require('./slideChills');
const { slide: slide7 } = require('./slideHeadache');
const { slide: slide8 } = require('./slideMusclePain');
const { slide: slide9 } = require('./slideJointPain');
const { slide: slide10 } = require('./slideVomiting');
const { slide: slide11 } = require('./slideDiarrhea');
const { slide: slide12 } = require('./slideFever');
const { slide: slide13 } = require('./slideCardiac');
const { slide: slide14 } = require('./slideLymphNode');
const { slide: slide15 } = require('./slideAntipyretic');
const { slide: slide16 } = require('./slideComment');
const { slide: slide17 } = require('./slideDone');
const slidesStd = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12, slide13, slide14, slide15, slide16, slide17];
//short names
const namesStd = ["vaccDose", "injectionPain", "redness", "swelling", "fatigue", "chills", "headache", "musclePain", "jointPain", "vomiting", "diarrhea", "fever", "cardiac", "lymphNode", "antipyretic", "event"];
const orientationsStd = ["vertical","vertical", "horizontal", "horizontal", "horizontal", "vertical", "vertical", "vertical", "vertical", "horizontal", "vertical", "vertical", "vertical", "vertical", "vertical"];

const slidesSpec = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12, slide13, slide14, slide15, slide16, slide17];
//short names
const namesSpec = ["vaccDose", "injectionPain", "redness", "swelling", "fatigue", "chills", "headache", "musclePain", "jointPain", "vomiting", "diarrhea", "fever", "cardiac", "lymphNode", "antipyretic", "event"];
const orientationsSpec = ["vertical","vertical", "horizontal", "horizontal", "horizontal", "vertical", "vertical", "vertical", "vertical", "horizontal", "vertical", "vertical", "vertical", "vertical", "vertical"];

module.exports = {
    slides: slidesStd,
    names: namesStd,
	orientations: orientationsStd,
	slidesSpec: slidesSpec,
	namesSpec: namesSpec,
	orientationsSpec: orientationsSpec
};
