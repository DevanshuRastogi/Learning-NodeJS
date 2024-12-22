const fs = require("fs");

const server = require("http").createServer();

server.on("request", (req, res) => {
  // normal way without streams

  // fs.readFile('test-file.txt', (err,data)=>{
  //     if(err) console.log(err);

  //     res.end(data);
  // })

  //===================================//

  // using streams for reading file
  // using readable stream

//   const readable = fs.createReadStream("test-file.txt");
//   readable.on("data", (chunk) => {
//     res.write(chunk);
//   });

//   readable.on('end' , ()=>{
//     res.end("bss itna hi tha bhaii");
//   })
//   readable.on('error' , err=>{
//    console.log(err);
//    res.statusCode= 500;
   
//     res.end("File nhi Hai bhaiyaa");
//   })



// =====================================================//
// upper solution has problem of backPressure  , jisme data utni jaldiresponse nhi de pata , jitni jldi usko request mila tha , so we need to solve this 

  
const readable = fs.createReadStream("test-file.txt");
readable.pipe(res);

  

});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server running");
});
