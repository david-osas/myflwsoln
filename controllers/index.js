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

exports.checkBody = (req, res, next) => {
  const payload = bodyChecker.payloadChecker(req.body);
  if (payload !== 'valid') {
    if (payload === 'payload') {
      return res.status(400).json({
        message: 'Invalid JSON payload passed.',
        status: 'error',
        data: null,
      });
    } else {
      return res.status(400).json({
        message: `${payload} is required.`,
        status: 'error',
        data: null,
      });
    }
  }

  const rule = bodyChecker.ruleChecker(req.body.rule);
  const data = bodyChecker.dataChecker(req.body.data);

  if (data !== 'valid') {
    return res.status(400).json({
      message: 'data should be an object, array or string.',
      status: 'error',
      data: null,
    });
  }
  if (rule !== 'valid') {
    if (rule === 'rule') {
      return res.status(400).json({
        message: 'rule should be an object.',
        status: 'error',
        data: null,
      });
    } else {
      return res.status(400).json({
        message: `${rule} is required in rule object.`,
        status: 'error',
        data: null,
      });
    }
  }

  next();
};

exports.validateRule = (req, res) => {
  res.send('done');
};
