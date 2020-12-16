/**
 * Load GUI String Configuration on Start up of the App and store them globally
 * GUI String configuration is stored in json-Files guiStrings/guiStringsSpeech
 */
function loadGUIStrings() {

    return new Promise(function (resolve, reject) {
        const fileSystemModule = require("tns-core-modules/file-system");
        const appFolder = fileSystemModule.knownFolders.currentApp();
        var stringFilesGer;
        
        stringFilesGer = ["guiStrings.json", "guiStringsGer.json", "guiStringsSpeechGer.json"];
        
        global.guiStringsGer = [];
        stringFilesGer.forEach(fileName => {
            
            const jsonFile = appFolder.getFile(fileName);
            jsonFile.readText()
                .then(function (content) {
                    
                    try {
                        global.guiStringsGer.push(JSON.parse(content));
                        resolve(true);
                    } catch (err) {
                        console.log(err);
                        throw new Error('Could not parse JSON file');
                    }
                }, function (error) {
                    console.log(eror);
                    throw new Error('Could not read JSON file');
                })
        });

        stringFilesEng = ["guiStrings.json", "guiStringsEng.json", "guiStringsSpeechEng.json"];
        
        global.guiStringsEng = [];
        stringFilesEng.forEach(fileName => {
            const jsonFile = appFolder.getFile(fileName);
            jsonFile.readText()
                .then(function (content) {
                    try {
                        global.guiStringsEng.push(JSON.parse(content));
                        resolve(true);

                    } catch (err) {
                        console.log(err);
                        throw new Error('Could not parse JSON file');
                    }
                }, function (error) {
                    console.log(eror);
                    throw new Error('Could not read JSON file');
                })
        });
        
        //

    });
}

/**
 * Set bindings between loaded gui String variables and corresponding labels
 * @param {} bindObject 
 * @param {*} stringFile 
 */
function bindGuiStrings(bindObject, stringFile, lang) {
    var guiStringsLang;
    console.log(lang);
    
    if(lang==0){
        guiStringsLang=global.guiStringsEng;
        global.guiStrings=global.guiStringsEng;
    }
    else {
        guiStringsLang=global.guiStringsGer;
        global.guiStrings=global.guiStringsGer;
    }

    guiStringsLang.forEach(fileName => {
        const guiStrings = fileName;
        const stringIds = Object.keys(guiStrings);
        for (var i = 0; i <= stringIds.length; i++) {
            if (stringIds[i] !== undefined) {
                bindObject.set(stringIds[i], guiStrings[stringIds[i]]);
            }
        }

    });
}

/**
 * Adjust font-sizes according to display resolution
 * @param {} bindObject 
 */
function adjustFontSizes(bindObject) {
    const platformModule = require("tns-core-modules/platform");

    const width = platformModule.Screen.mainScreen.widthPixels;
    const height = platformModule.Screen.mainScreen.heightPixels;
    const widthDip = platformModule.Screen.mainScreen.widthDIPs;
    const heightDip = platformModule.Screen.mainScreen.heightDIPs;
    
    let mySize = 40;
    let mySizeSmall = 35;
    let mySizeMessage = 32;
    let mySizeMessageSmall = 28;
    let mySizeSummary = 30;
    let mySizeTitle = 30;
    let mySizeMenu = 26;
    let mySizePrimaryButton = 28;
    let orientation = "portrait";
    let realWidth = width;
    let realHeight = height;
    let sizeClass = "small";
    if (width > height) {
        orientation = "landscape";
        realWidth = height;
        realHeight = width;
    }

    if (realWidth <= 500)
    {
        sizeClass = "tiny";
    }
    if (realWidth > 720) {
        sizeClass = "medium";
        if (realWidth > 1080) {
            sizeClass = "large";
        }
    }

    if (orientation == "portrait") {
        if (sizeClass == "tiny")
        {
            mySize = 24;
            mySizeSmall = 18;
            mySizeMessage = 14;
            mySizeMessageSmall = 12;
            mySizeSummary = 15;
            mySizeTitle = 15;
            mySizeMenu = 13;
            mySizePrimaryButton = 13; 
        }
        else if (sizeClass == "small") {
            mySize = 28;
            mySizeSmall = 22;
            mySizeMessage = 18;
            mySizeMessageSmall = 15;
            mySizeSummary = 16;
            mySizeTitle = 16;
            mySizeMenu = 14;
            mySizePrimaryButton = 15;
        } else if (sizeClass == "medium") {
            mySize = 34;
            mySizeSmall = 26;
            mySizeMessage = 22;
            mySizeMessageSmall = 20;
            mySizeSummary = 24;
            mySizeTitle = 20;
            mySizeMenu = 18;
            mySizePrimaryButton = 22;
        } else {
            mySize = 40;
            mySizeSmall = 33;
            mySizeMessage = 27;
            mySizeMessageSmall = 22;
            mySizeSummary = 24;
            mySizeTitle = 22;
            mySizeMenu = 20;
            mySizePrimaryButton = 22;
        }
    } else {
        if (sizeClass == "small") {
            mySize = 16;
            mySizeSmall = 16;
            mySizeMessage = 13;
            mySizeMessageSmall = 13;
            mySizeSummary = 11;
            mySizeTitle = 16;
            mySizeMenu = 11;
            mySizePrimaryButton = 11;
        } else if (sizeClass == "medium") {
            mySize = 21;
            mySizeSmall = 21;
            mySizeMessage = 18;
            mySizeMessageSmall = 18;
            mySizeSummary = 18;
            mySizeTitle = 21;
            mySizeMenu = 16;
        } else {
            mySize = 25;
            mySizeSmall = 25;
            mySizeMessage = 22;
            mySizeMessageSmall = 22;
            mySizeSummary = 19;
            mySizeTitle = 25;
            mySizeMenu = 20;
            mySizePrimaryButton = 19;
        }
    }
    
    bindObject.set("mySize", mySize);
    bindObject.set("mySizeSmall", mySizeSmall);
    bindObject.set("mySizeMessage", mySizeMessage);
    bindObject.set("mySizeMessageSmall", mySizeMessageSmall);
    bindObject.set("mySizeSummary", mySizeSummary);
    bindObject.set("mySizeTitle", mySizeTitle);
    bindObject.set("mySizeMenu", mySizeMenu);
    bindObject.set("mySizePrimaryButton", mySizePrimaryButton);
    bindObject.set("phoneSizeClass", sizeClass);
    bindObject.set("phoneOrientation", orientation);
    bindObject.set("phoneWidth", width);
    bindObject.set("phoneHeight", height);
    bindObject.set("phoneWidthDip", widthDip);
    bindObject.set("phoneHeightDip", heightDip);
    global.phoneWidth = width;
    global.phoneHeight = height;
    global.phoneWidthDip = widthDip;
    global.phoneHeightDip = heightDip;

}

/**
 * Generate a time stamp in the format : yyyy-mm-dd-hh:mm  as string
 */
function getCurrentTimeStamp() {
    var today = new Date();

    //add leading zero, if number is less than 10
    //shift month by one to get correct representation
    return "" + today.getFullYear() + "-" +
        (((today.getMonth() + 1) >= 10) ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)) + "-" +
        ((today.getDate() >= 10) ? today.getDate() : "0" + today.getDate()) + "-" +
        ((today.getHours() >= 10) ? today.getHours() : "0" + today.getHours()) + ":" +
        ((today.getMinutes() >= 10) ? today.getMinutes() : "0" + today.getMinutes()) + ":" +
        ((today.getSeconds() >= 10) ? today.getSeconds() : "0" + today.getSeconds());


}

/**
* Generate a time stamp in the format : yyyy-mm-dd as string
*/
function getCurrentTimeStampShort() {
    var today = new Date();

    return "" + today.getFullYear() + "-" +
        (((today.getMonth() + 1) >= 10) ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1)) + "-" +
        ((today.getDate() >= 10) ? today.getDate() : "0" + today.getDate());


}


/**
 * Parse health record to named list for database 
 * @param {Array} healthRecord 
 */
function parseHealthRecordForDB(healthRecord) {
    var record = {};

    record["collectedAt"] = healthRecord[0];
    const idx = require("../status_erfassen/slides/index");
	//therapy sepcific display
    var shortNames = idx.names;
    shortNames.forEach((val, idx, array) => {
        record[val] = healthRecord[idx+1]; //shift to skip date
    })
    
    return record;
}

/**
 * Parse health record to named list for database 
 * @param {Array} healthRecord 
 */
function parseHealthRecordList(healthRecord) {
    var record = [];

    if(healthRecord.length === 0)
        return [];

    const idx = require("../status_erfassen/slides/index");
	//therapy sepcific display
    var shortNames = idx.names;
    shortNames.forEach((val, idx, array) => {
        record.push({"key": val, "value": healthRecord[idx+1]}); //shift to skip date
    })
    
    return record;
}

/**
 * Helper function for configuration of global app settings, which are stored via application-settings core module
 * 
 * @param {} key 
 * @param {*} type 
 */
function getAppSetting(key, type) {
    var value;
    var availableTypes = {
        "string": true,
        "number": true,
        "boolean": true
    }
    //check for type of settings parameter and return the corresponding value
    if (availableTypes[type]) {
        const appSettings = require("tns-core-modules/application-settings");
        if (appSettings.hasKey(key)) {
            if (type == "string") {
                value = appSettings.getString(key);
            } else if (type == "number") {
                value = appSettings.getNumber(key);
            } else if (type == "boolean") {
                value = appSettings.getBoolean(key);
            }
        }
    } else {
        console.log("WARNING: unknown type '" + type + "' provided in call of method getAppSetting");
    }
    return value;
}

/**
 * Function to set global app setting parameter, which is stored via application-settings core module
 * @param {} key 
 * @param {*} type 
 * @param {*} value 
 */
function setAppSetting(key, type, value) {
    var availableTypes = {
        "string": true,
        "number": true,
        "boolean": true
    }
    if (availableTypes[type]) {
        const appSettings = require("tns-core-modules/application-settings");
        if (value === undefined) {
            if (type == "string") {
                value = "";
            }
        }
        if (type == "string") {
            value = appSettings.setString(key, value);
        } else if (type == "number") {
            value = appSettings.setNumber(key, value);
        } else if (type == "boolean") {
            value = appSettings.setBoolean(key, value);
        }
    } else {
        console.log("WARNING: unknown type '" + type + "' provided in call of method setAppSetting");
    }
    return value;
}

/**
 * Check if given key is available as current app setting
 * @param {} key 
 */
function checkAppSetting(key) {
    var hasKey;
    if (key) {
        const appSettings = require("tns-core-modules/application-settings");
        hasKey = appSettings.hasKey(key);
    }
    return hasKey;
}


/**
 * Set daily notification on/of starting today or tomorrow
 * @param {boolean} notify
 * @param {object} bindingContext
 * @param {string} startMode
 */
function setNotification(notify, bindingContext, startMode) {

    const LocalNotifications = require("@nativescript/local-notifications").LocalNotifications;
    if (!startMode) {
        const tools = require("./tools.js");
        if (tools.checkAppSetting("latestEntry") &&
            (tools.getAppSetting("latestEntry", "string") == tools.getCurrentTimeStampShort())) {
            startMode = "tomorrow";
        } else {
            startMode = "today";
        }
    }
    //schedule notifications (daily at 7 pm)
    if (notify) {
        LocalNotifications.cancelAll(); //first cancel to avoid double notifications
        //set notification
        var startDate = new Date();
        if (startMode == "tomorrow") {
            var tomorrow = new Date();
            tomorrow.setDate(startDate.getDate() + 1);
            startDate = tomorrow;
        }
        startDate.setHours(19, 0, 0, 0);
        
        LocalNotifications.schedule([{
            id: 1,
            title: bindingContext.get("notificationTitle"),
            body: bindingContext.get("notificationBody"),        //'Haben Sie heute schon ihren Fragebogen beantwortet?',
            //ticker: 'The ticker',
            badge: 1,
            bigTextStyle: true,
            icon: "res://icon",
            silhouetteIcon: "res://icon",
            thumbnail: "res://icon",
            sound: "default", // suppress sound on Android,
            interval: 'day',
            ongoing: false,
            at: startDate
        }]).then(
            function () {
                console.log("Notification scheduled");
            },
            function (error) {
                console.log("scheduling error: " + error);
            }
        )
    }
    //cancel all scheduled notifications
    else {
        console.log("DEBUG: cancelling notifications");
        LocalNotifications.cancelAll();
    }

}

/**
 * Compress string using lzw algorithm. Encode function from : 
 * https://gist.github.com/revolunet/843889
 * @param {string} s 
 */
function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i = 1; i < data.length; i++) {
        currChar = data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase = currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i = 0; i < out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

/**
 * Decompress string using lzw algorithm. Encode function from : 
 * https://gist.github.com/revolunet/843889
 * @param {string} s 
 */
function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i = 1; i < data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
            phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}


/**
 * Activate full hyphenation and high quality break strategy
 *   Needed for Android 10 and improves word wrap also on lower Android versions 
 * @param {} view 
 */
function activateHyphenation(view) {
    if (view) {
        //console.log("DEBUG: activate hyphenation in " + view);
        const platformModule = require("tns-core-modules/platform");
        const osVersion = platformModule.Device.osVersion;
        if (view.android) {
            //console.log("DEBUG: childView type = " + view.typeName); //console.log(Object.keys(view));
            if (Number(osVersion) >= 6) {
                if (view.android.setHyphenationFrequency) {
                    if (typeof view.android.setHyphenationFrequency == "function") {
                        view.android.setHyphenationFrequency(2);
                    }
                }
                if (view.android.setBreakStrategy) {
                    view.android.setBreakStrategy(1);
                }
                view.eachChild(activateHyphenation);
            }
        } else {
            //console.log("DEBUG: view.android undefined in call of activateHyphenation"); console.log(Object.keys(view));
            view.eachChild(activateHyphenation);
        }
    } else {
        //console.log("DEBUG: view undefined in call of activateHyphenation");
    }
}

/**
 * Stop QR code loop
 */
function stopQrCodeLoop() {
    const timerModule = require("tns-core-modules/timer");
    const intervalId = getAppSetting("qrIntervalId", "number");
    if (intervalId) {
        timerModule.clearInterval(intervalId);
        setAppSetting("qrIntervalId", "number", 0);
    }
}


/**
 * Read data with transmission details from json
 */
function readTransmissionInfo(){
    const tools = require("./tools.js");
    const fileSystemModule = require("tns-core-modules/file-system");
    const appFolder = fileSystemModule.knownFolders.currentApp();
    const jsonFile = appFolder.getFile("encr.json");
    //load secret and salt from file
    jsonFile.readText()
        .then(function (content) {
            try {
                var secret = JSON.parse(content);
                tools.setAppSetting("secret", "string", secret["secret"]);
                tools.setAppSetting("salt", "number", parseInt(secret["salt"]));
                tools.setAppSetting("server", "string", secret["server"]);
            } catch (err) {
                console.log(err);
                throw new Error('Could not parse JSON file');
            }
        }, function (error) {
            console.log(error);
            throw new Error('Could not read JSON file');
        })
}


/**
 * Send masterdata
 * @param {*} dat 
 */

function transmitMasterData()
{
    const tools = require("./tools.js");
    var data = { "data" : {}}; 
    var gender = (tools.getAppSetting("userSex", "number") === 3) ? 0 : tools.getAppSetting("userSex", "number");
    var age = tools.getAppSetting("userAge", "number");
    var preconditionNames = require("../preconditions/index.js").preconditionNames;
    data["data"]["gender"] = gender;
    data["data"]["age"] = age;
    data["data"]["preconditions"] = [];
    //data["data"]["accCode"] = 1234;


     //check if predonditions were set
    if(tools.checkAppSetting("noPreconditions", "number"))
    {
        console.log(tools.getAppSetting("noPreconditions", "number"));
        console.log(tools.getAppSetting("preconditionSwitch" + (idx+1), "boolean"));
        //aquire preconditions
        for(var idx = 0; idx < (tools.getAppSetting("noPreconditions", "number")); idx++)
        {
            data["data"]["preconditions"].push({"key" : preconditionNames[idx], "value" : tools.getAppSetting("preconditionSwitch" + (idx+1), "boolean")});
        }
    }
    
    console.log("Master data transmission  :" + JSON.stringify(data));

    fetch(tools.getAppSetting("server", "string") + "/apikeys/" + tools.getAppSetting("UUID", "string") + "/metadata", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((r) => r.json())
    .then((response) => {
        //TODO catch response as key, here
         console.log(response);
        // console.log("Response : " + response["data"]["createdAt"]);
        
    }).catch((e) => {
        console.log("Error in connection: " + e);
        reject(false);

    });

}

/**
 * Parse sideeffects to JSON package for transmission
 */

function transformData(dat)
{
    const tools = require("./tools.js");
    var effects = parseHealthRecordList(dat);
    effects.push({"key":"vaccine", "value": tools.getAppSetting("userVaccine", "string")});
    var date = new Date();
    date = date.toISOString();
    //var gender = (tools.getAppSetting("userSex", "number") === 3) ? 0 : tools.getAppSetting("userSex", "number");
    
    console.log(date);
    console.log(tools.getAppSetting("userAge", "number"));
    var data = {
        "data": {
            "effects": effects,
            "collectedAt": date
            // "gender": gender,
            // "age": tools.getAppSetting("userAge", "number")
        }
    };

    return data;
}

exports.transmitMasterData = transmitMasterData;
exports.transformData = transformData;
exports.readTransmissionInfo = readTransmissionInfo;
exports.parseHealthRecordForDB = parseHealthRecordForDB;
exports.parseHealthRecordList = parseHealthRecordList;
exports.bindGuiStrings = bindGuiStrings;
exports.loadGUIStrings = loadGUIStrings;
exports.adjustFontSizes = adjustFontSizes;
exports.setAppSetting = setAppSetting;
exports.getAppSetting = getAppSetting;
exports.checkAppSetting = checkAppSetting;
exports.getCurrentTimeStamp = getCurrentTimeStamp;
exports.getCurrentTimeStampShort = getCurrentTimeStampShort;
exports.setNotification = setNotification;
exports.activateHyphenation = activateHyphenation;
exports.stopQrCodeLoop = stopQrCodeLoop;
exports.lzw_encode = lzw_encode;


