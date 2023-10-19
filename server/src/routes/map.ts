import express from "express";
const router = express.Router();
import { getNearbyPlacesCtrl, getPlacesPhotoCtrl } from "../controllers/map";

router.route("/nearby-places").post(getNearbyPlacesCtrl);
router.route("/places-photo").post(getPlacesPhotoCtrl);

export default router;
