const checkSize = (req, res, next) => {
  const validSizes = ['Small', 'Medium', 'Large'];

  if (!validSizes.includes(req.body.Size)) {
      return res.status(422).json({
          data: null,
          error: 'Invlid size, use Small, Medium or Large'
      })
  }

  next()
}

module.exports = {
  checkSize
}