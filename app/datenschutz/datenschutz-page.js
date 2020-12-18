const app = require("tns-core-modules/application");
const frameModule = require("tns-core-modules/ui/frame");
const PatientendatenViewModel = require("./datenschutz-view-model");
const tools = require("../tools/tools.js");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new PatientendatenViewModel();
    global.guiStringsLoaded.then(function (value) {
        tools.bindGuiStrings(page.bindingContext,0,tools.getAppSetting("languageID", "number"));
        //load data security statemts based on selected language
        if(tools.getAppSetting("languageID", "number") === 0){
            console.log("Datenschutz englisch");
            page.bindingContext.set("datasecHtml", "~/agreement/Patienteninformation_CoCoV_English.html");
        }
        else {
            console.log("Datenschutz deutsch");
            page.bindingContext.set("datasecHtml", "~/agreement/Patienteninformation_CoCoV_German.html");
        }
    });
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
