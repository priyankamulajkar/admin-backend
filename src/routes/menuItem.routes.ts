import express from 'express';
import MenuItemController  from '../controllers/MenuItemController';
import validateMiddleware from '../middleware/validateMiddleware';
import menuItemValidatorSchema from '../validators/menuItemValidators';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware';

const router = express.Router();

const menuItemController = new MenuItemController();

router.post('/create', authMiddleware, roleMiddleware("RES_OWNER"), validateMiddleware.validate(menuItemValidatorSchema) , menuItemController.createMenuItem);
router.post('/create/bulk', authMiddleware, roleMiddleware("RES_OWNER"), menuItemController.createBulkMenuItem)
router.put('/:id', validateMiddleware.validate(menuItemValidatorSchema) ,menuItemController.updateMenuItem);
router.delete('/delete/bulk', menuItemController.deleteBulkMenuItem)
router.delete('/delete/:id', menuItemController.deleteMenuItem);
router.get('/', menuItemController.getAllMenuItem)

export default router;
