import { ObjectId } from 'mongodb';
import moment from 'moment';

const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

export const deductionAggBuilder = employeeId => {
  return [
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
              createdAt: {
                $gte: new Date(startOfMonth),
                $lte: new Date(endOfMonth),
              },
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
};
