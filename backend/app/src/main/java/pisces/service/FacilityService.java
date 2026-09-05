package pisces.service;

import org.springframework.stereotype.Service;
import pisces.dto.FacilityDTO;
import pisces.repository.FacilityRepository;

import java.util.List;
import java.util.UUID;

@Service
public class FacilityService {
    private final FacilityRepository facilityRepository;

    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    public List<FacilityDTO> getAll() {
        return facilityRepository.getAll();
    }

    public FacilityDTO getById(UUID id) {
        return facilityRepository.getById(id);
    }
}
