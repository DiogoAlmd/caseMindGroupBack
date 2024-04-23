import { Sequelize } from 'sequelize';
import config from './config'; // Importando as configurações do arquivo config.ts

const { host, database, user, pass } = config.mysql;

const sequelize = new Sequelize(database, user, pass, {
  host: host,
  dialect: 'mysql'
});

export { sequelize };