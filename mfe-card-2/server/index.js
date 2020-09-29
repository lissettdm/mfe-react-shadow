var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.use('/static', express.static('dist'));

app.listen(5005);