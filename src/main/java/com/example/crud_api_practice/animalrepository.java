package com.example.crud_api_practice;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.crud_api_practice.Animal;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query("SELECT a FROM Animal a WHERE a.name = ?1")
    List<Animal> getAnimalsByName(String name);

    @Query("SELECT a FROM Animal a WHERE a.dangerLevel = ?1")
    List<Animal> findByDangerLevel(String dangerLevel);
}
