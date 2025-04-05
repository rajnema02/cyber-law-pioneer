const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const preUserSchema = new mongoose.Schema({
    full_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    mobile: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: process.env.ROLES.split(','),
        default: 'user'
    },

    userType: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    mobileOtp: {
        type: Number,
        required: true
    },
    employeeType: {
        type: String,
        trim: true
    },
    block: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },

    is_profileVerified: {
        type: Boolean,
        default: false
    },
    is_profileRejected: {
        type: Boolean,
        default: false
    },
    course_code: {
        type: String,
        trim: true
    },
    course_type: {
        type: String,
        trim: true
    },
    mode: {
        type: String,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },

    designation: {
        type: String,
        trim: true
    },
    district: {
        type: String,
        trim: true
    },

    dob: {
        type: Date,
        trim: true
    },

    email: {
        type: String,
        trim: true
    },

    father_name: {
        type: String,
        trim: true
    },

    companyType: {
        type: String,
        trim: true
    },

    formStatus: {
        type: Boolean,
        trim: true,
        default: false
    },

    gender: {
        type: String,
        trim: true
    },

    home_address: {
        type: String,
        trim: true
    },
    identity: {
        type: String,
        trim: true
    },
    identity_file: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },

    mother_name: {
        type: String,
        trim: true
    },
    office: {
        type: String,
        trim: true
    },
    payment_receipt: {
        type: String,
        trim: true
    },
    payment_receipt_2: {
        type: String,
        trim: true
    },
    amount: {
        type: String,
        trim: true
    },
    amount_2: {
        type: String,
        trim: true
    },
    pin_code: {
        type: String,
        trim: true
    },

    postal_code: {
        type: String,
        trim: true
    },

    profile_photo: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    transaction_id: {
        type: String,
        trim: true
    },
    transaction_id_2: {
        type: String,
        trim: true
    },
    whatsapp: {
        type: String,
        trim: true
    },
    payment_file: {
        type: String,
        trim: true
    },
    payment_file_2: {
        type: String,
        trim: true
    },
    passing_year_10: {
        type: String
    },
    marks_10: {
        type: String
    },
    marksheet_10: {
        type: String
    },
    passing_year_12: {
        type: String
    },
    marks_12: {
        type: String
    },
    marksheet_12: {
        type: String
    },
    passing_year_gradution: {
        type: String
    },
    marks_gradution: {
        type: String
    },
    marksheet_gradution: {
        type: String
    },

    batch: {
        type: mongoose.Types.ObjectId
    },
    otp: {
        type: Number
    },
    disabled: {
        type: Boolean,
        default: false
    },

    is_inactive: {
        type: Boolean,
        default: false
    },
    is_spam: {
        type: Boolean,
        default: false
    },

    created_at: {
        type: Date
    },
    transaction_at: {
        type: String
    },

    created_by: {
        type: mongoose.Types.ObjectId
    },

    updated_at: {
        type: Date
    },

    deleted_at: {
        type: Date
    },

    restored_at: {
        type: Date
    }
})

preUserSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            if (this.password) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(this.password, salt)
                this.password = hashedPassword
            }
        }
        next()
    } catch (error) {
        next(error)
    }
})

preUserSchema.pre('updateOne', async function (next) {
    try {
        let query = this
        let update = query.getUpdate()
        if (update.$set.otp) {
            const salt = await bcrypt.genSalt(10)
            const hashedOtp = await bcrypt.hash(update.$set.otp, salt)
            update.$set.otp = hashedOtp
        }
        if (update.$set.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(update.$set.password, salt)
            update.$set.password = hashedPassword
        }
        next()
    } catch (error) {
        next(error)
    }
})

preUserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
        // return password == this.password
    } catch (error) {
        throw error
    }
}

const preUser = mongoose.model('preUser', preUserSchema);

module.exports = preUser
