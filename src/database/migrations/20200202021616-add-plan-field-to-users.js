module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'plan', {
      type: Sequelize.INTEGER,
      references: { model: 'plans', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'plan');
  },
};
