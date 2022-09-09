import { Note } from "@prisma/client"

interface ResponseData {
  data: Note | Note[]
  count: number
}

export default ResponseData
