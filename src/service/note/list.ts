import { Note } from "@prisma/client"
import { Request } from "express"
import { paginate, Pagination } from "../common/paginate"
import prisma from "../common/prisma"
import ResponseData from "../common/responseData"

const listNote = async (request: Request): Promise<ResponseData> => {
  const pagination: Pagination = paginate(request)

  const count: number = await prisma.note.count({
    where: { deletedAt: null },
  })

  const note: Array<Note> = await prisma.note.findMany({
    where: {
      deletedAt: null,
    },
    ...pagination,
  })

  return { data: note, count }
}

export default listNote
