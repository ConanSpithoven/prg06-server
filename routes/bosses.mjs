import express, { json } from "express";

const router = express.Router();
import Boss from "../models/bossModel.js";
import * as DataHandler from "./dataHandler.js";

router.use("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept');
    if('GET' === req.method){
      if (req.accepts('json')) {
        res.setHeader('Content-Type', 'application/json');
      } else {
        res.status(400).send('Content-type not supported, Only JSON allowed');
        return;
      }
    } else if('POST' === req.method || 'PUT' === req.method){
      if(req.is('*/json') || req.is('*/x-www-form-urlencoded')){
        res.setHeader('Content-Type', ['application/json', 'application/x-www-form-urlencoded']);
      } else {
        res.status(400).send('Content-type not supported, Only JSON and urlencoded allowed');
        return;
      }
    }

    next();
});

// Get a single boss
router.get("/:id", async (req, res) => {
  let result = await Boss.findById(req.params.id).lean();

  if (!result) res.status(404).send("Not found");
  else res.send(DataHandler.IDDataBuilder(result)).status(200);
});

router.get("/", async (req, res) => {
  let results = await Boss.find({}, "_id name type", {skip: req.query.start-1}).limit(req.query.limit).lean();
  if (!results) {
    res.status(404).send("Not found");
  }
  else {
    let total = await Boss.countDocuments({});
    res.send(DataHandler.ListDataBuilder(results, total, req.query.start, req.query.limit)).status(200);
  }
});

// Add a new boss to the collection
router.post("/", async (req, res) => {
  let checkBody = req.body;
  if (req.body.hasOwnProperty('item')) {
      checkBody = req.body.item;
  }
  if (!DataHandler.PostFieldChecker(checkBody)) {
      res.status(400).send('Request body is invalid, fields missing or empty');
      return;
  }
  let result = await Boss.create(checkBody);
  res.status(201).send(DataHandler.IDDataBuilder(result));
});

// add PUT function to update full record
router.put("/:id", async (req, res) => {
  let target = await Boss.findById(req.params.id);
  if (!target) {
    res.status(404).send("Not found");
  } else {
    let checkBody = req.body;
    if (req.body.hasOwnProperty('item')) {
        checkBody = req.body.item;
    }
    if (!DataHandler.PostFieldChecker(checkBody)) {
      res.status(400).send('Request body is invalid, fields empty');
      return;
    }
    let result = await Boss.findOneAndUpdate({_id : req.params.id}, checkBody);
    result['_id'] = req.params.id;
    res.send(DataHandler.IDDataBuilder(result)).status(200);
  }
});

// Delete a boss
router.delete("/:id", async (req, res) => {
  let target = await Boss.findById(req.params.id);
  if (!target) {
    res.status(404).send("Not found");
  } else {
    let result = await target.deleteOne();
    res.status(204).send(result);
  }
});

router.options("/", async (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Allow', 'GET,POST,OPTIONS');
  res.header('Content-Type', 'application/json');
  res.send(200);
});

router.options("/:id", async (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.header('Allow', 'GET,PUT,DELETE,OPTIONS');
  res.header('Content-Type', ['application/json', 'application/x-www-form-urlencoded']);
  res.send(200);
});

export default router;