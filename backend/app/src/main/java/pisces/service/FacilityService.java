package pisces.service;

import org.springframework.stereotype.Service;
import pisces.domain.Facility;
import pisces.repository.FacilityRepository;

import java.util.List;

@Service
public class FacilityService {
    private final FacilityRepository facilityRepository;

    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    public List<Facility> getAll() {
        return facilityRepository.getAll();
    }
}
