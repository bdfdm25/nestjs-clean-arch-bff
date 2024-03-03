import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENVIRONMENT,
  name: process.env.APP_NAME,
  ...JSON.parse(process.env.APP_CONFIG_REPO),
}));
