import express from 'express';
import {
   addNewAdoptionForm,
   deleteAdoptionForm,
   getAllAdoptionsForm,
   updateAdoptionForm
} from './controller';
import controllerError from '../../middleware/controllerError';
const router = express.Router();

router.get('/', function (req, res) {
   getAllAdoptionsForm()
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
               break;
         };
      })
      .catch((e) => {
         console.log(e);
         res.status(500).send("Unexpected Error");
      });
});

router.post('/', function (req, res) {
   addNewAdoptionForm(req.body)
      .then((data) => {
         switch (data.status) {
            case 201:
               res.status(201).send(data.message);
               break;
            case 400:
               res.status(data.status).send(data.message);
               break;
            default:
               res.status(data.status).send(data.message);
               break;
         };
      })
      .catch((e) => {
         console.log(e);
         res.status(500).send("Unexpected Error");
      });
});

router.patch('/', function (req, res) {
   updateAdoptionForm(req.body)
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
               break;
         };
      })
      .catch((e) => {
         console.log(e);
         res.status(500).send("Unexpected Error");
      });
});

router.delete("/:id", function (req, res) {
   deleteAdoptionForm(req.params.id)
      .then((data) => {
         switch (data.status) {
            case 200:
               res.status(200).send(`Shelter ${req.params.id} deleted`);
               break;
            case 400:
               res.status(data.status).send(data.message);
               break;
            default:
               controllerError(data.detail, req, res);
               break;
         };
      })
      .catch((e) => {
         console.log(e);
         res.status(500).send("Unexpected Error");
      });
});


export default router;