const fs = require('fs');
const { request } = require('express');

const filePath = __dirname + "\\gagsData.json";


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
    newData = JSON.stringify(data, null, 2);
    fs.writeFile(filePath, newData, (err) => {
        if (err) throw err;
        console.log('Saved!');
      });
};

const readGag = (id) =>{
    let data = readGags();
    let gag = data.find(gag => parseInt(id) === parseInt(gag.id));
    return gag;
};

const readGags = () => {
    let data;
    try{
        data = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(data);
    }
    catch (error)
    {
        console.log(error);
        
        data = '';
    }
    if (data === '')
    {
        return [];
    }
    data = [].concat(data);
    console.log(data.length);
    return data;
};


exports.addGag = addGag;
exports.readGag = readGag;
exports.readGags = readGags;