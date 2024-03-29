import { Schema, model, models } from 'mongoose';

const PropertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
    },
    location: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zipcode: {
            type: String
        }
    },
    square_feet: {
        type: Number,
        required: true
    },
    amenities: [{
        type: String
    }],
    rates: {
        nightly: {
            type: Number
        },
        weekly: {
            type: Number
        },
        monthly: {
            type: Number
        }
    },
    seller_info: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        }
    },
    images: [{
        type: String,
        required: [true, 'Image is required'],
    }],
    isFeatured: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

const Property = models.Property || model('Property', PropertySchema);

export default Property;