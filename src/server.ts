import app from './app';
import config from './config';

export default {
   fetch: app.fetch,
   port: config.port,
};
