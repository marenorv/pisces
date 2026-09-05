package pisces.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pisces.dto.FacilityDTO;
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
    public List<FacilityDTO> getCurrent() {
        return facilityService.getAll();
    }

    @GetMapping("/id/{id}")
    public FacilityDTO getCurrent(@PathVariable UUID id) {
        return facilityService.getById(id);
    }
}
