import * as RxDB from 'rxdb';
import {QueryChangeDetector} from 'rxdb';
import dbSchema from "./schemas/hero.schema.json";

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

//Set IndexedDB as client-side data-holder
RxDB.plugin(require('pouchdb-adapter-idb'));

//enable data-syncing over http
RxDB.plugin(require('pouchdb-adapter-http'));

const collections = [
    {
        name: 'heroes',
        schema: dbSchema,
        sync: true
    }
];

const syncURL = 'http://' + window.location.hostname + ':5984/';
console.log('host: ' + syncURL);

let dbPromise = null;

/**
* Function which creates the Database
* @private
*/
const _create = async function() {
    console.log('DatabaseService: creating database..');
    const db = await RxDB.create({name: 'heroesreactdb', adapter: 'idb', password: 'myLongAndStupidPassword'});
    console.log('DatabaseService: created database');
    window['db'] = db; // write to window for debugging

    // show leadership in title
    db.waitForLeadership().then(() => {
        console.log('isLeader now');
        document.title = '♛ ' + document.title;
    });

    // create collections
    console.log('DatabaseService: create collections');
    await Promise.all(collections.map(colData => db.collection(colData)));

    // hooks
    console.log('DatabaseService: add hooks');
    db.collections.heroes.preInsert(function(docObj) {
        const color = docObj.color;
        return db.collections.heroes.findOne({color}).exec().then(has => {
            if (has != null) {
                alert('another hero already has the color ' + color);
                throw new Error('color already there');
            }
            return db;
        });
    });

    // sync
    console.log('DatabaseService: sync');
    collections.filter(col => col.sync).map(col => col.name).map(colName => db[colName].sync({
        remote: syncURL + colName + '/'
    }));

    return db;
};

export function get() {
    if (!dbPromise)
        dbPromise = _create();
    return dbPromise;
}
