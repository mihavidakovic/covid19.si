const country = (sequelize, DataTypes) => {
  const Country = sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    prevod: {
      type: DataTypes.STRING,
      unique: false,
      validate: {
        notEmpty: true,
      }
    },
    slug: {
      type: DataTypes.STRING,
      unique: false,
      validate: {
        notEmpty: true,
      }
    }
  });
 
  return Country;
};
 
export default country;
