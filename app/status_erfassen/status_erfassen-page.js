const app = require("tns-core-modules/application");
const BrowseViewModel = require("./status_erfassen-view-model");
const slidesView = require('./slides-view');
const tools = require("../tools/tools.js");
const appSettings = require("tns-core-modules/application-settings");
const frame = require('ui/frame');
const platformModule = require("tns-core-modules/platform");
const database = require("../database/databaseInterface");

function onLoaded(args) {
	// set page title

	const page = args.object;
	var view = page.getViewById("slide-content");
	var vm = args.object.bindingContext;
	global.guiStringsLoaded.then(function(value) {
		tools.bindGuiStrings(vm,0,tools.getAppSetting("languageID", "number"));
	
	});
	//check for global slide number
	if(appSettings.hasKey("currentTab") && appSettings.getNumber("currentTab") == 0){
		if(vm.currentSlideNum != appSettings.getNumber("currentTab"))
			if((appSettings.getString("latestEntry") != tools.getCurrentTimeStampShort()))
				args.object.page.frame.navigate("home/home-page");
		
	}
	//gen time stamp for tab
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth() + 1;
	var day = today.getDate();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var timestamp = day + "." + month + "." + year + " " + hours + ":" + minutes;

	//init text for buttons and labels
	//tools.bindGuiStrings(vm);
	var title = vm.get("diaryPageTitle");
	var titleWithTimestamp = title + " - " + timestamp;
	vm.set("diaryPageTitleWithTimestamp", titleWithTimestamp);

	
	
	//init font sizes 
	tools.adjustFontSizes(vm);

	//bind buttons to corresponding action
	vm.set("switchTab", switchTab);
	vm.set("doneTap", doneTap);
	vm.set("datetoTextswitchTab", datetoTextswitchTab);
	vm.fromOutside = true;
	//vm.set("switchBack", switchBack);

	//redefine function of android back button -> step back to previous question
	if (app.android) {
		tools.activateHyphenation(args.object.page);
		app.android.on(app.AndroidApplication.activityBackPressedEvent, backEvent);
	}
	
}

/**
 * Undo overwritting of android back button
 * @param {} args 
 */
function onUnloaded(args) {
	const page = args.object;
	const vm = page.bindingContext;
	
	if (vm.currentSlideNum != 0) { //-2 as last tab is currently hidden
		const appSettings = require("application-settings");
		appSettings.setString("healthRecord", JSON.stringify(vm.healthRecord));
		appSettings.setNumber("currentTab", vm.currentSlideNum);
	}
	if (app.android) {
		app.android.off(app.AndroidApplication.activityBackPressedEvent, backEvent);
	}
	app.off(app.suspendEvent)
}

function onNavigatingTo(args) {
	
	global.guiStringsLoaded.then(function(value) {
		tools.bindGuiStrings(vm,0,tools.getAppSetting("languageID", "number"));
	
	});
	const page = args.object;
	var view = page.getViewById("slide-content");
	var vm;
	var slidesIdx = require("./slides/index");
    var summaryIndex = slidesIdx.names.length;

	//if another entry was created today -> only show summary
	if (appSettings.hasKey("latestEntry") &&
		(appSettings.getString("latestEntry") == tools.getCurrentTimeStampShort())) {
		view.content = slidesView.getSlides(summaryIndex);
		page.bindingContext = new BrowseViewModel(view.content);
		vm = page.bindingContext;
		tools.bindGuiStrings(vm,0,tools.getAppSetting("languageID", "number"));
		vm.healthRecord = JSON.parse(appSettings.getString("healthRecord", "[]"));
		vm.healthRecord[0] = tools.getCurrentTimeStamp();
		appSettings.setString("healthRecord", JSON.stringify(vm.healthRecord));
		vm.currentSlideNum = summaryIndex;

		// //extract last entry
		initSummary(vm, true);
		// //go to summary slide
	}

	//get settings from app-setting
	else if (appSettings.hasKey("currentTab")) {
		//init view at currentTab
		var cont = slidesView.getSlides(appSettings.getNumber("currentTab"));

		view.content = cont;
		page.bindingContext = new BrowseViewModel(view.content);
		vm = page.bindingContext;
		tools.bindGuiStrings(vm,0,tools.getAppSetting("languageID", "number"));
		
		//set to stored tab num
		vm.currentSlideNum = appSettings.getNumber("currentTab");

		//if not 0, get healthrecord
		let createNewEntry = true;
		if (vm.currentSlideNum != 0) {
			//initialize summary if summary tab was active last
			vm.healthRecord = JSON.parse(appSettings.getString("healthRecord", "[]"));
			//get current time in yyyy-mm-dd-hh:mm
			let currentTimestamp = tools.getCurrentTimeStamp();
			// check if unfinished diary entry is from today, otherwise discard it
			if (vm.healthRecord[0].substr(0, 10) == currentTimestamp.substr(0, 10)) {
				createNewEntry = false;
				vm.healthRecord[0] = tools.getCurrentTimeStamp();
				appSettings.setString("healthRecord", JSON.stringify(vm.healthRecord));
				if (vm.currentSlideNum == summaryIndex) {
					let changeMode = false;
					if (appSettings.hasKey("summaryChangeMode")) {
						changeMode = appSettings.getBoolean("summaryChangeMode");
					}
					
					initSummary(vm, true);
				}
			}
		}

		//initiate healthRecord
		if (createNewEntry) {
			//init view at currentTab
			view.content = slidesView.getSlides(0);
			appSettings.setBoolean("completed", false);
			appSettings.remove("summaryChangeMode");
			page.bindingContext = new BrowseViewModel(view.content);
			const vm = page.bindingContext;
			tools.bindGuiStrings(vm,0,tools.getAppSetting("languageID", "number"));   // must be called here for solving diary title 'undefined' problem on Android

			vm.healthRecord = [];
			//get current time in yyyy-mm-dd-hh:mm
			vm.healthRecord[0] = tools.getCurrentTimeStamp();
			appSettings.setString("healthRecord", JSON.stringify(vm.healthRecord));
		}
	}
	//else not initialized and tab is initialized from scratch
	else {
		view.content = slidesView.getSlides(0);
		page.bindingContext = new BrowseViewModel(view.content);
		vm = page.bindingContext;

		page.bindingContext.healthRecord = [];
		page.bindingContext.healthRecord[0] = tools.getCurrentTimeStamp();
	}

	vm.fromOutside = true;
	//set to starting index when entering questionary:
	global.minBackIdx = vm.currentSlideNum;
}

/**
 * Initialize GridLayout which summarizes answers in the last tab
 * 
 */
function initSummary(bindingContext, switchBackFlag, slideNum) {

	//extract grid to fill :
	const hRec = JSON.parse(appSettings.getString("healthRecord", "[]"));
	console.log(hRec);
	const idx = require("./slides/index");
	//therapy sepcific display
	var shortNames = idx.names;
	var orientations = idx.orientations;

	let summaryChangeMode = false;
	if (appSettings.hasKey("summaryChangeMode")) {
		summaryChangeMode = appSettings.getBoolean("summaryChangeMode");
	} else if (switchBackFlag) {
		summaryChangeMode = true;
	}
		
	for (i = 0; i < shortNames.length; i++) 
	{ //stop before additional notes field
		let shortName = shortNames[i];
		let value = hRec[i + 1];   // the health record has an additional first column

		//Get date 
		if(i === 1){
			if(value === 0) //no date -> no test
				bindingContext.set(shortName, bindingContext.get(shortName + "Answer" + value));
			else //test date
				bindingContext.set(shortName, value);
		}
		// Get additional comment
		else if(i === shortNames.length - 1)
		{
			var answerText = hRec[i + 1];
			console.log(answerText);
			bindingContext.set(shortName, answerText);
		}
		//go via answer by id
		else{
			bindingContext.set(shortName, bindingContext.get(shortName + "Answer" + value));
		}
		//set css styles -> (legacy code, is this required?)
		if (summaryChangeMode) {
			if (i === (shortNames.length - 1)) {
				bindingContext.set(shortName + "SummaryCssClass", "-btn btn-primary my-button-summary my-button-gradX");
			} else {
				bindingContext.set(shortName + "SummaryCssClass", "-btn btn-primary my-button-summary my-button-grad" + value);
			}
			bindingContext.set(shortName + "SummaryOrientation", "vertical");
			bindingContext.set("changeButtonCurrent", bindingContext.get("changeButtonTapped"));
			bindingContext.set("changeButtonSize", bindingContext.get("mySizeSummary"));
		} else {
			bindingContext.set(shortName + "SummaryCssClass", "summary text-left");
			bindingContext.set(shortName + "SummaryOrientation", orientations[i]);
			bindingContext.set("changeButtonCurrent", bindingContext.get("changeButton"));
			bindingContext.set("saveButtonCurrent", bindingContext.get("saveButton"));
			bindingContext.set("changeButtonSize", bindingContext.get("mySizeSummary"));
		}
		
			
	}



	

    if (summaryChangeMode) {
        bindingContext.set("switchBack", switchBack);
        bindingContext.set("activateSwitchBack", deactivateSwitchBack);
        bindingContext.set("summaryFlexWrapBefore", "true");
        bindingContext.set("summaryFlexGrow", "0");   // switch off temporarily, needed to fix button height recalculattion on iOS
        bindingContext.set("summaryEventFlexWrapBefore", "true");
        // if (!hRec[11]) {
            if (platformModule.isIOS) {
                bindingContext.set("summaryEventFlexWrapBefore", "false");
            }
        // }
        bindingContext.set("summaryFlexGrow", "1");  // switch on, needed to get buttons spanning the whole page width
    } else {
        bindingContext.set("switchBack", function () { });   // empty function, needed to override previous function
        bindingContext.set("activateSwitchBack", activateSwitchBack);
        bindingContext.set("summaryFlexWrapBefore", "false");
        bindingContext.set("summaryEventFlexWrapBefore", "false");
        bindingContext.set("summaryFlexGrow", "1");
    }
}



//store current state of answers
function onNavigatingFrom(args) {
	
	const page = args.object;
	const vm = page.bindingContext;
	//&& vm.currentSlideNum != vm.slideCount-1
	if (vm.currentSlideNum != 0) { //-2 as last tab is currently hidden
		const appSettings = require("application-settings");
		appSettings.setString("healthRecord", JSON.stringify(vm.healthRecord));
		appSettings.setNumber("currentTab", vm.currentSlideNum);
	}
}

/**
 * Listen on actions of buttons on GUI-slides
 * Store given answers in healthRecord 
 * Trigger navigation to successor tab
 * Store healthrecord after completion of questions
 * @param {Button} args 
 */
function switchTab(args) {
	let vm = args.object.bindingContext;
	var id = parseInt(args.object.id);
	var tabSelectedIndex = vm.get("currentSlideNum");

	console.log(tools.getAppSetting("UUID", "string"));
	console.log(vm.healthRecord);
	console.log(tabSelectedIndex);
	//set therapy specific settings of slides
	var slideIdx = require('./slides/index');
	var summaryIdx = slideIdx.names.length - 1;
	//special case : enter date for time of last corona test
	if (tabSelectedIndex === 1)
	{
		
		if( id === 3){ //if date was confirmed
			var tcovdate = args.object.parent.getViewById("CoronaTDate").date;
			vm.healthRecord[tabSelectedIndex + 1] = tcovdate.toLocaleDateString("de",{year:"4-digit",month:"2-digit", day:"2-digit"});
		} 
		else{ //set zero -> no test performed
			vm.healthRecord[tabSelectedIndex + 1] = id;
		}
	}
	else if (tabSelectedIndex < summaryIdx)
		vm.healthRecord[tabSelectedIndex + 1] = id;
	else if (tabSelectedIndex === summaryIdx) {
		vm.healthRecord[tabSelectedIndex + 1] = vm.notes + "";
		appSettings.setString("healthRecord", JSON.stringify(vm.healthRecord));
		initSummary(vm, true, tabSelectedIndex);
		appSettings.setBoolean("completed", true);
	}

	//if last table, store record and jump back to home view
	else if (tabSelectedIndex === (summaryIdx + 1)) {
		appSettings.setString("latestEntry", tools.getCurrentTimeStampShort());
		
		appSettings.setBoolean("completed", true);
		if (appSettings.hasKey("summaryChangeMode")) {
			appSettings.remove("summaryChangeMode");
		}
		tools.setNotification(tools.getAppSetting("SendNotificationsOption", "boolean"), vm, "tomorrow");  // skip notification for the current day, if activated
		database.transmitData(tools.parseHealthRecordForDB(vm.healthRecord));
		transmitDataToServer(vm).then(res => {
			
			if(res){
				args.object.page.frame.navigate("home/home-page");
				appSettings.setNumber("currentTab", 0);
				vm.currentSlideNum = 0;
			}
		}).catch(err => {
			//notification
			var dialogs = require("tns-core-modules/ui/dialogs");
			dialogs.alert(global.guiStrings[1]["connectionErrorAlert"]).then(function() {
			});

		});

		return;
	}
	//switch to next tab
	appSettings.setString("healthRecord", JSON.stringify(vm.healthRecord));
	
	//jump back to summary if already completed
	if (appSettings.getBoolean("completed") && tabSelectedIndex != summaryIdx) {
		initSummary(vm, true);
		// initSummary(vm, true, tabSelectedIndex);
		appSettings.setBoolean("completed", true);
		if (appSettings.hasKey("summaryChangeMode")) {
			appSettings.remove("summaryChangeMode");
		}
		vm.jumpToLast();
	}
	else {
		vm.onClick();
	}

	vm.fromOutside = false;
	
}

/**
 * Jump back from summary
 * Go back to requested question. Highlight previously given answer
 * @param {*} page 
 * @param {*} index 
 * @param {*} fromOutside 
 */
function goBack(page, index, fromOutside)
{
	let vm = page.bindingContext;
	const idx = require("./slides/index");
	vm.jumpToIdx(index);
	
	
	vm.fromOutside = fromOutside;
	
	appSettings.setBoolean("summaryChangeMode", true);
	
	
	
}

function backEvent(args) {
	var page = frame.topmost().currentPage;
	let vm = page.bindingContext;

	if(vm.currentSlideNum > 0 && !vm.fromOutside && global.minBackIdx < vm.currentSlideNum)
	{
		var idx = vm.currentSlideNum - 1;
		goBack(page, idx, vm.fromOutside);
		args.cancel = true; //disable standard android step back functionality
	}
}
/**
 * Listen on actions of labels in summary tab
 * Jump back to question according to pressed label
 * @param {Button} args 
 */
function switchBack(args) {
	 //redefine function of android back button -> step back to previous question
	//  if (app.android) {
	//	 app.android.on(app.AndroidApplication.activityBackPressedEvent, backEvent);
	// }
	var questionID = args.object.parent.row;
	var page = args.object.page;
	goBack(page,questionID, false);
   
}

/**
 * Listen on actions of change button in summary tab
 * Activate switchBack and reformat summary
 * 
 * @param {Button} args 
 */
function activateSwitchBack(args) {
	appSettings.setBoolean("summaryChangeMode", true);
	if (args.object.bindingContext) {
		
		initSummary(args.object.bindingContext, true);
	}
}

/**
 * Listen on actions of change button in summary tab
 * Deactivate switchBack  and reformat summary
 * 
 * @param {Button} args 
 */
function deactivateSwitchBack(args) {
	if (appSettings.hasKey("summaryChangeMode")) {
		appSettings.remove("summaryChangeMode");
	}
	if (args.object.bindingContext) {
		
		initSummary(args.object.bindingContext, false);
	}
	//appSettings.setBoolean("summaryChangeMode", false);
}


/**
 * Unfold navigation bar on right side 
 * @param {} args 
 */
function onDrawerButtonTap(args) {
	const sideDrawer = app.getRootView();
	sideDrawer.showDrawer();
}

function doneTap(args) {
	var myTextField = args.object;
	var text = args.object.text;
	if (text!=null)
	{	var splits = text.split('\n');
		// if there is a '\n' in text close text input window
		// ???
		if (splits.length>1)
		{	myTextField.dismissSoftInput();
			text=text.replace(/\n/g," ")
		}
	}
	var vm = args.object.bindingContext;
	vm.notes=text
}

function datetoTextswitchTab(args) {

	console.log(tools.getAppSetting("UUID", "string"));
	
	var id = parseInt(args.object.id);
	
	let vm = args.object.bindingContext;
	var tabSelectedIndex = vm.get("currentSlideNum");
	//set therapy specific settings of slides
	var slideIdx = require('./slides/index');
	var summaryIdx = slideIdx.names.length - 1;
	// Try to get date into Data
	tcovdate = args.object.parent.getViewById("CoronaTDate").date;
	vm.covdate = tcovdate.toLocaleDateString("de",{year:"4-digit",month:"2-digit", day:"2-digit"});
	console.log(vm.covdate);
	vm.healthRecord[22] = vm.covdate;
	if (tabSelectedIndex < summaryIdx)
		vm.healthRecord[tabSelectedIndex + 1] = id;
	else if (tabSelectedIndex === summaryIdx) {
		vm.healthRecord[tabSelectedIndex + 1] = vm.notes + "";
		appSettings.setString("healthRecord", JSON.stringify(vm.healthRecord));
		initSummary(vm, true, tabSelectedIndex);
		
		appSettings.setBoolean("completed", true);
	}

	//if last table, store record and jump back to home view
	else if (tabSelectedIndex === (summaryIdx + 1)) {
		appSettings.setString("latestEntry", tools.getCurrentTimeStampShort());
		
		appSettings.setBoolean("completed", true);
		if (appSettings.hasKey("summaryChangeMode")) {
			appSettings.remove("summaryChangeMode");
		}
		tools.setNotification(tools.getAppSetting("SendNotificationsOption", "boolean"), vm, "tomorrow");  // skip notification for the current day, if activated
		database.transmitData(tools.parseHealthRecordForDB(vm.healthRecord));
		transmitDataToServer(vm).then(res => {
			
			if(res){
				args.object.page.frame.navigate("home/home-page");
				appSettings.setNumber("currentTab", 0);
				vm.currentSlideNum = 0;
			}
		}).catch(err => {
			//notification
			var dialogs = require("tns-core-modules/ui/dialogs");
			dialogs.alert(global.guiStrings[1]["connectionErrorAlert"]).then(function() {
			});

		});

		return;
	}
	//switch to next tab
	appSettings.setString("healthRecord", JSON.stringify(vm.healthRecord));
	
	//jump back to summary if already completed
	if (appSettings.getBoolean("completed") && tabSelectedIndex != summaryIdx) {
		initSummary(vm, true);
		// initSummary(vm, true, tabSelectedIndex);
		appSettings.setBoolean("completed", true);
		if (appSettings.hasKey("summaryChangeMode")) {
			appSettings.remove("summaryChangeMode");
		}
		vm.jumpToLast();
	}
	else {
		vm.onClick();
	}

	vm.fromOutside = false;
	
}

function brighten(col)
{	if (col+48>255)
	{	return 255
	}
	return col+48
}

/**
 * Send healthrecord to server as given in encr.json. 
 * Data send is the current date in ISO format, gender, age, and an array of objects (key,value) for the adverse effects
 * @param {binding context} vm 
 */
function transmitDataToServer(vm)
{
	return new Promise(function (resolve, reject) {
		tools.readTransmissionInfo();
		var dat = tools.transformData(vm.healthRecord);
		console.log(JSON.stringify(dat));
		console.log("healthrecord before submission : " + vm.healthRecord);
		fetch(tools.getAppSetting("server", "string") + "/apikeys/" + tools.getAppSetting("UUID", "string") + "/sideeffects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Content-Length": JSON.stringify(dat).length
				},
				body: JSON.stringify(dat)
			}).then((r) => r.json())
			.then((response) => {
				
				if (response["data"]["createdAt"] != null) {
					resolve(true);
				} else {
					reject(false);
				}
			}).catch((e) => {
				reject(false);

			});
	});
	
}



exports.doneTap = doneTap
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onNavigatingTo = onNavigatingTo;
exports.onNavigatingFrom = onNavigatingFrom;
exports.onLoaded = onLoaded;
exports.onUnloaded = onUnloaded;
; 
if (module.hot && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./status_erfassen/status_erfassen-page.js") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./status_erfassen/status_erfassen-page.js" });
    });
} 

