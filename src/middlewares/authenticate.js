import createHttpError from 'http-errors';
import SessionCollection from '../db/models/Session.js';
import UsersCollection from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header.'));
    return;
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Provide Bearer token, please.'));
    return;
  }

  const session = await SessionCollection.findOne({ accessToken: token });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date(session.accessTokenValidUntil) > new Date();
  if (!isAccessTokenExpired) {
    next(createHttpError(401, 'Session expired'));
    return;
  }

  const user = await UsersCollection.findOne({ _id: session.userId });
  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }

  req.user = user;

  next();
};
