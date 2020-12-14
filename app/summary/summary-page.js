const app = require("tns-core-modules/application");
const SummaryViewModel = require("./summary-view-model");
const summaryView = require('./summary-view');
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

    var summaryIndex = 13;

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

		// console.log("Another entry today: " + appSettings.getString("healthRecord", "[]"));
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
					
					initSummary(vm, changeMode);
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

			vm.healthRecord = Array(22);
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

		page.bindingContext.healthRecord = Array(22);
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

	console.log("DEBUG: Summary initiated");
	//extract grid to fill :
	const hRec = JSON.parse(appSettings.getString("healthRecord", "[]"));
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
	
	
	for (i = 0; i < shortNames.length; i++) {
		let shortName = shortNames[i];
		let value = hRec[i + 1];   // the health record has an additional first column
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
		if(i <= (shortNames.length - 1)) {
			//console.log(shortName + "Answer" + value);
			bindingContext.set(shortName, bindingContext.get(shortName + "Answer" + value));
		} else{
			var answerText = hRec[i + 1];
			bindingContext.set(shortName, answerText);
		}
	}

    if (summaryChangeMode) {
        bindingContext.set("switchBack", switchBack);
        bindingContext.set("activateSwitchBack", deactivateSwitchBack);
        bindingContext.set("summaryFlexWrapBefore", "true");
        bindingContext.set("summaryFlexGrow", "0");   // switch off temporarily, needed to fix button height recalculattion on iOS
        bindingContext.set("summaryEventFlexWrapBefore", "true");
        if (!hRec[11]) {
            if (platformModule.isIOS) {
                bindingContext.set("summaryEventFlexWrapBefore", "false");
            }
        }
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


exports.onNavigatingTo = onNavigatingTo;
exports.onNavigatingFrom = onNavigatingFrom;
exports.onLoaded = onLoaded;
exports.onUnloaded = onUnloaded; 


