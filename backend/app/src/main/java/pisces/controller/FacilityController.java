package pisces.controller;

import org.springframework.web.bind.annotation.*;
import pisces.dto.FacilityDetailsDTO;
import pisces.dto.FacilityOverviewDTO;
import pisces.dto.FacilityUpdateDTO;
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

    @PutMapping("/id/{id}/update")
    public FacilityDetailsDTO updateFacility(@RequestBody FacilityUpdateDTO payload) {
        return facilityService.updateFacility(payload);
    }
}
