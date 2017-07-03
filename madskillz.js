'use strict'

function writeFile(filename, data) {
  require('fs').writeFile(filename, data, function​ (err) {
    ​if​ (err) {
      ​throw​ err;
    }
    console.log(`Data saved to file '${filename}`);
  })
}

function download(host, path, cb) {
  var data = "";
  var request = require("https").get({ 
    host,
    path 
  }, function(res) {
    if (res.statusCode === 301 || res.statusCode === 302) {
      download(res.headers.location, cb)
      return
    }

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      cb(data);
    })
  });

  request.on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

download('raw.githubusercontent.com', '/Readify/madskillz/master/Consulting.md', data => {
  writeFile('madskillz.md', data)
})