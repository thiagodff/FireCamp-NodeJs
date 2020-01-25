module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'firecamp',
  define: {
    timestamp: true, // created_at & updated_at
    underscored: true,
    underscoredAll: true,
  },
};
