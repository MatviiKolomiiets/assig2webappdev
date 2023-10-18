async function getAllProducts(req, res) {
    try {
        let query = {};

        if (req.query.name) {
            query.name = {$regex: req.query.name, $options: 'i'};
        }

        const products = await req.models.Product.find(query);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: "Error retrieving products", error});
    }
}

async function getProductById(req, res) {
    try {
        const product = await req.models.Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Error retrieving product", error});
    }
}

async function addNewProduct(req, res) {
    try {
        const newProduct = new req.models.Product(req.body);
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({message: "Error creating product", error});
    }
}

async function updateProductById(req, res) {
    const {id} = req.params;

    try {
        const updatedProduct = await req.models.Product.findByIdAndUpdate(id, req.body, {new: true});

        if (!updatedProduct) {
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: "Error updating product", error});
    }
}


async function removeProductById(req, res) {
    try {
        const product = await req.models.Product.findByIdAndRemove(req.params.id);

        if (product) {
            res.status(200).json({message: "Product removed successfully"});
        } else {
            res.status(404).json({message: "Product not found"});
        }

    } catch (error) {
        res.status(500).json({message: "Error removing product", error});
    }
}

async function removeAllProducts(req, res) {
    try {
        await req.models.Product.deleteMany();

        res.status(200).json({message: "All products removed successfully"});

    } catch (error) {
        res.status(500).json({message: "Error removing products", error});
    }
}

module.exports = {
    getAllProducts, getProductById, addNewProduct, updateProductById, removeProductById, removeAllProducts,
}