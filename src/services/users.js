import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import UsersCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';

import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';

const generateAccessRefreshTokens = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
  };
};

export const registerUser = async ({ name, email, password }) => {
  const user = await UsersCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UsersCollection.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Double check email or password');
  }

  const comparedPassword = await bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    throw createHttpError(401, 'Double check email or password');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const tokens = generateAccessRefreshTokens();

  const session = await SessionCollection.create({
    userId: user._id,
    ...tokens,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return session;
};

export const refreshUser = async (session) => {
  const newTokens = generateAccessRefreshTokens();

  await SessionCollection.deleteOne({
    _id: session._id,
    refreshToken: session.refreshToken,
  });

  const newSession = await SessionCollection.create({
    userId: session.userId,
    ...newTokens,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return newSession;
};
