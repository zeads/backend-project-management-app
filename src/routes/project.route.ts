import express from "express";
import {
  destroy,
  // index,
  show,
  showSearch,
  store,
  update,
} from "../controllers/project.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/role.middleware";

const router = express.Router();

router.post("/", verifyToken, isAdmin, store);
// router.get("/", verifyToken, index);
router.get("/", verifyToken, showSearch);
router.get("/:id", verifyToken, show);
router.put("/:id", verifyToken, isAdmin, update);
router.delete("/:id", verifyToken, isAdmin, destroy);

export default router;
