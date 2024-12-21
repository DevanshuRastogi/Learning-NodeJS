// const fs = require("fs");

// //blocking + synchronous way

// // const fileCont = fs.readFileSync('starter/txt/input.txt','utf-8');
// // console.log(fileCont);

// // const txtOut =  `This is we know about avocado : ${fileCont} . \n Created on ${Date.now()} `;
// // fs.writeFileSync('starter/txt/myOutput.txt',txtOut, );
// // console.log("File Written successfully")

// // Asynchrounous way + non-blocking

// fs.readFile("starter/txt/start.txt", "utf-8", (error, data1) => {
//   fs.readFile(`starter/txt/${data1}.txt`, "utf-8", (error, data2) => {
//     console.log(data2);

//     fs.readFile(`starter/txt/append.txt`, "utf-8", (error, data3) => {
//       console.log(`data3 \n`);

//       fs.writeFile(
//         `starter/txt/final.txt`,
//         `${data2}\n${data3}`,
//         `utf-8`,
//         (error) => {
//           console.log("data written successfully");
//         }
//       );
//     });
//   });
// });

// console.log("start reading...........");

// // ===============SERVER CREATION USING HTTP==============

// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req,res)=>{
//     console.log(req)
// res.end(`Hello from server localhost`)
// });
// const port=8000;
// const ip = '127.0.0.1';
// server.listen(port ,ip ,()=>{
//     console.log(`Server is running on ${ip}:${port}`)
// })

//

// simple api creation
// const fs = require("fs");
// const url = require("url");
// const http = require("http");

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
// const objData = JSON.parse(data);
// const server = http.createServer((req, res) => {
//   const pathname = req.url;

//   if (pathname === "/" || pathname === "/home") {
//     res.end(`<h1>Welcome To HomePage </h1>`);
//   } else if (pathname === "/Product") {
//     res.end(`<h1>Welcome To Product Page </h1>`);
//   } else if (pathname === "/api") {
//     res.writeHead(400, {
//       "content-Type": "application/json",
//     });
//     res.end(data);
//   }
// });
// const port = 8000;
// const ip = "127.0.0.1";

// server.listen(port, ip, () => {
//   console.log(`server is running on ${ip}:${port}`);
// });

// --------- Implementing Products Page------------



const fs = require("fs");
const url = require("url");
const http = require("http");

const replaceProd = require('./modules/replaceProd')
const productOverview = fs.readFileSync(
  `${__dirname}/templates/product-overview.html` , 'utf-8'
);
const productCard = fs.readFileSync(`${__dirname}/templates/product-card.html` , 'utf-8');
const productSingle = fs.readFileSync(`${__dirname}/templates/product.html` , 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json` , 'utf-8');
const objData = JSON.parse(data);


  
  const server = http.createServer((req, res) => {
    console.log(req.url);
    const {query, pathname } = (url.parse(req.url , true));
  // const pathname = req.url;


  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(400, {
      "content-Type": "text/html",
    });

    const prodList = objData.map((item) => replaceProd(productCard, item)).join();

    const op = productOverview.replace(/{ProductCardDynamic}/g, prodList)
    res.end(op);
}


else if (pathname === "/product") {
   const prod = objData[query.id];
   const otp = replaceProd(productSingle,prod);
    res.end(otp);
  } 
  
  
  else if (pathname === "/api") {
    res.writeHead(200, {
      "content-Type": "application/json",
    });
    res.end(data);
  }

  else{
    res.writeHead(404, {
        "content-Type": "text/html",
      });
      res.end(`<h1> Page Not Found ${pathname} </h1> `);
  }
});
const port = 8000;
const ip = "127.0.0.1";

server.listen(port, ip, () => {
  console.log(`server is running on ${ip}:${port}`);
});
