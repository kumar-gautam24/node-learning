import db from '../db.js';

// 1 Get All products

export const getProducts = (req, res) => {
    // get the data from database
    // runs a query 
    db.all(
        "SELECT * FROM products", [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json(rows);
            }
        }
    );
};

// 2 Add a product

export const addProduct = (req, res) => {
    const { name, price } = req.body;

    // user id 
    const userId = req.userId;


    //validaiton if needed
    // sql  
    /// we use '?' as placeholders to prevent SQL Injections
    // note: we use fucntion instead of => to access 'this'
    const query = `INSERT INTO products (name,price,owner_id) VALUES (?,?,?)`;

    db.run(query, [name, price, userId], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.all("SELECT * FROM products", [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }
            else {
                res.status(200).json(rows);
            }
        });

        // res.status(201).json(
        //     {
        //         id: this.lastID,
        //         name: name,
        //         price: price
        //     }
        // );
    });
};


// 3. update a product 

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const query = `UPDATE products SET name = ?, price=? WHERE id =?`;

    db.run(query, [name, price, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        if (this.changes == 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({
            message: "Product Updated",
            product: { id, name, price }
        });
    });
};


// 4. delete a product
export const deleteProduct = (req, res) => {
    const { id } = req.params;


    const query = `DELETE FROM products WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        //
        if (this.changes == 0) {
            return res.status(404).json({ error: "Not found" });

        }
        res.json({ message: " Product deleted successfully" });
    });
}