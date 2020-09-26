const { Sequelize, Model, DataTypes } = require("sequelize");

// Connect to DB
console.log("Connecting to database...");

const sequelize = new Sequelize(
  "appointment_booking_service_development",
  "postgres",
  undefined,
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

sequelize.authenticate().then(() => {
  console.log("Successfully connected to database!");
});

// Define models, which map to DB tables
class Counsellor extends Model {}

Counsellor.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Counsellor",
  }
);

class Availability extends Model {}

Availability.init(
  {
    counsellorId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: Counsellor,
        key: "id",
      },
    },
    datetime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Availability",
  }
);

class Type extends Model {}

Type.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Type",
  }
);

class Medium extends Model {}

Medium.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Medium",
  }
);

Counsellor.hasMany(Availability);
Availability.belongsTo(Counsellor);

Counsellor.belongsToMany(Type, { through: "CounsellorType" });
Type.belongsToMany(Counsellor, { through: "CounsellorType" });

Counsellor.belongsToMany(Medium, { through: "CounsellorMedium" });
Medium.belongsToMany(Counsellor, { through: "CounsellorMedium" });

sequelize.sync();

module.exports = {
  Counsellor,
  Availability,
  Type,
  Medium,
};
