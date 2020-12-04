import { createRequire } from 'module'
const require = createRequire(import.meta.url);

import Users from '../models/Users.mjs';
import Project from '../models/Project.mjs';
var passwordHash = require('password-hash');
var storage = require('node-sessionstorage')
var storage1="";
const  octokit = require('@octokit/rest');

var rimraf = require("rimraf");
var fs = require('fs-extra');
//var path = require("path")
//var Git = require("nodegit");

const simpleGit = require('simple-git')();
// Shelljs package for running shell tasks optional
//const shellJs = require('shelljs');
// Simple Git with Promise for handling success and failure
const simpleGitPromise = require('simple-git/promise')();
storage.setItem('userID', "")

const { Op } = require("sequelize");



export async function createUser(req, res){
  var { name,login,email,gittoken,gitusername,job,location,school,password,mastodon}= req.body;
  let hashedpassword = passwordHash.generate(password);
  var id= Math.floor(Math.random() * Math.floor(1000000000000));
  var projectid=null;
  var company=null;
  var nbfollowers=0;
  var listoffollow=null;
  var picture=null;
  try{
    let newUser= await Users.create({
      id,
      name,
      login,
      email,
      gittoken,
      school,
      projectid,
      location,
      job,
      company,
      gitusername,
      nbfollowers,
      listoffollow,
      picture,
      hashedpassword,
      mastodon
    },{
      fields:['id','name','login','email','gittoken','school','projectid','location','job','company','gitusername','nbfollowers','listoffollow','picture','hashedpassword','mastodon']
    });
    if(newUser){
      setTimeout(function(){
        console.log("user created successfully");
        res.redirect("/login.html")},500)
      }

  }catch(error){
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
      data:{}
    });
  }
}
//console.log(passwordHash.verify('password123', hashedpassword)); // true

export async function getUsers(req,res){
   try{
    const users= await Users.findAll();
    res.json({
      data:users
    });
   }catch(e){
    console.log(e)
   }
  }

   export async function changeCurrent(req,res){
     const { id,newCurrentid,newCurrentname }=req.body;
    // rimraf(`fictiveProjects/${newCurrentname}/`, function () { console.log("done"); });

      const user= await Users.findOne({
        where:{
          id
        }
      });
      if (user!=null) {
        user.update({

            currentproject:{
              id:newCurrentid,
              name:newCurrentname
            }

        })
       var url=`https://github.com/${user.gitusername}/${newCurrentname}.git`




        var localPath =`${newCurrentname}`;
        // var opts = {
        //     fetchOpts: {
        //       callbacks: {
        //         certificateCheck: () => 0
        //     }
        //   }
        // };
        if (!fs.existsSync(user.currentproject.name)) {
          console.log("helloo");
        //fs.mkdirSync(user.currentproject.name);

        simpleGit.clone(url, localPath)



         setTimeout(function(){
           if (!fs.existsSync(`${user.currentproject.name}/src`)){
              fs.mkdirSync(`${user.currentproject.name}/src`);
              var file=fs.open(`${user.currentproject.name}/src/index.php`,'w', (err) => {
                    if (err) throw err;
                  });


          }
        },2000)
        }

        return res.json(user);

    }

    }
    export async function updatePicture(req,res){
    const { id,picture }=req.body;
    const user= await Users.findOne({
      where:{
        id
      }
    });
    if (user!=null) {
      console.log(user);
      user.update({

          picture

      })
      return res.json(user);

    }else {
      console.log("hp");
      return res.json({
        message:'User does not exist '
      });
    }

  }
  export async function verifyCommit(req,res){
      const {id}= req.body;
      var listOfprojectNotCommited=[]
      const user = await Users.findOne({
        where:{
          id
      }
      });

      if (user.projectid!=null) {
        console.log("client :");

        for (var i = 0; i < user.projectid.length; i++) {
          const project = await Project.findOne({
            where:{
              id:user.projectid[i]
            }
          });
          simpleGit.cwd(project.name)
          simpleGitPromise.cwd(project.name)

      //     simpleGitPromise.diffSummary()
      //         .then(
      //           (diff) => {
      //             console.log("get");
      //             console.log("this is commit",diff);
      //             if (diff.changed!="0") {
      //                   console.log(diff.changed)
      //
      //                    listOfprojectNotCommited.push(project.name)
      //
      //
      //              }
      //
      //
      //       });
      //     setTimeout(function(){
      //               console.log(listOfprojectNotCommited);
      //              if (listOfprojectNotCommited.length!=0) {
      //                 res.json({"message":listOfprojectNotCommited})
      //
      //                     }else {
      //                   res.json({"message":"no problem"})
      //
      //                   }
      //
      //   },500)
      // }


          simpleGitPromise.log().then(

            (addSuccess) => {

                   console.log("yes");

                              simpleGitPromise.diffSummary()
                                .then(
                                   (diff) => {
                                     console.log("get");
                                     console.log("this is commit",diff);
                                     if (diff.changed!="0") {
                                       console.log(diff.changed)

                                       listOfprojectNotCommited.push(project.name)
                                       setTimeout(function(){
                                         console.log(listOfprojectNotCommited);
                                         console.log("hello");
                                         if (listOfprojectNotCommited.length!=0) {
                                           res.json({"message":listOfprojectNotCommited})

                                         }else {
                                           res.json({"message":"no problem"})

                                         }

                                       },500)

                                   }


                                   });





                 }, (failedAdd) => {

                   res.json({"message":[]})
                  }
          )

        }


      }else {
        res.json({
          "message":"no projects"
        })
      }

  }
export async function getUsersByProject(req,res){
    const {projectId}= req.params;
    const ProjectUsers = await Users.findAll({
      attributes: ['name', 'projectid'],
      where:{
        projectid:{
         [Op.contains]:projectId


      }
    }
    });
    if (ProjectUsers.length>0) {
      return res.json(ProjectUsers);
    }else {
      res.json({
        message:'that project does not exist'
      });
    }

}
export async function checkFollower(req,res){
  const { id,myid }=req.body;
  let check=false
  const user= await Users.findOne({
    where:{
      id
    }
  });
  if (user.listoffollow!=null) {
    console.log(user.listoffollow[0]);

    let myinfo={"id":myid}
    console.log(myinfo);
    console.log(user.listoffollow[0].json==myid);
    for (var i = 0; i < user.listoffollow.length; i++) {
      if (user.listoffollow[i].id==myid) {
        check=true
        console.log(check);
      }
    }
    if (check==true) {
        res.json({
          "check":true
        })
    }
  }else {
    res.json({
      "check":false

    })
  }


}
export async function unFollow(req,res){
    const { id,myid }=req.body;
    console.log(id);
    const user= await Users.findOne({
      where:{
        id
      }
    })
    var listoffollow=user.listoffollow
    if (listoffollow!=null) {
      if (listoffollow.length==1) {
        user.update({

            nbfollowers: user.nbfollowers-1,
            listoffollow:null

        })
      }else{
        listoffollow.splice( listoffollow.indexOf({"id":myid}), 1 );
        user.update({

            nbfollowers: user.nbfollowers-1,
            listoffollow:listoffollow

        })
      }

    }




    if (user!=null) {
      return res.json(user);

    }else {
      return res.json({
        message:'User does not exist '
      });
    }

  }
export async function newFollower(req,res){
    var { id,myid}=req.body;
    myid=parseInt(myid)
    console.log(req.body);
    console.log(id);
    const user= await Users.findOne({
      where:{
        id
      }
    })
    var listoffollow=user.listoffollow
    if (listoffollow!=null) {
      listoffollow.append({
        "id":myid
      })
      console.log(listoffollow);
      user.update({

          nbfollowers: user.nbfollowers+1,
          listoffollow:listoffollow

      })

    }else {
      user.update({

          nbfollowers: user.nbfollowers+1,
          listoffollow:[{"id":myid}]

      })
    }


    if (user!=null) {
      return res.json(user);

    }else {
      return res.json({
        message:'User does not exist '
      });
    }

  }
  export async function getUserById(req,res){
    const { id }=req.body;
    console.log(id);
    const user= await Users.findOne({
      where:{
        id
      }
    });
    if (user!=null) {
      return res.json(user);

    }else {
      return res.json({
        message:'User does not exist '
      });
    }

  }
  export async function acceptRequest(req,res){
    const { id,senderLogin,name }=req.body;
    console.log(id);
    const sender= await Users.findOne({
      where:{
        login:senderLogin
      }
    });
    const user= await Users.findOne({
      where:{
        id
      }
    });
    if (user.requests!=null) {
      var newRequests=[]
      for (var i = 0; i < user.requests.length; i++) {
        if(user.requests[i].senderID!=sender.id || user.requests[i].projectName!=name){
          newRequests.push(user.requests[i])
        }else {
          newRequests.push({
            "projectName":name,
            "senderID":sender.id,
            "status":"approved"
          })
        }

      }
      user.update({
        requests:newRequests
      })

    }



    var newProjectid=sender.projectid
    console.log(name);

    console.log("les anciens projets sont "+newProjectid);
    const project= await Project.findOne({
      where:{
        name:name
      }
    });
    console.log("yes "+project.name);
    console.log(project.id);
    if (newProjectid!=null) {
      newProjectid.push(project.id)
    }else {
      console.log(newProjectid);
      var newProjectid=[project.id]
    }
    sender.update({
      projectid:newProjectid
    })

  }

export async function getUserByName(req,res){
        const { name }=req.body;
        const user= await Users.findAll({
          where:{
            login : {
              [Op.like]:`%${name}%`
            }
          }
        });
        if (user!=null) {
          return res.json(user);

        }else {
          return res.json({
            message:'User does not exist '
          });
        }

      }
 export async function searchUserByLogin(req,res){
        const {login}= req.body;

        const user= await Users.findOne({
          where:{
            login
          }
        });
        if (user!=null) {
            return res.json(user);

        }else {
          return res.json({
            message:'User does not exist '
          });
        }

      }
export async function getSession(req,res){
  var session=storage.getItem('userID')
  res.json({"session":session})

}
export async function logout(req,res){
  const {id}=req.body
  const user= await Users.findOne({
    where:{
      id
    }
  });
  // user.update({
  //
  //     currentproject:null
  // })
  if (user.projectid!=null) {
    for (var i = 0; i < user.projectid.length; i++) {
      const project= await Project.findOne({
        where:{
          id:user.projectid[i]

        }
      });
      if (fs.existsSync("fictiveProjects/"+project.name)) {
        rimraf("fictiveProjects/"+project.name, function () { console.log("done"); });

      }
      if (fs.existsSync(project.name)) {
        rimraf(project.name, function () { console.log("done"); });

      }

res.json({
  "message":"deleted"
})

    }
  }

}
export async function getUserByLoginAndPassword(req,res){
        const {login,password}= req.body;
        const user= await Users.findOne({
          where:{
            login
          }
        });
        if (user!=null ) {
          if ( passwordHash.verify(password, user.hashedpassword)) {
            storage.setItem('userID', user.id)
            storage1=user.id

            return res.redirect(`http://localhost:3000/`);

          }else {
            return res.redirect(`http://localhost:3000/login.html`);

          }



      }else {
        return res.redirect(`http://localhost:3000/login.html`);

      }
    }

export async function deleteUser(req,res){
    const { id }=req.params;
    const deleteRowCount = await Users.destroy({
      where:{
        id
      }
    });
    res.json({
      message:'User deleted successfully',
      count: deleteRowCount
    });

  }

export async function deleteUserFromProject(req,res){}

export async function updateUser(req,res){
    const { id } = req.params;
    const{ name,login, gittoken, projectid } = req.body;

    const users = await Users.findAll({
      attributes: ['id', 'name','login', 'gittoken', 'projectid'],
      where:{
        id
      }
    });

    if (users.length>0) {
      users.forEach(async user => {
        await user.update({
          name,
          login,
          gittoken,
          projectid
        });
      })

    }
    return res.json({
      message:'User Updated successfully',
      data:users
    })
  }

  export var storage1;
  export default storage1;
