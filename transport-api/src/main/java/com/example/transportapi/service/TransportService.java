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
        
        printNetconfLog(transport, "create");
        
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
        
        printNetconfLog(existing, "update");
        
        return transportRepository.update(existing);
    }

    private void printNetconfLog(Transport t, String operation) {
        String xml = "\n" +
            "----------------------------------------------------------------\n" +
            "[NETCONF-SBI] Generating <edit-config> transaction (" + operation.toUpperCase() + ")...\n" +
            "----------------------------------------------------------------\n" +
            "<rpc message-id=\"" + (int)(Math.random() * 1000) + "\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n" +
            "  <edit-config>\n" +
            "    <target><running/></target>\n" +
            "    <config>\n" +
            "      <tapi-connectivity xmlns=\"urn:onf:otcc:yang:tapi-connectivity\">\n" +
            "        <connectivity-service>\n" +
            "          <service-id>" + t.getId() + "</service-id>\n" +
            "          <source>" + t.getSource() + "</source>\n" +
            "          <destination>" + t.getDestination() + "</destination>\n" +
            "          <capacity>" + t.getBandwidth() + " Mbps</capacity>\n" +
            "          <admin-state>" + t.getStatus() + "</admin-state>\n" +
            "        </connectivity-service>\n" +
            "      </tapi-connectivity>\n" +
            "    </config>\n" +
            "  </edit-config>\n" +
            "</rpc>\n" +
            "----------------------------------------------------------------\n" +
            "[NETCONF-SBI] Transaction Status: COMMITTED (200 OK)\n" +
            "----------------------------------------------------------------\n";
        System.out.println(xml);
    }

    public void deleteTransport(String id) {
        Transport existing = transportRepository.findById(id);
        if (existing == null) {
            throw new TransportNotFoundException("Transport with id " + id + " not found");
        }
        transportRepository.delete(id);
    }
}
