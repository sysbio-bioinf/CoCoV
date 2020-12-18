import {bcrypt} from 'nativescript-bcryptjs';

const app = require("tns-core-modules/application");
const frameModule = require("tns-core-modules/ui/frame");
const LanguageViewModel = require("./language-view-model");
const tools = require("../tools/tools.js");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new LanguageViewModel();
    tools.activateHyphenation(args.object);
    global.guiStringsLoaded.then(function (value) {
        tools.bindGuiStrings(page.bindingContext,0,1);
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
function setLanguage(args) {
    
    
    tools.setAppSetting("languageID", "number", parseInt(args.object.id));

    if(!tools.getAppSetting("isAgreed", "boolean")){
        frameModule.topmost().navigate("agreement/agreement-page");
        return;
    }
    
    if(!tools.getAppSetting("isSet", "boolean")){
        frameModule.topmost().navigate("settings/settings-page");
        return;
    }
    
    frameModule.topmost().navigate("home/home-page");
}          
    

const _setLanguage = setLanguage;
export { _setLanguage as setLanguage};
//exports.sendAgreement = sendAgreement;
const _onNavigatingTo = onNavigatingTo;
export { _onNavigatingTo as onNavigatingTo};
//exports.onNavigatingTo = onNavigatingTo;
const _onLoaded = onLoaded;
export { _onLoaded as onLoaded};
//exports.onLoaded = onLoaded;
const _onDrawerButtonTap = onDrawerButtonTap;
export { _onDrawerButtonTap as onDrawerButtonTap};
//exports.onDrawerButtonTap = onDrawerButtonTap;
