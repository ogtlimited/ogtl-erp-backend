import { ObjectId } from 'mongodb';
export const deductionAggBuilder = employeeId => {
  const query = [
    {
      $facet: {
        deductionIds: [
          {
            $project: {
              amount: 0,
            },
          },
          {
            $match: {
              employeeId: new ObjectId(employeeId),
            },
          },
          {
            $project: {
              _id: 1,
            },
          },
        ],
        totalDeductions: [
          {
            $project: {
              amount: 1,
              employeeId: 1,
            },
          },
          {
            $match: {
              employeeId: new ObjectId(employeeId),
            },
          },
          {
            $group: {
              _id: 'totalamount',
              sum: {
                $sum: '$amount',
              },
            },
          },
        ],
      },
    },
  ];
  return query;
};
