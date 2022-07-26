import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('alkemydb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export const initDB = () => {
  sequelize.sync({ alter: true }).then(() => {
    console.log('Conectado a la base de datos');
  });
};
