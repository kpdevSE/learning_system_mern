const Payement = require('../models/Payement')

exports.makePayment = async (req, res) =>
{
    try
    {
        const {
            loggedUserEmail,
            savedPrice,
            savedLecturerEmail,
            savedDuration,
            savedQuantity,
            savedFullDescription,
            savedSmallDescription,
            savedTopicOne,
            savedTopicTwo,
            savedImageUrl,
            savedUsername,
            cardNumber,
            exDate,
            cvv,
            cardHolderName,
            savedYoutubeUrl
        } = req.body;

        console.log(req.body)


        const payment = new Payement({
            loggedUserEmail,
            savedPrice,
            savedLecturerEmail,
            savedDuration,
            savedQuantity,
            savedFullDescription,
            savedSmallDescription,
            savedTopicOne,
            savedTopicTwo,
            savedImageUrl,
            savedUsername,
            cardNumber,
            exDate,
            cvv,
            cardHolderName,
            savedYoutubeUrl
        });

        await payment.save();

        res.status(201).json({
            success: true,
            message: "Payment saved successfully",
            data: payment
        });
    } catch (err)
    {
        res.status(500).json({ success: false, message: err.message });
    }
};


exports.getAllCoursesByPurchasingEmail = async (req, res) =>
{
    try
    {
        const email = req.user.email;
        const payement = await Payement.find({ loggedUserEmail: email });

        res.status(200).json(
            {
                message: "Courses get successfully",
                data: payement
            }
        )
    } catch (error)
    {
        res.status(500).json({ success: false, message: err.message });
    }
}