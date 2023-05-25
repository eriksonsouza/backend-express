import { verify } from "jsonwebtoken";

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "User not authorized!" });
  }

  const [, token] = authHeader.split(" ");

  try {
    verify(token, "6a42dd6e7ca9a813693714b0d9aa1ad8");
    return next();
  } catch (err) {
    return response.status(401).json({ error: "invalid JWT Token!" });
  }
};
