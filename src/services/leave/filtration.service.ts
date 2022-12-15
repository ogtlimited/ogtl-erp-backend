
class FiltrationService{
    public async getLeaveApplicationsHelperMethod(matchBy,searchQuery:any, modelName): Promise<any> {
        let MAX_LIMIT = 50
        const page = parseInt(searchQuery?.page) || 1;
        let limit: number;
        if(!searchQuery.limit){
        limit = 10
        }
        else if(parseInt(searchQuery?.limit)>MAX_LIMIT){
        limit = MAX_LIMIT
        }
        else if(parseInt(searchQuery?.limit)){
        limit = parseInt(searchQuery.limit)
        }
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;
        const filtrationQuery = this.filtrationQuerymethod(matchBy, searchQuery, startIndex, limit)
        const application: any = await modelName
        .aggregate(filtrationQuery)
        
        const removeLimitAndSkip:any = filtrationQuery.filter(item => !item["$limit"] && !item["$skip"])
        removeLimitAndSkip.push({$count:"Number of Docs"})
        const countDocuments: any = await modelName.aggregate(removeLimitAndSkip)
        let totalPage:number;
        for(let count of countDocuments){
        totalPage = count["Number of Docs"]
        }
        const pagination: any = {numberOfPages:Math.ceil(totalPage/limit)};
        if(endIndex < totalPage){
        pagination.next = {
            page: page + 1,
            limit: limit
        }
        }
        if(startIndex > 0){
        pagination.previous = {
            page: page - 1,
            limit: limit
        }
        }
        return { 
        application,
        pagination: pagination,
        totalLeave: application.length
        }
    }
    
    private filtrationQuerymethod(matchBy, searchQuery, startIndex:number, limit:number){ 
        const filtrationQuery:any = [
        {
            $match: matchBy
        },
        {
        $lookup:{
            from: "departments",
            localField: "department_id",
            foreignField: "_id",
            as: "department"
        }
        },
        {
        $unwind: {path :"$department",
        preserveNullAndEmptyArrays: true
        }
        },
        {
            $lookup:{
            from: "leavetypes",
            localField: "leave_type_id",
            foreignField: "_id",
            as: "leave_type_id"
        }
        },
        {
        $unwind: {path :"$leave_type_id",
        preserveNullAndEmptyArrays: true
        }
        },
        {
        $lookup:{
            from: "employees",
            localField: "employee_id",
            foreignField: "_id",
            as: "employee"
            }
        },
        {
        $unwind: {path :"$employee",
        preserveNullAndEmptyArrays: true
        }
        },
        {
        $sort:{
            "createdAt": -1
        }
        }
        ]
        if(searchQuery.search){
        filtrationQuery.push(
            {
            $match:{
                $or : [
                { "employee.first_name":{$regex:searchQuery.search, $options:"i"}},
                { "employee.last_name":{$regex:searchQuery.search, $options:"i"}},
                { "employee.middle_name":{$regex:searchQuery.search, $options:"i"}},
                { "department.department":{$regex:searchQuery.search, $options:"i"}}
                ]
            }
            }
        )
        }
        if(searchQuery.department){
        filtrationQuery.push(
            {
            $match: { "department.department":{$regex:searchQuery.department, $options:"i"}}    
            }
        )
        }
        if(searchQuery.leave_type){
            filtrationQuery.push(
            {
                $match: { leave_type:{$regex:searchQuery.leave_type, $options:"i"}}    
                }
            )
            }
        if(searchQuery?.page){
            filtrationQuery.push(
            { $skip: startIndex },
            )
            }
        if(searchQuery?.limit){
            filtrationQuery.push(
            { $limit: limit},
            )
            }
        return filtrationQuery
    }
}

export default FiltrationService