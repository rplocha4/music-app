module.exports = function (app) {
  app.use(
    proxy(`/auth/**`, {
      target: 'https://music-backend-2hi1.onrender.com',
    })
  );
};
