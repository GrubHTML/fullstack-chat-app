export const limiterMsgsForClient = (req, res) => {
  return res.status(429).json({
    status: "Error",
    message: "OOPS! Too many request! Please try again later.",
  });
};
