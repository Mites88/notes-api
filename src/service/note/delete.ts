import { Note } from "@prisma/client"
import { Request } from "express"
import prisma from "../common/prisma"
import requireId from "../common/requireId"
import ResponseData from "../common/responseData"

const deleteNote = async (request: Request): Promise<ResponseData> => {
  const id: number = requireId(request)

  const note: Note = await prisma.note.update({
    where: { id: id },
    data: {
      deletedAt: new Date(),
    },
  })

  return { data: note, count: 1 }
}

export default deleteNote
