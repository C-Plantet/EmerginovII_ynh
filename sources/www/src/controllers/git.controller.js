//require("dotenv").config();
const  octokit = require('@octokit/rest');
var $ = require("jquery");
import copyFiles_And_CreateVirtualHost from './php.controller.js'
import Users from '../models/Users';
import Project from '../models/Project';
//var Git = require("nodegit");
var fs = require('fs-extra');
var rimraf = require("rimraf");
var exist=false;
var badtry=false;

const simpleGit = require('simple-git')();
// Shelljs package for running shell tasks optional
//const shellJs = require('shelljs');
// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')();
export async function create_Git_Repository(req,res){
  rimraf("fictiveProjects/projects/", function () { console.log("done"); });

  var {myID,name}= req.body;
  const user= await Users.findOne({
    where:{
      id:myID
    }
  });

  if (user.projectid!=null) {
    for (var i = 0; i < user.projectid.length; i++) {
      const project= await Project.findOne({
        where:{
          id:user.projectid[i]
        }
      });
      if (project!=null && name==project.name) {
        return res.json({
          "message":"this project already exist"
        })
         exist=true;
      }
    }
  }
  console.log(exist);
  if (exist==false) {
    const clientWithAuth = new octokit({
     //auth:"c7a365f1185f37ea43d3f58217dd6a6074889bea"

     auth:user.gittoken
     })
     clientWithAuth.repos.createForAuthenticatedUser({
     name:name
     }).then(data =>{
     fs.mkdirSync(name)
     console.log(data.data.html_url);
     console.log("repo successfully created");
     res.json({
       "message" : "created"
     })
     var localPath = name;
   //   var opts = {
   //       fetchOpts: {
   //         callbacks: {
   //           certificateCheck: () => 0
   //       }
   //     }
   //   };

   simpleGitPromise.clone(data.data.html_url, localPath).then(
     (addSuccess) => {
          console.log("clonage réussi",addSuccess);

   })

     setTimeout(function(){
       fs.mkdirSync(`${name}/src`)
       var file=fs.open(`${name}/src/index.php`,'w', (err) => {
             if (err) throw err;
           });

   },200)


 })

    // setTimeout(function(){
    //   simpleGitPromise.cwd(name)
    //   simpleGit.cwd(name)
    //   simpleGitPromise.add('.')
    //     .then(
    //        (addSuccess) => {
    //          console.log("adding files succeeded");
    //           console.log(addSuccess);
    //        }, (failedAdd) => {
    //           console.log('adding files failed');
    //     });
    //   // Commit files as Initial Commit
    //   simpleGitPromise.commit("initial commit")
    //    .then(
    //       (successCommit) => {
    //         console.log("get");
    //         console.log("this is commit",successCommit);
    //       })
    // },2000)

     console.log(req.body);
     var idProject= Math.floor(Math.random() * Math.floor(100000));
     console.log(idProject);
     let id=idProject;
     let priority=null;
     let deliverydate=null;
     let newProject= await Project.create({
       id,
       name,
       priority,
       deliverydate
     },{
       fields:['id','name','priority','deliverydate']
     });

     var projID=user.projectid
     console.log(projID);
     if (user.projectid!=null) {
       projID.push(idProject)
       console.log(projID);
       user.update({
         projectid:projID,
         currentproject:{
           "id":idProject,
           "name":newProject.name
         }

       })
     }else {
       var newProjectid=[idProject]
       console.log(newProjectid);
       user.update({
         currentproject:{
           "id":idProject,
           "name":newProject.name
         },
         projectid:newProjectid
       })
     }


  }





}
export async function pullRepo(req,res){
  const {id}=req.body;
  const user= await Users.findOne({
    where:{
      id
    }
  });
  if (user==null) {
    res.json({
      "message":"please verify your informations"
    })
  }else {
    if (user.currentproject==null) {
      res.json({
        "message":"you don't have any project"
      })
    }else {
      const project= await Project.findOne({
        where:{
          id:user.currentproject.id

      }
      });
      simpleGit.cwd(user.currentproject.name)
      simpleGitPromise.cwd(user.currentproject.name)

     simpleGitPromise.pull()
       .then(
          (addSuccess) => {
            console.log("adding files succeeded");
            console.log(addSuccess);
            if (addSuccess.summary.changes==0) {
              res.json({
                "message":"No pull available"
              })
            }else {
              res.json({
                "message":"file have been pulled"
              })
            }

          }, (failedAdd) => {
            res.json({
              "message":"error"
            })
             console.log('adding files failed');
       });
      // rimraf(`fictiveProjects/${user.currentproject.name}`, function () { console.log("deleted"); });
      // rimraf(`${user.currentproject.name}`, function () { console.log("deleted"); });
      // const clientWithAuth = new octokit({
      //  //auth:"c7a365f1185f37ea43d3f58217dd6a6074889bea"
      //
      //  auth:user.gittoken
      //  })
      //
      //  var localPath = user.currentproject.name;
      //  var opts = {
      //      fetchOpts: {
      //        callbacks: {
      //          certificateCheck: () => 0
      //      }
      //    }
      //  };
      //  setTimeout(function(){
      //    fs.mkdirSync(user.currentproject.name)
      //    var cloneRepository = Git.Clone(`https://github.com/${user.gitUsername}/${user.currentproject.name}.git`, localPath, opts);
      //
      //    },200)
      //
      //    setTimeout(function(){
      //      if (!fs.existsSync(`${user.currentproject.name}/src`)){
      //         fs.mkdirSync(`${user.currentProject.name}/src`);
      //         var file=fs.open(`${user.currentproject.name}/src/index.php`,'w', (err) => {
      //               if (err) throw err;
      //             });
      //     }
      //   },400)
}
}
}
export async function pushRepo(req,res){
  // Simple-git without promise
  const {id,commitMessage,gitusername,password}=req.body;
  const user= await Users.findOne({
    where:{
      id
    }
  });
  console.log("commit message: ",commitMessage);

if (commitMessage!="") {
  const clientWithAuth = new octokit({
  auth:user.gittoken
  })
 if (user.currentproject!=null) {
   const project= await Project.findOne({
     where:{
       id:user.currentproject.id

   }
   });
   console.log(user.currentproject.name);
    // change current directory to repo directory in local
   // shellJs.cd("testforpush");
    // Repo name
    simpleGit.cwd(user.currentproject.name)
    simpleGitPromise.cwd(user.currentproject.name)
    const repo = user.currentproject.name;  //Repo name
    // User name and password of your GitHub
    const userName = user.gitusername;

    // Set up GitHub url like this so no manual entry of user pass needed
    const gitHubUrl = `https://${userName}:${password}@github.com/${userName}/${repo}`;
    // add local git config like username and email
    simpleGit.addConfig('user.email',user.Email);
    simpleGit.addConfig('user.name', userName);
    // Add remore repo url as origin to repo
    fs.readFile(`${repo}/.git/config`, 'utf8', function (err,data) {
     if (err) {
       return console.log(err);
     }
     if (data.includes(`https://github.com/${userName}/${repo}`)) {
       var result = data.replace(`https://github.com/${userName}/${repo}`, gitHubUrl);
       fs.writeFile(`${repo}/.git/config`, result, 'utf8', function (err) {
            if (err) return console.log(err);
         });
     }


   });
   // simpleGitPromise.addRemote('origin',gitHubUrl);
    // Add all files for commit
      simpleGitPromise.add('.')
        .then(
           (addSuccess) => {
             console.log("adding files succeeded");
              console.log(addSuccess);
           }, (failedAdd) => {
              console.log('adding files failed');
        });
    // Commit files as Initial Commit
     simpleGitPromise.commit(commitMessage)
       .then(
          (successCommit) => {
            console.log("get");
            console.log("this is commit",successCommit);
            if (successCommit.summary.changes!="0"  ||  badtry==true) {
              console.log("badtry= ",badtry);
              simpleGitPromise.push('origin','master')
                 .then((success) => {
                   res.json({
                     "message":"repo successfully pushed"

                   })

                    console.log('repo successfully pushed');
                    fs.readFile(`${repo}/.git/config`, 'utf8', function (err,data) {
                     if (err) {
                       return console.log(err);
                     }
                     if (data.includes(`https://${userName}:${password}@github.com/${userName}/${repo}`)) {
                       var result = data.replace(`https://${userName}:${password}@github.com/${userName}/${repo}`,`https://github.com/${userName}/${repo}`);
                       fs.writeFile(`${repo}/.git/config`, result, 'utf8', function (err) {
                            if (err) return console.log(err);
                         });
                     }


                   });
                   badtry=false;
                 },(failed)=> {
                   fs.readFile(`${repo}/.git/config`, 'utf8', function (err,data) {
                    if (err) {
                      return console.log(err);
                    }
                    if (data.includes(`https://${userName}:${password}@github.com/${userName}/${repo}`)) {
                      var result = data.replace(`https://${userName}:${password}@github.com/${userName}/${repo}`,`https://github.com/${userName}/${repo}`);
                      fs.writeFile(`${repo}/.git/config`, result, 'utf8', function (err) {
                           if (err) return console.log(err);
                        });
                    }


                  });
                  badtry=true

                   res.json({
                     "message":"mot de passe incorrect"

                   })
                    console.log('repo push failed');
              });
            }else {
              res.json({
                "message":"already pushed"

              })
            }
         }, (failed) => {
            console.log('failed commmit');
     });

    // Finally push to online repository

 }else {
   res.json({
     "message":"you don't have any project"
   })
 }

}else {
  res.json({
    "message":"please put a commit message"
  })

}
}
export async function delete_Git_Repository(req,res){
  const {gitusername,name,token}= req.body;
  console.log(req.body);
  const clientWithAuth = new octokit({
  auth:token
  })
  clientWithAuth.repos.delete({
    owner: gitusername,
    repo:name
  }).then(data =>{
    console.log("repo successfully deleted");
  }).catch(e =>{
    console.log(e);
  })

}


/*clientWithAuth.repos.delete({
  owner: "moncef08",
  repo:"testing123"
}).then(data =>{
  console.log("repo successfully deleted");
}).catch(e =>{
  console.log(e);
})*/
