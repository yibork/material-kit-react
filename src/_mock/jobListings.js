import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// Constants for job data
const JOB_TITLES = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'Sales Associate',
  'Graphic Designer',
  // Add more job titles
];

const COMPANIES = [
  'Google',
  'Amazon',
  'Facebook',
  'Microsoft',
  'Apple',
  // Add more companies
];

const JOB_TYPES = ['Full Time', 'Part Time', 'Contract'];

// Generating job listings
export const jobListings = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    title: sample(JOB_TITLES),
    company: sample(COMPANIES),
    location: `${faker.address.city()}, ${faker.address.state()}`,
    type: sample(JOB_TYPES),
    salary: `$${faker.finance.amount(50000, 200000, 0)} annually`,
    postingDate: faker.date.recent(90).toLocaleDateString()
  }));
  