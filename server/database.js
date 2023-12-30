const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(path) {
        this.db = new sqlite3.Database(path);
    }

    execute(...args) {
        this.db.serialize(() => {
            this.db.run(...args);
        });
    }

    each(...args) {
        return new Promise(resolve => 
            this.db.serialize(() => {
                this.db.each(...args, (err, row) => {
                    resolve(row.data)
                });
            })
        );
    }

    get(room_id) {
        return this.each("SELECT data FROM rooms WHERE id = ?", room_id);  
    }

    update(room_id, data) {
        this.execute("UPDATE rooms SET data = ? WHERE info = ?", [data, room_id]);
    }
}

const db = new Database('database.sqlite');
export default db;