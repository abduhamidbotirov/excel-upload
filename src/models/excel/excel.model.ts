import mongoose, { Schema } from 'mongoose';
import { IContact } from './excel.interface';
const ContactSchema = new Schema<IContact>({
    name: { type: String, },
    date: { type: String, },
    type: { type: String, },
});
export default mongoose.model<IContact>('Contact', ContactSchema);
