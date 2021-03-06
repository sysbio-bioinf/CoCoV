import {bcrypt} from 'nativescript-bcryptjs';
import * as Https from 'nativescript-https';

const app = require("tns-core-modules/application");
const frameModule = require("tns-core-modules/ui/frame");
const AgreementViewModel = require("./agreement-view-model");
const tools = require("../tools/tools.js");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new AgreementViewModel();
    tools.activateHyphenation(args.object);
    //load bindings
    global.guiStringsLoaded.then(function (value) {
        tools.bindGuiStrings(page.bindingContext,0,tools.getAppSetting("languageID", "number"));
        //load data security statemts based on selected language
        if(tools.getAppSetting("languageID", "number") === 0){
            page.bindingContext.set("datasecHtml", "~/agreement/Patienteninformation_CoCoV_English.html");
        }
        else {
            page.bindingContext.set("datasecHtml", "~/agreement/Patienteninformation_CoCoV_German.html");
        }
    });
    

    
    
    //read secret and server data as defined in file
    tools.readTransmissionInfo();

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
function sendAgreement(args) {
    
    const page = args.object.page;
    const hashedPassword = (password, salt) => {
        
        page.bindingContext.set("sendAgreementText", "");
        page.bindingContext.set("isBusy", true);
        var agreement = page.getViewById("sendAgreement");

        agreement.visibility = "hidden";
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    };
    //first confirm agreement via dialog
    var dialogs = require("tns-core-modules/ui/dialogs");
    dialogs.confirm({
        title: global.guiStrings[1]["agreementDialogTitle"],
        message: global.guiStrings[1]["agreementDialogMessage"],
        okButtonText: global.guiStrings[1]["agreementDialogOk"],
        cancelButtonText: global.guiStrings[1]["agreementDialogCancel"]
    }).then(function (result) {
        // result argument is boolean
        //if confirm go on
        if(result)
        {
            //create bcrypt hash, based on given secret
            hashedPassword(tools.getAppSetting("secret", "string"), tools.getAppSetting("salt", "number")).then((passwordHash, err) => {
                //read server data
                tools.readTransmissionInfo();
                //send package to request UUID from server
                fetch(tools.getAppSetting("server", "string") + "/apikeys", {
                method: "POST",
                headers: {"x-auth-token": passwordHash },
                body: JSON.stringify({})
                }).then((r) => r.json())
                .then((response) => {
                    //set UUID 
                    const result = response["data"]["id"];
                    tools.setAppSetting("UUID", "string", result);
                    tools.setAppSetting("isAgreed", "boolean", true);
                
                    if(!tools.getAppSetting("isSet", "boolean"))
                        frameModule.topmost().navigate("settings/settings-page");
                    else
                        frameModule.topmost().navigate("home/home-page");


                }).catch((e) => {
                    tools.showCommunicationAlert();
                    page.bindingContext.set("isBusy", false);
                    page.bindingContext.set("agreementText", global.guiStrings[0]["awaitUUID"]);
                });
            
                
            }).catch(err => {tools.showCommunicationAlert()});
        }

    });
}          
    

const _sendAgreement = sendAgreement;
export { _sendAgreement as sendAgreement};
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
