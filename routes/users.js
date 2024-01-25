var express = require('express');
var router = express.Router();
let db = require('../database/db');
let userService = require('../services/user');
let redisService = require('../services/user');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  // res.send('respond with a resource');
  const result = await db.query('SELECT NOW()');
  await db.end();
  res.send(result.rows[0].now);
});

router.post('/createUser', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try {
    let checkUserResult = await userService.checkUser(username);
    console.log({ checkUserResult });

    if (checkUserResult.count > 0) {
      res.send({
        code: 200,
        status: 'success',
        message: 'user already exists'
      });
    } else {
      let createUserResult = await userService.createUser(username, password);
      res.send({
        code: 200,
        status: 'success',
        message: 'user created successfully'
      });
    }
  } catch (err) {
    res.send({
      code: 100,
      status: 'failed',
      message: err
    });
  }
});

router.post('/startGame', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let gametype = req.body.gametype;

  try {
    let checkUserResult = await userService.authUser(username, password);
    console.log({ checkUserResult });

    if (checkUserResult!=undefined) {
      let startGameResult = await userService.startGame(checkUserResult.userid, gametype);
      res.send({
        code: 200,
        status: 'success',
        message: 'game data saved successfully'
      });
    } else {
      res.send({
        code: 200,
        status: 'failed',
        message: 'user not found'
      });
    }
  } catch (err) {
    res.send({
      code: 100,
      status: 'failed',
      message: err
    });
  }
});


router.post('/endGame', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let gametype = req.body.gametype;
  let gamelevel = req.body.gamelevel;

  try {
    let checkUserResult = await userService.authUser(username, password);
    console.log({ checkUserResult });

    if (checkUserResult!=undefined) {
      let endGameResult = await userService.endGame(checkUserResult.userid, gametype, gamelevel);
      res.send({
        code: 200,
        status: 'success',
        message: 'game data saved successfully'
      });
    } else {
      res.send({
        code: 200,
        status: 'failed',
        message: 'user not found'
      });
    }
  } catch (err) {
    res.send({
      code: 100,
      status: 'failed',
      message: err
    });
  }
});

module.exports = router;
