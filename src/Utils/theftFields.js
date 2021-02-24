const theftFields = {
  bike: [
    {
      type: {
        required: true,
        Question: 'Type of bike',
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
        Question: 'Brand of bike',
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
        Question: 'Color',
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
        Question: 'Production year/era',
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
        Question: 'Frame size (in CM)',
        Options: [46, 48, 50, 52, 54, 56, 58, 60, 62, 64],
      },
    },
    {
      wheel_size: {
        required: false,
        Question: 'Wheel size (in IN)',
        Options: [16, 20, 24, 26, 27, 28, 29],
      },
    },
  ],
  date_time: {
    date: {
      required: true,
      Question: 'Date your bike was stolen on',
      Options: {},
    },
    time: {
      required: false,
      Question: 'Time of the day your bike was stolen at',
      Options: ['Day-time/During the day', 'Night-time/During the night'],
    },
  },
  location: {
    required: true,
    Question: 'Location your bike was stolen at',
    Options: {longitude: 123, lattitude: 1231},
  },
};

export default theftFields;
