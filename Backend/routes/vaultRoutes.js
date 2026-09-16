const express = require("express");

const {
  getVaultItems,
  addVaultItem,
  getVaultPassword,
  deleteVaultItem,
} = require("../controllers/vaultController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getVaultItems);

router.post("/", addVaultItem);

router.get("/:id/password", getVaultPassword);
router.delete("/:id", deleteVaultItem);

module.exports = router;