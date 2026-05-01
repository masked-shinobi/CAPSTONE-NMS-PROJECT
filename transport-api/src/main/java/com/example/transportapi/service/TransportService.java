package com.example.transportapi.service;

import com.example.transportapi.exception.TransportNotFoundException;
import com.example.transportapi.model.Transport;
import com.example.transportapi.repository.TransportRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TransportService {
    private final TransportRepository transportRepository;

    public TransportService(TransportRepository transportRepository) {
        this.transportRepository = transportRepository;
    }

    public Transport createTransport(Transport transport) {
        transport.setId(UUID.randomUUID().toString());
        transport.setCreatedAt(LocalDateTime.now());
        return transportRepository.save(transport);
    }

    public List<Transport> getAllTransports() {
        return transportRepository.findAll();
    }

    public Transport getTransportById(String id) {
        Transport transport = transportRepository.findById(id);
        if (transport == null) {
            throw new TransportNotFoundException("Transport with id " + id + " not found");
        }
        return transport;
    }

    public Transport updateTransport(String id, Transport updatedTransport) {
        Transport existing = transportRepository.findById(id);
        if (existing == null) {
            throw new TransportNotFoundException("Transport with id " + id + " not found");
        }
        existing.setSource(updatedTransport.getSource());
        existing.setDestination(updatedTransport.getDestination());
        existing.setStatus(updatedTransport.getStatus());
        existing.setBandwidth(updatedTransport.getBandwidth());
        return transportRepository.update(existing);
    }

    public void deleteTransport(String id) {
        Transport existing = transportRepository.findById(id);
        if (existing == null) {
            throw new TransportNotFoundException("Transport with id " + id + " not found");
        }
        transportRepository.delete(id);
    }
}
