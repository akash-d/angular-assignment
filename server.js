var express = require('express'),
    app = express(),
    port = process.argv[2] || 2000;
//port = process.argv[2] || 80;

app.use(express.static(__dirname + '/'));

app.get('*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});
