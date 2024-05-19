import express from "express";
import {
  getShelter,
  getShelters,
  addShelter,
  updateShelter,
  deleteShelter
} from "./controller";
// import auth from "../../middleware/auth";
import controllerError from "../../middleware/controllerError";
const router = express.Router();

router.get("/simple", function (req, res) {
  getShelters('', 0, true)
    .then((list) => {
      switch (list.status) {
        case 200:
          res.status(200).send(list.message);
          break;
        default:
          res.status(list.status).send(list.message);
          break;
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Unexpected Error");
    });
});

router.get("/list/:page?/:pattern?", function (req, res) {
  getShelters(req.params.pattern!, parseInt(req.params.page!), false)
    .then((list) => {
      switch (list.status) {
        case 200:
          res.status(200).send(list.message);
          break;
        default:
          res.status(list.status).send(list.message);
          break;
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Unexpected Error");
    });
});

router.get("/:id", function (req, res) {
  getShelter(req.params.id)
    .then((data) => {
      switch (data.status) {
        case 200:
          res.status(200).send(data.message);
          break;
        default:
          res.status(data.status).send(data.message);
          break;
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Unexpected Error");
    });
});

router.post("/", function (req, res) {
  addShelter(req.body)
    .then((data) => {
      switch (data.status) {
        case 201:
          res.status(201).send(data.message);
          break;
        case 420:
          res.status(400).send(data.message);
          break;
        default:
          controllerError(data.detail, req, res);
          break;
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Unexpected Error");
    });
});

router.patch("/", function (req, res) {
  updateShelter(req.body)
    .then((data) => {
      switch (data.status) {
        case 200:
          res.status(200).send(data.message);
          break;
        case 400:
          res.status(data.status).send(data.message);
          break;
        default:
          controllerError(data.detail, req, res);
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Unexpected Error");
    });
});

router.delete("/:id", function (req, res) {
  deleteShelter(req.params.id)
    .then((resp) => {
      switch (resp.status) {
        case 200:
          res.status(200).send(`Shelter ${req.params.id} deleted`);
          break;
        case 400:
          res.status(resp.status).send(resp.message);
          break;
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Unexpected Error");
    });
});

export default router;
