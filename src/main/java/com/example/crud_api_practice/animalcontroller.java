package com.example.crud_api_practice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.crud_api_practice.Animal;
import com.example.crud_api_practice.AnimalService;

@RestController
public class AnimalController {

    @Autowired
    private AnimalService animalService;

      /**
   * Endpoint to get all animals
   *
   * @return List of all animals
   */
  @GetMapping("/animals")
  public Object getAllAnimals() {
    return animalService.getAllAnimals();
  }
  
      /**
   * Endpoint to get an animal by ID
   *
   * @param animalId The ID of the animal to retrieve
   * @return The animal with the specified ID
   */
  @GetMapping("/animals/{animalId}")
  public Animal getAnimalById(@PathVariable long animalId) {
    return animalService.getAnimalById(animalId);
  }

  @GetMapping("/animals/name")
  public Object getAnimalsByName(@RequestParam String name) {
    return animalService.getAnimalsByName(name);
  }

  @GetMapping("/animals/danger/{dangerLevel}")
  public Object getAnimalsByDangerLevel(@PathVariable String dangerLevel) {
    return animalService.getAnimalsByDangerLevel(dangerLevel);
  }

    /**
   * Endpoint to add a new animal
   *
   * @param animal The animal to add
   * @return List of all animals
   */
  @PostMapping("/animals")
  public Object addAnimal(@RequestBody Animal animal) {
    return animalService.addAnimal(animal);
  }

    /**
   * Endpoint to update an animal
   *
   * @param id      The ID of the animal to update
   * @param animal  The updated animal information
   * @return The updated animal
   */
  @PutMapping("/animals/{id}")
  public Animal updateAnimal(@PathVariable Long id, @RequestBody Animal animal) {
    animalService.updateAnimal(id, animal);
    return animalService.getAnimalById(id);
  }

  /**
   * Endpoint to delete an animal by ID
   *
   * @param id The ID of the animal to delete
   * @return List of all animals
   */
  @DeleteMapping("/animals/{id}")
  public Object deleteAnimal(@PathVariable Long id) {
    animalService.deleteAnimal(id);
    return animalService.getAllAnimals();
  }

    /**
   * Endpoint to write an animal to a JSON file
   *
   * @param animal The animal to write
   * @return An empty string indicating success
   */
  @PostMapping("/animals/writeFile")
  public Object writeJson(@RequestBody Animal animal) {
    return animalService.writeJson(animal);
  }

    /**
   * Endpoint to read an animal from a JSON file
   *
   * @return The animal read from the file
   */
  @GetMapping("/animals/readFile")
  public Animal readJson() {
    return animalService.readJson();
  }
}