const app = require("tns-core-modules/application");
const frameModule = require("tns-core-modules/ui/frame");
const PatientendatenViewModel = require("./impressum-view-model");
const tools = require("../tools/tools.js");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new PatientendatenViewModel();
    
    if(tools.getAppSetting("languageID", "number") === 0){
        console.log("englisch")
        page.bindingContext.set("imprintHtml", "~/impressum/imprintENG.html");
    }
    else {
        console.log("deutsch")
        page.bindingContext.set("imprintHtml", "~/impressum/imprintDE.html");
    }
}

function onLoaded(args) {
    tools.activateHyphenation(args.object);
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

/**
 * Function for software-based back button in android 
 *
 */
function backToSettings(args) {
    
    frameModule.topmost().navigate("settings/settings-page");

}
exports.backToSettings = backToSettings;
exports.onNavigatingTo = onNavigatingTo;
exports.onLoaded = onLoaded;
exports.onDrawerButtonTap = onDrawerButtonTap;
