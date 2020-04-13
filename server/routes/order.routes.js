const { Router } = require("express");
const router = Router();
const controller = require("../controllers/order.controller");

/* Default route /api/order */

/* Create's route - /api/order/create */
router.post("/create", controller.create);

/* Get's route - /api/order/:id */
router.get("/:id", controller.get);

/* Update order's status route - /api/order/complete/:id */
router.put("/update/:id", controller.update);

/* Get order by id route - api/order/getById/:id*/
router.get("/getById/:id", controller.getOrderById);

module.exports = router;
