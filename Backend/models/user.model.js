module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("users", {
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }
    });
    return user;
  };