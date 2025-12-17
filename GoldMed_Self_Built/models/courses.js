module.exports = (sequelize, Sequelize) => {
    const Courses = sequelize.define('Courses', {
        theme: {
            type: Sequelize.DataTypes.STRING,
        },
        time: {
            type: Sequelize.DataTypes.STRING,
        },
        activities: {
            type: Sequelize.DataTypes.STRING,
        }
    },{
        timestamps: true,
    }
    );
    return Courses;
};