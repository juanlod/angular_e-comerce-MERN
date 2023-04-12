
/**
 * Get clients and pets by multi filter words
 * @param regex 
 * @param offset 
 * @param pageSize 
 * @returns 
 */
export function getClientListPipeline(regex, offset, pageSize, wordsLength) {

    return wordsLength > 1 ? 
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
    : [
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
    ]
  };
  

/**
 * Get clients and pets by single word filter
 * @param regex 
 * @param offset 
 * @param pageSize 
 * @returns 
 */
// export function getSingleFilterClients(regex, offset, pageSize) {

//   return ;
// };

/**
 * Count the matches
 * @param regex 
 * @returns 
 */
export function countValues(regex, wordsLength) {

  return wordsLength > 1 ? 
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
    ]
: [
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
}
];
};