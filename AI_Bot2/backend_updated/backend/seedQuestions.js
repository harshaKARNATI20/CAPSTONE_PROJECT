require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Define your sample questions
    const questions = [
      // ----- MERN Stack (Technical - Beginner) -----
      {
        domain: 'FullStack.Web.MERN',
        round: 'Technical',
        topic: 'Node.js',
        level: 'Beginner',
        questionText: 'What is Express.js and why is it used?',
        sampleAnswer: 'Express.js is a Node.js framework used for building APIs and web applications easily using middleware and routing.',
        keywords: ['Node.js', 'framework', 'API', 'routing', 'middleware']
      },
      {
        domain: 'FullStack.Web.MERN',
        round: 'Technical',
        topic: 'React.js',
        level: 'Beginner',
        questionText: 'What are components in React?',
        sampleAnswer: 'Components are reusable building blocks in React that define how parts of the UI should appear and behave.',
        keywords: ['component', 'reusable', 'UI', 'React']
      },
      {
        domain: 'FullStack.Web.MERN',
        round: 'Technical',
        topic: 'MongoDB',
        level: 'Beginner',
        questionText: 'What is MongoDB and how does it store data?',
        sampleAnswer: 'MongoDB is a NoSQL document-oriented database that stores data in JSON-like documents called BSON.',
        keywords: ['NoSQL', 'document', 'BSON', 'JSON']
      },

      // ----- MERN Stack (Technical - Intermediate) -----
      {
        domain: 'FullStack.Web.MERN',
        round: 'Technical',
        topic: 'Express.js',
        level: 'Intermediate',
        questionText: 'What is middleware in Express.js?',
        sampleAnswer: 'Middleware functions in Express.js have access to request and response objects, and can modify them or end the request-response cycle.',
        keywords: ['middleware', 'request', 'response', 'Express']
      },
      {
        domain: 'FullStack.Web.MERN',
        round: 'Technical',
        topic: 'MongoDB',
        level: 'Intermediate',
        questionText: 'What is the difference between findOne() and find() in MongoDB?',
        sampleAnswer: 'findOne() returns a single matching document, whereas find() returns a cursor for all matching documents.',
        keywords: ['findOne', 'find', 'cursor', 'documents']
      },

      // ----- HR Round -----
      {
        domain: 'FullStack.Web.MERN',
        round: 'HR',
        topic: 'General',
        level: 'Beginner',
        questionText: 'Tell me about yourself.',
        sampleAnswer: 'A brief introduction covering background, education, skills, and career interests.',
        keywords: ['introduction', 'skills', 'background', 'education']
      },
      {
        domain: 'FullStack.Web.MERN',
        round: 'HR',
        topic: 'Communication',
        level: 'Intermediate',
        questionText: 'What are your strengths and weaknesses?',
        sampleAnswer: 'Describe key strengths relevant to the job and one weakness that you’re actively improving.',
        keywords: ['strengths', 'weaknesses', 'improving']
      }
    ];

    // Clear old data (optional)
    await Question.deleteMany({});
    console.log('🧹 Old questions cleared.');

    // Insert new questions
    const inserted = await Question.insertMany(questions);
    console.log(`✅ Inserted ${inserted.length} questions successfully.`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seedQuestions();
