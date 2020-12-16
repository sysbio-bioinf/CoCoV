const app = require("tns-core-modules/application");
const tools = require("../tools/tools.js");
const appSettings = require("tns-core-modules/application-settings");
const HomeViewModel = require("./home-view-model");
const frameModule = require("tns-core-modules/ui/frame");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new HomeViewModel();

    global.guiStringsLoaded.then(function (value) {
        
        if(tools.getAppSetting("languageID", "number") === 0) {
            page.bindingContext.set("addDiaryText", global.guiStringsEng[1]["addDiaryText"]);
        }
        else { 
            page.bindingContext.set("addDiaryText", global.guiStringsGer[1]["addDiaryText"]);
        }
        tools.bindGuiStrings(page.bindingContext,0,tools.getAppSetting("languageID", "number"));
    });
    

    if(!tools.checkAppSetting("languageID")){
        frameModule.topmost().navigate("language/language-page");
        return;
    }

    if(!tools.getAppSetting("isAgreed", "boolean")){
        frameModule.topmost().navigate("agreement/agreement-page");
        return;
    }
    
    if(!tools.getAppSetting("isSet", "boolean")){
        frameModule.topmost().navigate("settings/settings-page");
        return;
    }

    
    tools.adjustFontSizes(page.bindingContext);

	// check for uuid
	patient_uuid=appSettings.getString("PatientID")
	if (typeof(patient_uuid)==="undefined")
	{	// no; we create one
		patient_uuid=create_uuid()
		appSettings.setString("PatientID",patient_uuid)
	}
}

function onLoaded(args) {
    const page = args.object;
    // tools.bindGuiStrings(page.bindingContext);
    // global.guiStringsLoaded.then(function (value) {
    //     console.log("Loaded on loaded");
    //     tools.bindGuiStrings(page.bindingContext,0,tools.getAppSetting("languageID", "number"));
    // });
    //console.log(appSettings.getString("latestEntry : " + appSettings.("latestEntry") + "; " + appSettings.getString("latestEntry") + ", " + tools.getCurrentTimeStampShort()));
    //display this note only when another entry was stored at the same day
    let helpText = page.getViewById("helpText");
    if (appSettings.hasKey("latestEntry") &&
        (appSettings.getString("latestEntry") == tools.getCurrentTimeStampShort())) {
        
        helpText.visibility = "visible";
    }
    else {
        
        helpText.visibility = "hidden";
    }

    tools.activateHyphenation(page);
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}


function onTapPlus(args) {
    const button = args.object;
    const page = button.page;
    appSettings.setNumber("currentTab", 0);
    page.frame.navigate("status_erfassen/status_erfassen-page");



}

/**
 * Jump to settings dialog, when hitting settings wheel button on top of main page
 * @param {*} args 
 */
function onSettings(args){
    console.log("DEUG: Go to settings");
    args.object.page.frame.navigate("settings/settings-page");
}

/**
 * Jump to summary dialog, when hitting summary wheel button on top of main page
 * @param {*} args 
 */
function onSummary(args){
    args.object.page.frame.navigate("overview/overview-page");
}



/* maybe use better random than Math.random
*/
function create_uuid()
{	var d=new Date().getTime()
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
		function(c)
		{	var r=Math.floor(Math.random()*16)
			r=(d+r)%16
			d=Math.floor(d/16)
			if (d==0)
			{	d=new Date().getTime()
			}
			return (c==='x' ? r : ((r & 0x3) | 0x8)).toString(16)
		})	
}

exports.onSummary = onSummary;
exports.onLoaded = onLoaded;
exports.onTapPlus = onTapPlus;
exports.onSettings = onSettings;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
