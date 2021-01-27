const bodyChecker = require('../utils/bodyChecker');

//route controllers

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

exports.validateRule = (req, res) => {
  if (
    !bodyChecker.payloadChecker(req.body) ||
    !bodyChecker.ruleChecker(req.body.rule) ||
    !bodyChecker.dataChecker(req.body.data)
  ) {
    return res.status(400).json({
      message: 'Invalid json payload sent with HTTP POST request',
      status: 'error',
      data: null,
    });
  }

  res.send('done');
};
