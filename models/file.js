'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class File extends Model {

  }
  File.init({
    name: DataTypes.STRING,
    size: DataTypes.DOUBLE,
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'File',
    tableName: 'Files',
    timestamps: true
  });
  return File;
};
