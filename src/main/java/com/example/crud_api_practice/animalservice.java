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

  public Object getAllAnimals() {
    return animalRepository.findAll();
  }
  
  public Animal getAnimalById(@PathVariable long animalId) {
    return animalRepository.findById(animalId).orElse(null);
  }

  public Object getAnimalsByName(String name) {
    return animalRepository.getAnimalsByName(name);
  }

  public Animal addAnimal(Animal animal) {
    return animalRepository.save(animal);
  }

  public Animal updateAnimal(long animalId, Animal updatedAnimal) {
    Animal existingAnimal = animalRepository.findById(animalId).orElse(null);
    if (existingAnimal != null) {
      existingAnimal.setName(updatedAnimal.getName());
      existingAnimal.setDescription(updatedAnimal.getDescription());
      existingAnimal.setOrigin(updatedAnimal.getOrigin());
      existingAnimal.setDangerLevel(updatedAnimal.getDangerLevel());
      existingAnimal.setImage(updatedAnimal.getImage());
      return animalRepository.save(existingAnimal);
    }
    return null;
    }

  public void deleteAnimal(Long animalId) {
    animalRepository.deleteById(animalId);
  }

  public Object getAnimalsByDangerLevel(String dangerLevel) {
    return animalRepository.findByDangerLevel(dangerLevel);
  }

  public Animal readJson() {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      return objectMapper.readValue(new File("animals.json"), Animal.class);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

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