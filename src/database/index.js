import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Activities from '../app/models/Activities';
import Subscriptions from '../app/models/Subscriptions';
import Plans from '../app/models/Plans';

import databaseConfig from '../config/database';

const models = [User, File, Activities, Subscriptions, Plans];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
