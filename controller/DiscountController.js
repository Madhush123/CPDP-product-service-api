const DiscountSchema=require('../model/DiscountSchema');

//save(POST)
const createDiscount= async (request,response)=>{

    try{

        const {discountName,percentage,startDate,endDate,lastUpdate}=request.body;
        if(!discountName || !percentage || !startDate || !endDate || !lastUpdate){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const discount=new DiscountSchema({
            discountName:discountName,
            percentage:percentage,
            startDate:startDate,
            endDate:endDate,
            lastUpdate:lastUpdate

        });

     const saveData= await discount.save();
       return response.status(201).json({code:201,message:'discount has been saved...',data:saveData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//update(PUT)
const updateDiscount =async (request,response)=>{
    try{

        const {discountName,percentage,startDate,endDate,lastUpdate}=request.body;
        if(!discountName || !percentage || !startDate || !endDate || !lastUpdate){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

       const updatedData=await DiscountSchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                discountName:discountName,
                percentage:percentage,
                startDate:startDate,
                endDate:endDate,
                lastUpdate:lastUpdate
            }
        },{new:true});

        return response.status(200).json({code:200,message:'discount has been updated...',data:updatedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//delete(DELETE)
const deleteDiscount=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const deletedData=await DiscountSchema.findOneAndDelete({'_id':request.params.id});

        return response.status(204).json({code:204,message:'discount has been deleted...',data:deletedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find by id(GET)
const findDiscountById=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const discountData=await DiscountSchema.findById({'_id':request.params.id});

        if(discountData){
            return response.status(200).json({code:200,message:'discount data found...',data:discountData });
        }

        return response.status(404).json({code:404,message:'discount data not found...',data:null });

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find all(GET)
const findAllDiscounts=async (request,response)=>{

  try{
      const {searchText,page=1,size=10}=request.query;
      const pageIndex=parseInt(page);
      const pageSize=parseInt(size);

      const query={}

      if(searchText){
          query.$text={$search:searchText}
      }

      const skip=(pageIndex-1)*pageSize;
      const discountList=await DiscountSchema.find(query)
          .limit(pageSize)
          .skip(skip);

      const discountListCount=await DiscountSchema.countDocuments(query)

      return response.status(200).json({code:200,message:'discounts data found ...',data:{list:discountList,dataCount:discountListCount} });

  }catch (e){
      response.status(500).json({code:500,message:'something went wrong...',error:e});
  }

}

module.exports={
    createDiscount,
    updateDiscount,
    deleteDiscount,
    findDiscountById,
    findAllDiscounts
}