const Product = require('../models/product.model');

exports.test = (req, res) => {
    res.send('Greeting!');
}

exports.productCreate = (req, res) => {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(err => {
        if(err) {
            return next(err);
        }
        res.send(product);
    })
}

exports.productsAll = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return next(err);
        res.send(products)
    })
}

exports.productDetails = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return next(err);
        res.send(product)
    })
}

exports.productUpdate = (req, res) => {
    Product.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, product) => {
        if (err) return next(err);
        res.send(product);
    })
}

exports.productDelete = (req, res) => {
    Product.findOneAndRemove({_id: req.params.id}, err => {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
}