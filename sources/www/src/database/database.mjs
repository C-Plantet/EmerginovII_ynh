import Sequelize from 'sequelize';

//connexion to database
export const sequelize=new Sequelize(
'db_emerginov',
'test_user',
'azerty',


  // 'lpjibasl',
  // 'lpjibasl',
  // '6o5Zh4iXTCgAdrpg9SGsRoYlM70c0X3o',
  {
     host:'emerginov.com',
    // host: 'localhost',
    dialect:'postgres',
    pool:{
      max:1000,
      min:0,
      require:30000,
      idle:10000
    },
    logging:false
  }
)
