
import { getRootView } from "tns-core-modules/application";
import SettingsViewModel from "./settings-view-model";
import {bcrypt} from 'nativescript-bcryptjs';
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
    page.bindingContext = new SettingsViewModel();
    tools.bindGuiStrings(page.bindingContext,0,tools.getAppSetting("languageID", "number"));
    //init font sizes 
    tools.adjustFontSizes(page.bindingContext);
    initializeAgePicker(page.bindingContext);
    var removeDataBtn = page.getViewById("removeDataBtn");
    const sendNotificationsOption = page.getViewById("sendNotifications");
 
    
    
    if (hasKey("isSet"))
        removeDataBtn.visibility = "visible";
    else
        removeDataBtn.visibility = "hidden";
    
    //initialize notification picker
    if (hasKey("SendNotificationsOption")) {
        const option = getBoolean("SendNotificationsOption");
        page.bindingContext.set("sendNotificationsOption", option);
        if (option) {
            if (isAndroid) {
                page.bindingContext.set("sendNotificationColor", "rgb(58,83,255)");
            }
         } else {
            page.bindingContext.set("sendNotificationColor", "rgb(230,230,230)");
         }
    } else {
        page.bindingContext.set("sendNotificationColor", "rgb(230,230,230)");
    }
    //listeners for notification window
    sendNotificationsOption.on("checkedChange", (args) => {
        setBoolean("SendNotificationsOption", args.value);
        if (args.value) {
            if (isAndroid) {
                page.bindingContext.set("sendNotificationColor", "rgb(58,83,255)");
            }
         } else {
            page.bindingContext.set("sendNotificationColor", "rgb(230,230,230)");
         }
        tools.setNotification(args.value, args.object.bindingContext);     // don't provide third parameter 'startMode' to activate automatic check for diary entry from the current day
    });


    //----------initialize age picker------------
    const agePicker = page.getViewById("agePicker");
    //load pre-set age if existing
    if (hasKey("userAge")) {
        const option = tools.getAppSetting("userAge","number");
        page.bindingContext.set("ageIndex", option);
        
    } 
    tools.setAppSetting("userAge","number",agePicker.selectedIndex);
    //listeners for age picker
    agePicker.on("selectedIndexChange", (args) => {
        tools.setAppSetting("userAge","number",args.value);
    });

    //----------initialize sex picker------------
    const sexPicker = page.getViewById("sexPicker");
    //load pre-set age if existing
    if (hasKey("userSex")) {
        const option = tools.getAppSetting("userSex","number");
        page.bindingContext.set("sexIndex", option);
        
    } 
    tools.setAppSetting("userSex","number",sexPicker.selectedIndex);
    //listeners for age picker
    sexPicker.on("selectedIndexChange", (args) => {
        tools.setAppSetting("userSex","number",args.value);
    });


    //----------initialize vaccine picker------------
    const vaccinePicker = page.getViewById("vaccinePicker");
    var vaccines = page.bindingContext.get("vaccinePickerItems");
    //load pre-set age if existing
    if (hasKey("userVaccine")) {
        console.log(tools.getAppSetting("userVaccine","string"));
        var vaccines = page.bindingContext.get("vaccinePickerItems");
        console.log(vaccines.indexOf(tools.getAppSetting("userVaccine","string")));
        const option = tools.getAppSetting("userVaccine","string");
        page.bindingContext.set("vaccineIndex", page.bindingContext.get("vaccinePickerItems").indexOf(option));
        
    }
    tools.setAppSetting("userVaccine","string",vaccines[vaccinePicker.selectedIndex]);
    //listeners for age picker
    vaccinePicker.on("selectedIndexChange", (args) => {
        tools.setAppSetting("userVaccine","string",vaccines[args.value]);
    });


    page.bindingContext.set("openImprint", openImprint);
    page.bindingContext.set("openDataSecurity", openDataSecurity);
}

function onLoaded(args) {
   tools.activateHyphenation(args.object);
}

/**
 * Undo overwritting of android back button
 * @param {} args 
 */
function onUnloaded(args) {
    txt2speech.on("checkedChange", function() {});
    voicePicker.on("selectedIndexChange", function() {});
    therapyPicker.on("selectedIndexChange", function() {});
}

function onDrawerButtonTap(args) {
    const sideDrawer = getRootView();
    sideDrawer.showDrawer();
}

function openImprint(args)
{
    
    args.object.page.frame.navigate("impressum/impressum-page");
}

function openDataSecurity(args)
{
    
    args.object.page.frame.navigate("datenschutz/datenschutz-page");
}
/*
Set configuration for text to speech option in global settings file
*/
function onCheckedChange(args) {
    const vm = args.object.bindingContext;
    //console.log(vm.get("txt2speech"));
    setBoolean("Text2Speech", vm.get("txt2speech"));
}


/**
 * Store settings.
 * If settings are set for the first time -> show preconditions table as well
 * else go back to home-view after storing
 * Settings are send as metadata to server after completing questionare
 * @param {*} args 
 */
function onStoreSettings(args)
{
    if(!tools.getAppSetting("isSet", "boolean"))
        args.object.page.frame.navigate("preconditions/preconditions-page");   
    else
        args.object.page.frame.navigate("home/home-page");   
}

function onRemoveData(args)
{
    var dialogs = require("tns-core-modules/ui/dialogs");
    dialogs.confirm({
        title: global.guiStrings[1]["removeDialogTitle"],
        message: global.guiStrings[1]["removeDialogMessage"],
        okButtonText: global.guiStrings[1]["removeDialogOk"],
        cancelButtonText: global.guiStrings[1]["removeDialogCancel"]
    }).then(function (result) {
        // result argument is boolean
        //if confirm go on
        if(result)
        {
            //create bcrypt hash, based on given secret
            hashedPassword(tools.getAppSetting("secret", "string"), tools.getAppSetting("salt", "number")).then((passwordHash, err) => {
                tools.readTransmissionInfo();
                fetch(tools.getAppSetting("server", "string") + "/apikeys", {
                method: "POST",
                headers: {"x-auth-token": passwordHash },
                body: JSON.stringify({})
                }).then((r) => r.json())
                .then((response) => {
                    //set UUID 
                    const result = response["data"]["id"];
                    tools.setAppSetting("UUID", "string", result);
                }).catch((e) => {
                    console.log("Error: " + e);
                    page.bindingContext.set("agreementText", global.guiStrings[0]["awaitUUID"]);
                });
            
                tools.setAppSetting("isAgreed", "boolean", true);
                
                if(!tools.getAppSetting("isSet", "boolean"))
                    frameModule.topmost().navigate("settings/settings-page");
                else
                    frameModule.topmost().navigate("home/home-page");
            }).catch(err => {console.log("not hashed, " + err)});
        }
    }
    );
}

/**
 Function to initialize pickers to enter weight in KG and 100 grams. Function is called when GUI is built
*/
function initializeAgePicker(vm) {
    //init kg picker
    var ageItems = new Array();
    var ageOffset = 0;
    for (var i = ageOffset; i <= 350; i++) {
        ageItems.push(i);
    }
    vm.set("ageItems", ageItems);
    vm.set("ageIndex", 25);
    vm.set("ageOffset", ageOffset);
    vm.set("ageHeight", 80);

}

const _initializeAgePicker = initializeAgePicker;
export { _initializeAgePicker as initializeAgePicker};
const _onRemoveData = onRemoveData;
export { _onRemoveData as onRemoveData};
const _onStoreSettings = onStoreSettings;
export { _onStoreSettings as onStoreSettings };
const _onCheckedChange = onCheckedChange;
export { _onCheckedChange as onCheckedChange };
const _onNavigatingTo = onNavigatingTo;
export { _onNavigatingTo as onNavigatingTo };
const _onDrawerButtonTap = onDrawerButtonTap;
export { _onDrawerButtonTap as onDrawerButtonTap };

/* exports.openImprint = openImprint;
exports.openDataSecurity = openDataSecurity;
//exports.onLoaded = onLoaded;
const _onLoaded = onLoaded;
export { _onLoaded as onLoaded };
 */


//exports.openImprint = openImprint;
const _openImprint = openImprint;
export { _openImprint as openImprint };
//exports.openDataSecurity = openDataSecurity;
const _openDataSecurity = openDataSecurity;
export { _openDataSecurity as openDataSecurity };
//exports.onUnloaded = onUnloaded;
//const _onUnloaded = onUnloaded;
//export { _onUnloaded as onUnloaded };
//exports.onLoaded = onLoaded;
const _onLoaded = onLoaded;
export { _onLoaded as onLoaded };
