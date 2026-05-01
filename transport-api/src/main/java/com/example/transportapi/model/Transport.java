package com.example.transportapi.model;

import java.time.LocalDateTime;

public class Transport {
    private String id;
    private String source;
    private String destination;
    private String status;
    private Integer bandwidth;
    private LocalDateTime createdAt;

    public Transport() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getBandwidth() { return bandwidth; }
    public void setBandwidth(Integer bandwidth) { this.bandwidth = bandwidth; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
