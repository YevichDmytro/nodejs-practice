import createHttpError from 'http-errors';
import { loginUser, refreshUser, registerUser } from '../services/users.js';
import SessionCollection from '../db/models/Session.js';

const setCookies = (res, { refreshToken, sessionId }) => {
  res.cookie('refreshToken', sessionId);
  res.cookie('sessionId', refreshToken);
};

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registerUser({ name, email, password });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const session = await loginUser({ email, password });

  res.cookie('refreshToken', session.refreshToken);
  res.cookie('sessionId', session._id);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logOutController = async (req, res, next) => {
  if (req.cookies.sessionId) {
    await SessionCollection.deleteOne({ _id: req.cookies.sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshTokenController = async (req, res) => {
  const session = await SessionCollection.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const newSession = await refreshUser(session);

  setCookies(res, {
    sessionId: newSession.refreshToken,
    refreshToken: newSession._id,
  });

  res.json({
    status: 200,
    message: 'Successfully refreshed user!',
    data: {
      accessToken: newSession.accessToken,
    },
  });
};
