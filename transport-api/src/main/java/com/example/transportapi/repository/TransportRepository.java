package com.example.transportapi.repository;

import com.example.transportapi.model.Transport;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class TransportRepository {
    private final Map<String, Transport> transportStore = new HashMap<>();

    public Transport save(Transport transport) {
        transportStore.put(transport.getId(), transport);
        return transport;
    }

    public List<Transport> findAll() {
        return new ArrayList<>(transportStore.values());
    }

    public Transport findById(String id) {
        return transportStore.get(id);
    }

    public Transport update(Transport transport) {
        transportStore.put(transport.getId(), transport);
        return transport;
    }

    public void delete(String id) {
        transportStore.remove(id);
    }
}
