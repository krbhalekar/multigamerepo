let db = require('../database/db');

let createUser = async (username, password) => {
    let query = 'INSERT INTO tbl_user_master(username,password,status,createdt) values($1,$2,$3,NOW())';
    let values = [username, password, 1];
    const result = await db.query(query, values);
    // await db.end();
    console.log(result.rows[0]);
    return result.rows[0];
};

let checkUser = async (username) => {
    let query = 'SELECT COUNT(1) FROM tbl_user_master WHERE username=$1';
    let values = [username];
    const result = await db.query(query, values);
    // await db.end();
    console.log(result.rows[0]);
    return result.rows[0];
};

let fetchUser = async () => {
    let query = 'SELECT userid,username FROM tbl_user_master';
    let values = [];
    const result = await db.query(query, values);
    // await db.end();
    console.log(result.rows[0]);
    return result.rows;
};

let authUser = async (username, password) => {
    let query = 'SELECT userid FROM tbl_user_master WHERE username=$1 AND password = $2';
    let values = [username, password];
    const result = await db.query(query, values);
    // await db.end();
    console.log(result.rows[0]);
    return result.rows[0];
};

let startGame = async (userid, gametype) => {
    let query = 'INSERT INTO user_game_master (userid, gamedt, gamestartdt, gamesession, gametype) VALUES($1,NOW(),NOW(),$2,$3)';
    let values = [userid, 1, gametype];
    const result = await db.query(query, values);
    // await db.end();
    console.log(result.rows[0]);
    return result.rows[0];
};


let endGame = async (userid, gametype, gamelevel) => {
    let query = 'UPDATE user_game_master SET gameenddt=NOW(), gametype=$1, gamelevel=$2 WHERE userid = $3';
    let values = [gametype, gamelevel, userid];
    const result = await db.query(query, values);
    // await db.end();
    console.log(result.rows[0]);
    return result.rows[0];
};

let fetchHistory = async () => {
    let query = 'SELECT b.username, c.name,a.gamelevel,a.gamestartdt,a.gameenddt,a.gamestatus FROM user_game_master AS a LEFT JOIN tbl_user_master AS b ON a.userid = b.userid LEFT JOIN prize_pool_master AS c ON a.gametype = c.gametype';
    let values = [];
    const result = await db.query(query, values);
    // await db.end();
    console.log(result.rows[0]);
    return result.rows;
};

let fetchLeaderboard = async () => {
    let query = 'SELECT b.username,SUM(a.score) AS score FROM user_game_master AS a' +
        ' LEFT JOIN tbl_user_master AS b ON a.userid = b.userid' +
        ' GROUP BY b.username ORDER BY SUM(a.score) DESC LIMIT 10';
    let values = [];
    const result = await db.query(query, values);
    // await db.end();
    console.log(result.rows[0]);
    return result.rows;
};

let fetchPrizePool = async (gametype) => {
    let query = 'SELECT prizeamt FROM prize_pool_master WHERE gametype = $1';
    let values = [gametype];
    const result = await db.query(query, values);
    // await db.end();
    console.log(result.rows[0]);
    return result.rows;
};

module.exports = {
    createUser,
    checkUser,
    fetchUser,
    authUser,
    startGame,
    endGame,
    fetchHistory,
    fetchLeaderboard,
    fetchPrizePool
};