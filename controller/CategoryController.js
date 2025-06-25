const CategorySchema=require('../model/CategorySchema');
const {request, response} = require("express");

//save(POST)
const createCategory= (request,response)=>{
   const category=new CategorySchema({
       //client side must send the file resource
       //you must upload the icon into the s3 bucket and then you can get the response body.

       //the client send the ids of all the available countries,and the system must find all the countries for the request
       categoryName:request.body.categoryName,
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
   category.save()
       .then(result=>{
            response.status(201).json({code:201,message:'customer has been saved...',data:null});
    }).catch(error=>{
       response.status(500).json({code:500,message:'something went wrong...',error:error});
    })
}

//update(PUT)
const updateCategory= (request,response)=>{
    console.log(request.body);
}

//delete(DELETE)
const deleteCategory= (request,response)=>{
    console.log(request.body);
}

//find by id(GET)
const findCategoryById= (request,response)=>{
    console.log(request.body);
}

//find all(GET)
const findAllCategories= (request,response)=>{
    console.log(request.body);
}

module.exports={
    createCategory,
    updateCategory,
    deleteCategory,
    findCategoryById,
    findAllCategories
}