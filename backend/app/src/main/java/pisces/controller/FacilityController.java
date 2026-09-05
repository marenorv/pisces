package pisces.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pisces.dto.FacilityDetailsDTO;
import pisces.dto.FacilityOverviewDTO;
import pisces.service.FacilityService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/facilities")
public class FacilityController {
    private final FacilityService facilityService;

    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @GetMapping("/getAll")
    public List<FacilityOverviewDTO> getAll() {
        return facilityService.getAll();
    }

    @GetMapping("/id/{id}")
    public FacilityDetailsDTO getById(@PathVariable UUID id) {
        return facilityService.getById(id);
    }
}
