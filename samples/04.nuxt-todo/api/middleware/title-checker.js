export default () => (req, res, next) => {
  const title = req.body.title;
  if (!title) return next(createError(403, 'title was required'));
  next();
};