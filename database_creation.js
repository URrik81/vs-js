
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('src/db/vsgame.db', (err) => {
  if (err) {
    return console.error('onCreate: Execution ERROR' + err.message);
  }
  console.log('Connected to the in-memory SQlite database for Create.');
});
/*
Файл, описывающий типы войск.
Построчно:
1 - название
2 - путь до картинки
3 - тип войска (-2 - специальные, 0-пехота, 1-кавалерия, 2-флот, 3-маги, 4-магические войска) тип войска также определяет его скорость.
4 - Раса войска, на какой местности можно нанимать (0-не имеет значения, 1-лес, 2-равнины, 3-пустыни, 4-горы, 5-море, 6-река)
5 - Сила войска в карточках
6 - Преимущество войска (0-отрицательное, 1-нет, 2-положительное)
7 - Стоимость
8 - Содержание
//*/
//Row index = rowid

db.serialize(function() {
//TMP drop tables BEGIN
db.run('DROP TABLE IF EXISTS TerranTypes', function(err) {
  if (err) {
    return console.error('DROP TABLE TerranTypes ERROR: ' + err.message);
  }
  console.log('DROP TABLE TerranTypes');
});
db.run('DROP TABLE IF EXISTS ArmySpecificTypes', function(err) {
  if (err) {
    return console.error('DROP TABLE ArmySpecificTypes ERROR: ' + err.message);
  }
  console.log('DROP TABLE ArmySpecificTypes');
});
db.run('DROP TABLE IF EXISTS ArmyMovementTypes', function(err) {
  if (err) {
    return console.error('DROP TABLE ArmyMovementTypes ERROR: ' + err.message);
  }
  console.log('DROP TABLE ArmyMovementTypes');
});
db.run('DROP TABLE IF EXISTS ArmyTypes', function(err) {
  if (err) {
    return console.error('DROP TABLE ArmyTypes ERROR: ' + err.message);
  }
  console.log('DROP TABLE ArmyTypes');
});
//TMP drop tables END

//CREATE tables BEGIN
//Terrain types table describes all possible terrans and their specifics
db.run('CREATE TABLE TerranTypes (Name TEXT)', function(err) {
  if (err) {
    return console.error('CREATE TABLE TerranTypes ERROR: ' + err.message);
  }
  console.log('CREATE TABLE TerranTypes');
});


db.run('CREATE TABLE ArmySpecificTypes (Name TEXT)', function(err) {
  if (err) {
    return console.error('CREATE TABLE ArmySpecificTypes ERROR: ' + err.message);
  }
  console.log('CREATE TABLE ArmySpecificTypes');
});

db.run('CREATE TABLE ArmyMovementTypes (Name TEXT)', function(err) {
  if (err) {
    return console.error('CREATE TABLE ArmyMovementTypes ERROR: ' + err.message);
  }
  console.log('CREATE TABLE ArmyMovementTypes');
});


db.run('CREATE TABLE ArmyTypes ('
    + 'Name TEXT,'
    + 'IconPath TEXT,'
    + 'ArmySpecificType TEXT,'
    + 'ArmyMovementType TEXT,'
    + 'TerranType TEXT,'
    + 'Size INT,'
    + 'Superiority INT,'
    + 'Cost INT,'
    + 'Maintenance INT'
    + ')', function(err) {
  if (err) {
    return console.error('CREATE TABLE ArmyTypes ERROR: ' + err.message);
  }
  console.log('CREATE TABLE ArmyTypes');
});
//CREATE tables END

//INSERT VALUES BEGIN
let terrans = ['Forest', 'Plain', 'Desert', 'Mountain', 'Swamp', 'Tundra', 'Sea', 'Ice Sea', 'Deep Sea', 'Reefs', 'Terra Incognita'];
let placeholders = terrans.map((terrans) => '(?)').join(',');
let sql = 'INSERT INTO TerranTypes (Name) VALUES ' + placeholders;
console.log(sql);

db.run(sql, terrans, function(err) {
  if (err) {
    return console.error('INSERT INTO TerranTypes ERROR:' + err.message);
  }
  console.log(`INSERT INTO TerranTypes : Rows inserted ${this.changes}`);
});

let armyMoveType = ['land', 'navy', 'flying', 'magic'];
placeholders = armyMoveType.map((armyMoveType) => '(?)').join(',');
sql = 'INSERT INTO ArmyMovementTypes (Name) VALUES ' + placeholders;
console.log(sql);

db.run(sql, armyMoveType, function(err) {
  if (err) {
    return console.error('INSERT INTO ArmyMovementTypes ERROR:' + err.message);
  }
  console.log(`INSERT INTO ArmyMovementTypes : Rows inserted ${this.changes}`);
});
//INSERT VALUES END

}); //serialize END

db.close((err) => {
  if (err) {
    return console.error('Insert: Closing ERROR' + err.message);
  }
  console.log('Close the database connection.');
});