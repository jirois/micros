import { attachCookiesToResponse, isTokenValid } from "../utils/jwt.js";
import Token from "../models/Token.js";
import UnAuthorizedError from "../errors/unauthorized.js";
import UnAuthenticatedError from "../errors/unauthenticate.js";

const authenticateUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies();
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);
    const userId = payload.user.userId;
    const token = payload.refreshToken;

    const existingToken = await Token.findOne({
      user: userId,
      refreshToken: token,
    });

    if (!existingToken && !existingToken?.isValid) {
      throw new UnAuthenticatedError("Authentication Invalid");
    }
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

const authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export { authenticateUser, authorization };
