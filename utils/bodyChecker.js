//data checkers

exports.payloadChecker = (payload) => {
  if (!payload || !payload.rule || !payload.data) {
    return false;
  } else {
    return true;
  }
};

exports.dataChecker = (data) => {
  if (
    data.constructor.name === 'Object' ||
    data.constructor.name === 'Array' ||
    data.constructor.name === 'String'
  ) {
    return true;
  } else {
    return false;
  }
};

exports.ruleChecker = (rule) => {
  if (
    rule.constructor.name !== 'Object' ||
    !rule.field ||
    !rule.condition ||
    !rule.condition_value
  ) {
    return false;
  } else {
    return true;
  }
};
