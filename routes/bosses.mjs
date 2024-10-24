import express from "express";

const router = express.Router();
import Boss from "../models/bossModel.js";

router.use("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if('GET' === req.method){
      if (req.accepts('json')) {
        res.setHeader('Content-Type', 'application/json');
      } else {
        res.status(406).send('Content-type not supported, Only JSON allowed');
        return;
      }
    }else if('POST' === req.method || 'PUT' === req.method){
      if(req.is('*/json') || req.is('*/x-www-form-urlencoded')){
      res.setHeader('Content-Type', ['application/json', 'application/x-www-form-urlencoded']);
      } else {
        res.status(406).send('Content-type not supported, Only JSON and urlencoded allowed');
        return;
      }
    }

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(204);
    } else {
    //move on
      next();
    }
});

// Get a single boss
router.get("/:id", async (req, res) => {
  let result = await Boss.findById(req.params.id);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.get("/", async (req, res) => {
  let results;
  if(req.query.id !== undefined){
    results = await Boss.findById(req.query.id);
  } else {
    results = await Boss.find({}, "_id name type", {skip: req.query.start}).limit(req.query.limit);
  }
  if (!results) res.send("Not found").status(404);
  else res.send(results).status(200);
});

// Add a new boss to the collection
router.post("/", async (req, res) => {
  let result = await Boss.create(req.body);
  res.send(result).status(204);
});

//add PUT function to update full record
router.put("/:id", async (req, res) => {
  let target = await Boss.findById(req.params.id);
  if (!target) {
    res.send("Not found").status(404);
  } else {
    let result = await Boss.replaceOne({_id : req.params.id}, req.body);
    res.send(result).status(200);
  }
});

// Delete a boss
router.delete("/:id", async (req, res) => {
  let target = await Boss.findById(req.params.id);
  if (!target) {
    res.send("Not found").status(404);
  } else {
    let result = await target.deleteOne();
    res.send(result).status(200);
  }
});

export default router;