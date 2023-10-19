import { Request, Response } from "express";
import axios from "axios";
import env from "../../utils/validateEnv";
import { uploadImg } from "../middleware/cloudinary";

export const getNearbyPlacesCtrl = async (req: Request, res: Response) => {
  const { location, radius, type } = req.body;
  const apiKey = env.GOOGLE_MAPS_API_KEY;
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&key=${apiKey}`
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getPlacesPhotoCtrl = async (req: Request, res: Response) => {
  const { photoRef } = req.body;
  const apiKey = env.GOOGLE_MAPS_API_KEY;
  try {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${apiKey}`,
      { responseType: "arraybuffer" }
    );
    const bufferData = Buffer.from(data, "binary");
    const base64String = bufferData.toString("base64");
    const img = await uploadImg(base64String);
    res.status(200).json({ success: true, img: img.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
