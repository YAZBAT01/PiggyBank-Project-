import 'reflect-metadata';
import { createServer } from 'http';
import app from './app';
import mongoose from 'mongoose';

mongoose.set('debug', true);
mongoose
  .connect('mongodb+srv://manto:ciccio@cluster0.ucnmtam.mongodb.net/piggybank')
  .then((_) => {
    createServer(app).listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch((err) => {
    console.error(err);
  });
