package pisces.service;

import org.springframework.stereotype.Service;
import pisces.domain.Count;
import pisces.repository.CountRepository;

@Service
public class CountService {
    private final CountRepository countRepository;

    public CountService(CountRepository countRepository) {
        this.countRepository = countRepository;
    }

    public Count getCurrent() {
        return countRepository.getCurrent();
    }
    public Count increment() {
        return countRepository.increment();
    }
}
