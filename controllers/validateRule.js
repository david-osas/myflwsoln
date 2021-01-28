const bodyChecker = require('../utils/bodyChecker');

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
        message: `${rule} is required in rule.`,
        status: 'error',
        data: null,
      });
    }
  }

  if (!req.body.data[req.body.rule.field]) {
    return res.status(400).json({
      message: `field ${req.body.rule.field} is missing from data.`,
      status: 'error',
      data: null,
    });
  }

  next();
};

exports.validateRule = (req, res) => {
  const { rule, data } = req.body;
  const conditionValue = rule.condition_value;
  const dataValue = data[rule.field];
  let isValid = null;

  switch (rule.condition) {
    case 'eq':
      isValid = dataValue === conditionValue ? 'valid' : 'invalid';
      break;

    case 'neq':
      isValid = dataValue !== conditionValue ? 'valid' : 'invalid';
      break;

    case 'gt':
      isValid = dataValue > conditionValue ? 'valid' : 'invalid';
      break;

    case 'gte':
      isValid = dataValue >= conditionValue ? 'valid' : 'invalid';
      break;

    case 'contains':
      try {
        isValid = dataValue.includes(conditionValue) ? 'valid' : 'invalid';
      } catch (err) {
        isValid = 'invalid';
      }
      break;

    default:
      isValid = 'condition';
  }

  if (isValid === 'valid') {
    return res.status(200).json({
      message: `field ${rule.field} successfully validated.`,
      status: 'success',
      data: {
        validation: {
          error: false,
          field: `${rule.field}`,
          field_value: dataValue,
          condition: rule.condition,
          condition_value: conditionValue,
        },
      },
    });
  } else if (isValid === 'condition') {
    return res.status(400).json({
      message: 'Invalid condition in rule.',
      status: 'error',
      data: {
        valid_conditions: ['eq', 'neq', 'gt', 'gte', 'contains'],
      },
    });
  } else {
    return res.status(400).json({
      message: `field ${rule.field} failed validation.`,
      status: 'error',
      data: {
        validation: {
          error: true,
          field: `${rule.field}`,
          field_value: dataValue,
          condition: rule.condition,
          condition_value: conditionValue,
        },
      },
    });
  }
};
