package com.uco.pch.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.uco.pch.entities.Category;

@CrossOrigin(origins = "http://localhost:5173")
@RepositoryRestResource(path = "categories")
public interface CategoryRepository extends CrudRepository<Category, Long> {

}
