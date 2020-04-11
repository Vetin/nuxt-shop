const { Router } = require("express");
const router = Router();
const controller = require("../controllers/product.controller");

/* Main route /api/product */

/* Route /api/pro duct/getAll */
router.get("/getAll", controller.getAll);

/* Route /api/product/:id */
router.get("/:id", controller.getProductById);

/* Route /api/product/add */
router.post("/add", controller.add);

/* Route /api/product/:id */
router.put("/:id", controller.update);

/* Route /api/product/:id */
router.delete("/:id", controller.remove);

module.exports = router;
