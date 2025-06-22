const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Pet = require('../models/Pet');
const User = require('../models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-adoption');
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const sampleShelters = [
  {
    email: 'happypaws@example.com',
    password: 'password123',
    firstName: 'Happy Paws',
    lastName: 'Rescue',
    role: 'shelter',
    phone: '+1-555-123-4567',
    address: {
      street: '123 Rescue Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'US'
    },
    isVerified: true
  },
  {
    email: 'felinefriends@example.com',
    password: 'password123',
    firstName: 'Feline Friends',
    lastName: 'Rescue',
    role: 'shelter',
    phone: '+1-555-234-5678',
    address: {
      street: '456 Cat Avenue',
      city: 'Oakland',
      state: 'CA',
      zipCode: '94601',
      country: 'US'
    },
    isVerified: true
  },
  {
    email: 'goldenhearts@example.com',
    password: 'password123',
    firstName: 'Golden Hearts',
    lastName: 'Shelter',
    role: 'shelter',
    phone: '+1-555-345-6789',
    address: {
      street: '789 Dog Boulevard',
      city: 'San Jose',
      state: 'CA',
      zipCode: '95101',
      country: 'US'
    },
    isVerified: true
  }
];

const samplePets = [
  {
    name: 'Brook',
    type: 'dog',
    breed: 'Pembroke Welsh Corgi',
    age: { years: 2, months: 6 },
    gender: 'female',
    size: 'medium',
    weight: 22, // pounds
    color: ['golden', 'white'],
    description: 'Brook is a delightful Pembroke Welsh Corgi with a heart full of love and energy to spare. She\'s house-trained, great with children, and loves to play fetch in the yard. Brook would make a perfect addition to an active family who can provide her with the exercise and attention she craves.',
    personality: ['friendly', 'energetic', 'loyal', 'intelligent', 'playful'],
    goodWith: {
      children: true,
      dogs: true,
      cats: false
    },
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      specialNeeds: '',
      medications: []
    },
    images: [
      {
        url: '/placeholder.svg?height=400&width=400',
        publicId: 'brook_1',
        isPrimary: true
      }
    ],
    status: 'available',
    adoptionFee: 120,
    location: {
      address: '123 Rescue Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    },
    featured: true
  },
  {
    name: 'Whiskers',
    type: 'cat',
    breed: 'Maine Coon',
    age: { years: 3, months: 0 },
    gender: 'male',
    size: 'large',
    weight: 13, // pounds
    color: ['gray', 'white'],
    description: 'Whiskers is a gentle giant Maine Coon with a loving personality. He enjoys quiet companionship and gentle play. This beautiful cat would be perfect for someone looking for a calm, affectionate feline friend.',
    personality: ['gentle', 'calm', 'affectionate', 'independent'],
    goodWith: {
      children: true,
      dogs: false,
      cats: true
    },
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      specialNeeds: '',
      medications: []
    },
    images: [
      {
        url: '/placeholder.svg?height=400&width=400',
        publicId: 'whiskers_1',
        isPrimary: true
      }
    ],
    status: 'available',
    adoptionFee: 80,
    location: {
      address: '456 Cat Avenue',
      city: 'Oakland',
      state: 'CA',
      zipCode: '94601'
    },
    featured: true
  },
  {
    name: 'Luna',
    type: 'dog',
    breed: 'Siberian Husky',
    age: { years: 2, months: 0 },
    gender: 'female',
    size: 'large',
    weight: 55, // pounds
    color: ['black', 'white'],
    description: 'Luna is an energetic Siberian Husky who loves outdoor adventures and needs an active family. She\'s perfect for hiking, running, and any outdoor activity. Luna is looking for experienced dog owners who understand the needs of this beautiful breed.',
    personality: ['energetic', 'active', 'intelligent', 'independent'],
    goodWith: {
      children: true,
      dogs: true,
      cats: false
    },
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      specialNeeds: 'Needs daily exercise and mental stimulation',
      medications: []
    },
    images: [
      {
        url: '/placeholder.svg?height=400&width=400',
        publicId: 'luna_1',
        isPrimary: true
      }
    ],
    status: 'available',
    adoptionFee: 200,
    location: {
      address: '789 Dog Boulevard',
      city: 'San Jose',
      state: 'CA',
      zipCode: '95101'
    },
    featured: true
  },
  {
    name: 'Mittens',
    type: 'cat',
    breed: 'British Shorthair',
    age: { years: 1, months: 6 },
    gender: 'female',
    size: 'medium',
    weight: 9, // pounds
    color: ['gray'],
    description: 'Mittens is a calm and affectionate British Shorthair who loves cozy spots and gentle pets. She\'s perfect for someone looking for a quiet, loving companion.',
    personality: ['calm', 'affectionate', 'gentle', 'quiet'],
    goodWith: {
      children: true,
      dogs: false,
      cats: true
    },
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      specialNeeds: '',
      medications: []
    },
    images: [
      {
        url: '/placeholder.svg?height=400&width=400',
        publicId: 'mittens_1',
        isPrimary: true
      }
    ],
    status: 'available',
    adoptionFee: 100,
    location: {
      address: '456 Cat Avenue',
      city: 'Oakland',
      state: 'CA',
      zipCode: '94601'
    },
    featured: false
  },
  {
    name: 'Charlie',
    type: 'dog',
    breed: 'Golden Retriever',
    age: { years: 4, months: 0 },
    gender: 'male',
    size: 'large',
    weight: 62, // pounds
    color: ['golden'],
    description: 'Charlie is a friendly Golden Retriever who loves playing fetch and swimming. He\'s great with families and other pets, making him the perfect addition to any loving home.',
    personality: ['friendly', 'playful', 'gentle', 'loyal'],
    goodWith: {
      children: true,
      dogs: true,
      cats: true
    },
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      specialNeeds: '',
      medications: []
    },
    images: [
      {
        url: '/placeholder.svg?height=400&width=400',
        publicId: 'charlie_1',
        isPrimary: true
      }
    ],
    status: 'available',
    adoptionFee: 150,
    location: {
      address: '789 Dog Boulevard',
      city: 'San Jose',
      state: 'CA',
      zipCode: '95101'
    },
    featured: true
  },
  {
    name: 'Shadow',
    type: 'cat',
    breed: 'Domestic Shorthair',
    age: { years: 2, months: 0 },
    gender: 'male',
    size: 'medium',
    weight: 11, // pounds
    color: ['black'],
    description: 'Shadow is a playful black cat who loves interactive toys and sunny windows. He\'s perfect for someone who wants an engaging and entertaining feline companion.',
    personality: ['playful', 'curious', 'social', 'active'],
    goodWith: {
      children: true,
      dogs: false,
      cats: true
    },
    healthInfo: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      specialNeeds: '',
      medications: []
    },
    images: [
      {
        url: '/placeholder.svg?height=400&width=400',
        publicId: 'shadow_1',
        isPrimary: true
      }
    ],
    status: 'available',
    adoptionFee: 60,
    location: {
      address: '456 Cat Avenue',
      city: 'Oakland',
      state: 'CA',
      zipCode: '94601'
    },
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({ role: 'shelter' });
    await Pet.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create shelters
    const shelterPromises = sampleShelters.map(async (shelterData) => {
      const hashedPassword = await bcrypt.hash(shelterData.password, 12);
      return await User.create({
        ...shelterData,
        password: hashedPassword
      });
    });

    const createdShelters = await Promise.all(shelterPromises);
    console.log(`✅ Created ${createdShelters.length} shelters`);

    // Create pets and assign them to shelters
    const petPromises = samplePets.map(async (petData, index) => {
      const shelterIndex = index % createdShelters.length;
      return await Pet.create({
        ...petData,
        shelter: createdShelters[shelterIndex]._id
      });
    });

    const createdPets = await Promise.all(petPromises);
    console.log(`✅ Created ${createdPets.length} pets`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\nCreated accounts:');
    createdShelters.forEach(shelter => {
      console.log(`📧 ${shelter.email} - Password: password123`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

// Run if called directly
if (require.main === module) {
  runSeed();
}

module.exports = { seedDatabase, sampleShelters, samplePets }; 