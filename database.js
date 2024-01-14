const sqlite3 = require('sqlite3').verbose();

const EXISTING_ROOMS_CACHE = {};

const exists = (id) => EXISTING_ROOMS_CACHE[id] != null;

class Database {
    constructor(path) {
        this.db = new sqlite3.Database(path);
        this.execute("CREATE TABLE IF NOT EXISTS rooms (data TEXT, id TEXT, model TEXT);")
    }

    execute(...args) {
        this.db.serialize(() => {
            this.db.run(...args);
        });
    }

    select(...args) {
        return new Promise(resolve => {
            this.db.serialize(() => {
                this.db.get(...args, (err, row) => {
                    resolve(row?.data || false)
                });
            })
        });
    }

    get(room_id) {
        return this.select("SELECT data FROM rooms WHERE id = ?", [room_id]);  
    }

    async update(room_id, data) {
        if (exists(room_id)) {
            this.execute("UPDATE rooms SET data = ? WHERE id = ?", [data, room_id]);
            return;
        }

        if (!(await this.get(room_id)))
            this.execute("INSERT INTO rooms (data, id) VALUES (?, ?)", [data, room_id]);
        else
            this.execute("UPDATE rooms SET data = ? WHERE id = ?", [data, room_id]);   
        
        EXISTING_ROOMS_CACHE[room_id] = true;
    }
}

const db = new Database('database.sqlite');
module.exports = db;
