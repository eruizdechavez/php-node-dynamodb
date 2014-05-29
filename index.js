var http = require('http'),
    express = require('express'),
    app = express(),
    unserialize = require('php-unserialize').unserializeSession,
    fs = require('fs'),
    mustache = require('mustache'),
    AWS = require('aws-sdk'),
    dynamodb;

AWS.config.update({
    region: 'us-east-1'
});

dynamodb = new AWS.DynamoDB({
    accessKeyId: 'foo',
    secretAccessKey: 'bar',
    endpoint: new AWS.Endpoint('http://localhost:8001')
});

app.get('/', function(req, res) {
    var cookies = (req.headers.cookie || '').split(';').reduce(function(obj, item) {
        var tmp = (item || '').split('=');
        obj[tmp[0]] = tmp[1];
        return obj;
    }, {});

    if (!cookies.PHPSESSID) {
        return res.redirect('/');
    }

    var keyConditions

    dynamodb.query({
        TableName: 'sessions',
        KeyConditions: {
            id: {
                ComparisonOperator: 'EQ',
                AttributeValueList: [{
                    S: 'PHPSESSID_' + cookies.PHPSESSID
                }]
            }
        }
    }, function(err, data) {
        if (err || !data || !data.Items || !data.Items.length || !data.Items[0].data || !data.Items[0].data.S || !data.Items[0].data || !data.Items[0].data.S === '') {
            return res.redirect('http://localhost:8000');
        }

        fs.readFile('./index.mustache', 'utf-8', function(err, file) {
            return res.send(mustache.render(file, unserialize(data.Items[0].data.S)));
        });
    });
});

app.listen(1337, function() {
    console.log('Server running at http://127.0.0.1:1337/');
});
