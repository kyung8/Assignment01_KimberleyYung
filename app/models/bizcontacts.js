
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BizContactsSchema = new Schema ({
    contactName: String,
    contactNumber: String,
    emailAddress: String,
}, {
    timestamps: true,
    collection: 'bizcontacts'
})

export default mongoose.model('BizContacts', BizContactsSchema);