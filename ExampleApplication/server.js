var express = require('express');
var app = express();
var bodyParser = require('body-parser');  //Allows reading of request body
var morgan = require('morgan');           //Console logs to terminal

var config = require('./config');         //Import our config
var cors = require('cors');				  //Allow CORS for our domain
var whitelist = config.corsWhitelist;
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        //Allow all CORs for now
        callback(originIsWhitelisted ? null : null, originIsWhitelisted);
        // callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
    },
    optionsSuccessStatus: 200,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,x-access-token'
};

var port = process.env.PORT || 8080;

//Email setup with emailjs
var email   = require("./node_modules/emailjs/email");
var server  = email.server.connect(config.emailConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

//Create new instance of the express router
var apiRoutes = express.Router();

apiRoutes.post('/v1/email', function (req, res) {
    //Example contact form endpoint
    if (req.body.type === 'contact') {
        var message = {
            text:    "Example Contact Form Message",
            from:    "From Email <noreply@example.com>",
            to:      "New Person <contact@example.com>",
            "reply-to": req.body.firstName + " " + req.body.lastName +  " <" + req.body.email + ">",
            subject: req.body.subject + " - Message from website user",
            attachment:
                [
                    {data: '<html><head></head><body><h3>First Name</h3><p>'+req.body.firstName+'</p><h3>Last Name</h3><p>'+req.body.lastName+'</p><h3>Email Address</h3><p>'+req.body.email+'</p><h3>Subject</h3><p>'+req.body.subject+'</p><h3>Question</h3><p>'+req.body.question+'</p><img src="cid:my-logo" width="70px" border="0" alt="alt text" /></body></html>', alternative: true, inline: true},
                    {path:"./uploads/logo.png", type:"image/png", headers:{"Content-ID":"<my-logo>"}}
                ]
        };

        server.send(message, function(err, message) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(message);
            }
        });
    }
});

//Start listening on port
app.listen(port);
console.log('Running at http://localhost:' + port);
