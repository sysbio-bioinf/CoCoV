const { slide: slide1 } = require('./slideVaccDose');
const { slide: slide2 } = require('./slideCoronaTestDate');
const { slide: slide3 } = require('./slideCoronaTestResult');
const { slide: slide4 } = require('./slideCoronaTreatment');
const { slide: slide5 } = require('./slideInjectionPain');
const { slide: slide6 } = require('./slideRedness');
const { slide: slide7 } = require('./slideSwelling');
const { slide: slide8 } = require('./slideFatigue');
const { slide: slide9 } = require('./slideChills');
const { slide: slide10 } = require('./slideHeadache');
const { slide: slide11 } = require('./slideMusclePain');
const { slide: slide12 } = require('./slideJointPain');
const { slide: slide13 } = require('./slideVomiting');
const { slide: slide14 } = require('./slideDiarrhea');
const { slide: slide15 } = require('./slideFever');
const { slide: slide16 } = require('./slideCardiac');
const { slide: slide17 } = require('./slideLymphNode');
const { slide: slide18 } = require('./slideAntipyretic');
const { slide: slide19 } = require('./slideComment');
const { slide: slide20 } = require('./slideDone');
const slidesStd = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12, slide13, slide14, slide15, slide16, slide17, slide18, slide19, slide20];
//short names
const namesStd = ["vaccDose", "coronaTestDate", "coronaTestResult", "coronaTreatment", "injectionPain", "redness", "swelling", "fatigue", "chills", "headache", "musclePain", "jointPain", "vomiting", "diarrhea", "fever", "cardiac", "lymphNode", "antipyretic", "event"];
const orientationsStd = ["vertical","vertical","vertical","vertical","vertical", "horizontal", "horizontal", "horizontal", "vertical", "vertical", "vertical", "vertical", "horizontal", "vertical", "vertical", "vertical", "vertical", "vertical"];

const slidesSpec = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12, slide13, slide14, slide15, slide16, slide17, slide18, slide19, slide20];
//short names
const namesSpec = ["vaccDose",  "coronaTestDate", "coronaTestResult", "coronaTreatment", "injectionPain", "redness", "swelling", "fatigue", "chills", "headache", "musclePain", "jointPain", "vomiting", "diarrhea", "fever", "cardiac", "lymphNode", "antipyretic", "event"];
const orientationsSpec = ["vertical","vertical","vertical","vertical","vertical", "horizontal", "horizontal", "horizontal", "vertical", "vertical", "vertical", "vertical", "horizontal", "vertical", "vertical", "vertical", "vertical", "vertical"];

module.exports = {
    slides: slidesStd,
    names: namesStd,
	orientations: orientationsStd,
	slidesSpec: slidesSpec,
	namesSpec: namesSpec,
	orientationsSpec: orientationsSpec
};
