const ProductSchema=require('../model/ProductSchema');

//save(POST)
const createProduct= async (request,response)=>{

    try{

        const {productName,file,actualPrice,oldPrice,qty,description,discount,categoryId}=request.body;
        if(!productName || !file || !actualPrice || !oldPrice || !qty || !description || !discount  || !categoryId){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const product=new ProductSchema({
            //client side must send the file resource
            //you must upload the icon into the s3 bucket and then you can get the response body.

            //the client send the ids of all the available countries,and the system must find all the countries for the request
            productName:productName,
            image:[
                {hash:'Temp Hash',
                    resourceUrl:'https://th.bing.com/th/id/R.50db25605239dc4432bc8a94c7df714e?rik=QSkLYIE5itsxeA&riu=http%3a%2f%2f1.bp.blogspot.com%2f-IsGPbs7AWTA%2fUIwLZkzBCoI%2fAAAAAAAAAN0%2ffUiPlUjLNXI%2fs1600%2fSiberian%2bHusky%2bpuppy.jpg&ehk=7SLje4ISo003I9p2s8ZyA0eFKmlTCzuqVZeuXhVs9dA%3d&risl=&pid=ImgRaw&r=0',
                    filename:'Temp File Name',
                    directory:'Temp Directory'},//assume that you have send the image to the s3
            ],
            actualPrice:actualPrice,
            oldPrice:oldPrice,
            qty:qty,
            description:description,
            discount:discount,
            categoryId:categoryId

        });

     const saveData= await product.save();
       return response.status(201).json({code:201,message:'product has been saved...',data:saveData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//update(PUT)
const updateProduct =async (request,response)=>{
    try{
        const {productName,actualPrice,oldPrice,qty,description,discount,categoryId}=request.body;
        if(!productName || !actualPrice || !oldPrice || !qty || !description || !discount || !categoryId){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

       const updatedData=await ProductSchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                productName:productName,
                actualPrice:actualPrice,
                oldPrice:oldPrice,
                qty:qty,
                description:description,
                discount:discount,
                categoryId:categoryId
            }
        },{new:true});

        return response.status(200).json({code:200,message:'product has been updated...',data:updatedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//delete(DELETE)
const deleteProduct=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const deletedData=await ProductSchema.findOneAndDelete({'_id':request.params.id});

        return response.status(204).json({code:204,message:'product  has been deleted...',data:deletedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find by id(GET)
const findProductById=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const productData=await ProductSchema.findById({'_id':request.params.id});

        if(productData){
            return response.status(200).json({code:200,message:'product data found...',data:productData });
        }

        return response.status(404).json({code:404,message:'product data not found...',data:null });

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find all(GET)
const findAllProducts=async (request,response)=>{

  try{
      const {searchText,page=1,size=10}=request.query;
      const pageIndex=parseInt(page);
      const pageSize=parseInt(size);

      const query={}

      if(searchText){
          query.$text={$search:searchText}
      }

      const skip=(pageIndex-1)*pageSize;
      const productList=await ProductSchema.find(query)
          .limit(pageSize)
          .skip(skip);

      const productListCount=await ProductSchema.countDocuments(query);

      return response.status(200).json({code:200,message:'products data found ...',data:{list:productList,dataCount:productListCount} });

  }catch (e){
      response.status(500).json({code:500,message:'something went wrong...',error:e});
  }

}

module.exports={
    createProduct,
    updateProduct,
    deleteProduct,
    findProductById,
    findAllProducts
}