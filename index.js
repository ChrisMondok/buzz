var PORT = 1111;

var NodeStatic = require('node-static');
var SSE = require('sse');

var staticServer = new NodeStatic.Server('./public');

var httpServer = require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        if(request.method == 'POST') {
            broadcast('buzz');
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

function broadcast(message) {
    connections.forEach(function(c) {
        c.send(message);
    });
}

httpServer.listen(PORT);
