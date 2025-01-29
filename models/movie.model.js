import mongoose  from "mongoose";

const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
   
});

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String },
    year: { type: Number, required: true },
    genre: { type: ObjectId, ref: 'genres', required: true },
    detail: { type: String, required: true },
    director:{type: String},
    cast: [{ type: String }],
    reviews: [reviewSchema],
    numReview: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Movie = mongoose.model("movies", movieSchema);

export default Movie;
