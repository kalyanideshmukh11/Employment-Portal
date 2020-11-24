module.exports = (sequelize, Sequelize) => {
    const student = sequelize.define("student", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      job_search_status: {
        type: Sequelize.STRING
      },
      job_title: {
        type: Sequelize.STRING
      },
      target_salary: {
        type: Sequelize.STRING
      },
      open_to_relocation: {
        type: Sequelize.STRING
      },
      industry_preference: {
        type: Sequelize.STRING
      },
      ethnicity: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      sexual_orientation: {
        type: Sequelize.STRING
      },
      disability: {
        type: Sequelize.STRING
      },
      parent_caregiver: {
        type: Sequelize.STRING
      },
      veteran_status: {
        type: Sequelize.STRING
      }
    });
    return student;
  };