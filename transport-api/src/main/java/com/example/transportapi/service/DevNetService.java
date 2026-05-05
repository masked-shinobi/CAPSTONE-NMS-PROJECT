package com.example.transportapi.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Base64;

@Service
public class DevNetService {

    private final RestTemplate restTemplate;

    // Use the user's Catalyst 8000 Always-On sandbox credentials
    private String host = "devnetsandboxiosxec8k.cisco.com";
    private String username = "sanjayshivaani2";
    private String password = "5sJ96Dv_-4qgP";

    public DevNetService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getDeviceCapabilities() {
        // 'Cisco-IOS-XE-native:native/version' is usually supported on all IOS-XE devices
        String url = "https://" + host + "/restconf/data/Cisco-IOS-XE-native:native/version";
        System.out.println("DEBUG: [DEVNET] Attempting to connect to: " + url);
        
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/yang-data+json");
            headers.set("Content-Type", "application/yang-data+json");
            
            String auth = username + ":" + password;
            String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
            headers.set("Authorization", "Basic " + encodedAuth);

            HttpEntity<String> entity = new HttpEntity<>(headers);

            System.out.println("DEBUG: [DEVNET] Sending request...");
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            System.out.println("DEBUG: [DEVNET] Success! Status Code: " + response.getStatusCode());
            return response.getBody();
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            System.out.println("DEBUG: [DEVNET] HTTP Error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            return "{\"error\": \"Cisco DevNet returned " + e.getStatusCode() + ". Check credentials.\"}";
        } catch (org.springframework.web.client.ResourceAccessException e) {
            System.out.println("DEBUG: [DEVNET] Connection Error: " + e.getMessage());
            return "{\"error\": \"Connection Timeout. The Cisco Sandbox might be down or busy.\"}";
        } catch (Exception e) {
            System.out.println("DEBUG: [DEVNET] Unexpected Error: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            return "{\"error\": \"System Error: " + e.getMessage() + "\"}";
        }
    }
}
