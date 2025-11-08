package com.example.crud_api_practice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.crud_api_practice.Animal;
import com.example.crud_api_practice.AnimalService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}, allowedHeaders = "*")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

  @GetMapping("/animals")
  public Object getAllAnimals() {
    return animalService.getAllAnimals();
  }
  
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

  @PostMapping("/animals")
  public Object addAnimal(@RequestBody Animal animal) {
    return animalService.addAnimal(animal);
  }

  @PutMapping("/animals/{id}")
  public Animal updateAnimal(@PathVariable Long id, @RequestBody Animal animal) {
    animalService.updateAnimal(id, animal);
    return animalService.getAnimalById(id);
  }

  @DeleteMapping("/animals/{id}")
  public Object deleteAnimal(@PathVariable Long id) {
    animalService.deleteAnimal(id);
    return animalService.getAllAnimals();
  }

  @PostMapping("/animals/writeFile")
  public Object writeJson(@RequestBody Animal animal) {
    return animalService.writeJson(animal);
  }

  @GetMapping("/animals/readFile")
  public Animal readJson() {
    return animalService.readJson();
  }
}