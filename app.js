const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const GeoJSON = require('geojson');




dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/events');
const CommentRouter = require('./routes/comments');
const apiRoutes = require('./routes/ApiRoutes');
const SalleRouter = require('./routes/salles')

var app = express();
app.use(express.urlencoded({ extended: true }))

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// chat
//////////////////////////////////////////////////////////////////////////////////////

const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer(app)

server.listen(3100, () => {
    console.log("chat is Listening on port 3100...")
})

wsServer = new SocketServer({ httpServer: server })

const connections = []

wsServer.on('request', (req) => {
    const connection = req.accept()
    console.log('new connection')
    connections.push(connection)

    connection.on('message', (mes) => {
        connections.forEach(element => {
            if (element != connection)
                element.sendUTF(mes.utf8Data)
        })
    })

    connection.on('close', (resCode, des) => {
        console.log('connection closed')
        connections.splice(connections.indexOf(connection), 1)
    })

})
//***************************************************************************************************************************
const https = require("https");
app.get('/getflooretts/:data', function (req, res) {
    var data = req.params.data;
    a = https
        .get('https://data-api.indooratlas.com/public/v1/sdk-sessions/' + data + '/events?key=e24658c6-953a-4cea-9630-3174f840b6d2', resp => {
            let data = "";

            resp.on("data", chunk => {
                data += chunk;
            });

            resp.on("end", () => {

                let url2 = JSON.parse(data);

                let listdonne = [];
                let listets = [];
                let u = [];
                for (var i = 0; i < url2.length; i++) {
                    if (url2[i].content.location != null) {
                        listdonne[i] = url2[i].content.location.floorNumber;
                        listets[i] = url2[i].ts;
                        u[i] = {
                            'floorNumber': listdonne[i],
                            'ts': listets[i]
                        };


                    }

                    // var u = JSON.parse(listdonne[i],listets[i]);
                }
                //var u = GeoJSON.parse(listdonne, {Point: ['lat', 'lon']})

                res.json(u);

            });

        }).on("error", err => {
            console.log("Error: " + err.message);
        });
    a.end();
});
/////////////////////////////////////////////
app.get('/getlatlen/:data', function (req, res) {
    var data = req.params.data;
    a = https
        .get('https://data-api.indooratlas.com/public/v1/sdk-sessions/' + data + '/events?key=e24658c6-953a-4cea-9630-3174f840b6d2', resp => {
            let data = "";

            resp.on("data", chunk => {
                data += chunk;
            });

            resp.on("end", () => {

                let url2 = JSON.parse(data);

                let listdonne = [];
                let u;
                for (var i = 0; i < url2.length; i++) {
                    if (url2[i].content.location != null) {
                        listdonne[i] = url2[i].content.location.coordinates;
                    }

                }

                if (listdonne != null) {
                    u = GeoJSON.parse(listdonne, { Point: ['lat', 'lon'] })
                    res.send(u);
                } else {
                    res.json("no data ");
                }



            });

        }).on("error", err => {
            console.log("Error: " + err.message);
        });
    a.end();
});

////
app.get('/getcordinate/:data', function (req, res) {
    var data = req.params.data;
    a = https
        .get('https://data-api.indooratlas.com/public/v1/sdk-sessions/' + data + '/events?key=e24658c6-953a-4cea-9630-3174f840b6d2', resp => {
            let data = "";

            resp.on("data", chunk => {
                data += chunk;
            });

            resp.on("end", () => {

                let url2 = JSON.parse(data);

                let listdonne = [];
                for (var i = 0; i < url2.length; i++) {

                    listdonne[i] = url2[i];


                }

                res.json(listdonne);

            });

        }).on("error", err => {
            console.log("Error: " + err.message);
        });
    a.end();
});


app.get('/getIds/:idau', function (req, res) {
    var idau = req.params.idau;
    console.log(idau + "      aaaaa");
    a = https
        .get("https://data-api.indooratlas.com/public/v1/sdk-sessions/2020/6/09?key=e24658c6-953a-4cea-9630-3174f840b6d2", resp => {
            let data = "";

            resp.on("data", chunk => {
                data += chunk;
            });

            resp.on("end", () => {

                let url = JSON.parse(data);
                let i;
                var listid = [];


                for (i = 0; i < url.length; i++) {

                    /// console.log(url[1].idaUuid); 

                    if (url[i].idaUuid == idau) {

                        listid[i] = url[i].sdkSetupId;
                    }

                }
                res.json(listid);

            });

        })
        .on("error", err => {
            console.log("Error: " + err.message);
        });
    a.end();

});
//*************************************************************************************************************

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
//imagekarim
app.use('/photo', express.static('uploads/'))
/////iimagewalid
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/comments', CommentRouter);
app.use('/salles', SalleRouter);

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
