exports.user = (req, res) => {
  res.status(200).json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Osarumense David Azamegbe',
      github: '@david-osas',
      email: 'azamegbeosarumense@gmail.com',
      mobile: '08023346376',
    },
  });
};
