
/**
 * Get clients and pets by multi filter words
 * @param regex 
 * @param offset 
 * @param pageSize 
 * @returns 
 */
export function getMultiFilterClients(regex, offset, pageSize) {

    return [
        [
            {
              $lookup: {
                localField: "idc",
                from: "mascotas",
                foreignField: "idc",
                as: "mascotas",
              },
            },
          
            {
              $match: {
                ayn: regex,
                "mascotas.nom": regex,
              },
            },
            {
              $sort: {
                "mascotas.nom": 1,
                ayn: 1,
              },
            },
            {
              $skip: offset,
            },
            {
              $limit: parseInt(pageSize),
            },
          ]
    ]
  };
  

/**
 * Get clients and pets by single word filter
 * @param regex 
 * @param offset 
 * @param pageSize 
 * @returns 
 */
export function getSingleFilterClients(regex, offset, pageSize) {

  return [
    {
      $lookup: {
        localField: "idc",
        from: "mascotas",
        foreignField: "idc",
        as: "mascotas",
      },
    },
    {
      $match: {
        $or: [
          { ayn: regex },
          { "mascotas": { $elemMatch: { nom: regex } } }
        ],
      },
    },
    {
      $sort: {
        "mascotas.nom": 1,
        ayn: 1,
      },
    },
    {
      $skip: offset,
    },
    {
      $limit: parseInt(pageSize),
    },
  ];
};

/**
 * Count the matches
 * @param regex 
 * @returns 
 */
export function countValues(regex) {

  return [
    {
      "$lookup": {
        "localField": "idc",
        "from": "mascotas",
        "foreignField": "idc",
        "as": "mascotas"
      }
    },
    {
      "$match": {
        $or: [{ ayn: regex }, { "mascotas.nom": regex }],
      },
    },
    {
      "$group": {
        "_id": "$_id",
        "count": { "$sum": 1 }
      }
    }
  ];
};