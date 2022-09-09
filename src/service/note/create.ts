import { Note } from "@prisma/client"
import { Request } from "express"
import prisma from "../common/prisma"
import requireTitle from "../common/requireTitle"
import ResponseData from "../common/responseData"

const createNote = async (request: Request): Promise<ResponseData> => {
  const title: string = requireTitle(request)
  const { content } = request.body
  const note: Note = await prisma.note.create({
    data: {
      title,
      content,
      authorId: 1
    },
  })

  return { data: note, count: 1 }
}

export default createNote
