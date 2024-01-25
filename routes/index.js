var express = require('express');
var router = express.Router();
let userService = require('../services/user');
const e = require('express');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Dream11 Leaderboard' });
// });

router.get('/', async (req, res) => {
  try {
    let fetchUserResult = null;
    fetchUserResult = await userService.fetchUser();
    res.render('index', { title: 'Dream11 Users', data: fetchUserResult != null ? fetchUserResult : [] });
  } catch (error) {
    res.render('index', { title: 'Dream11 Users', data: [] });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    let fetchLeaderboardResult = null;
    fetchLeaderboardResult = await userService.fetchLeaderboard();
    let fetchPrizePoolResult = null;
    fetchPrizePoolResult = await userService.fetchPrizePool(1);
    console.log({ fetchPrizePoolResult });

    for (let i = 0; i < fetchLeaderboardResult.length; i++) {
      if (i == 0) {
        fetchLeaderboardResult[i].winning = fetchPrizePoolResult[0].prizeamt * 30 / 100;
      }
      else if (i == 1) {
        fetchLeaderboardResult[i].winning = fetchPrizePoolResult[0].prizeamt * 20 / 100;
      } else if (i == 2) {
        fetchLeaderboardResult[i].winning = fetchPrizePoolResult[0].prizeamt * 15 / 100;
      } else {
        fetchLeaderboardResult[i].winning = fetchPrizePoolResult[0].prizeamt * 10 / 100;
      }
    }

    res.render('leaderboard', { title: 'Dream11 Leaderboard', data: fetchLeaderboardResult != null ? fetchLeaderboardResult : [] });
  } catch (error) {
    res.render('leaderboard', { title: 'Dream11 Leaderboard', data: [] });
  }
});

router.get('/gamehistory', async (req, res) => {
  try {
    let fetchHistoryResult = null;
    fetchHistoryResult = await userService.fetchHistory();

    res.render('gamehistory', { title: 'Dream11 Game History', data: fetchHistoryResult != null ? fetchHistoryResult : [] });
  } catch (error) {
    res.render('gamehistory', { title: 'Dream11 Game History', data: [] });
  }
});

module.exports = router;
