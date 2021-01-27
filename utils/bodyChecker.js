//data checkers

exports.payloadChecker = (payload) => {
  if (!payload || payload.constructor.name !== 'Object') {
    return 'payload';
  } else if (!payload.rule) {
    return 'rule';
  } else if (!payload.data) {
    return 'data';
  } else {
    return 'valid';
  }
};

exports.dataChecker = (data) => {
  if (
    data.constructor.name === 'Object' ||
    data.constructor.name === 'Array' ||
    data.constructor.name === 'String'
  ) {
    return 'valid';
  } else {
    return 'data';
  }
};

exports.ruleChecker = (rule) => {
  if (rule.constructor.name !== 'Object') {
    return 'rule';
  } else if (!rule.field) {
    return 'field';
  } else if (!rule.condition) {
    return 'condition';
  } else if (!rule.condition_value) {
    return 'condition_value';
  } else {
    return 'valid';
  }
};
