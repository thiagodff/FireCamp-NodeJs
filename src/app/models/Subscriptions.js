import Sequelize, { Model } from 'sequelize';

class Subscriptions extends Model {
  static init(sequelize) {
    super.init(
      {
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'subscriber_id',
      as: 'subscriber',
    });
    this.belongsTo(models.Activities, {
      foreignKey: 'activity_id',
      as: 'activity',
    });
  }
}

export default Subscriptions;
