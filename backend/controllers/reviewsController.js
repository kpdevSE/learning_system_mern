const Review = require('../models/reviews');



// Get all reviews
exports.getAllReviews = async (req, res) =>
{
    try
    {
        const reviews = await Review.find()


        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error)
    {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching reviews',
            error: error.message
        });
    }
}

// Get reviews for a specific lecturer
exports.getLecturerReviews = async (req, res) =>
{
    try
    {
        const email = req.params.id;
        console.log(email)
        const reviews = await Review.find({ lecturerEmail: email }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews,
        });
    } catch (error)
    {
        console.error('Error fetching lecturer reviews:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching lecturer reviews',
            error: error.message,
        });
    }
};
// Get reviews created by a specific user
exports.getUserReviews = async (req, res) =>
{
    try
    {
        const { loggedUserEmail } = req.params;

        if (!loggedUserEmail)
        {
            return res.status(400).json({
                success: false,
                message: 'User email is required'
            });
        }

        const reviews = await Review.find({ loggedUserEmail })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error)
    {
        console.error('Error fetching user reviews:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching user reviews',
            error: error.message
        });
    }
}

// Get a single review by ID
exports.getReviewById = async (req, res) =>
{
    try
    {
        const { id } = req.params;

        const review = await Review.findById(id)
            .populate('user', 'name email profileImage');

        if (!review)
        {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: review
        });
    } catch (error)
    {
        console.error('Error fetching review by ID:', error);
        if (error.kind === 'ObjectId')
        {
            return res.status(404).json({
                success: false,
                message: 'Review not found with the provided ID'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching review',
            error: error.message
        });
    }
}

// Create a new review
exports.createReview = async (req, res) =>
{


    try
    {
        const { lecturerEmail, loggedUserEmail, loggedUserName, starCount, description, profileImage } = req.body;

        console.log(lecturerEmail, loggedUserEmail, loggedUserName, starCount, description, profileImage)



        // Create new review
        const review = new Review({
            lecturerEmail,
            loggedUserEmail,
            loggedUserName,
            starCount,
            description,
            profileImage
        });

        await review.save();

        return res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: review
        });
    } catch (error)
    {
        console.error('Error creating review:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while creating review',
            error: error.message
        });
    }
}

// Update an existing review
exports.updateReview = async (req, res) =>
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try
    {
        const { id } = req.params;
        const { starCount, description } = req.body;

        let review = await Review.findById(id);

        if (!review)
        {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if the logged-in user is the review owner
        if (review.loggedUserEmail !== req.body.loggedUserEmail)
        {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this review'
            });
        }

        // Update fields
        review.starCount = starCount || review.starCount;
        review.description = description || review.description;

        // Save updated review
        await review.save();

        return res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            data: review
        });
    } catch (error)
    {
        console.error('Error updating review:', error);
        if (error.kind === 'ObjectId')
        {
            return res.status(404).json({
                success: false,
                message: 'Review not found with the provided ID'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Server error while updating review',
            error: error.message
        });
    }
}

// Delete a review
exports.deleteReview = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const { loggedUserEmail } = req.body;

        const review = await Review.findById(id);

        if (!review)
        {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check if the logged-in user is the review owner
        if (review.loggedUserEmail !== loggedUserEmail)
        {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this review'
            });
        }

        await Review.findByIdAndRemove(id);

        return res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error)
    {
        console.error('Error deleting review:', error);
        if (error.kind === 'ObjectId')
        {
            return res.status(404).json({
                success: false,
                message: 'Review not found with the provided ID'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Server error while deleting review',
            error: error.message
        });
    }
}

// Get average rating for a lecturer
exports.getLecturerRating = async (req, res) =>
{
    try
    {
        const { lecturerEmail } = req.params;

        if (!lecturerEmail)
        {
            return res.status(400).json({
                success: false,
                message: 'Lecturer email is required'
            });
        }

        const reviews = await Review.find({ lecturerEmail });

        if (reviews.length === 0)
        {
            return res.status(200).json({
                success: true,
                averageRating: 0,
                reviewCount: 0
            });
        }

        const totalStars = reviews.reduce((sum, review) => sum + review.starCount, 0);
        const averageRating = totalStars / reviews.length;

        return res.status(200).json({
            success: true,
            averageRating: parseFloat(averageRating.toFixed(1)),
            reviewCount: reviews.length
        });
    } catch (error)
    {
        console.error('Error calculating lecturer rating:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while calculating lecturer rating',
            error: error.message
        });
    }
}


exports.getLecturerReviewsDetails = async (req, res) =>
{
    try
    {
        const email = req.params.id;

        const reviews = await Review.find({ lecturerEmail: email }).sort({ createdAt: -1 });

        const total = reviews.length;
        const average = total > 0
            ? reviews.reduce((acc, review) => acc + review.starCount, 0) / total
            : 0;

        return res.status(200).json({
            success: true,
            count: total,
            data: reviews,
            total,
            average,
        });
    } catch (error)
    {
        console.error('Error fetching lecturer reviews:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching lecturer reviews',
            error: error.message,
        });
    }
};



