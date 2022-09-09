const requireTitle = (request: any): string => {
  const { title } = request.body
  if (!title) throw new Error("a title is required in request body")

  return title
}

export default requireTitle
