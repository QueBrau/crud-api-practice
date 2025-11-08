import { addAnimal } from '../services/animalService';

export const seedAnimals = async () => {
  const sampleAnimals = [
    {
      name: 'Lemur',
      description: 'Lemurs are small primates native to Madagascar, known for their large, reflective eyes and long, bushy tails. They are social animals that live in groups and are primarily arboreal.',
      origin: 'Madagascar',
      dangerLevel: 'Low'
    },
    {
      name: 'Axolotl',
      description: 'Axolotls are aquatic salamanders native to Mexico, famous for their ability to regenerate limbs. They have external gills and remain in their larval stage throughout their lives.',
      origin: 'Mexico',
      dangerLevel: 'Low'
    },
    {
      name: 'Jaguar',
      description: 'Jaguars are large, powerful cats native to the Americas. They are known for their distinctive spotted coats and are excellent swimmers and hunters.',
      origin: 'South America',
      dangerLevel: 'High'
    },
    {
      name: 'Golden Eagle',
      description: 'Golden Eagles are large birds of prey found in the Northern Hemisphere. They are known for their keen eyesight, powerful talons, and impressive hunting skills.',
      origin: 'Northern Hemisphere',
      dangerLevel: 'Medium'
    },
    {
      name: 'Pit Viper',
      description: 'Pit Vipers are venomous snakes found in the Americas and Asia. They are known for their heat-sensing pits, which help them detect warm-blooded prey.',
      origin: 'Americas and Asia',
      dangerLevel: 'Extreme'
    }
  ];

  try {
    console.log('Starting to seed database with sample animals');
    
    for (let i = 0; i < sampleAnimals.length; i++) {
      const animal = sampleAnimals[i];
      console.log(` Adding ${animal.name}...`);
      
      await addAnimal(animal);
      console.log(` ${animal.name} added successfully`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(' All sample animals added successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding animals:', error);
    return false;
  }
};

export const isDatabaseEmpty = async () => {
  try {
    const { getAllAnimals } = await import('../services/animalService');
    const animals = await getAllAnimals();
    return animals.length === 0;
  } catch (error) {
    console.error('Error checking database:', error);
    return true;
  }
};