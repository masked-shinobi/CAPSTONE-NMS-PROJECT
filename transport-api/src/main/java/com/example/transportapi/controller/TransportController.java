package com.example.transportapi.controller;

import com.example.transportapi.model.Transport;
import com.example.transportapi.service.TransportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/transport")
public class TransportController {
    private final TransportService transportService;

    public TransportController(TransportService transportService) {
        this.transportService = transportService;
    }

    // ONF TAPI Mapping: POST = Service Creation
    @PostMapping
    public ResponseEntity<Transport> createTransport(@RequestBody Transport transport) {
        return new ResponseEntity<>(transportService.createTransport(transport), HttpStatus.CREATED);
    }

    // ONF TAPI Mapping: GET = Topology Query
    @GetMapping
    public ResponseEntity<List<Transport>> getAllTransports() {
        return new ResponseEntity<>(transportService.getAllTransports(), HttpStatus.OK);
    }

    // ONF TAPI Mapping: GET = Topology Query (Single Resource)
    @GetMapping("/{id}")
    public ResponseEntity<Transport> getTransportById(@PathVariable String id) {
        return new ResponseEntity<>(transportService.getTransportById(id), HttpStatus.OK);
    }

    // ONF TAPI Mapping: PUT = Service Update
    @PutMapping("/{id}")
    public ResponseEntity<Transport> updateTransport(@PathVariable String id, @RequestBody Transport transport) {
        return new ResponseEntity<>(transportService.updateTransport(id, transport), HttpStatus.OK);
    }

    // ONF TAPI Mapping: DELETE = Service Termination
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransport(@PathVariable String id) {
        transportService.deleteTransport(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
