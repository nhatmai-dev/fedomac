export const validate = (validatorSchema) => async (req, res, next) => {
  try {
    if (validatorSchema.params)
      await validatorSchema.params.validateAsync(req.params)
    if (validatorSchema.query)
      await validatorSchema.query.validateAsync(req.query)
    if (validatorSchema.body) await validatorSchema.body.validateAsync(req.body)
    next()
  } catch (error) {
    next(error)
  }
}
