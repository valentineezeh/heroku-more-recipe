export default (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id'
      },
    },
    recipeId: {
      type: DataTypes.UUID,
      references: {
        model: 'Recipe',
        key: 'id'
      },
    },
    vote: {
      type: DataTypes.BOOLEAN
    },
  });
  votes.associate = (models) => {
    // associations can be defined here
    votes.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'SET NULL',
      as: 'votes'
    });
  };
  votes.associate = (models) => {
    // associations can be defined here
    votes.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      as: 'votes'
    });
  };
  return votes;
};