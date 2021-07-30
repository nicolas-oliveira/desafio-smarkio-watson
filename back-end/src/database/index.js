require('dotenv/config');

import Sequelize from 'sequelize';
import dbConfig from '../config/database';

const connection = new Sequelize(
  process.env.NODE.ENV === 'DEVELOPMENT'
    ? dbConfig.development
    : dbConfig.production,
);

export default connection;
