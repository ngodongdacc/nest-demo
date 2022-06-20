export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    type: 'mysql',
    username: 'root',
    password: 'Dong1234567890!',
    database: 'test_db',
  },
  pathSaveFile: process.env.PATH_SAVE_FILE,
  ENV: process.env.ENV || 'TIMEZONE INTERGRATION',
});
