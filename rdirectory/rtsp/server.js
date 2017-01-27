var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path');

var indexPage, movie_webm, movie_mp4, movie_ogg;

// load the video files and the index html page
fs.readFile(path.resolve(__dirname,"movie.mp4"), function (err, data) {
    if (err) {
        throw err;
    }
    movie_mp4 = data;
});
// create http server
http.createServer(function (req, res) {
    
    var reqResource = url.parse(req.url).pathname;
    //console.log("Resource: " + reqResource);

    if(reqResource == "/"){
    
        //console.log(req.headers)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexPage);
        res.end();

    } else if (reqResource == "/favicon.ico"){
    
        res.writeHead(404);
        res.end();
    
    } else {

            var total;
            if(reqResource == "/movie.mp4"){
                total = movie_mp4.length;
            }     
            var range = req.headers.range;

            var positions = range.replace(/bytes=/, "").split("-");
            var start = parseInt(positions[0], 10);
            // if last byte position is not present then it is the last byte of the video file.
            var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            var chunksize = (end-start)+1;

            if(reqResource == "/movie.mp4"){
                res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total, 
                                     "Accept-Ranges": "bytes",
                                     "Content-Length": chunksize,
                                     "Content-Type":"video/mp4"});
                res.end(movie_mp4.slice(start, end+1), "binary");

            }
    }
}).listen(8888); 
