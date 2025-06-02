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
        currency: {
            type: String,
            enum: ["USD", "EUR", "DZD"],
            default: "EUR",
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
        urlToApply: {
            type: String,
            required: true,
        },
        percentage: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        status: {
            type: String,
            enum: ["open", "closed", "draft"],
            default: "draft",
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
    );

const Job = models?.Job || mongoose.model("Job", jobSchema);
export default Job;