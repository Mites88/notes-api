import { Request, Response } from "express"
import ResponseData from "./responseData"

interface CallbackFunction {
  (request: Request): Promise<ResponseData>
}

const handleRequest = async (
  request: Request,
  response: Response,
  callback: CallbackFunction
) => {
  try {
    const { data, count } = await callback(request)

    response.set("X-Total-Count", count.toString()).json(data)
  } catch (error: any) {
    response
      .status(500)
      .json({ error: true, message: error.message || "Internal server error" })
  }
}

export default handleRequest
