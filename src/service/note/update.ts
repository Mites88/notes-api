import { Request } from "express"
import prisma from "../common/prisma"
import requireId from "../common/requireId"
import ResponseData from "../common/responseData"

const updateNote = async (request: Request): Promise<ResponseData> => {
  const id: number = requireId(request)
  const { title, content } = request.body

  const note = await prisma.note.update({
    where: { id: id },
    data: {
      title,
      content,
      authorId: 1,
    },
  })

  return { data: note, count: 1 }
}

export default updateNote
