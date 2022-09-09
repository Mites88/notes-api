const requireId = (request: any): number => {
  const { id } = request.params
  if (!id || isNaN(id)) throw new Error("id is required and must be an integer")

  return Number(id)
}

export default requireId
