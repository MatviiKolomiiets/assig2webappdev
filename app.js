const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const productRouter = require('./routes/products');
const {getMongooseCfg} = require("./config/mongoose");
const cors = require("cors");

const app = express();

let Product;
let Categories;


const initializeServices = async () => {
    const models = await getMongooseCfg();

    Product = models.Product;
    Categories = models.Categories;
}

initializeServices().catch(err => {
    console.error("Failed to initialize services:", err);
    process.exit(1);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: '*', methods: ["GET", "POST"]
}));

app.use(function attachModels(req, res, next) {
    req.models = {
        Product,
        Categories
    };
    next();
});

app.use('/', indexRouter);
app.use('/api', productRouter);

module.exports = app;
