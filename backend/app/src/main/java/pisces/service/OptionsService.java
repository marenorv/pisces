package pisces.service;

import org.springframework.stereotype.Service;
import pisces.domain.Fish;
import pisces.domain.Location;
import pisces.domain.Organization;
import pisces.repository.OptionsRepository;

import java.util.List;

@Service
public class OptionsService {
    private final OptionsRepository optionsRepository;

    public OptionsService(OptionsRepository optionsRepository) {
        this.optionsRepository = optionsRepository;
    }

    public List<Location> getLocations() {
        return optionsRepository.getLocations();
    }

    public List<Fish> getFishes() {
        return optionsRepository.getFishes();
    }

    public List<Organization> getOrganizations() {
        return optionsRepository.getOrganizations();
    }
}
