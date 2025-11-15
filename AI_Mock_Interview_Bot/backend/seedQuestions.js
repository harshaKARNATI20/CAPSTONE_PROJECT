const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const questions = [
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "React",
    "level": "Beginner",
    "questionText": "What do you understand by React in the context of FullStack?",
    "sampleAnswer": "React is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "React",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "Node.js",
    "level": "Beginner",
    "questionText": "What do you understand by Node.js in the context of FullStack?",
    "sampleAnswer": "Node.js is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Node.js",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "MongoDB",
    "level": "Beginner",
    "questionText": "What do you understand by MongoDB in the context of FullStack?",
    "sampleAnswer": "MongoDB is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "MongoDB",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "Express",
    "level": "Intermediate",
    "questionText": "What do you understand by Express in the context of FullStack?",
    "sampleAnswer": "Express is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Express",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "Frontend",
    "level": "Intermediate",
    "questionText": "What do you understand by Frontend in the context of FullStack?",
    "sampleAnswer": "Frontend is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Frontend",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "Backend",
    "level": "Intermediate",
    "questionText": "What do you understand by Backend in the context of FullStack?",
    "sampleAnswer": "Backend is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Backend",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "APIs",
    "level": "Intermediate",
    "questionText": "What do you understand by APIs in the context of FullStack?",
    "sampleAnswer": "APIs is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "APIs",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "Hooks",
    "level": "Advanced",
    "questionText": "What do you understand by Hooks in the context of FullStack?",
    "sampleAnswer": "Hooks is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Hooks",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "Deployment",
    "level": "Advanced",
    "questionText": "What do you understand by Deployment in the context of FullStack?",
    "sampleAnswer": "Deployment is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Deployment",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.MERN",
    "round": "Technical",
    "topic": "Performance",
    "level": "Advanced",
    "questionText": "What do you understand by Performance in the context of FullStack?",
    "sampleAnswer": "Performance is an important concept in FullStack.Web.MERN. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Performance",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "Spring Boot",
    "level": "Beginner",
    "questionText": "What do you understand by Spring Boot in the context of FullStack?",
    "sampleAnswer": "Spring Boot is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Spring",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "Hibernate",
    "level": "Beginner",
    "questionText": "What do you understand by Hibernate in the context of FullStack?",
    "sampleAnswer": "Hibernate is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Hibernate",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "JPA",
    "level": "Beginner",
    "questionText": "What do you understand by JPA in the context of FullStack?",
    "sampleAnswer": "JPA is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "JPA",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "REST API",
    "level": "Intermediate",
    "questionText": "What do you understand by REST API in the context of FullStack?",
    "sampleAnswer": "REST API is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "REST",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "Microservices",
    "level": "Intermediate",
    "questionText": "What do you understand by Microservices in the context of FullStack?",
    "sampleAnswer": "Microservices is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Microservices",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "JSP",
    "level": "Intermediate",
    "questionText": "What do you understand by JSP in the context of FullStack?",
    "sampleAnswer": "JSP is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "JSP",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "Servlets",
    "level": "Intermediate",
    "questionText": "What do you understand by Servlets in the context of FullStack?",
    "sampleAnswer": "Servlets is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Servlets",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "Security",
    "level": "Advanced",
    "questionText": "What do you understand by Security in the context of FullStack?",
    "sampleAnswer": "Security is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Security",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "Testing",
    "level": "Advanced",
    "questionText": "What do you understand by Testing in the context of FullStack?",
    "sampleAnswer": "Testing is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Testing",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Java",
    "round": "Technical",
    "topic": "Architecture",
    "level": "Advanced",
    "questionText": "What do you understand by Architecture in the context of FullStack?",
    "sampleAnswer": "Architecture is an important concept in FullStack.Web.Java. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Architecture",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "Django",
    "level": "Beginner",
    "questionText": "What do you understand by Django in the context of FullStack?",
    "sampleAnswer": "Django is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Django",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "Flask",
    "level": "Beginner",
    "questionText": "What do you understand by Flask in the context of FullStack?",
    "sampleAnswer": "Flask is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Flask",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "ORM",
    "level": "Beginner",
    "questionText": "What do you understand by ORM in the context of FullStack?",
    "sampleAnswer": "ORM is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "ORM",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "Templates",
    "level": "Intermediate",
    "questionText": "What do you understand by Templates in the context of FullStack?",
    "sampleAnswer": "Templates is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Templates",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "API",
    "level": "Intermediate",
    "questionText": "What do you understand by API in the context of FullStack?",
    "sampleAnswer": "API is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "API",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "Security",
    "level": "Intermediate",
    "questionText": "What do you understand by Security in the context of FullStack?",
    "sampleAnswer": "Security is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Security",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "Caching",
    "level": "Intermediate",
    "questionText": "What do you understand by Caching in the context of FullStack?",
    "sampleAnswer": "Caching is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Caching",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "Deployment",
    "level": "Advanced",
    "questionText": "What do you understand by Deployment in the context of FullStack?",
    "sampleAnswer": "Deployment is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Deployment",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "Signals",
    "level": "Advanced",
    "questionText": "What do you understand by Signals in the context of FullStack?",
    "sampleAnswer": "Signals is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Signals",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "FullStack.Web.Python",
    "round": "Technical",
    "topic": "Architecture",
    "level": "Advanced",
    "questionText": "What do you understand by Architecture in the context of FullStack?",
    "sampleAnswer": "Architecture is an important concept in FullStack.Web.Python. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Architecture",
      "FullStack",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "Pandas",
    "level": "Beginner",
    "questionText": "What do you understand by Pandas in the context of DataScience?",
    "sampleAnswer": "Pandas is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Pandas",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "Numpy",
    "level": "Beginner",
    "questionText": "What do you understand by Numpy in the context of DataScience?",
    "sampleAnswer": "Numpy is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Numpy",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "Visualization",
    "level": "Beginner",
    "questionText": "What do you understand by Visualization in the context of DataScience?",
    "sampleAnswer": "Visualization is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Visualization",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "EDA",
    "level": "Intermediate",
    "questionText": "What do you understand by EDA in the context of DataScience?",
    "sampleAnswer": "EDA is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "EDA",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "Cleaning",
    "level": "Intermediate",
    "questionText": "What do you understand by Cleaning in the context of DataScience?",
    "sampleAnswer": "Cleaning is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Cleaning",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "Statistics",
    "level": "Intermediate",
    "questionText": "What do you understand by Statistics in the context of DataScience?",
    "sampleAnswer": "Statistics is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Statistics",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "Regression",
    "level": "Intermediate",
    "questionText": "What do you understand by Regression in the context of DataScience?",
    "sampleAnswer": "Regression is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Regression",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "Classification",
    "level": "Advanced",
    "questionText": "What do you understand by Classification in the context of DataScience?",
    "sampleAnswer": "Classification is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Classification",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "FeatureEngineering",
    "level": "Advanced",
    "questionText": "What do you understand by FeatureEngineering in the context of DataScience?",
    "sampleAnswer": "FeatureEngineering is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "FeatureEngineering",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "DataScience",
    "round": "Technical",
    "topic": "MLPrep",
    "level": "Advanced",
    "questionText": "What do you understand by MLPrep in the context of DataScience?",
    "sampleAnswer": "MLPrep is an important concept in DataScience. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "MLPrep",
      "DataScience",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "Supervised",
    "level": "Beginner",
    "questionText": "What do you understand by Supervised in the context of MachineLearning?",
    "sampleAnswer": "Supervised is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Supervised",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "Unsupervised",
    "level": "Beginner",
    "questionText": "What do you understand by Unsupervised in the context of MachineLearning?",
    "sampleAnswer": "Unsupervised is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Unsupervised",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "NeuralNetworks",
    "level": "Beginner",
    "questionText": "What do you understand by NeuralNetworks in the context of MachineLearning?",
    "sampleAnswer": "NeuralNetworks is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "NeuralNetworks",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "SVM",
    "level": "Intermediate",
    "questionText": "What do you understand by SVM in the context of MachineLearning?",
    "sampleAnswer": "SVM is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "SVM",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "Regression",
    "level": "Intermediate",
    "questionText": "What do you understand by Regression in the context of MachineLearning?",
    "sampleAnswer": "Regression is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Regression",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "Overfitting",
    "level": "Intermediate",
    "questionText": "What do you understand by Overfitting in the context of MachineLearning?",
    "sampleAnswer": "Overfitting is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Overfitting",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "ModelEvaluation",
    "level": "Intermediate",
    "questionText": "What do you understand by ModelEvaluation in the context of MachineLearning?",
    "sampleAnswer": "ModelEvaluation is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "ModelEvaluation",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "CrossValidation",
    "level": "Advanced",
    "questionText": "What do you understand by CrossValidation in the context of MachineLearning?",
    "sampleAnswer": "CrossValidation is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "CrossValidation",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "Clustering",
    "level": "Advanced",
    "questionText": "What do you understand by Clustering in the context of MachineLearning?",
    "sampleAnswer": "Clustering is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Clustering",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "MachineLearning",
    "round": "Technical",
    "topic": "FeatureSelection",
    "level": "Advanced",
    "questionText": "What do you understand by FeatureSelection in the context of MachineLearning?",
    "sampleAnswer": "FeatureSelection is an important concept in MachineLearning. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "FeatureSelection",
      "MachineLearning",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "AWS",
    "level": "Beginner",
    "questionText": "What do you understand by AWS in the context of CloudComputing?",
    "sampleAnswer": "AWS is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "AWS",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "Azure",
    "level": "Beginner",
    "questionText": "What do you understand by Azure in the context of CloudComputing?",
    "sampleAnswer": "Azure is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Azure",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "GCP",
    "level": "Beginner",
    "questionText": "What do you understand by GCP in the context of CloudComputing?",
    "sampleAnswer": "GCP is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "GCP",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "DevOps",
    "level": "Intermediate",
    "questionText": "What do you understand by DevOps in the context of CloudComputing?",
    "sampleAnswer": "DevOps is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "DevOps",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "Scaling",
    "level": "Intermediate",
    "questionText": "What do you understand by Scaling in the context of CloudComputing?",
    "sampleAnswer": "Scaling is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Scaling",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "Virtualization",
    "level": "Intermediate",
    "questionText": "What do you understand by Virtualization in the context of CloudComputing?",
    "sampleAnswer": "Virtualization is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Virtualization",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "Networking",
    "level": "Intermediate",
    "questionText": "What do you understand by Networking in the context of CloudComputing?",
    "sampleAnswer": "Networking is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Networking",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "IaaS",
    "level": "Advanced",
    "questionText": "What do you understand by IaaS in the context of CloudComputing?",
    "sampleAnswer": "IaaS is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "IaaS",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "PaaS",
    "level": "Advanced",
    "questionText": "What do you understand by PaaS in the context of CloudComputing?",
    "sampleAnswer": "PaaS is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "PaaS",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "CloudComputing",
    "round": "Technical",
    "topic": "SaaS",
    "level": "Advanced",
    "questionText": "What do you understand by SaaS in the context of CloudComputing?",
    "sampleAnswer": "SaaS is an important concept in CloudComputing. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "SaaS",
      "CloudComputing",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "Manual",
    "level": "Beginner",
    "questionText": "What do you understand by Manual in the context of SoftwareTesting?",
    "sampleAnswer": "Manual is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Manual",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "Automation",
    "level": "Beginner",
    "questionText": "What do you understand by Automation in the context of SoftwareTesting?",
    "sampleAnswer": "Automation is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Automation",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "Selenium",
    "level": "Beginner",
    "questionText": "What do you understand by Selenium in the context of SoftwareTesting?",
    "sampleAnswer": "Selenium is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Selenium",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "TestCases",
    "level": "Intermediate",
    "questionText": "What do you understand by TestCases in the context of SoftwareTesting?",
    "sampleAnswer": "TestCases is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "TestCases",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "Regression",
    "level": "Intermediate",
    "questionText": "What do you understand by Regression in the context of SoftwareTesting?",
    "sampleAnswer": "Regression is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Regression",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "UnitTesting",
    "level": "Intermediate",
    "questionText": "What do you understand by UnitTesting in the context of SoftwareTesting?",
    "sampleAnswer": "UnitTesting is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "UnitTesting",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "Jest",
    "level": "Intermediate",
    "questionText": "What do you understand by Jest in the context of SoftwareTesting?",
    "sampleAnswer": "Jest is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Jest",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "JMeter",
    "level": "Advanced",
    "questionText": "What do you understand by JMeter in the context of SoftwareTesting?",
    "sampleAnswer": "JMeter is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "JMeter",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "LoadTesting",
    "level": "Advanced",
    "questionText": "What do you understand by LoadTesting in the context of SoftwareTesting?",
    "sampleAnswer": "LoadTesting is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "LoadTesting",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "SoftwareTesting",
    "round": "Technical",
    "topic": "BugTracking",
    "level": "Advanced",
    "questionText": "What do you understand by BugTracking in the context of SoftwareTesting?",
    "sampleAnswer": "BugTracking is an important concept in SoftwareTesting. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "BugTracking",
      "SoftwareTesting",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "GameObject",
    "level": "Beginner",
    "questionText": "What do you understand by GameObject in the context of GameDevelopment?",
    "sampleAnswer": "GameObject is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "GameObject",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "Components",
    "level": "Beginner",
    "questionText": "What do you understand by Components in the context of GameDevelopment?",
    "sampleAnswer": "Components is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Components",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "Scripting",
    "level": "Beginner",
    "questionText": "What do you understand by Scripting in the context of GameDevelopment?",
    "sampleAnswer": "Scripting is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Scripting",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "Physics",
    "level": "Intermediate",
    "questionText": "What do you understand by Physics in the context of GameDevelopment?",
    "sampleAnswer": "Physics is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Physics",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "Rendering",
    "level": "Intermediate",
    "questionText": "What do you understand by Rendering in the context of GameDevelopment?",
    "sampleAnswer": "Rendering is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Rendering",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "Animation",
    "level": "Intermediate",
    "questionText": "What do you understand by Animation in the context of GameDevelopment?",
    "sampleAnswer": "Animation is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Animation",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "UI",
    "level": "Intermediate",
    "questionText": "What do you understand by UI in the context of GameDevelopment?",
    "sampleAnswer": "UI is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "UI",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "Lighting",
    "level": "Advanced",
    "questionText": "What do you understand by Lighting in the context of GameDevelopment?",
    "sampleAnswer": "Lighting is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Lighting",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "Optimization",
    "level": "Advanced",
    "questionText": "What do you understand by Optimization in the context of GameDevelopment?",
    "sampleAnswer": "Optimization is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Optimization",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "GameDevelopment.Unity",
    "round": "Technical",
    "topic": "Build",
    "level": "Advanced",
    "questionText": "What do you understand by Build in the context of GameDevelopment?",
    "sampleAnswer": "Build is an important concept in GameDevelopment.Unity. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Build",
      "GameDevelopment",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "Arrays",
    "level": "Beginner",
    "questionText": "What do you understand by Arrays in the context of DSA?",
    "sampleAnswer": "Arrays is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Arrays",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "LinkedList",
    "level": "Beginner",
    "questionText": "What do you understand by LinkedList in the context of DSA?",
    "sampleAnswer": "LinkedList is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "LinkedList",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "Stack",
    "level": "Beginner",
    "questionText": "What do you understand by Stack in the context of DSA?",
    "sampleAnswer": "Stack is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Stack",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "Queue",
    "level": "Intermediate",
    "questionText": "What do you understand by Queue in the context of DSA?",
    "sampleAnswer": "Queue is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Queue",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "Trees",
    "level": "Intermediate",
    "questionText": "What do you understand by Trees in the context of DSA?",
    "sampleAnswer": "Trees is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Trees",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "Graphs",
    "level": "Intermediate",
    "questionText": "What do you understand by Graphs in the context of DSA?",
    "sampleAnswer": "Graphs is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Graphs",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "Sorting",
    "level": "Intermediate",
    "questionText": "What do you understand by Sorting in the context of DSA?",
    "sampleAnswer": "Sorting is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Sorting",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "Searching",
    "level": "Advanced",
    "questionText": "What do you understand by Searching in the context of DSA?",
    "sampleAnswer": "Searching is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Searching",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "DynamicProgramming",
    "level": "Advanced",
    "questionText": "What do you understand by DynamicProgramming in the context of DSA?",
    "sampleAnswer": "DynamicProgramming is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "DynamicProgramming",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "DSA",
    "round": "Technical",
    "topic": "Hashing",
    "level": "Advanced",
    "questionText": "What do you understand by Hashing in the context of DSA?",
    "sampleAnswer": "Hashing is an important concept in DSA. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Hashing",
      "DSA",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "TCP/IP",
    "level": "Beginner",
    "questionText": "What do you understand by TCP/IP in the context of Networking?",
    "sampleAnswer": "TCP/IP is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "TCP/IP",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "OSI",
    "level": "Beginner",
    "questionText": "What do you understand by OSI in the context of Networking?",
    "sampleAnswer": "OSI is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "OSI",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "Routing",
    "level": "Beginner",
    "questionText": "What do you understand by Routing in the context of Networking?",
    "sampleAnswer": "Routing is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Routing",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "Switching",
    "level": "Intermediate",
    "questionText": "What do you understand by Switching in the context of Networking?",
    "sampleAnswer": "Switching is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Switching",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "DNS",
    "level": "Intermediate",
    "questionText": "What do you understand by DNS in the context of Networking?",
    "sampleAnswer": "DNS is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "DNS",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "HTTP",
    "level": "Intermediate",
    "questionText": "What do you understand by HTTP in the context of Networking?",
    "sampleAnswer": "HTTP is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "HTTP",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "Firewalls",
    "level": "Intermediate",
    "questionText": "What do you understand by Firewalls in the context of Networking?",
    "sampleAnswer": "Firewalls is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Firewalls",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "VPN",
    "level": "Advanced",
    "questionText": "What do you understand by VPN in the context of Networking?",
    "sampleAnswer": "VPN is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "VPN",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "Protocols",
    "level": "Advanced",
    "questionText": "What do you understand by Protocols in the context of Networking?",
    "sampleAnswer": "Protocols is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Protocols",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "Networking",
    "round": "Technical",
    "topic": "Security",
    "level": "Advanced",
    "questionText": "What do you understand by Security in the context of Networking?",
    "sampleAnswer": "Security is an important concept in Networking. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Security",
      "Networking",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "Processes",
    "level": "Beginner",
    "questionText": "What do you understand by Processes in the context of OperatingSystems?",
    "sampleAnswer": "Processes is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Processes",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "Threads",
    "level": "Beginner",
    "questionText": "What do you understand by Threads in the context of OperatingSystems?",
    "sampleAnswer": "Threads is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Threads",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "Scheduling",
    "level": "Beginner",
    "questionText": "What do you understand by Scheduling in the context of OperatingSystems?",
    "sampleAnswer": "Scheduling is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Scheduling",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "MemoryManagement",
    "level": "Intermediate",
    "questionText": "What do you understand by MemoryManagement in the context of OperatingSystems?",
    "sampleAnswer": "MemoryManagement is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "MemoryManagement",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "FileSystem",
    "level": "Intermediate",
    "questionText": "What do you understand by FileSystem in the context of OperatingSystems?",
    "sampleAnswer": "FileSystem is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "FileSystem",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "Deadlock",
    "level": "Intermediate",
    "questionText": "What do you understand by Deadlock in the context of OperatingSystems?",
    "sampleAnswer": "Deadlock is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Deadlock",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "Concurrency",
    "level": "Intermediate",
    "questionText": "What do you understand by Concurrency in the context of OperatingSystems?",
    "sampleAnswer": "Concurrency is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Concurrency",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "Paging",
    "level": "Advanced",
    "questionText": "What do you understand by Paging in the context of OperatingSystems?",
    "sampleAnswer": "Paging is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Paging",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "Interrupts",
    "level": "Advanced",
    "questionText": "What do you understand by Interrupts in the context of OperatingSystems?",
    "sampleAnswer": "Interrupts is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Interrupts",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "OperatingSystems",
    "round": "Technical",
    "topic": "SystemCalls",
    "level": "Advanced",
    "questionText": "What do you understand by SystemCalls in the context of OperatingSystems?",
    "sampleAnswer": "SystemCalls is an important concept in OperatingSystems. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "SystemCalls",
      "OperatingSystems",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "Scalability",
    "level": "Beginner",
    "questionText": "What do you understand by Scalability in the context of SystemDesign?",
    "sampleAnswer": "Scalability is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Scalability",
      "SystemDesign",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "Caching",
    "level": "Beginner",
    "questionText": "What do you understand by Caching in the context of SystemDesign?",
    "sampleAnswer": "Caching is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Caching",
      "SystemDesign",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "DatabaseDesign",
    "level": "Beginner",
    "questionText": "What do you understand by DatabaseDesign in the context of SystemDesign?",
    "sampleAnswer": "DatabaseDesign is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "DatabaseDesign",
      "SystemDesign",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "Microservices",
    "level": "Intermediate",
    "questionText": "What do you understand by Microservices in the context of SystemDesign?",
    "sampleAnswer": "Microservices is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Microservices",
      "SystemDesign",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "LoadBalancing",
    "level": "Intermediate",
    "questionText": "What do you understand by LoadBalancing in the context of SystemDesign?",
    "sampleAnswer": "LoadBalancing is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "LoadBalancing",
      "SystemDesign",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "CDN",
    "level": "Intermediate",
    "questionText": "What do you understand by CDN in the context of SystemDesign?",
    "sampleAnswer": "CDN is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "CDN",
      "SystemDesign",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "APIDesign",
    "level": "Intermediate",
    "questionText": "What do you understand by APIDesign in the context of SystemDesign?",
    "sampleAnswer": "APIDesign is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "APIDesign",
      "SystemDesign",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "MessagingQueue",
    "level": "Advanced",
    "questionText": "What do you understand by MessagingQueue in the context of SystemDesign?",
    "sampleAnswer": "MessagingQueue is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "MessagingQueue",
      "SystemDesign",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "Logging",
    "level": "Advanced",
    "questionText": "What do you understand by Logging in the context of SystemDesign?",
    "sampleAnswer": "Logging is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Logging",
      "SystemDesign",
      "concept"
    ]
  },
  {
    "domain": "SystemDesign",
    "round": "Technical",
    "topic": "Monitoring",
    "level": "Advanced",
    "questionText": "What do you understand by Monitoring in the context of SystemDesign?",
    "sampleAnswer": "Monitoring is an important concept in SystemDesign. It is commonly used to improve efficiency, maintainability, or scalability.",
    "keywords": [
      "Monitoring",
      "SystemDesign",
      "concept"
    ]
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Question.deleteMany({});
    await Question.insertMany(questions);
    console.log('✅ Seeded ' + questions.length + ' questions successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding questions:', err);
    process.exit(1);
  }
})();
