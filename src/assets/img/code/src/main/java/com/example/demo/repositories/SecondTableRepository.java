package com.example.demo.repositories;

import com.example.demo.models.SecondTable;
import org.springframework.data.repository.CrudRepository;

public interface SecondTableRepository extends CrudRepository<SecondTable, Long> {
}
