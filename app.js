const express = require('express');
const indexRouter = require('./routes/index');
const ruleRouter = require('./routes/validateRule');
const app = express();

app.use(express.json());

app.use('/', indexRouter);
app.use('/validate-rule', ruleRouter);

module.exports = app;
