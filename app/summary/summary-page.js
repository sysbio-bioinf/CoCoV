const app = require("tns-core-modules/application");
const SummaryViewModel = require("./summary-view-model");
const tools = require("../tools/tools.js");
const appSettings = require("tns-core-modules/application-settings");
const frame = require('ui/frame');
const platformModule = require("tns-core-modules/platform");
const database = require("../database/databaseInterface");
const frameModule = require("tns-core-modules/ui/frame");
//store loaded data globally
var dbEntries;

/**
 * Load summary with overview over previous entries
 * @param {*} args 
 */
function onNavigatingTo(args) {
	const page = args.object;
	page.bindingContext = new SummaryViewModel();
	var vm = args.object.bindingContext;
	// get all entries from database
	dbEntries = database.requestData(0);
	var vm = args.object.bindingContext;
	global.guiStringsLoaded.then(function(value) {
		console.log("In here: " + true);
		tools.bindGuiStrings(vm,0,tools.getAppSetting("languageID", "number"));
	
	});
	dbEntries.then(function (db) {
		vm.length = db.data.length;

		if(db.data.length === 0)
		{
			tools.showNoDataAlert().then( (resolve) => {
				frameModule.topmost().navigate("home/home-page");
			});
		}
		initSummary(page, vm,db.data[vm.currentSlideNum]);
});

}


function onLoaded(args) {
	const page = args.object;
	
	var vm = page.bindingContext;
	global.guiStringsLoaded.then(function(value) {
		tools.bindGuiStrings(vm,0,tools.getAppSetting("languageID", "number"));
	
	});
	// get all entries from database
	dbEntries = database.requestData(0);
	// use data to build view
    dbEntries.then(function (db) {
		initSummary(page, vm,db.data[vm.currentSlideNum]);	
    });
	
	
}

/**
 * Undo overwritting of android back button
 * @param {} args 
 */
function onUnloaded(args) {
	
}


/**
 * Jumping one day ahead
 * @param {*} args 
 */
function onForward(args)
{
	const page = args.object.page;
	var vm = page.bindingContext;

	if(vm.currentSlideNum < (vm.length - 1))
		vm.currentSlideNum = vm.currentSlideNum + 1;

	
	dbEntries.then(function (db) {
		initSummary(page, vm,db.data[vm.currentSlideNum]);	
	});
}

/**
 * Jumping one day back
 * @param {*} args 
 */
function onBack(args)
{
	const page = args.object.page;
	var vm = page.bindingContext;
	if(vm.currentSlideNum > 0)
		vm.currentSlideNum = vm.currentSlideNum - 1;

	dbEntries.then(function (db) {
		initSummary(page, vm,db.data[vm.currentSlideNum]);	
	});
}



/**
 * Initialize GridLayout which summarizes answers in the last tab
 * 
 */
function initSummary(page, vm, data) {

	console.log("DEBUG: Summary initiated");
	//extract grid to fill :
	var hRec = data;
	var idx = require("../status_erfassen/slides/index.js");
	//therapy sepcific display
	var shortNames = idx.names;
	//set date in header
	var elem = page.getViewById("actionLabel");
	
	elem.text = hRec["collectedAt"];
	
	var shortName;
	var value;
	var elem;
	for (i = 0; i < shortNames.length; i++) {
		shortName = shortNames[i];
		value = hRec[shortName];   // the health record has an additional first column
		elem = page.getViewById(shortName + "Value");
		elem.text = global.guiStrings[2][shortName + "Answer" + value];
    }
}



//store current state of answers
function onNavigatingFrom(args) {
	const page = args.object;
	const vm = page.bindingContext;
}

exports.onForward = onForward;
exports.onBack = onBack;
exports.onNavigatingTo = onNavigatingTo;
exports.onNavigatingFrom = onNavigatingFrom;
exports.onLoaded = onLoaded;
exports.onUnloaded = onUnloaded; 


