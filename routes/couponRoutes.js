import express from 'express';

import auth from '../middleware/authMiddleware.js';
import { getCouponById,getAllCoupons,createCoupon,updateCoupon,deleteCoupon } from '../handlers/couponController.js';

const router = express.Router();

router.get('/:id', getCouponById);
router.get('/', getAllCoupons);
router.post('/', createCoupon);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

export default router;