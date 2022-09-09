interface Pagination {
  skip: number
  take: number
}

const paginate = (request: any): Pagination => {
  const { perPage, page } = request.query

  const skip = Number(perPage) * Number(page)
  const take = Number(perPage)

  const pagination: Pagination = { take: take || 20, skip: skip || 0 }

  return pagination
}

export { paginate, Pagination }
