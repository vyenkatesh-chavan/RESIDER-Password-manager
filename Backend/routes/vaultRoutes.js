const express = require("express");

const {
  getVaultItems,
  addVaultItem,
  getVaultPassword,
} = require("../controllers/vaultController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getVaultItems);

router.post("/", addVaultItem);

router.get("/:id/password", getVaultPassword);

module.exports = router;