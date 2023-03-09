const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, {model: Tag}],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  
  try {
    const productData = await Product.findOne({
      where: {
        id: req.params.id
      }
    }, {
      include: [Category,{ model: Tag, through: ProductTag}],
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    try {
      const productData = await Product.create(req.body);
      res.status(200).json(productData);
    } catch (err) {
      res.status(400).json(err);
    }
});


router.put('/:id', async (req, res) => {
 
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    return res.status(200).json(productData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
 
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
