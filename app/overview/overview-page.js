const OverviewViewModel = require("./overview-view-model");
const tools = require("../tools/tools.js");
const database = require("../database/databaseInterface");
const labelModule = require("tns-core-modules/ui/label");
const frameModule = require("tns-core-modules/ui/frame");
//store loaded data globally
var dbEntries;

function onLoaded(args) {
	const { GridLayout, GridUnitType, ItemSpec } = require("ui/layouts/grid-layout");
	const page = args.object;
	
	var vm = page.bindingContext;
	global.guiStringsLoaded.then(function(value) {
		tools.bindGuiStrings(vm,0,tools.getAppSetting("languageID", "number"));
	
	});
	// get all entries from database
	dbEntries = database.requestData(0);
	// use data to build view
    dbEntries.then(function (db) {
		//screen database for all entries which are non-zero to find all adverse events occuring over time
		var withEffect = hasEffect(db);
		console.log("has effect : " + withEffect);
		//add occured adverse events to summary list
		var label;
		var txt;
		var container = page.getViewById("overviewGrid");
		//show alert if no data is available
		if( withEffect.length === 0)
		{
			tools.showNoDataAlert().then( (resolve) => {
				frameModule.topmost().navigate("home/home-page");
			})
		}
		else{
		withEffect.forEach((effect,index,arry) =>
		{
			container.addRow(new ItemSpec(index, GridUnitType.STAR));
			//create label for each adverse event occured
			label = new labelModule.Label();
			label.className = "my-overviewTest list-item";
			//position new label
			GridLayout.setColumn(label, 0);
			GridLayout.setRow(label, index);
			//adapt label text
			txt = global.guiStrings[1][effect + "Short"];
			txt = txt.slice(0,txt.lastIndexOf(":"));
			label.text = txt;
			//add label to gridlayout
			container.addChild(label);
		});
		}
    });
	
	
}

/**
 * Helper function to determine if a value is numeric
 * @param {*} n 
 */
function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
  }

/**
 * Search if entry is has positive entry (positive > 0)
 */
function hasEffect(collection)
{
	var attrs = [];
	var col;
	//iterate through database and check for keys which occured at least one time (event > 0)         
	for(idx = 0; idx < collection.data.length; idx++){
		//get item (one time point)
		col = collection.data[idx];
		//iterate over keys
		Object.keys(col).forEach(function(key) {
			if(!key.includes("$") && (isNumeric(col[key]) || key === "event") && (col[key] != 0) && !attrs.includes(key)) //filter keys with $ to remove database-specific attributes
					attrs.push(key);			
		});
	}
    return attrs;
}

/**
 * Undo overwritting of android back button
 * @param {} args 
 */
function onUnloaded(args) 
{

	
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


function onNavigatingTo(args) {
	const page = args.object;
	page.bindingContext = new OverviewViewModel();
	var vm = args.object.bindingContext;
	// get all entries from database
	dbEntries = database.requestData(0);
	var vm = args.object.bindingContext;
	global.guiStringsLoaded.then(function(value) {
		console.log("In here: " + true);
		tools.bindGuiStrings(vm,0,tools.getAppSetting("languageID", "number"));
	});
}

//store current state of answers
function onNavigatingFrom(args) {
	const page = args.object;
	const vm = page.bindingContext;
}

/**
 * Function for software-based back button in android 
 *
 */
function backToHome(args) {
    
    frameModule.topmost().navigate("home/home-page");

}
exports.backToHome = backToHome;
exports.onForward = onForward;
exports.onBack = onBack;
exports.onNavigatingTo = onNavigatingTo;
exports.onNavigatingFrom = onNavigatingFrom;
exports.onLoaded = onLoaded;
exports.onUnloaded = onUnloaded; 


