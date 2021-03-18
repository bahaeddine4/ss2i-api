const reviewModel = require('./models/review')
const userModel = require('./models/user')
const companyModel = require('./models/company')

const resolvers = {
  Query: {
    companyByName: (_, { name }) => companyModel.findOne({ name }),
    reviews: () => reviewModel.find(),
    review: (_, { id }) => reviewModel.findById(id),
    users: () => userModel.find(),
    user: (_, { id }) => userModel.findById(id),
    companies: () => companyModel.find(),
    company: (_, { id }) => companyModel.findById(id)
  },
  Mutation: {
    addReview: async (_, { content, author, company }) => {
      const review = await reviewModel.create({ content, author, company })
      const linkUserToReview = userModel.findByIdAndUpdate(author, {
        $push: {
          reviews: review.id
        }
      })
      const linkCompanyToReview = companyModel.findByIdAndUpdate(company, {
        $push: {
          reviews: review.id
        }
      })
      await Promise.all([linkUserToReview, linkCompanyToReview])
      return review
    },
    editReview: async (_, { content, id }) => {
      const review = await reviewModel.findById(id)
      const updatedReview = Object.assign({}, review, {
        content
      })
      return reviewModel.create(updatedReview)
    },
    deleteReview: (_, { id }) => reviewModel.findByIdAndDelete(id),
    createUser: (_, { name, email, password }) =>
      userModel.create({ name, email, password }),
    createCompany: (_, { name }) => companyModel.create({ name })
  },
  User: {
    reviews: ({ id }) => reviewModel.find({ author: id })
  },
  Company: {
    reviews: ({ id }) => reviewModel.find({ company: id })
  },
  Review: {
    author: ({ author }) => userModel.findById(author),
    company: ({ company }) => companyModel.findById(company)
  }
}

exports.resolvers = resolvers
