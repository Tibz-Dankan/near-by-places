const express = require("express");
const { Client } = require("@googlemaps/google-maps-services-js");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const client = new Client({});

app.use(cors());

app.get("/near-by-places", async (req, res) => {
  console.log("req.query");
  console.log(req.query);
  // { latitude: '0.3244032', longitude: '32.587776' }
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: "Please provide location co-ordinates",
    });
  }

  const healthFacilities = await client.placesNearby({
    params: {
      // location: "0.3244032, 32.587776",
      location: `${latitude}, ${longitude}`,
      key: process.env.GOOGLE_MAPS_API_KEY,
      radius: 1000,
      types: ["hospital", "health"],
    },
  });

  if (healthFacilities.statusText !== "OK") {
    return res
      .status(400)
      .json({ success: false, message: "could not find places" });
  }

  res.status(200).json({
    success: true,
    message: "get health successfully",
    data: healthFacilities.data,
  });
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
