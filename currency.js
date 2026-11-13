const fs = require('fs');
let db = {};
try { db = JSON.parse(fs.readFileSync('./currency.json','utf8')); } catch(e){ db = {}; }

function getCoins(id){ return db[id]?.coins || 0; }
function addCoins(id, amt){
  if(!db[id]) db[id] = { coins: 0 };
  db[id].coins += amt;
  fs.writeFileSync('./currency.json', JSON.stringify(db, null, 2));
  return db[id].coins;
}
function getLeaderboard(){
  return Object.entries(db).sort((a,b)=>b[1].coins - a[1].coins).slice(0,10);
}
module.exports = { getCoins, addCoins, getLeaderboard };
