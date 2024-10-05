import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const swaggerDocumentation = JSON.parse(
      fs.readFileSync(SWAGGER_PATH).toString(),
    );
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDocumentation)];
  } catch (error) {
    console.log('swaggerDocs ~ error:', error);
    return (req, res, next) => {
      next(createHttpError(404, 'Cannot find Swagger doc'));
    };
  }
};
