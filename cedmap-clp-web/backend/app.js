const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
require('./Helpers/init_mongodb')
// require('./Helpers/init_db_data')
// require('./Helpers/init_cron')
const cors = require('cors')
const debug = require('debug')(process.env.DEBUG + 'server')
const path = require('path')
const compression = require('compression')
const createError = require('http-errors')
const XLSX = require('xlsx');


const app = express()
const router = express.Router()

if (process.env.ENV == 'development') {
  app.use(morgan('dev'))
}
app.use(cors())
app.use(compression({ filter: shouldCompress }))

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes Start ------
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
app.use('/runningProjects', require('./Routes/RunningProjects.route'))
app.use('/latestUpdate', require('./Routes/LatestUpdates.route'))
app.use('/project', require('./Routes/Project.route'))
app.use('/servicedetail', require('./Routes/ServiceDetails.route'))
app.use('/contact', require('./Routes/Contact.route'))
// API Routes End --------
// API Routes End --------




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// app.use(express.static(path.join(__dirname, 'public/test/dist')))
app.use(express.static(path.join(__dirname, 'public/dist')))

app.use((err, req, res, next) => {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

app.use(async (err, req, res, next) => {
  console.log(err);
  next(createError.NotFound(err))
})

const PORT = process.env.PORT || 3051
app.listen(PORT, () => {
  debug('Listening on ' + PORT)
})
