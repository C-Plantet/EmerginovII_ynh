
import Project from '../models/Project.js';
import Users from '../models/Users.js';
const { Op } = require("sequelize");
var newRequests=[]
var fs = require('fs');
var rimraf = require("rimraf");

export async function createProject(req, res){
  const { name,priority,description,deliverydate}= req.body;
  try{
    let newProject= await Project.create({
      name,
      priority,
      description,
      deliverydate
    },{
      fields:['name','priority','description','deliverydate']
    });
    if(newProject){
      return res.json({
        message:'Project created successfully',
        data:newProject
      });
    }
  }catch(error){
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
      data:{}
    });
  }



  //console.log(req,body);
}

export async function getProjects(req,res){
 try{
  const projects= await Project.findAll();
  res.json({
    data:projects
  });
 }catch(e){
  console.log(e)
 }
}
export async function getProjectByName(req,res){
  const { name }=req.body;
console.log(name);
  const project= await Project.findOne({
    where:{
      name
    }
  });
  if (project!=null) {
      res.json(project);
  }else {
    return res.json({
      message:' this project does not exist '
    });
  }


}
export async function verifyRequest(req,res){
  var { projectName,myID,profileID }=req.body;
  var id=BigInt(profileID)
  var test=false
  var status=""
  const user= await Users.findOne({
    where:{
      id
    }
  });
  if (user.requests!=null) {
    var i=0;
    console.log(user.requests);
    for (var i = 0; i < user.requests.length; i++) {
      if (user.requests[i].senderID==myID && user.requests[i].projectName==projectName) {
        test=true
        status=user.requests[i].status
      }
    }
    if (test==false) {
      return res.json({
        "verification":"no",
      });
    }else {
      return res.json({
        "verification":"yes",
        "status":status
      });
    }


}else {
  return res.json({
    "verification":"no",
  });
}
}

export async function sendReq(req,res){
  console.log(req.body);
  var { projectName,myID,profileID }=req.body;
  var id=BigInt(profileID)
  console.log(id);
  const user= await Users.findOne({
    where:{
      id
    }
  });
  if (user!=null) {
    console.log(user.requests);

    newRequests=user.requests
    let alreadysent=false
    if (newRequests!=null) {
      for (var i = 0; i < newRequests.length; i++) {

        if (newRequests[i].senderID==myID && projectName==newRequests[i].projectName) {
          console.log("true");
           alreadysent =true
        }
      }
      if (alreadysent==false) {


        newRequests.push(
          {
            "projectName":projectName,
            "senderID":myID,
            "status": "waitForResponse"

          }
        )
        user.update({

            requests: newRequests

        })
      }


    }else {
      console.log("firsttime");
      user.update({

          requests:   [{
              "projectName":projectName,
              "senderID":myID,
              "status": "waitForResponse"

            }]

      })

    }





  }else {

    return res.json({
      message:' this user does not exist '
    });
  }


}

export async function getProjectById(req,res){
  const { id }=req.body;
  console.log(req.body);
  const project= await Project.findOne({
    where:{
      id

  }
  });
  if (project!=null) {
      console.log(project.name);
      res.json(project);
  }else {
    return res.json({
      message:' this project does not exist '
    });
  }


}

export async function getProjectByUserId(req,res){
  const { UserId } = req.params;
  const user= await Users.findOne({
    attributes: ['id', 'name', 'profession', 'projectId'],
    where:{
      id:UserId
    }
  });
  if (user==null) {
    return res.json({
      message:'User does not exist'
    });
  }
  else{
    const projects = await Project.findAll({
      attributes: ['name', 'description'],
      where:{
        id:user.projectId
      }
    });
    if (projects.length>0) {
      return res.json(projects);
    }else {
      return res.json({
        message:' that user is not working on any project '
      });
    }
  }
}
export async function deleteProjectFromAllTables(req,res){
  var { idofProject, idOfUser} = req.body
  console.log(req.body);
  const proj = await Project.findOne({
    where:{
      id:idofProject
    }
  });

  rimraf(`${proj.name}`, function () { console.log("done"); });
  rimraf(`fictiveProjects/${proj.name}`, function () { console.log("done"); });

  const user= await Users.findOne({
    where:{
      id:idOfUser
    }
  });
  if (user.currentproject.name==proj.name) {
    user.update({
      currentproject:null
    })
  }
  const deleteRowCount = await Project.destroy({
    where:{
      id:idofProject
    }
  });
  let projects=user.projectid;
  let newProjectid=[]


  for (var i = 0; i < projects.length; i++) {
   if (idofProject!=projects[i]) {
     newProjectid.push(projects[i])
   }
  }
  if (newProjectid.length==0) {
    newProjectid=null
  }
  console.log(newProjectid);
  user.update({
    projectid:newProjectid
  })
  res.json({
    message:'Project deleted successfully',
  });
}
export async function deleteProject(req,res){
  const { id }=req.params;
  const deleteRowCount = await Project.destroy({
    where:{
      id
    }
  });
  res.json({
    message:'Project deleted successfully',
    count: deleteRowCount
  });

}

export async function updateProject(req,res){
  const { id } = req.params;
  const{ name, priority, description , deliverydate} = req.body;

  const projects = await Project.findAll({
    attributes: ['id', 'name', 'priority', 'description', 'deliverydate'],
    where:{
      id
    }
  });
  if (projects.length>0) {
    projects.forEach(async project => {
      await project.update({
        name,
        priority,
        description,
        deliverydate
      });
    })

  }
  return res.json({
    message:'Project Updated successfully',
    data:projects
  })
}
