const Product = require("../models/porductModels");
const ErrorHander = require("../utils/errorhandler");
const theFunc = require("../middleware/catchAsyncErrors");
const ApiFeature = require("../utils/apifeatures");




// create product -- admin route

exports.createProduct = theFunc(async (req, res, next) => {

    const product = await Product.create(req.body);
    res.status(200).json({
        sucess: true,
        product
    })
})


// get all product
exports.getAllProducts = theFunc(async (req, res) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apifeature = new ApiFeature(Product.find(), req.query).search()
        .filter()
        .pagination(resultPerPage);
    const products = await apifeature.query;

    res.status(200).json({
        sucess: true,
        products
    })
})

//get product details
exports.getProductDetails = theFunc(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404))
    }
    res.status(200).json({
        sucess: true,
        product,
        productCount,
    })
})

//update product -- admin
exports.updateProduct = theFunc(async (req, res, next) => {

    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        sucess: true,
        product
    })
})

//delete product --admin

exports.deleteProduct = theFunc(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404))
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
})