var PORT = 1111;

var NodeStatic = require('node-static');
var WebSocketServer = require('ws').Server;

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

var websocketServer = new WebSocketServer({server: httpServer});

var connections = [];

websocketServer.on('connection', function(connection) {
    connections.push(connection);

    connection.on('close', function() {
        connections.splice(connections.indexOf(connection), 1);
    });
});

function broadcast(message) {
    connections.forEach(function(c) {
        c.send(message, function(e) {
            if(e) console.error(e);
        });
    });
}

httpServer.listen(PORT);
