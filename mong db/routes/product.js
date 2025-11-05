import express from "express";
import mongoose from "mongoose";
const productroutes = express.Router();
import productmodel from "../model/product.js";

productroutes.get("/", async (req, res) => {
  try {
    let product = await productmodel.find();
    res.json({
      message: "get all products ",
      data: product,
    });
  } catch (error) {
    res.json({
      message: error.message,
      data: null,
    });
  }
});
productroutes.post("/", async (req, res) => {
  let { name, rating, price, category } = req.body;
  if (!name || !price) {
    return res.json({
      message: "invalid data to add product",
      code: 400,
    });
  }
  try {
    let newproduct = new productmodel(req.body);

    await newproduct.save();
    res.json({
      message: "sussec full add a product ",
      data: newproduct,
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      message: error.message,
      data: null,
    });
  }
});
productroutes.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let findproduct = await productmodel.findById(id);
    if (findproduct) {
      return res.json({
        message: "get specific product by its id ",
        data: findproduct,
      });
    } else {
      res.json({
        message: "no product such that id",
        code: 400,
      });
    }
  } catch (error) {
    console.log(error);

    if (error.name == "CastError") {
       return res.json({
        message: "please enter valid id",
        data: null,
      });
    }
    res.send({
        message:error,
        data:null
    })
  }
})
productroutes.delete('/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        let findproduct = await productmodel.findById(id);

        if (!findproduct) {
            return res.json({
                message: " product doesn't exist with this id. ",
                data: null,
            })
        }

        await productmodel.deleteOne({ _id: new mongoose.Types.ObjectId(id) }).then(() => {
            return res.json({
                message: "successfully deleted a product . ",
            })
        })

    } catch (error) {
        res.json({
            message: error.message,
            users: null,
        })
    }
});
export default productroutes;
