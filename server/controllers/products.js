const Product = require("../models/products");

exports.getProducts = (req, res, next) => {
  Product.find().then((lstProduct) => {
    return res.status(200).send(lstProduct);
  });
};

exports.getDetailProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId).then((item) => {
    if (item) {
      return res.status(200).send(item);
    } else {
      return res.status(404);
    }
  });
};

exports.getPaging = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const count = parseInt(req.query.count) || 10;
  const search = req.query.search || "";
  const category = req.query.category || "";

  Product.find()
    .then((data) => {
      if (category !== "all") {
        data = data.filter((e) => e.category === category);
      }

      if (search !== "") {
        data = data.filter((e) =>
          e.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Paginating the results
      const startIndex = (page - 1) * count;
      const endIndex = startIndex + count;
      const paginatedItems = data.slice(startIndex, endIndex);

      res.status(200).send(paginatedItems);
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });

  // Sending the paginated results back to the frontend
  // res.json({
  //   page,
  //   count,
  //   totalItems: filteredItems.length,
  //   totalPages: Math.ceil(filteredItems.length / count),
  //   items: paginatedItems,
  // });
};
