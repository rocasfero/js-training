import createError from 'http-errors';

export default () => (err, req, res, next) => {
  if (!(err instanceof createError.HttpError)) {
    err = createError(500, err.message);
  }

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    name: err.name,
    message: err.message
  });
};
