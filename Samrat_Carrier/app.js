// const express = require('express');
// const app = express();
// const port = 8000;;
// const locationData = require('../Samrat_Carrier/controllers/deviceLocationData');

// app.use('/connect',locationData.getFilterData);

// app.listen(port,(err)=>{
//     if(err) throw err;
//     else console.log(`server is running at port ${port}`);
// });
const express = require('express');
const app = express();
const port = 8000;;
const adminController = require('../Samrat_Carrier/controllers/deviceLocationData');

app.get('/connect/filter-data',adminController.getData);

app.listen(port,(err)=>{
    if(err) throw err;
    else console.log(`server is running at port ${port}`);
});