import express, { Request, Response } from "express";
import Product from "../models/ProductModel";


export const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
    if(!product){
        res.status(404).json({ msg: "no product not found" });
    }
   console.log("hello");
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const getProductById = async (req:Request,res:Response) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ msg: "product not found" });
    }
};

export const deleteProduct = async (req:Request, res:Response) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

export const createProduct =async (req:Request, res:Response) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  console.log("gggg",product)

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
}
export const updateProduct = async (req:Request, res:Response) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}

export const createProductReview =async (req:Request, res:Response) => {
  const { rating, comment } = req.body

  const product:any = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r:any) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review:any = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc: any, item: { rating: any; }) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
}


// export default { getProduct, getProductById };
