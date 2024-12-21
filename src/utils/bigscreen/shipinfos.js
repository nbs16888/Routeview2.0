const shipinfos = {
  ship: {
    xinnan: {
      "Mmsi":"311000923",
      "Location":"31°21.587'N, 122°26.465'E",
      "Length": "263m",
      "Width": "32m",
      "Draft_depth": "12.8m",
      "Tonage": "41482 Tons",
      "Tonnage": "52191 Tons",
      "Container_load": "4250 TEU",
      "Fuel_type": "DIESEL",
      "Icearea": 0,
      "Current_Speed":  5.4
    },
    cmacgm: {
      "Mmsi":"413147000",
      "Location": "35°4.054'N，128°48.497'E",
      "Length": "396m",
      "Width": "54m",
      "Draft_depth": "16m",
      "Tonage": "176546 Tons",
      "Tonnage": "187625 Tons",
      "Container_load": "16022 TEU",
      "Fuel_type": "DIESEL",
      "Icearea":  0,
      "Current_Speed":  6.4

    }
  }
};

export const getshipinfos = (layerGroup, category) => {
  if (!(layerGroup in shipinfos)) return null;
  const r = shipinfos[layerGroup];
  if (!(category in r)) return null;
  return shipinfos[layerGroup][category];
};
