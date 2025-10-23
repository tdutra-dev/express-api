import express from "express";
import {
  listUsers,
  getSingleUser,
  createUser,
  editUser,
  removeUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", getSingleUser);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", removeUser);

export default router;