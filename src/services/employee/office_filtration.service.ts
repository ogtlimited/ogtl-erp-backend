
class OfficeFiltrationService {
    public async getAllEmployeesHelperMethod(matchBy, searchQuery: any, modelName): Promise<any> {
        let MAX_LIMIT = 50
        const page = parseInt(searchQuery?.page) || 1;
        let limit: number;
        if (!searchQuery.limit) {
            limit = 10
        }
        else if (parseInt(searchQuery?.limit) > MAX_LIMIT) {
            limit = MAX_LIMIT
        }
        else if (parseInt(searchQuery?.limit)) {
            limit = parseInt(searchQuery.limit)
        }
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const filtrationQuery = this.filtrationQuerymethod(matchBy, searchQuery, startIndex, limit)
        const employees: any = await modelName
            .aggregate(filtrationQuery)

        const removeLimitAndSkip: any = filtrationQuery.filter(item => !item["$limit"] && !item["$skip"])
        removeLimitAndSkip.push({ $count: "Number of Docs" })
        const countDocuments: any = await modelName.aggregate(removeLimitAndSkip)
        let totalPage: number;
        for (let count of countDocuments) {
            totalPage = count["Number of Docs"]
        }
        const pagination: any = { numberOfPages: Math.ceil(totalPage / limit) };
        if (endIndex < totalPage) {
            pagination.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            pagination.previous = {
                page: page - 1,
                limit: limit
            }
        }
        return {
            employees,
            pagination: pagination,
            totalEmployees: employees.length
        }
    }

    private filtrationQuerymethod(matchBy, searchQuery, startIndex: number, limit: number) {
        const filtrationQuery: any = [
            {
                $match: matchBy
            },
            {
                $lookup: {
                    from: "departments",
                    localField: "department",
                    foreignField: "_id",
                    as: "department"
                }
            },
            {
                $unwind: {
                    path: "$department",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "designations",
                    localField: "designation",
                    foreignField: "_id",
                    as: "designation"
                }
            },
            {
                $unwind: {
                    path: "$designation",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "projectId",
                    foreignField: "_id",
                    as: "projectId"
                }
            },
            {
                $unwind: {
                    path: "$projectId",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]
        if (searchQuery.search) {
            filtrationQuery.push(
                {
                    $match: {
                        $or: [
                            { "first_name": { $regex: searchQuery.search, $options: "i" } },
                            { "last_name": { $regex: searchQuery.search, $options: "i" } },
                            { "middle_name": { $regex: searchQuery.search, $options: "i" } },
                            { "department.department": { $regex: searchQuery.search, $options: "i" } },
                            { "designation.designation": { $regex: searchQuery.search, $options: "i" } }
                        ]
                    }
                }
            )
        }
        if (searchQuery.status) {
            filtrationQuery.push(
                {
                    $match: { "status": { $regex: searchQuery.status, $options: "i" } }
                }
            )
        }
        if (searchQuery?.page) {
            filtrationQuery.push(
                { $skip: startIndex },
            )
        }
        if (searchQuery?.limit) {
            filtrationQuery.push(
                { $limit: limit },
            )
        }
        return filtrationQuery
    }
}

export default OfficeFiltrationService