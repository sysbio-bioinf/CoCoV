var fs = require("file-system");
var Loki = require("lokijs/src/lokijs.js");
var LokiNativeScriptAdapter = require("loki-nativescript-adapter/loki-nativescript-adapter.js");

/**
 * Database provides access to a data storage module
 * This class allows loading data via any database format (now lokiDB).
 * Store Data functionality enables receiving data and storing it in the referenced database
 * Load Data functionality allows to send requested data by any registered receiver
 */
class Database {
    /**
     * C'tor for database class loads database from given file. 
     * @param {string} file 
     *  filename of database
     */
    constructor(file) {
        this.file = file;
        var path = fs.path.join(fs.knownFolders.documents().path, file);
        this.db = new Loki(path, {
        adapter: new LokiNativeScriptAdapter()
        });
    }

    /**
     * Function to receive data in form of an array and store it to the loaded database.
     */
    receiveData(data) 
    {
        var db = this.db;
        //load database (asynch call)
        db.loadDatabase({}, function () {
            
            //check for collection
            var collection = db.getCollection("health");
    
    
            //if not available create new collection health, where data will be stored
            if (!collection)
                collection = db.addCollection("health");
    
            //insert record
            
            collection.insert(data);
            //save database
            db.saveDatabase();
            
        });
    }

    /**
     * Transmit requested data as promise 
     * Criteria can be used to specify the data which should be extracted from the database
     */
    transmitData(criteria) 
    {
        var database = this.db;
        var file = this.file;
        var promiseDBEntries = new Promise(function(resolve, reject) {
            
            database.loadDatabase({}, function () {
                
                //check for collection
                var collection = database.getCollection("health");
        
        
                //if not available create new collection health, where data will be stored
                if (!collection)
                    collection = database.addCollection("health");

              resolve(collection);
                    
        })});


        return promiseDBEntries;
    }

};

/**
 * Loki DB Collection as array will be parsed to array
 * @param {Array} data 
 */
function getLokiData(database)
{

}

/**
 * Extract specific time interval from LokiDB
 * @param {Array} collection extracted from LokiDB
 * @param {string} min, formatted date yy-mm-dd-hh:mm:ss
 * @param {string} max, formatted date yy-mm-dd-hh:mm:ss 
 */
function getLokiInterval(collection, min, max)
{
    var entries = collection;
    var firstTimestamp = min;
    var lastTimestamp = max;
    //swap time stamps if min > max
    if (lastTimestamp < firstTimestamp) {
        //console.log("DEBUG:    swapping timestamps");
        var buffer = firstTimestamp;
        firstTimestamp = lastTimestamp;
        lastTimestamp = buffer;
    }
        //console.log("DEBUG:   firstTimestamp=" + firstTimestamp + "  lastTimestamp=" + lastTimestamp);
    
    //extract entries in given time interval
    var filteredEntries = collection.find({
        '$and': [{ timestamp: { '$gte': firstTimestamp } },
                 { timestapm: { '$lte': lastTimestamp } }]
    });
    
    return filteredEntries;
    
}


module.exports = Database;

exports.getLokiInterval = getLokiInterval;