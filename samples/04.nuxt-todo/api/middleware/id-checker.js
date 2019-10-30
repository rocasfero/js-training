export default () => (req, res, next) => {
  const id = req.params.id;
  if (!/^\d*$/.test(id)) return next(createError(403, 'id should be number'));
  req.params.id = parseInt(req.params.id, 10);
  next();
};