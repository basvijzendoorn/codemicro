package com.example.demo.controllers;

import com.example.demo.models.FirstTable;
import com.example.demo.repositories.FirstTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
public class FirstTableController {

    private final FirstTableRepository firsttableRepository;

    @GetMapping("/firsttable/{id}/")
    public FirstTable getFirstTable(@PathVariable("id") Long id) {
        return firsttableRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "FirstTable not found."));
    }

    @PostMapping("/firsttable")
    @ResponseStatus(HttpStatus.CREATED)
    public FirstTable postFirstTable(@RequestBody FirstTable firsttable) {
        return firsttableRepository.save(firsttable);
    }

    @PutMapping("/firsttable/{id}/")
    public FirstTable putFirstTable(@PathVariable("id") Long id, @RequestBody FirstTable newFirstTable) {
        newFirstTable.setId(id);
        return firsttableRepository.save(newFirstTable);
    }

    @DeleteMapping("/firsttable/{id}/")
    public void deleteFirstTable(@PathVariable("id") Long id) {
        FirstTable firsttable = firsttableRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "FirstTable not found"));
        firsttableRepository.delete(firsttable);
    }
}
