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
        // 1. Create the products table
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

        // 2. User Table 
        db.run(`CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            password TEXT
            )`, (err)=>{
                if(err){
                    console.error("Error creating users table: ",err);
                }else {
                    console.log("Users table created");
                }
            }
        );
    }
);

// export connection 
export default db;

// by default javascript has all as private by export we are exporting 
// all will use the same object instance so singleton
