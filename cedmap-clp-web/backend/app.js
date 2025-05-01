const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const debug = require('debug')(process.env.DEBUG + 'server')
const path = require('path')
const compression = require('compression')
const createError = require('http-errors')
require('dotenv').config()

// Set Mongoose strictQuery to suppress warning
mongoose.set('strictQuery', true)

// Connect to MongoDB
require('./Helpers/init_mongodb')

const app = express()

if (process.env.ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(compression({ filter: shouldCompress }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}

// Routes
app.use('/auth', require('./Routes/Auth.route'))
app.use('/user', require('./Routes/User.route'))
app.use('/file', require('./Routes/File.route'))
app.use('/questionFile', require('./Routes/QuestionFile.route'))
app.use('/department', require('./Routes/Department.route'))
app.use('/page', require('./Routes/Page.route'))
app.use('/about-program', require('./Routes/AboutProgram.route'))
app.use('/course', require('./Routes/Course.route'))
app.use('/study', require('./Routes/StudyMaterial.route'))
app.use('/category', require('./Routes/Category.route'))
app.use('/anpr', require('./Routes/Anpr.route'))
app.use('/batch', require('./Routes/Batch.route'))
app.use('/question', require('./Routes/Question.route'))
app.use('/exam', require('./Routes/Exam.route'))
app.use('/activityLog', require('./Routes/ActivityLog.route'))
app.use('/answerSheet', require('./Routes/AsnwerSheet.route'))
app.use('/examReport', require('./Routes/ExamReport.route'))
app.use('/message', require('./Routes/Message.route'))
app.use('/certificate', require('./Routes/Certificate.route'))
app.use('/makePayment', require('./Routes/MakePayment.route'))
app.use('/payment', require('./Routes/Payment.route'))
app.use('/registrationInfo', require('./Routes/RegistrationRefInfo.route'))
app.use('/center', require('./Routes/Center.route'))
app.use('/knowledge', require('./Routes/knowledge.route'))
app.use('/coursemodule', require('./Routes/CourseModule.route'))
app.use('/latestEvent', require('./Routes/LatestEvent.route'))
app.use('/auditCategory', require('./Routes/AuditQuesCategory.route'))
app.use('/auditQuestion', require('./Routes/AuditQuestion.route'))
app.use('/auditQuestionQuery', require('./Routes/AuditQueryQuestion.route'))
app.use('/auditExam', require('./Routes/AuditExam.route'))
app.use('/teamDetails', require('./Routes/TeamDetails.route'))
app.use('/servicesOffers', require('./Routes/ServicesOffers.route'))
app.use('/servicesOffersCourses', require('./Routes/ServicesOffersCourses.route'))
app.use('/banner', require('./Routes/banner.route'))
app.use('/partner', require('./Routes/Partner.route'))
app.use('/partnerService', require('./Routes/PartnerService.route'))
app.use('/partnerServiceDesc', require('./Routes/PartnerServiceDesc.route'))
app.use('/practice', require('./Routes/Practice.route'))
app.use('/service', require('./Routes/Services.route'))
app.use('/serviceProject', require('./Routes/ServiceProject.route'))
app.use('/serviceProjectDesc', require('./Routes/ServiceProjectDesc.route'))
app.use('/runningProjects', require('./Routes/RunningProjects.route'))
app.use('/latestUpdate', require('./Routes/LatestUpdates.route'))
app.use('/project', require('./Routes/Project.route'))
app.use('/servicedetail', require('./Routes/ServiceDetails.route'))
app.use('/contact', require('./Routes/Contact.route'))

// View engine and static files
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public/dist')))

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound())
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

const PORT = process.env.PORT || 3051
app.listen(PORT, () => {
  debug('Listening on ' + PORT)
})
