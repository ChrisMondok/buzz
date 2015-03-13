var PORT = 1111;

var NodeStatic = require('node-static');
var SSE = require('sse');

var staticServer = new NodeStatic.Server('./public');

var httpServer = require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        var sender = request.connection.remoteAddress;

        if(request.method == 'POST') {
            broadcast('buzz', JSON.stringify({from: sender}));
            response.writeHead(204);
            response.end();
        }
        else
            staticServer.serve(request, response);
    }).resume();
});

var connections = [];

var sse = new SSE(httpServer);
sse.on('connection', function(client) {
    connections.push(client);

    client.on('close', function() {
        connections.splice(connections.indexOf(client));
    });
});

function broadcast(event, data) {
    connections.forEach(function(c) {
        c.send(event, data);
    });
}

httpServer.listen(PORT);
