import { Request } from "express"
import prisma from "../common/prisma"
import requireId from "../common/requireId"
import ResponseData from "../common/responseData"

const getNote = async (request: Request): Promise<ResponseData> => {
  const id: number = requireId(request)

  const note = await prisma.note.findFirst({
    where: { id: id },
  })

  if (!note) throw new Error("note not found")

  return { data: note, count: 1 }
}

export default getNote
