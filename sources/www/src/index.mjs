import app from './app.mjs';
async function main(){
  await app.listen(8000);
  console.log('Server on port 8000')
};
main();
