import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('alkemydb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export const initDB = () => {
  sequelize.sync().then(() => {
    console.log('Conectado a la base de datos');
  });
};
