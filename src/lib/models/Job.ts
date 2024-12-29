import mongoose, { Schema, models } from "mongoose";

const jobSchema = new Schema(
    {
        userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        title: {
        type: String,
        required: true,
        },
        slug: {
        type: String,
        required: true,
        },
        skills: {
        type: [String],
        required: true,
        },
        type: {
        type: String,
        required: true,
        },
        company: {
        type: String,
        required: true,
        },
        location: {
        type: String,
        required: true,
        },
        salaryMin: {
        type: Number,
        required: true,
        },
        salaryMax: {
        type: Number,
        required: true,
        },
        description: {
        type: String,
        required: true,
        },
        createdAt: {
        type: Date,
        default: Date.now
        },
    },
    { timestamps: true }
    );

const Job = models?.Job || mongoose.model("Job", jobSchema);
export default Job;