const application = require("tns-core-modules/application");
const tools = require("./tools/tools.js");
//require ("nativescript-local-notifications"); //must be loaded here, when using ios10+
require ("@nativescript/local-notifications");
const frameModule = require("tns-core-modules/ui/frame");
const appSettings = require("tns-core-modules/application-settings");

application.on(application.launchEvent, (args) => {
    //0 = deutsch , 1 = engl
    global.guiStringsLoaded = tools.loadGUIStrings(0);
    
});

application.on(application.suspendEvent, (args) => {
    tools.stopQrCodeLoop();
});

application.on(application.resumeEvent, (args) => {
    //0 = deutsch , 1 = engl
    global.guiStringsLoaded = tools.loadGUIStrings(0);
    
    
    
});
application.on(application.displayedEvent, (args) => {
    
    
});
application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
