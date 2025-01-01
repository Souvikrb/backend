
const nodemailer = require("nodemailer");


var otpStorage = {}; // Temporary storage for OTPs

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "souvikraybarman@gmail.com",
        pass: process.env.APP_PASSWORD, // Use App Password if 2FA is enabled
    },
});

exports.sendEmailOtp = async(req,res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000); 

    otpStorage[email] = 1234;

    const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
    };
    return res.status(200).json({ success: true, message: "OTP sent successfully." });
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ success: false, message: "Please enter a valid email id" });
        } else {
            res.status(200).json({ success: true, message: "OTP sent successfully." });
        }
    });
}

exports.verifyEmailOtp = async(req,res) => {
    const { email, otp } = req.body;
    if (otpStorage[email] && otpStorage[email] === parseInt(otp, 10)) {
        delete otpStorage[email]; 
        res.status(200).json({ success: true, message: "OTP verified successfully." });
    } else {
        res.status(400).json({ success: false, message: "Invalid OTP." });
    }
}





