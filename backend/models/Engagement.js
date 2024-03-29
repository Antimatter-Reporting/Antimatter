// Import modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const engagementSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    engagementIdentifier: {
        type: String,
        required: [true, "engagementIdentifier is required"],
        unique: true
    },
    executiveSummary: {
        type: String,
        required: false,
        default: "[]"
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: [true, "Engagement client is required"]
    },
    consultants: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    }],
    template: {
        type: Schema.Types.ObjectId,
        ref: "Template",
        // required: [true, "Engagement tempate is required"]
    },
    scope: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["scoping", "in-progress", "delayed", "done", "pending"],
        default: "pending"
    },
    findings: [{
        _id: {
            type: Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId().toHexString(),
            immutable: true
        },
        findingIdentifier: {
            type: String,
            required: [true, "Finding Identifier is required"]
        },
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        category: {
            type: String,
            required: false
        },
        summary: {
            type: String,
            required: false,
            default: "[]"
        },
        evidence: {
            type: String,
            required: false,
            default: "[]"
        },
        impact: {
            type: String,
            required: false,
            default: "[]"
        },
        remediation: {
            type: String,
            required: false,
            default: "[]"
        },
        references: {
            type: String,
            required: false
        },
        severity: {
            type: String,
            enum: ["informational", "low", "moderate", "high", "critical"],
            default: "informational"
        },
        status: {
            type: String,
            enum: ["unaddressed", "remediated", "partially-remediated", "risk-accepted"],
            default: "unaddressed"
        }

    }]
});


module.exports = mongoose.model("engagements", engagementSchema);