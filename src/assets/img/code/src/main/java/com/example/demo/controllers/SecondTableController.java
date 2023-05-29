package com.example.demo.controllers;

import com.example.demo.models.SecondTable;
import com.example.demo.repositories.SecondTableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
public class SecondTableController {

    private final SecondTableRepository secondtableRepository;

    @GetMapping("/secondtable/{id}/")
    public SecondTable getSecondTable(@PathVariable("id") Long id) {
        return secondtableRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "SecondTable not found."));
    }

    @PostMapping("/secondtable")
    @ResponseStatus(HttpStatus.CREATED)
    public SecondTable postSecondTable(@RequestBody SecondTable secondtable) {
        return secondtableRepository.save(secondtable);
    }

    @PutMapping("/secondtable/{id}/")
    public SecondTable putSecondTable(@PathVariable("id") Long id, @RequestBody SecondTable newSecondTable) {
        newSecondTable.setId(id);
        return secondtableRepository.save(newSecondTable);
    }

    @DeleteMapping("/secondtable/{id}/")
    public void deleteSecondTable(@PathVariable("id") Long id) {
        SecondTable secondtable = secondtableRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "SecondTable not found"));
        secondtableRepository.delete(secondtable);
    }
}
