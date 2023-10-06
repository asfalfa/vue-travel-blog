const mongoose = require('mongoose');

/* PetSchema will correspond to a collection in your MongoDB database. */
const PostSchema = new mongoose.Schema({ 
  id: {
    type: String,
    required: [true, 'Please provide an id for this pet.'],
  },
  title: {
    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  author_name: {
    type: String,
    required: [true, "Please provide the author's name"],
    maxlength: [60, "Author's Name cannot be more than 60 characters"],
  },  
  category: {
    type: Array,
    required: [true, "Please provide the post's content"],
  },
  content: {
    type: String,
    required: [true, "Please provide the post's content"],
  },
  covers: {
    type: Array
  },
  gallery: {
    type: Array
  },
  date: {
    required: [true, 'Please provide a date for this post.'],
    type: Date,
  },
})

module.exports = mongoose.model('Post', PostSchema)