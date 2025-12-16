import sqLite3 from 'sqlite3';

// Database connection
const db = new sqLite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error Opening db: ', err.message);
    } else {
        console.log('Db connecction successfull');
    }
});

// initialize the table 
// serialize enusres commands run one by one 
db.serialize (
    ()=>{
        // sql queries 
        db.run(
            `CREATE TABLE IF NOT EXISTS products(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price INTEGER
            )`, (err)=>{
                if(err){
                    console.error("Error creating table: ",err);
                }else {
                    console.log("Producst table created");
                }
            }
        );
    }
);

// export connection 
export default db;

// by default javascript has all as private by export we are exporting 
// all will use the same object instance so singleton
