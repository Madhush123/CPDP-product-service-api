const CategorySchema=require('../model/CategorySchema');
const {request, response} = require("express");

//save(POST)
const createCategory= async (request,response)=>{

    try{

        const {categoryName,file,countryIds}=request.body;
        if(!categoryName || !file || !countryIds){
            return response.status(400).json({code:400,message:'some fields are !...',data:null});
        }

        const category=new CategorySchema({
            //client side must send the file resource
            //you must upload the icon into the s3 bucket and then you can get the response body.

            //the client send the ids of all the available countries,and the system must find all the countries for the request
            categoryName:categoryName,
            icon:{hash:'Temp Hash',
                resourceUrl:'https://th.bing.com/th/id/R.50db25605239dc4432bc8a94c7df714e?rik=QSkLYIE5itsxeA&riu=http%3a%2f%2f1.bp.blogspot.com%2f-IsGPbs7AWTA%2fUIwLZkzBCoI%2fAAAAAAAAAN0%2ffUiPlUjLNXI%2fs1600%2fSiberian%2bHusky%2bpuppy.jpg&ehk=7SLje4ISo003I9p2s8ZyA0eFKmlTCzuqVZeuXhVs9dA%3d&risl=&pid=ImgRaw&r=0',
                filename:'Temp File Name',
                directory:'Temp Directory'},//assume that you have send the image to the s3
            availableCountries:[
                {
                    countryId:'Temp-Id-1',
                    countryName:'Sri Lanka'
                },
                {
                    countryId:'Temp-Id-2',
                    countryName:'USA'
                }
            ]
        });

     const saveData= await category.save();
       return response.status(201).json({code:201,message:'category has been saved...',data:saveData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//update(PUT)
const updateCategory=async (request,response)=>{
    try{

        const {categoryName}=request.body;
        if(!categoryName ){
            return response.status(400).json({code:400,message:'some fields are !...',data:null});
        }

       const updatedData=await CategorySchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                categoryName:categoryName
            }
        },{new:true});

        return response.status(200).json({code:200,message:'category has been updated...',data:updatedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//delete(DELETE)
const deleteCategory=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are !...',data:null});
        }

        const deletedData=await CategorySchema.findOneAndDelete({'_id':request.params.id});

        return response.status(204).json({code:204,message:'category has been deleted...',data:deletedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find by id(GET)
const findCategoryById=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are !...',data:null});
        }

        const categoryData=await CategorySchema.findById({'_id':request.params.id});

        if(categoryData){
            return response.status(200).json({code:200,message:'category data found...',data:categoryData });
        }

        return response.status(404).json({code:404,message:'category data not found...',data:null });

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find all(GET)
const findAllCategories=async (request,response)=>{

  try{
      const {searchText,page=1,size=10}=request.query;
      const pageIndex=parseInt(page);
      const pageSize=parseInt(size);

      const query={}

      if(searchText){
          query.$text={$search:searchText}
      }

      const skip=(pageIndex-1)*pageSize;
      const categoryList=await CategorySchema.find(query)
          .limit(pageSize)
          .skip(skip);

      const categoryListCount=await CategorySchema.countDocuments(query)

      return response.status(200).json({code:200,message:'categories data found ...',data:{list:categoryList,dataCount:categoryListCount} });

  }catch (e){
      response.status(500).json({code:500,message:'something went wrong...',error:e});
  }

}

module.exports={
    createCategory,
    updateCategory,
    deleteCategory,
    findCategoryById,
    findAllCategories
}