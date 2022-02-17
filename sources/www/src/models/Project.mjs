import Sequelize from 'sequelize';
import { sequelize }  from '../database/database.mjs';
import Users from './Users.mjs';

const Project= sequelize.define('projects',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT
  },
  priority:{
    type: Sequelize.INTEGER,
    defaultValue : 1
  },
  description:{
    type: Sequelize.TEXT,
    defaultValue : ''
  },
  deliverydate:{
    type: Sequelize.DATE
  }
},{
  timestamps:false
});
Project.hasMany(Users,{foreignKey:'projectid',sourceKey:'id'});
Users.belongsTo(Project,{foreignKey:'projectid',sourceKey:'id'});

export default Project;
