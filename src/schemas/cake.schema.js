import joi from "joi"

export const cakeSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().greater(0).required(),
    description: joi.string().allow('').optional(),
    image: joi.string().uri().required()
  }) 