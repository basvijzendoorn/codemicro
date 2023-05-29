package com.example.demo.repositories;

import com.example.demo.models.FirstTable;
import org.springframework.data.repository.CrudRepository;

public interface FirstTableRepository extends CrudRepository<FirstTable, Long> {
}
