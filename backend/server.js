const morgan = require('morgan') // using require here to prevent warning bug
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const seedRouter = require('./routes/seedRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');


const app = express();
app.use(morgan("dev"));
// app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);


app.use(express.static(path.join(__dirname, '..', '/frontend/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '..', '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 6200;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});