import Product from "../models/productModel.js";

export const showProduct = async (req, res, next) => {
   /*
  #swagger.tags = ["Products"]
  #swagger.responses[200]
  */
  try {
    const product = await Product.findOne(req.params);

    if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }

    res.hateoas_item(product);
  } catch (err) {
    next(err);
  }
}

export const listProducts = async (req, res, next) => {
  /*
  #swagger.tags = ["Products"]
  #swagger.responses[200]
  */
  try {
    const { _page, _size, _order, ...filter } = req.query;
    const page = parseInt(_page) || 1;
    const size = parseInt(_size) || 10;

    const offset = (page - 1) * size;

    const products = await Product
      .find(filter)
      .skip(offset)
      .limit(size)
      .sort(_order);

    const totalData = await Product.countDocuments();
    const totalPages = Math.ceil(totalData / size);

    res.hateoas_list(products, totalPages);
  } catch (err) {
    next(err);
  }
}

export const createProduct = async (req, res, next) => {
   /*
  #swagger.tags = ["Products"]
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/User" }
  }
  #swagger.responses[201]
  */
  try {
    const { name, description, price } = req.body;

    await new Product({
      name,
      description,
      price,
    }).save();

    res.created();
  } catch (err) {
    next(err);
  }
}

export const editProduct = async (req, res, next) => {
  /*
  #swagger.tags = ["Products"]
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/Products" }
  }
  #swagger.responses[200]
  */
  try {
    const {name, description, price } = req.body;

    const product = await Product.findOneAndUpdate(req.params, {
      name,
      description,
      price,
    }, {
      new: true,
    });

    res.hateoas_item(product);
  } catch (err) {
    next(err);
  }
}

export const deleteProduct = async (req, res, next) => {
  /*
  #swagger.tags = ["Products"]
  #swagger.responses[204]
  */
  try {
    await Product.findByIdAndDelete(req.params._id);

    res.no_content();
  } catch (err) {
    next(err);
  }
}
