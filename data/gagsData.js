const fs = require('fs');
const { request } = require('express');

const filePath = __dirname + "\\gagsData.json";
'use strict';

const fileExist = () =>{
    try {
        if (!fs.existsSync(filePath)) {
          fs.writeFile(filePath, '', () => {
              console.log("File created");
              
          })
        }
        else{
            console.log("File exists");
            
        }
      } catch(err) {
        console.error(err)
      }
}

fileExist();

const addGag = (gag) =>{
    let data = readGags();
    data.push(gag);
    //let data = JSON.stringify(gag, null, 2);
    //oldData.push(data);
    newData = JSON.stringify(data, null, 2);
    fs.writeFile(filePath, newData, (err) => {
        if (err) throw err;
        console.log('Saved!');
      });
    //   fs.appendFile(filePath, '\n', (err) => {
    //     if (err) throw err;
    //   });
};

const readGag = (id) =>{
    let data = readGags();
    return data.find(gag => parseInt(id) === parseInt(gag.id));
};

const readGags = () => {
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //     if (err) throw err;
    //     return data;
    // }
    // )
    let data;
    try{
        //data = fs.readFileSync(filePath, 'utf8');
        data = require(filePath);
    }
    catch (error)
    {
        console.log(error);
        
        data = '';
    }
    data = [].concat(data);
    console.log(data.length);
    return data;
};


exports.addGag = addGag;
exports.readGag = readGag;
exports.readGags = readGags;