/**
 * Interface for database communication
 * Exchange function-body to switch database
 */
const Database = require("./lokiDatabase");
 
 /**
  * Function to request data of specific kind (criteria) from database
  * @param {array} criteria 
  */
 function requestData(criteria) 
 {
    var loki = new Database("database.db");
    return loki.transmitData(criteria);
 }

 /**
  * Transmit newly generated data 
  * @param {array} data 
  */
 function transmitData(data) 
 {
    
    var loki = new Database("database.db");
    return loki.receiveData(data);
}

/**
 * Parse data received by database to array of health records
 * @param {Object} data 
 */
function databaseEntriesToArray(data){
    return lokiDataToArray(data);
}

/**
 * Extract given time interval from database
 * @param {*} dbase 
 * @param {*} min , formatted date yy-mm-dd-hh:mm:ss
 * @param {*} max , formatted date yy-mm-dd-hh:mm:ss
 */
function getDatabaseInterval(dbase, min, max)
{

    return getLokiInterval(dbase,min,max);

}

exports.requestData = requestData;
exports.transmitData = transmitData;
exports.databaseEntriesToArray = databaseEntriesToArray;
exports.getDatabaseInterval = getDatabaseInterval;