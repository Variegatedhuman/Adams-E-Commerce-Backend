const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tags) {
      res.status(404).json({ message: 'No tag found!' });
      return;
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
  const tag = await Tag.create(req.body)
  // .then((product) => {
  //   // if there's product tags, we need to create pairings to bulk create in the ProductTag model
  //   if (req.body.tagIds.length) {
  //     const productTagIdArr = req.body.tagIds.map((tag_id) => {
  //       return {
  //         puct_id: product.id,
  //         tag_id,
  //       };
  //     });
  //     return Tag.bulkCreate(productTagIdArr);
  //   }
  
  res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(tag =>
      res.status(200).json(tag)
      ) 
      .catch (err => 
        res.status(400).json(err)) 
});

router.delete('/:id', async (req, res) => {
  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tags) {
      res.status(404).json({ message: 'No tag found!' });
      return;
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
