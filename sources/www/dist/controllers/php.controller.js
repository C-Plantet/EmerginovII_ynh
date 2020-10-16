"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyFiles_And_CreateVirtualHost = copyFiles_And_CreateVirtualHost;
exports.get_And_Execute_PhpCode = get_And_Execute_PhpCode;

/*global phpCode, resultBody, uniter */
var uniter = require('uniter'); //  var fs = require('fs');


var sudo = require('sudo-js');

var fs = require('fs-extra'); //const { exec } = require('child_process');


sudo.setPassword('azerty');
var projectName = "project3";
var newVirtualHost = "\n  <VirtualHost *:80>\n    ServerAdmin adminr@".concat(projectName, ".ci\n    ServerName ").concat(projectName, ".ci\n    ServerAlias www.").concat(projectName, ".ci\n    DocumentRoot \"/var/www/html/").concat(projectName, ".ci\"\n    <Directory \"/var/www/html/").concat(projectName, ".ci\">\n      Options +FollowSymLinks\n      AllowOverride all\n      Require all granted\n    </Directory>\n    ErrorLog /var/log/apache2/error.").concat(projectName, ".com.log\n    CustomLog /var/log/apache2/access.").concat(projectName, ".com.log combined\n  </VirtualHost>\n  ");
var command1 = ['chmod', '777', '/etc/apache2/sites-available'];
var command2 = ['chmod', '777', '/var/www/html'];
var command3 = ['chmod', '777', '/etc/hosts'];
var command4 = ['a2ensite', "".concat(projectName, ".conf")];
var command5 = ['systemctl', 'reload', 'apache2'];

function rights() {
  //var command3 = ['echo', newVirtualHost, '>' , '/etc/apache2/sites-available'];
  sudo.exec(command1, function (err, pid, result) {
    if (err) {
      console.log("problem");
    }

    console.log("rights of apache changed");
  });
  sudo.exec(command2, function (err, pid, result) {
    if (err) {
      console.log("problem");
    } //create_DirectoryOrFile({"type":"folder","path":"/var/www/html/project1.ci"},"res");


    console.log("rights of var changed");
  });
  sudo.exec(command3, function (err, pid, result) {
    if (err) {
      console.log(err);
    }

    console.log("rights of hosts changed");
  });
}

function copyFiles_And_CreateVirtualHost() {
  var path = "projects/".concat(projectName, ".ci");

  try {
    fs.remove("/var/www/html/".concat(projectName, ".ci"), function (err) {
      if (err) return console.error(err);
      console.log('deleted!'); // I just deleted my entire HOME directory.
    });
    setTimeout(function () {
      var directory = fs.mkdir("/var/www/html/".concat(projectName, ".ci"), {
        recursive: true
      }, function (err) {
        if (err) throw err;
      });
      fs.copy(path, "/var/www/html/".concat(projectName, ".ci"));
      console.log('files copied!');
    }, 10);
  } catch (err) {
    console.error(err);
  }

  fs.writeFile("/etc/apache2/sites-available/".concat(projectName, ".conf"), newVirtualHost, function (err) {
    if (err) throw err;
    console.log('newVirtualHost created!');
  });
  fs.appendFile('/etc/hosts', "127.0.0.1 ".concat(projectName, ".ci"), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

function a2ensite() {
  sudo.exec(command4, function (err, pid, result) {
    if (err) {
      console.log("problem");
    }

    console.log("a2ensite");
  });
}

function reloadApache2() {
  sudo.exec(command5, function (err, pid, result) {
    if (err) {
      console.log("problem");
    }

    console.log("apache2 reloaded");
  });
}

function get_And_Execute_PhpCode(req, res) {
  //const {name}= req.body;
  rights();
  setTimeout(copyFiles_And_CreateVirtualHost, 100);
  setTimeout(a2ensite, 110);
  setTimeout(reloadApache2, 120); //sudo chmod 777 /etc/hosts
  //sudo chmod 777 /etc/apache2/sites-available
  //127.0.0.1	testdeprojet.ci
  //sudo systemctl reload apache2
  //sudo a2ensite testdeprojet.conf
  // const {code}= req.body;
  // console.log(code);
  // try{
  // var phpEngine = uniter.createEngine('PHP');
  // phpEngine.expose();
  // var result1= phpEngine.getStdout().on('data', function (data) {
  //     console.log(data);
  //   });
  //
  // var result=  phpEngine.execute(code).fail(function (error) {
  //     console.log(error.toString());
  //   });
  //   console.log(result);
  //   if (result1.data!="") {
  //     res.json({
  //       "response":result1.data
  //     });
  //   }else {
  //     res.json({
  //       "response":result.valueArgs[0].message
  //     });
  //   }
  //
  // }catch(error){
  //   console.log(error);
  //   res.status(500).json({
  //     message: 'something went wrong',
  //     data:{
  //
  //     }
  //   });
  // }
}