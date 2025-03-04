import { Router } from "express";
import { adminController } from "../controllers/AdminController";
import { authenticateJWT } from "../middleware/authenticateJWT";

const router = Router();

router.get("/users",authenticateJWT, adminController.getAllUsers);
router.put("/users/:id",authenticateJWT, adminController.updateUser);
router.post("/users/", authenticateJWT,adminController.addUser);
router.delete("/users/:id", authenticateJWT,adminController.deleteUser);

export default router;
