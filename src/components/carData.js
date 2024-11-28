const carData = [
  {
    id: 1,
    name: 'Toyota Corolla',
    make: 'Toyota',
    model: 'Corolla',
    year: '2023',
    price: 10000,
    location: 'New York',
    image: `${process.env.PUBLIC_URL}/images/silverSadan.jpg`, // Use process.env.PUBLIC_URL
    description: 'A reliable car for export.',
    dateAdded: '2023-01-01',
    popularity: 5,
  },
  {
    id: 2,
    name: 'Honda Civic',
    make: 'Honda',
    model: 'Civic',
    year: '2022',
    price: 12000,
    location: 'Los Angeles',
    image: `${process.env.PUBLIC_URL}/images/view.jpg`, // Use process.env.PUBLIC_URL
    description: 'A stylish and efficient car.',
    dateAdded: '2023-01-02',
    popularity: 4,
  },

  {
    id: 3,
    name: 'Subaru Impreza Sports',
    make: 'Subaru',
    model: 'Impreza Sports',
    year: '2022',
    price: 22000,
    location: 'Osaka',
    image: `${process.env.PUBLIC_URL}/images/subrauimprezasports.JPG`, // Use process.env.PUBLIC_URL
    description: 'A sporty compact car with all-wheel drive.',
    dateAdded: '2023-10-02',
    popularity: 5,
  },
  {
    id: 4,
    name: 'Subaru Forester',
    make: 'Subaru',
    model: 'Forester',
    year: '2023',
    price: 25000,
    location: 'Kyoto',
    image: `${process.env.PUBLIC_URL}/images/subaruforester.JPG`, // Use process.env.PUBLIC_URL
    description: 'A reliable SUV with great off-road capability.',
    dateAdded: '2023-10-03',
    popularity: 5,
  },
  {
    id: 5,
    name: 'Honda Step WGN',
    make: 'Honda',
    model: 'Step WGN',
    year: '2021',
    price: 20000,
    location: 'Tokyo',
    image: `${process.env.PUBLIC_URL}/images/hondastepwgn.JPG`, // Use process.env.PUBLIC_URL
    description: 'A spacious and versatile family van.',
    dateAdded: '2023-10-01',
    popularity: 4,
  }
];

export default carData;
