import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  type: string;
  date: string;
}
