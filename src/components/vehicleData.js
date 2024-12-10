// vehicleDataService.js
let makesData = [];
let modelsData = {};


export const popularMakes = [
    "toyota", "honda", "ford", "nissan", "bmw", "mercedes-benz",
    "chevrolet", "audi", "volkswagen", "hyundai", "kia", "lexus",
    "mazda", "subaru", "tesla", "jeep", "land rover", "volvo",
    "jaguar", "porsche", "mitsubishi", "suzuki", "peugeot", "renault",
    "fiat", "chrysler", "dodge", "gmc", "cadillac", "infiniti",
    "acura", "buick", "lincoln", "bentley", "rolls-royce", "ferrari",
    "lamborghini", "aston martin", "maserati", "alfa romeo", "mini",
    "skoda", "citroën", "opel", "saab",
  ];

export const setMakesData = (makes) => {
  makesData = makes;
};

export const getMakesData = () => {
  return makesData;
};

export const setModelsData = (models) => {
  modelsData = models;
};

export const getModelsData = () => {
  return modelsData;
};

export const fetchMakes = async () => {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
    );
    const data = await response.json();
    const makes = data.Results.map((make) => make.Make_Name.toLowerCase());
    const filteredMakes = makes.filter((make) =>
      popularMakes.includes(make)
    );
    setMakesData(filteredMakes);
    return filteredMakes;
  } catch (error) {
    console.error("Error fetching makes:", error);
    return [];
  }
};

export const fetchModelsForMake = async (make) => {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`
    );
    const data = await response.json();
    const models = data.Results.map((model) => model.Model_Name);
    setModelsData((prev) => ({ ...prev, [make]: models }));
    return models;
  } catch (error) {
    console.error(`Error fetching models for ${make}:`, error);
    return [];
  }
};

// ... rest of the file remains the same

export const bodyTypeOptions = [ "Sedan", "Hatchback", "SUV", "Coupe", "Convertible", "Wagon", "Van", "Pickup", "Minivan", "Truck", "Other" ];

export const transmissionOptions = [ "Automatic", "Manual", "Semi-Automatic", "CVT" ]