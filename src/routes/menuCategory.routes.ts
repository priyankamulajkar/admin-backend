import express from 'express';
import MenuCategoryController  from '../controllers/MenuCategoryController';
import validateMiddleware from '../middleware/validateMiddleware';
import menuCategoryValidatorSchema from '../validators/menuCategoryValidators';
import authMiddleware from '../middleware/authMiddleware'
import roleMiddleware from '../middleware/roleMiddleware';

const router = express.Router();

const menuCategoryController = new MenuCategoryController();

router.post('/create', authMiddleware, roleMiddleware("RES_OWNER"), validateMiddleware.validate(menuCategoryValidatorSchema) , menuCategoryController.createMenuCategory);
router.post('/create/bulk', authMiddleware, roleMiddleware("RES_OWNER"), menuCategoryController.createBulkMenuCategory)
router.put('/:id', validateMiddleware.validate(menuCategoryValidatorSchema) ,menuCategoryController.updateMenuCategory);
router.delete('/delete/bulk', menuCategoryController.deleteBulkMenuCategory)
router.delete('/delete/:id', menuCategoryController.deleteMenuCategory);
router.get('/', menuCategoryController.getAllMenuCategory)

export default router;
