const collectionService = require("../services/collection.service");

async function getCollection(req, res, next) {
  try {
    res.json(await collectionService.getUserCollection(req.userId));
  } catch (error) {
    next(error);
  }
}

async function getProgress(req, res, next) {
  try {
    res.json(await collectionService.getUserProgress(req.userId));
  } catch (error) {
    next(error);
  }
}

async function getAchievements(req, res, next) {
  try {
    res.json(await collectionService.getUserAchievements(req.userId));
  } catch (error) {
    next(error);
  }
}

module.exports = { getCollection, getProgress, getAchievements };
