
export default (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    id: {
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      },
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
  });
 
  Recipes.associate = (models) => {
    // associations can be defined here
    Recipes.hasMany(models.Favorites, {
      foreignKey: 'recipeId',
      onDelete: 'SET NULL',
      as: 'favorites'
    });
  };
  Recipes.associate = (models) => {
    // associations can be defined here
    Recipes.hasMany(models.votes, {
      foreignKey: 'recipeId',
      onDelete: 'SET NULL',
      as: 'votes'
    });
  };
  Recipes.associate = (models) => {
    // associations can be defined here
    Recipes.hasMany(models.Reviews, {
      foreignKey: 'recipeId',
      onDelete: 'SET NULL',
      as: 'reviews'
    });
  };
  return Recipes;
};
