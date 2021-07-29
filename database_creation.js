
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('src/db/vsgame.db', (err) => {
  if (err) {
    return console.error('onCreate: Execution ERROR' + err.message);
  }
  console.log('Connected to the in-memory SQlite database for Create.');
});

//Row index = rowid

db.serialize(function() {
//TMP drop tables BEGIN
db.run('DROP TABLE IF EXISTS TerranTypes', function(err) {
  if (err) {
    return console.error('DROP TABLE TerranTypes ERROR: ' + err.message);
  }
  console.log('DROP TABLE TerranTypes');
});
db.run('DROP TABLE IF EXISTS RaceTypes', function(err) {
  if (err) {
    return console.error('DROP TABLE RaceTypes ERROR: ' + err.message);
  }
  console.log('DROP TABLE RaceTypes');
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
db.run('CREATE TABLE TerranTypes (Name TEXT, Color INT)', function(err) {
  if (err) {
    return console.error('CREATE TABLE TerranTypes ERROR: ' + err.message);
  }
  console.log('CREATE TABLE TerranTypes');
});

//Races of the world
db.run('CREATE TABLE RaceTypes (Name TEXT)', function(err) {
  if (err) {
    return console.error('CREATE TABLE RaceTypes ERROR: ' + err.message);
  }
  console.log('CREATE TABLE RaceTypes');
});

//How army should move
db.run('CREATE TABLE ArmyMovementTypes (Name TEXT)', function(err) {
  if (err) {
    return console.error('CREATE TABLE ArmyMovementTypes ERROR: ' + err.message);
  }
  console.log('CREATE TABLE ArmyMovementTypes');
});


db.run('CREATE TABLE ArmyTypes ('
    + 'Name TEXT,'
    + 'IconPath TEXT,'
    + 'ArmyMovementType TEXT,'
    + 'RaceType TEXT,'
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
let terrans = [
           ['Forest', 0x008000],
           ['Plain', 0xA0FF00],
           ['Desert', 0xFFFF00],
           ['Mountain', 0x800000],
           ['Swamp', 0x80A000],
           ['Tundra', 0xA0FFFF],
           ['Sea', 0x00A0FF],
           ['Ice Sea', 0x60FFFF],
           ['Deep Sea', 0x0000A0],
           ['Reefs', 0x808080],
           ['Terra Incognita', 0x000000]
           ];

for (i=0; i<terrans.length; i++) {
  terranItem = terrans[i];
  placeholders = '(' + terranItem.map((terranItem) => '?').join(',') + ')';
  sql = 'INSERT INTO TerranTypes (Name, Color) VALUES ' + placeholders;
  console.log(sql);

  db.run(sql, terranItem, function(err) {
    if (err) {
      return console.error('INSERT INTO TerranTypes ERROR:' + err.message);
    }
    console.log(`INSERT INTO TerranTypes : Rows inserted ${this.changes}`);
  });
}

let armyMoveType = ['land', 'cavalry', 'navy', 'flying'];
placeholders = armyMoveType.map((armyMoveType) => '(?)').join(',');
sql = 'INSERT INTO ArmyMovementTypes (Name) VALUES ' + placeholders;
console.log(sql);

db.run(sql, armyMoveType, function(err) {
  if (err) {
    return console.error('INSERT INTO ArmyMovementTypes ERROR:' + err.message);
  }
  console.log(`INSERT INTO ArmyMovementTypes : Rows inserted ${this.changes}`);
});

let raceType = ['No matter', 'Ilv', 'Varvar', 'Evogr', 'Hrottar'];
placeholders = raceType.map((raceType) => '(?)').join(',');
sql = 'INSERT INTO RaceTypes (Name) VALUES ' + placeholders;
console.log(sql);

db.run(sql, raceType, function(err) {
  if (err) {
    return console.error('INSERT INTO RaceTypes ERROR:' + err.message);
  }
  console.log(`INSERT INTO RaceTypes : Rows inserted ${this.changes}`);
});


/*
По рядам:
1 - название
2 - путь до картинки
3 - тип войска (0-пехота, 1-кавалерия, 2-флот, 3-летающие, 4-магические войска) тип войска также определяет его скорость.
4 - Раса войска, на какой местности можно нанимать (0-не имеет значения, 1-лес, 2-равнины, 3-пустыни, 4-горы, 5-море, 6-река), также добавляет бонусы/штрафы для ходимости.
5 - Сила войска в карточках
6 - Преимущество войска (0-отрицательное, 1-нет, 2-положительное)
7 - Стоимость
8 - Содержание
    + 'Name TEXT,'
    + 'IconPath TEXT,'
    + 'ArmyMovementType TEXT,'
    + 'RaceType TEXT,'
    + 'Size INT,'
    + 'Superiority INT,'
    + 'Cost INT,'
    + 'Maintenance INT'
//*/
let armyType = [
    ['LordGuard', 'img/a_knight.bmp', 'cavalry', 'No matter', 2, 2, 25, 5],
    ['Knight', 'img/a_knight.bmp', 'cavalry', 'No matter', 2, 2, 40, 8]
    ];

for (i=0; i<armyType.length; i++) {
  armyTypeItem = armyType[i];
  placeholders = '(' + armyTypeItem.map((armyTypeItem) => '?').join(',') + ')';
  sql = 'INSERT INTO ArmyTypes (Name, IconPath, ArmyMovementType, RaceType, Size, Superiority, Cost, Maintenance) VALUES ' + placeholders;
  console.log(sql);
  db.run(sql, armyTypeItem, function(err) {
    if (err) {
      return console.error('INSERT INTO ArmyTypes ERROR:' + err.message);
    }
    console.log(`INSERT INTO ArmyMovementTypes : Rows inserted ${this.changes}`);
  });
}
//INSERT VALUES END

}); //serialize END

db.close((err) => {
  if (err) {
    return console.error('Insert: Closing ERROR' + err.message);
  }
  console.log('Close the database connection.');
});