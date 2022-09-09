import { Router } from "express"
import handleRequest from "../service/common/handleRequest"
import getRevision from "../service/revision/get"
import restoreRevision from "../service/revision/restore"

const router = Router()

router.put("/restore/:id", (req, res) => {
  handleRequest(req, res, restoreRevision)
})

router.get("/:id", (req, res) => {
  handleRequest(req, res, getRevision)
})

export default router
