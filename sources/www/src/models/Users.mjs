import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

const Users=sequelize.define('users',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey:true
  },
  name:{
    type: Sequelize.TEXT
  },
  login:{
    type: Sequelize.TEXT
  },
  gitusername:{
    type: Sequelize.TEXT
  },
  email:{
    type: Sequelize.TEXT
  },
  gittoken:{
    type: Sequelize.TEXT
  },
  projectid:{
    type: Sequelize.DataTypes.ARRAY(Sequelize.INTEGER)
  },
  location:{
    type: Sequelize.TEXT
  },
  job:{
    type: Sequelize.TEXT
  },
  school:{
    type: Sequelize.TEXT
  },
  company:{
    type: Sequelize.TEXT
  },
  nbfollowers:{
    type: Sequelize.INTEGER
  },
  listoffollow:{
    type: Sequelize.DataTypes.ARRAY(JSON)
  },
  picture:{
    type: Sequelize.TEXT

  },
  hashedpassword:{
    type: Sequelize.TEXT

  },
  currentproject:{
    type: Sequelize.JSON

  },
  mastodon:{
     type: Sequelize.TEXT

   },
   requests:{
      type: Sequelize.DataTypes.ARRAY(JSON)

     }

},{
  timestamps:false
});
export default Users;
