import { Router } from "express"
import createNote from "../service/note/create"
import listNote from "../service/note/list"
import getNote from "../service/note/get"
import handleRequest from "../service/common/handleRequest"
import deleteNote from "../service/note/delete"

const router = Router()

router.post(`/`, (req, res) => {
  handleRequest(req, res, createNote)
})

router.get("/", (req, res) => {
  handleRequest(req, res, listNote)
})

router.get(`/:id`, (req, res) => {
  handleRequest(req, res, getNote)
})


router.delete(`/:id`, (req, res) => {
  handleRequest(req, res, deleteNote)
})

// router.put("/:id", (req, res) => {
//   handleRequest(req, res, updateContent)
// })

// router.get(`/:id`, (req, res) => {
//   handleRequest(req, res, getContent)
// })

// router.get("/", (req, res) => {
//   handleRequest(req, res, listContent)
// })

// router.get(`/:id/latest`, (req, res) => {
//   handleRequest(req, res, getLatestRevision)
// })

// router.get(`/:id/revisions`, (req, res) => {
//   handleRequest(req, res, getRevisions)
// })


// router.delete(`/:id`, (req, res) => {
//   handleRequest(req, res, deleteContent)
// })

export default router
