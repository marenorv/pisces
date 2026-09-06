package pisces.service;

import org.springframework.stereotype.Service;
import pisces.dto.FacilityDetailsDTO;
import pisces.dto.FacilityOverviewDTO;
import pisces.dto.FacilityUpdateDTO;
import pisces.repository.FacilityRepository;

import java.util.List;
import java.util.UUID;

@Service
public class FacilityService {
    private final FacilityRepository facilityRepository;

    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    public List<FacilityOverviewDTO> getAll() {
        return facilityRepository.getAll();
    }

    public FacilityDetailsDTO getById(UUID id) {
        return facilityRepository.getById(id);
    }

    public FacilityDetailsDTO updateFacility(FacilityUpdateDTO payload) {
        return facilityRepository.updateFacility(payload);
    }

    public FacilityDetailsDTO addFacility(FacilityUpdateDTO payload) {
        return facilityRepository.addFacility(payload);
    }

    public void deleteFacility(UUID id) {
        facilityRepository.deleteFacility(id);
    }
}
