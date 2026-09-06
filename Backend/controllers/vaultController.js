const mongoose = require("mongoose");

const VaultItem = require("../models/VaultItem");
const { encrypt, decrypt } = require("../utils/encryption");

const ACCESS_WINDOW_MS = 5 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

// ------------------------------------------
// GET ALL VAULT ITEMS
// ------------------------------------------

const getVaultItems = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const items = await VaultItem.find({
      userId,
    }).sort({ createdAt: -1 });

    const now = Date.now();

    const response = items.map((item) => {
      const blockEndsAt = item.blockEndsAt.getTime();

      let status = "blocked";
      let accessEndsAt = item.accessEndsAt;

      // ------------------------------------------
      // BLOCK STILL ACTIVE
      // ------------------------------------------

      if (now < blockEndsAt) {
        status = "blocked";
        accessEndsAt = null;
      }

      // ------------------------------------------
      // BLOCK FINISHED
      //
      // If accessEndsAt is null:
      // User has NOT copied the password yet.
      //
      // Therefore access remains available.
      // ------------------------------------------

      else if (!item.accessEndsAt) {
        status = "access";
        accessEndsAt = null;
      }

      // ------------------------------------------
      // 5-MINUTE ACCESS WINDOW ACTIVE
      // ------------------------------------------

      else if (
        now < item.accessEndsAt.getTime()
      ) {
        status = "access";
        accessEndsAt = item.accessEndsAt;
      }

      // ------------------------------------------
      // 5-MINUTE ACCESS WINDOW FINISHED
      // ------------------------------------------

      else {
        status = "blocked";

        const nextBlockEndsAt = new Date(
          item.accessEndsAt.getTime() +
            item.blockDays * DAY_MS
        );

        // Update local response only.
        // Database is updated when the password
        // endpoint is called or refreshed.
        return {
          id: item._id,
          appName: item.appName,
          blockDays: item.blockDays,
          submittedAt: item.submittedAt,

          status: "blocked",

          blockEndsAt: nextBlockEndsAt,
          accessEndsAt: null,

          hasPassword: true,
        };
      }

      return {
        id: item._id,
        appName: item.appName,
        blockDays: item.blockDays,
        submittedAt: item.submittedAt,

        status,

        blockEndsAt:
          item.blockEndsAt,

        accessEndsAt,

        hasPassword: true,
      };
    });

    res.json({
      success: true,
      items: response,
    });
  } catch (error) {
    console.error(
      "Get vault error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load vault.",
    });
  }
};

// ------------------------------------------
// ADD PASSWORD
// ------------------------------------------

const addVaultItem = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const {
      appName,
      password,
      blockDays,
    } = req.body;

    if (
      !appName ||
      !password ||
      !blockDays
    ) {
      return res.status(400).json({
        success: false,
        message:
          "App name, password and block days are required.",
      });
    }

    const days = Number(blockDays);

    if (
      !Number.isInteger(days) ||
      days <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Block days must be a positive integer.",
      });
    }

    const submittedAt = new Date();

    const blockEndsAt = new Date(
      submittedAt.getTime() +
        days * DAY_MS
    );

    // ------------------------------------------
    // Encrypt password
    // ------------------------------------------

    const encryptedPassword =
      encrypt(password);

    const vaultItem =
      await VaultItem.create({
        userId,

        appName: appName.trim(),

        encryptedPassword:
          JSON.stringify(
            encryptedPassword
          ),

        blockDays: days,

        submittedAt,

        status: "blocked",

        blockEndsAt,

        // IMPORTANT:
        // No access timer has started yet.
        accessEndsAt: null,
      });

    res.status(201).json({
      success: true,

      message:
        "Password added to vault.",

      item: {
        id: vaultItem._id,

        appName:
          vaultItem.appName,

        blockDays:
          vaultItem.blockDays,

        submittedAt:
          vaultItem.submittedAt,

        status:
          vaultItem.status,

        blockEndsAt:
          vaultItem.blockEndsAt,

        accessEndsAt:
          vaultItem.accessEndsAt,
      },
    });
  } catch (error) {
    console.error(
      "Add vault item error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to add password.",
    });
  }
};

// ------------------------------------------
// COPY / ACCESS PASSWORD
// ------------------------------------------

const getVaultPassword = async (
  req,
  res
) => {
  try {
    const userId =
      req.session.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    const { id } = req.params;

    // ------------------------------------------
    // Validate ID
    // ------------------------------------------

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid vault item ID.",
      });
    }

    const item =
      await VaultItem.findOne({
        _id: id,
        userId,
      });

    if (!item) {
      return res.status(404).json({
        success: false,
        message:
          "Vault item not found.",
      });
    }

    const now = Date.now();

    const blockEndsAt =
      item.blockEndsAt.getTime();

    // ------------------------------------------
    // STILL BLOCKED
    // ------------------------------------------

    if (now < blockEndsAt) {
      return res.status(403).json({
        success: false,

        message:
          "Password is currently locked.",

        status: "blocked",

        blockEndsAt:
          item.blockEndsAt,

        accessEndsAt: null,
      });
    }

    // ------------------------------------------
    // ACCESS WINDOW ALREADY ACTIVE
    // ------------------------------------------

    if (
      item.accessEndsAt &&
      now < item.accessEndsAt.getTime()
    ) {
      const encryptedData =
        JSON.parse(
          item.encryptedPassword
        );

      const decryptedPassword =
        decrypt(encryptedData);

      return res.json({
        success: true,

        password:
          decryptedPassword,

        status: "access",

        accessEndsAt:
          item.accessEndsAt,
      });
    }

    // ------------------------------------------
    // BLOCK HAS ENDED
    //
    // AND USER HAS NOT ACCESSED PASSWORD YET
    //
    // START 5-MINUTE WINDOW NOW
    // ------------------------------------------

    if (!item.accessEndsAt) {
      const accessEndsAt =
        new Date(
          now + ACCESS_WINDOW_MS
        );

      item.status = "access";

      item.accessEndsAt =
        accessEndsAt;

      await item.save();

      const encryptedData =
        JSON.parse(
          item.encryptedPassword
        );

      const decryptedPassword =
        decrypt(encryptedData);

      return res.json({
        success: true,

        password:
          decryptedPassword,

        status: "access",

        accessEndsAt,
      });
    }

    // ------------------------------------------
    // ACCESS WINDOW FINISHED
    //
    // START NEW BLOCK
    // ------------------------------------------

    const nextBlockEndsAt =
      new Date(
        item.accessEndsAt.getTime() +
          item.blockDays * DAY_MS
      );

    item.status = "blocked";

    item.blockEndsAt =
      nextBlockEndsAt;

    item.accessEndsAt = null;

    await item.save();

    return res.status(403).json({
      success: false,

      message:
        "Password is currently locked.",

      status: "blocked",

      blockEndsAt:
        nextBlockEndsAt,

      accessEndsAt: null,
    });
  } catch (error) {
    console.error(
      "Get vault password error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to access password.",
    });
  }
};

module.exports = {
  getVaultItems,
  addVaultItem,
  getVaultPassword,
};