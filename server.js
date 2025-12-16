import express from 'express';
import productRoutes from './routes/productRoutes.js'; 

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
// This line says: "If the URL starts with /products, use the productRoutes file"
app.use('/products', productRoutes);

// Default Route (Optional)
app.get('/', (req, res) => {
    res.send("Welcome to the Clean MVC API!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});