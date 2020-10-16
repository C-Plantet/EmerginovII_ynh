  /*global phpCode, resultBody, uniter */
  //var uniter = require('uniter');
//  var fs = require('fs');
  import Users from '../models/Users';
  var rimraf = require("rimraf");

  var sudo = require('sudo-js');
  const fs = require('fs-extra');
  //const { exec } = require('child_process');
  //sudo.setPassword('Moncef18'); à changer !!



    function rights(command1,command2,command3){
      //var command3 = ['echo', newVirtualHost, '>' , '/etc/apache2/sites-available'];

      sudo.exec(command1, function(err, pid, result) {
        if (err) {
          console.log("problem");
        }
        console.log("rights of apache changed");
      });
      sudo.exec(command2, function(err, pid, result) {
        if (err) {
          console.log("problem");
        }
        //create_DirectoryOrFile({"type":"folder","path":"/var/www/html/project1.ci"},"res");
        console.log("rights of var changed");
      });

    sudo.exec(command3, function(err, pid, result) {
      if (err) {
       console.log(err);
      }
      console.log("rights of hosts changed");
      });
  }
export function copyFiles_And_CreateVirtualHost(projectName,newVirtualHost){

  var path=projectName;

  try {
    // fs.rmdir(`/var/www/html/${projectName}.ci`, { recursive: true },(err) => {
    //   if (err) throw err;
    //   console.log("folder successfully deleted");
    // });
   rimraf(`/var/www/html/${projectName}.ci`, function () { console.log("done"); });

    // fs.remove(`/var/www/html/${projectName}.ci`, err => {
    //   if (err) return console.error(err)
    //     console.log('deleted!') // I just deleted my entire HOME directory.
    // })
    setTimeout(function () {
      var directory=fs.mkdir(`/var/www/html/${projectName}.ci`, { recursive: true }, (err) => {
        if (err) throw err;
      });
       fs.copy(path, `/var/www/html/${projectName}.ci`)
       //fs.copy(path+"/src/index.php", `/var/www/html/`)

      console.log('files copied!')

    }, 100);

  } catch (err) {
    console.error(err)
  }
  fs.writeFile(`/etc/apache2/sites-available/${projectName}.conf`
  , newVirtualHost
  , function (err) {
    if (err) throw err;
    console.log('newVirtualHost created!');
  });
  fs.appendFile('/etc/hosts', `127.0.0.1 ${projectName}.ci`, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

function a2ensite(){

  sudo.exec(command4, function(err, pid, result) {
      if (err) {
        console.log("problem");
      }
      console.log("a2ensite");
    });

}
function reloadApache2(){
  sudo.exec(command5, function(err, pid, result) {
      if (err) {
        console.log("problem");
      }
      console.log("apache2 reloaded");
    });
}

  export async function get_And_Execute_PhpCode(req, res){

    const {id}= req.body;
    const user= await Users.findOne({
      where:{
        id
      }
    });
    if (user.currentproject!=null) {
      var projectName=user.currentproject.name
      var command1 = ['chmod', '777', '/etc/apache2/sites-available'];
      var command2 = ['chmod', '777', '/var/www/html'];
      var command3 = ['chmod', '777', '/etc/hosts'];
      var command4 = ['a2ensite', `${projectName}.conf`];
      var command5 = ['systemctl', 'reload', 'apache2'];
      var newVirtualHost =`
      <VirtualHost *:80>
        ServerAdmin adminr@${projectName}.ci
        ServerName ${projectName}.ci
        ServerAlias www.${projectName}.ci
        DocumentRoot "/var/www/html/${projectName}.ci"
        <Directory "/var/www/html/${projectName}.ci">
          Options +FollowSymLinks
          AllowOverride all
          Require all granted
        </Directory>
        ErrorLog /var/log/apache2/error.${projectName}.com.log
        CustomLog /var/log/apache2/access.${projectName}.com.log combined
      </VirtualHost>
      `
      res.json({
        "message":user.currentproject.name
      })
      rights(command1,command2,command3)
      setTimeout(copyFiles_And_CreateVirtualHost(projectName,newVirtualHost), 1500);
      setTimeout(a2ensite, 1600);
      setTimeout(reloadApache2, 1700);


    }else {
      res.json({
        "message":"select a project"
      })
    }

//sudo chmod 777 /etc/hosts
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
