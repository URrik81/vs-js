const databaseSelect = require('../database_select')
const terranRoutes = (app, fs) => {

  // READ data from BD
  app.get('/terrans', (req, res) => {
    databaseSelect.getDataFromTable('TerranTypes', '*', function (err, results){
        console.log('Got rows from DB: ' + results);
        res.send(results);
    });
  });
};

module.exports = terranRoutes;