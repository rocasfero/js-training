export default () => (req, res, next) => {
  next(createError(404));
};