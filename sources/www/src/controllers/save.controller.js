  var fs = require('fs');

export async function fictive_Save(req, res){
  const {code,path}= req.body;

  console.log(code);
  console.log(path);

  try{
    fs.writeFile("fictiveProjects/"+path, code, function(err) {
    if(err) {
     return console.log(err);
    }
    console.log("The file was saved fictively!");
    });

    res.json({
      "code":code
    });

    }catch(e){

      console.log(e)

     }

  }
export async function get_And_Save_Code(req, res){
  const {code,path}= req.body;

  //console.log(code);
  console.log(path);

  try{
    fs.writeFile(path, code, function(err) {
    if(err) {
     return console.log(err);
    }
    console.log("The file was saved !");
    });

    res.json({
      "code":code
    });

    }catch(e){

      console.log(e)

     }

  }


  export async function show_Code(req, res){

    const {new_path}= req.body;
    var did_Something_Changed=true
    try{
      console.log(new_path);
       var contents = fs.readFileSync(new_path, 'utf8');
       var virtual_contents = fs.readFileSync("fictiveProjects/"+new_path, 'utf8');
       // console.log("voila");
       //
       // console.log(virtual_contents);
       // console.log(contents);
       // console.log(virtual_contents==contents);
      if (contents.localeCompare(virtual_contents)==0) {
        console.log("nothing");
        did_Something_Changed=false
      }
      // console.log("verification done");
      console.log(did_Something_Changed);
      res.json({
        "variation": did_Something_Changed,
        "code":virtual_contents
      });
      }catch(e){
        console.log(e)
       }
    }
