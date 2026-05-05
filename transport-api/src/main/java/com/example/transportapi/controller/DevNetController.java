package com.example.transportapi.controller;

import com.example.transportapi.service.DevNetService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/devnet")
public class DevNetController {

    private final DevNetService devNetService;

    public DevNetController(DevNetService devNetService) {
        this.devNetService = devNetService;
    }

    @GetMapping("/status")
    public String getDeviceStatus() {
        return devNetService.getDeviceCapabilities();
    }
}
