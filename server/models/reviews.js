

export default (sequelize, DataTypes) => {
  const Reviews = sequelize.define('Reviews', {
    userId: {
      allowNull: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
    recipeId: {
      allowNull: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'Recipe',
        key: 'id',
        as: 'recipeId'
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
  });
  Reviews.associate = (models) => {
    // associations can be defined here
    Reviews.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'SET NULL',
      as: 'reviews'
    });
  };
  return Reviews;
};
