const CountrySchema=require('../model/CountrySchema');

//save(POST)
const createCountry= async (request,response)=>{

    try{

        const {countryName,file,countryCode}=request.body;
        if(!countryName || !file || !countryCode){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const country=new CountrySchema({
            //client side must send the file resource
            //you must upload the icon into the s3 bucket and then you can get the response body.

            //the client send the ids of all the available countries,and the system must find all the countries for the request
            countryName:countryName,
            flag:{hash:'Temp Hash',
                resourceUrl:'https://th.bing.com/th/id/R.50db25605239dc4432bc8a94c7df714e?rik=QSkLYIE5itsxeA&riu=http%3a%2f%2f1.bp.blogspot.com%2f-IsGPbs7AWTA%2fUIwLZkzBCoI%2fAAAAAAAAAN0%2ffUiPlUjLNXI%2fs1600%2fSiberian%2bHusky%2bpuppy.jpg&ehk=7SLje4ISo003I9p2s8ZyA0eFKmlTCzuqVZeuXhVs9dA%3d&risl=&pid=ImgRaw&r=0',
                filename:'Temp File Name',
                directory:'Temp Directory'},//assume that you have send the image to the s3
            countryCode:countryCode
        });

     const saveData= await country.save();
       return response.status(201).json({code:201,message:'country has been saved...',data:saveData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//update(PUT)
const updateCountry =async (request,response)=>{
    try{

        const {countryName,countryCode}=request.body;
        if(!countryName || !countryCode){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

       const updatedData=await CountrySchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                countryName:countryName,
                countryCode:countryCode
            }
        },{new:true});

        return response.status(200).json({code:200,message:'country has been updated...',data:updatedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }

}

//delete(DELETE)
const deleteCountry=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are missing!...',data:null});
        }

        const deletedData=await CountrySchema.findOneAndDelete({'_id':request.params.id});

        return response.status(204).json({code:204,message:'country has been deleted...',data:deletedData});

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find by id(GET)
const findCountryById=async (request,response)=>{
    try{

        if(!request.params.id ){
            return response.status(400).json({code:400,message:'some fields are !...',data:null});
        }

        const countryData=await CountrySchema.findById({'_id':request.params.id});

        if(countryData){
            return response.status(200).json({code:200,message:'country data found...',data:countryData });
        }

        return response.status(404).json({code:404,message:'country data not found...',data:null });

    }catch (e){
        response.status(500).json({code:500,message:'something went wrong...',error:e});
    }
}

//find all(GET)
const findAllCountries=async (request,response)=>{

  try{
      const {searchText,page=1,size=10}=request.query;
      const pageIndex=parseInt(page);
      const pageSize=parseInt(size);

      const query={}

      if(searchText){
          query.$text={$search:searchText}
      }

      const skip=(pageIndex-1)*pageSize;
      const countryList=await CountrySchema.find(query)
          .limit(pageSize)
          .skip(skip);

      const countryListCount=await CountrySchema.countDocuments(query);

      return response.status(200).json({code:200,message:'contries data found ...',data:{list:countryList,dataCount:countryListCount} });

  }catch (e){
      response.status(500).json({code:500,message:'something went wrong...',error:e});
  }

}

module.exports={
    createCountry,
    updateCountry,
    deleteCountry,
    findCountryById,
    findAllCountries
}