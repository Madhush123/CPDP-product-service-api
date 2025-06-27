const BookmarkSchema=require('../model/BookmarkSchema');

//save(POST)
const createBookmark= async (request,response)=>{

    try{

        const {userId,productId,createdDate}=request.body;
        if(!userId || !productId || !createdDate){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const bookmark=new BookmarkSchema({
            //client side must send the file resource
            //you must upload the icon into the s3 bucket and then you can get the response body.

            //the client send the ids of all the available countries,and the system must find all the countries for the request
            userId:userId,
            productId:productId,
            createdDate:createdDate
        });

     const saveData= await bookmark.save();
       return response.status(201).json({code:201,message:'bookmark has been saved...',data:saveData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//update(PUT)
const updateBookmark =async (request,response)=>{
    try{

        const {userId,productId,createdDate}=request.body;
        if(!userId || !productId || !createdDate){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

       const updatedData=await BookmarkSchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                userId:userId,
                productId:productId,
                createdDate:createdDate
            }
        },{new:true});

        return response.status(200).json({code:200,message:'bookmark has been updated...',data:updatedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//delete(DELETE)
const deleteBookmark=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const deletedData=await BookmarkSchema.findOneAndDelete({'_id':request.params.id});

        return response.status(204).json({code:204,message:'bookmark has been deleted...',data:deletedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find by id(GET)
const findBookmarkById=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const bookmarkData=await BookmarkSchema.findById({'_id':request.params.id});

        if(bookmarkData){
            return response.status(200).json({code:200,message:'bookmark data found...',data:bookmarkData});
        }

        return response.status(404).json({code:404,message:'bookmark data not found...',data:null });

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find all(GET)
const findAllBookmarks=async (request,response)=>{

  try{
      const {searchText,page=1,size=10}=request.query;
      const pageIndex=parseInt(page);
      const pageSize=parseInt(size);

      const query={}

      if(searchText){
          query.$text={$search:searchText}
      }

      const skip=(pageIndex-1)*pageSize;
      const bookmarkList=await BookmarkSchema.find(query)
          .limit(pageSize)
          .skip(skip);

      const bookmarkListCount=await BookmarkSchema.countDocuments(query);

      return response.status(200).json({code:200,message:'bookmarks data found ...',data:{list:bookmarkList,dataCount:bookmarkListCount} });

  }catch (e){
      response.status(500).json({code:500,message:'something went wrong...',error:e});
  }

}

module.exports={
    createBookmark,
    updateBookmark,
    deleteBookmark,
    findBookmarkById,
    findAllBookmarks
}