
import { getRootView } from "tns-core-modules/application";
import PreconditionsViewModel from "./preconditions-view-model";

//import { bindGuiStrings, adjustFontSizes, setNotification } from "../tools/tools.js";
//import * as LocalNotifications from "nativescript-custom-local-notifications";
//var LocalNotifications = "blub";//require("nativescript-local-notifications");
//configure application specific parameters using external file
import { setBoolean, hasKey, getNumber, getBoolean, setNumber, setString, getString } from "tns-core-modules/application-settings";
import { isAndroid, isIos} from "tns-core-modules/platform";
//import { Rsa, RsaHashAlgorithm } from 'nativescript-rsa';
const tools = require("../tools/tools.js");   // full require needed for 'activateHyphenation', does not work with partial 'import'

/**
 * Load data from global settings 
 * */
function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new PreconditionsViewModel();
    global.guiStringsLoaded.then(function (value) {
        tools.bindGuiStrings(page.bindingContext,0,tools.getAppSetting("languageID", "number"));
    });
    //init font sizes 
    tools.adjustFontSizes(page.bindingContext);
    var gridLay = page.getViewById("preconditionsGrid");

    tools.setAppSetting("noPreconditions", "number", gridLay.getRows().length - 3);
    //initialize all checkboxes
   for(var pre = 0; pre < (gridLay.getRows().length - 3); pre++)
   {
       //initialize global storage for precondition property
       var switchView = page.getViewById("preconditionSwitch" + (pre +  1));
       //set listener on property changed -> update value in global app settings
       //set value according to stored value
       if (tools.checkAppSetting("preconditionSwitch" + (pre + 1)))
       {
           switchView.checked = tools.getAppSetting("preconditionSwitch" + (pre + 1), "boolean");
       } 
       else 
       {
            tools.setAppSetting("preconditionSwitch" + (pre+1), "boolean", false);
            switchView.checked = tools.getAppSetting("preconditionSwitch" + (pre + 1), "boolean");
       }
   }

    for(var pre = 0; pre < (gridLay.getRows().length - 3); pre++)
   {
       //initialize global storage for precondition property
       var switchView = page.getViewById("preconditionSwitch" + (pre +  1));
       //set listener on property changed -> update value in global app settings
       switchView.on("checkedChange", (args) => {
           tools.setAppSetting(args.object.id, "boolean", args.value);
       });
   }


    
}

function onLoaded(args) {
   tools.activateHyphenation(args.object);
   const page = args.object;

   var gridLay = page.getViewById("preconditionsGrid");

   console.log("Number of rows in Layout : " + gridLay.getRows().length);
   
}

/**
 * Undo overwritting of android back button
 * @param {} args 
 */
function onUnloaded(args) {

}

function onDrawerButtonTap(args) {
    const sideDrawer = getRootView();
    sideDrawer.showDrawer();
}

/*
Set configuration for text to speech option in global settings file
*/
function onCheckedChange(args) {
    const vm = args.object.bindingContext;
    
}



function onStorePreconditions(args)
{
    tools.setAppSetting("isSet", "boolean", true);

    tools.transmitMasterData();
    args.object.page.frame.navigate("home/home-page");   
}

const _onStorePreconditions = onStorePreconditions;
export { _onStorePreconditions as onStorePreconditions };
const _onCheckedChange = onCheckedChange;
export { _onCheckedChange as onCheckedChange };
const _onNavigatingTo = onNavigatingTo;
export { _onNavigatingTo as onNavigatingTo };
const _onLoaded = onLoaded;
export { _onLoaded as onLoaded };
