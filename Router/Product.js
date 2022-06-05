require("../db/config")
const express = require("express");
const product = require("../db/product");
const router = express.Router();

// add product
router.post("/add-product", async (req, res) => {
    try {
        const newproduct = await new product(req.body);
        let result = await newproduct.save()
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: "Intarnal sarver error" })
    }
})

// all product
router.get("/all-product/:uid", async (req, res) => {
    try {
        let user = await product.find({ userId: req.params.uid });

        if (!user) {
            res.status(404).send({ result: "Not found" })
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(500).send({ error: "Intarnal sarver error" })
    }

})

// singel product
router.get("/sig-product/:id", async (req, res) => {
    try {
        let products = await product.findById(req.params.id);

        if (!products) {
            res.status(404).send({ result: "Not found" })
        } else {
            res.send(products);
        }
    } catch (error) {
        res.status(500).send({ error: "Intarnal sarver error" })
    }

})

// delete product
router.delete("/delete-product/:id", async (req, res) => {
    try {
        let products = await product.findByIdAndDelete(req.params.id);
        if (!products) {
            res.status(404).send({ result: "Product Not found" })
        } else {
            res.send(products);
        }
    } catch (error) {
        res.status(500).send({ error: "Intarnal sarver error" })
    }

})
// update product
router.put("/update-product/:id", async (req, res) => {
    const { name, price, categories, company } = req.body
    try {
        const newProduct = {}
        if (name) { newProduct.name = name }
        if (price) { newProduct.price = price }
        if (categories) { newProduct.categories = categories }
        if (company) { newProduct.company = company }

        let products = await product.findById(req.params.id);
        if (!products) {
            res.status(404).send({ result: "Product Not found" })
        } else {

            products = await product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
            res.send(products);
        }
    } catch (error) {
        res.status(500).send({ error: "Internal sarver error" })
    }
})
// search api
router.get("/search/:uid/:key", async (req, res) => {
    try {
        let products = await product.find({ userId: req.params.uid,"$or": [{ name: { $regex: req.params.key } }] })
       
        if (products.length <= 0 ) {
            res.status(404).send({ result: "Not found" })
            
        }else {
                res.send(products);
            }
    } catch (error) {
        res.status(500).send({ error: "Intarnal sarver error" })
    }

})


module.exports = router;