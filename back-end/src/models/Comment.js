import Sequelize, { Model } from 'sequelize';

class Comment extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      { sequelize },
    );

    return this;
  }
}

export default Comment;
