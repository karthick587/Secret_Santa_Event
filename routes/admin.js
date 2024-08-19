const express = require("express");
const app = express();
const router = express.Router();
const upload = require("../middleware/multer");
const { AssignSecretSanta } = require("../controller/adminController");
app.use(router);
router.use(express.json());
router.post('/assign-secret-santa', upload.fields([{name:"employeeList"},{name:"pastAssignments"}]), AssignSecretSanta);
module.exports = router;