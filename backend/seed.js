const mongoose = require('mongoose');
const Scheme = require('./models/Scheme');
const Object = require('mongoose'); // just placeholder

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shefinaware';

const mockSchemes = [
  {
    name: "PRADHAN MANTRI MUDRA YOJANA",
    description: "Loans up to ₹10 Lakhs for non-corporate, non-farm small/micro enterprises.",
    eligibility: { maxIncome: null, state: 'All', category: 'All' },
    url: "https://www.mudra.org.in/",
    benefitAmount: 1000000
  },
  {
    name: "MAHILA SAMMAN SAVINGS CERTIFICATE",
    description: "A small savings scheme for women and girls offering an interest rate of 7.5% per annum.",
    eligibility: { maxIncome: null, state: 'All', category: 'Women' },
    url: "https://www.indiapost.gov.in/",
    benefitAmount: 200000
  },
  {
    name: "STAND UP INDIA",
    description: "Facilitating bank loans between ₹10 lakh and ₹1 Crore to at least one Woman borrower per bank branch for setting up a greenfield enterprise.",
    eligibility: { maxIncome: null, state: 'All', category: 'SC/ST/Women' },
    url: "https://www.standupmitra.in/",
    benefitAmount: 10000000
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for seeding...');
    await Scheme.deleteMany({});
    await Scheme.insertMany(mockSchemes);
    console.log('Schemes seed successfully inserted.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seed Error:', err);
    process.exit(1);
  });
