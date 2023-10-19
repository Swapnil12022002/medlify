import { Schema, model } from "mongoose";

interface IMap {
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
  type: string;
}

const mapSchema = new Schema<IMap>({
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  radius: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default model<IMap>("Map", mapSchema);
