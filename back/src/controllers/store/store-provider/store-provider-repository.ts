//Created with NoSQLBooster, the essential IDE for MongoDB - https://nosqlbooster.com
export function findAllPaging(regex, offset, pageSize): any {
  return [
    {
      $match: {
        name: regex,
      },
    },
    {
      $sort: {
        name: 1,
      },
    },
    {
      $skip: offset,
    },
    {
      $limit: parseInt(pageSize),
    },
  ];
}

export function countValues(regex): any {
  return [
    {
      $match: {
        name: regex,
      },
    },
  ];
}

export function getLastByIdPipeline(): any {
  return [
    {
      $group: {
        _id: {},
        'MAX(id)': {
          $max: '$id',
        },
      },
    },
    {
      $project: {
        id: '$MAX(id)',
        _id: 0,
      },
    },
  ];
}
