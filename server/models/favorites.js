export default (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId',
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    }
  });
  Favorites.associate = (models) => {
    // associations can be defined here
    Favorites.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      onDelete: 'SET NULL',
      as: 'favorites'
    });
    Favorites.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Favorites;
};

