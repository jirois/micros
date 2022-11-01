import jwt from "jsonwebtoken";

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = (res, user, refreshToken) => {
  const accessToken = createJWT({ payload: { user } });
  const refreshToken = createJWT({ payload: { user, refreshToken } });

  const tenMin = 1000 * 60 * 10;
  const longExp = 1000 * 60 * 60 * 24 * 7;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + tenMin),
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + longExp),
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
