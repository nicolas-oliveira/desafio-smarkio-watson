require('dotenv/config');

import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Comment from '../models/Comment';

const connection = new Sequelize(
  process.env.NODE.ENV === 'DEVELOPMENT'
    ? dbConfig.development
    : dbConfig.production,
);

Comment.init(connection);

export default connection;
