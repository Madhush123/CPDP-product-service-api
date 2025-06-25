const CategorySchema=require('../model/CategorySchema');
const {request, response} = require("express");

//save(POST)
const createCategory= (request,response)=>{
    console.log(request.body);
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