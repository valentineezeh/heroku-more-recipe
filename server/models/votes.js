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
  return votes;
};