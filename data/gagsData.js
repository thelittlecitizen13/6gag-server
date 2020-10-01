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
    let newData = JSON.stringify(data, null, 2);
    fs.writeFile(filePath, newData, (err) => {
        if (err) throw err;
        console.log('Saved!');
      });
};

const readGag = (id) =>{
    let data = readGags();
    let gag = data.find(g => id === g.id);
    console.log(gag.id);
    
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

const rateGag = (id, rate) =>{
    let gag = readGag(id);
    if(!gag)
    {
        return false;
    }
    let liked = parseInt(gag.liked);
    let disliked = parseInt(gag.disliked);
    console.log(rate.action);
    
    switch(rate.action)
    {
        case 'like':
            liked++;
            break;
        case 'unlike':
            liked--;
            break;
        case 'dislike':
            disliked++;
            break;
        case 'undislike':
            disliked--;
            break;
        default:
            return false;;
    }
    gag.liked = liked;
    gag.disliked = disliked;
    updateGag(id, gag);
    return true;

}

const updateGag = (id, gag) =>{
    let data = readGags();
    let oldGag = data.find(g => id === g.id);
    let index = data.indexOf(oldGag);
    if(index > -1)
    {
        data[index] = gag;
        let newData = JSON.stringify(data, null, 2);
        fs.writeFile(filePath, newData, (err) => {
        if (err) throw err;
        console.log('updated!');
      });
    }
    else
    {
        addGag(gag);
    }

}

exports.addGag = addGag;
exports.readGag = readGag;
exports.readGags = readGags;
exports.rateGag = rateGag;
exports.updateGag = updateGag;