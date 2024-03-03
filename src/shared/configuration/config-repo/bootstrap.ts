import { Logger } from '@nestjs/common';
import axios from 'axios';

export const loadingConfigRepo = async (): Promise<void> => {
  const logger = new Logger('Bootstrap');
  logger.log(
    `Carregando informações do config-repo... - URL: ${process.env.URL_CONFIG_REPO} - APP: ${process.env.APP_NAME}`,
  );
  const url = `${process.env.URL_CONFIG_REPO}/${process.env.APP_NAME}.json`;
  if (url) {
    try {
      const { data } = await axios.get(url);
      if (data && data.app) {
        process.env['APP_CONFIG_REPO'] = JSON.stringify(data.app);
        logger.log(JSON.stringify(data.app));
        logger.log('Informações do config-repo carregadas...');
      } else {
        logger.error('Config-repo não encontrado.');
        process.env['APP_CONFIG_REPO'] = null;
      }
    } catch (error) {
      logger.error(
        `Não foi possivel carregar as configurações do config-repo...${error.message}`,
      );
      process.env['APP_CONFIG_REPO'] = null;
    }
  }
};
