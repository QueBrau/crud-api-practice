package com.example.crud_api_practice;

import java.io.IOException;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.crud_api_practice.Animal;
import com.example.crud_api_practice.AnimalRepository;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

      /**
   * Method to get all animals
   *
   * @return List of all animals
   */
  public Object getAllAnimals() {
    return animalRepository.findAll();
  }
  
  /**
   * Method to get a student by ID
   *
   * @param studentId The ID of the student to retrieve
   * @return The student with the specified ID
   */
  public Animal getAnimalById(@PathVariable long animalId) {
    return animalRepository.findById(animalId).orElse(null);
  }

    /**
   * Method to get animals by name
   *
   * @param name The name of the animal to search for
   * @return List of animals with the specified name
   */
  public Object getAnimalsByName(String name) {
    return animalRepository.getAnimalsByName(name);
  }

    /**
   * Method to add a new animal
   *
   * @param animal The animal to add
   * @return The added animal
   */
  public Animal addAnimal(Animal animal) {
    return animalRepository.save(animal);
  }

    /**
   * Method to update an existing animal
   *
   * @param animalId The ID of the animal to update
   * @param updatedAnimal The updated animal data
   * @return The updated animal
   */
  public Animal updateAnimal(long animalId, Animal updatedAnimal) {
    Animal existingAnimal = animalRepository.findById(animalId).orElse(null);
    if (existingAnimal != null) {
      existingAnimal.setName(updatedAnimal.getName());
      existingAnimal.setDescription(updatedAnimal.getDescription());
      existingAnimal.setOrigin(updatedAnimal.getOrigin());
      existingAnimal.setDangerLevel(updatedAnimal.getDangerLevel());
      return animalRepository.save(existingAnimal);
    }
    return null;
    }

      /**
   * Method to delete an animal by ID
   *
   * @param animalId The ID of the animal to delete
   */
  public void deleteAnimal(Long animalId) {
    animalRepository.deleteById(animalId);
  }

  public Object getAnimalsByDangerLevel(String dangerLevel) {
    return animalRepository.findByDangerLevel(dangerLevel);
  }

    /**
   * Method to read an animal object from a JSON file
   *
   * @return The animal object read from the JSON file
   */
  public Animal readJson() {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      return objectMapper.readValue(new File("animals.json"), Animal.class);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

    /**
   * Method to write a Animal object to a JSON file
   *
   * @param animal The animal object to write
   */
  public String writeJson(Animal animal) {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      objectMapper.writeValue(new File("animals.json"), animal);
      return "Animal written to JSON file successfully";
    } catch (IOException e) {
      e.printStackTrace();
      return "Error writing animal to JSON file";
    }
  }
}