import * as env from '../assets/env';

export const environment = {
  production: true,
  SECURITY_KEY: env.clientUrl.SECURITY_KEY,
  apiUrl: env.clientUrl.apiProdUrl,
};
