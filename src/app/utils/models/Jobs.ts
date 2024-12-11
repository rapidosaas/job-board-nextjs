import mongoose, { Schema, models } from "mongoose";

const jobSchema = new Schema(
    {
        title: {
        type: String,
        required: true,
        },
        slug: {
        type: String,
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
        salary: {
        type: Number,
        required: true,
        },
        description: {
        type: String,
        required: true,
        },
        createdAt: {
        type: Date,
        default: Date.now,
        },
    },
    { timestamps: true }
    );

export const Job = models.Job || mongoose.model("Job", jobSchema);