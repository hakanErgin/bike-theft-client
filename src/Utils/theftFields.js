const theftFields = {
  bike: [
    {
      type: {
        required: true,
        Question: 'Please choose a type of bike',
        Options: [
          'Road',
          'City',
          'Mountain',
          'BMX',
          'Foldable',
          'Fixie',
          'E-bike',
        ],
        'E-bike': false,
      },
    },
    {
      brand: {
        required: true,
        Question: 'Please choose a bike brand',
        Options: [
          'Bianchi',
          'Cannondale',
          'Cinelli',
          'Cube',
          'Dahon',
          'Decathalon/Btwin',
          'Eddy Merckx',
          'Felt',
          'Focus',
          'Fuji',
          'Gazelle',
          'Ghost',
          'Giant',
          'GT',
          'Head',
          'Kona',
          'Merida',
          'Miyata',
          'Motobecane/MBK',
          'Orbea',
          'Peugeot',
          'Pinarello',
          'Raleigh',
          'Ridley',
          'Santa Cruz',
          'Schwinn',
          'Scott',
          'Specialized',
          'Surly',
          'Trek',
        ],
      },
    },
    {
      color: {
        required: true,
        Question: 'Please choose a color',
        Options: [
          'Black',
          'White',
          'Red',
          'Blue',
          'Green',
          'Yellow',
          'Purple',
          'Pink',
          'Orange',
          'Gray',
          'Brown',
        ],
      },
    },
    {
      year: {
        required: false,
        Question: 'Please choose production year/era',
        Options: [
          '2020-Now',
          '2015-2019',
          '2010-2014',
          '2005-2009',
          '2000-2008',
          '1995-1999',
          '1990-1994',
          '1980s',
          '1970s',
          '1960s',
        ],
      },
    },
    {
      frame_size: {
        required: false,
        Question: 'Please choose a frame size, in CM (centimeters)',
        Options: [46, 48, 50, 52, 54, 56, 58, 60, 62, 64],
      },
    },
    {
      wheel_size: {
        required: false,
        Question: 'Please choose wheel size, in IN (inches)',
        Options: [16, 20, 24, 26, 27, 28, 29],
      },
    },
  ],
  date_time: {
    date: {
      required: true,
      Question: 'Please choose the date your bike was stolen at',
      Options: {},
    },
    time: {
      required: false,
      Question: 'Please choose the time of the day your bike was stolen at',
      Options: ['Day-time/During the day', 'Night-time/During the night'],
    },
  },
  location: {
    required: true,
    Question: 'Please choose the location your bike was stolen at',
    Options: {longitude: 123, lattitude: 1231},
  },
};

export default theftFields;
