const notFoundMiddleware = (req, res, next) => {
  res.status(404).send("This route doesn't not exist please go back home");
};

export default notFoundMiddleware;
