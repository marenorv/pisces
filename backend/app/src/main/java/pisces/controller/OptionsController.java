package pisces.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pisces.domain.Fish;
import pisces.domain.Location;
import pisces.domain.Organization;
import pisces.service.OptionsService;

import java.util.List;

@RestController
@RequestMapping("/api/options")
public class OptionsController {
    private final OptionsService optionsService;

    public OptionsController(OptionsService optionsService) {
        this.optionsService = optionsService;
    }

    @GetMapping("/locations")
    public List<Location> getLocations() {
        return optionsService.getLocations();
    }

    @GetMapping("/fishes")
    public List<Fish> getFishes() {
        return optionsService.getFishes();
    }

    @GetMapping("/organizations")
    public List<Organization> getOrganizations() {
        return optionsService.getOrganizations();
    }
}
