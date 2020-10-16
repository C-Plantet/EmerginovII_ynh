
var fs = require('fs');
var archiver = require('archiver');
const zlib = require('zlib');
export async function zip_Code(req,res){
  // create a file to stream archive data to.
  var output = fs.createWriteStream(__dirname + '/zipped/resultat.zip');
  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });
  output.on('end', function() {
    console.log('Data has been drained');
  });
  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });
  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });
  // pipe archive data to the file
  archive.pipe(output);
  // append files from a sub-directory and naming it `new-subdir` within the archive
  archive.directory('projects/project1', 'Project');
  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize();
}




export async function unZip_Code(req,res){
  const fileContents = fs.createReadStream(__dirname+'/zipped/resultat.zip');
  const writeStream = fs.createWriteStream(__dirname+'/unzipped/Projet');
  //  fileContents._readableState.buffer.head='content-encoding'
  // switch (response.headers['content-encoding']) {
  //   // or, just use zlib.createUnzip() to handle both cases
  //   case 'gzip':
  //     response.pipe(zlib.createGunzip()).pipe(output);
  //     break;
  //   case 'deflate':
  //     response.pipe(zlib.createInflate()).pipe(output);
  //     break;
  //   default:
  //     response.pipe(output);
  //     break;
  // }

  const unzip = zlib.createGunzip();
  fileContents.pipe(unzip).pipe(writeStream);
}
