package pisces.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pisces.domain.Count;
import pisces.service.CountService;

@RestController
@RequestMapping("/api/count")
public class CountController {
    private final CountService countService;

    public CountController(CountService countService) {
        this.countService = countService;
    }

    @GetMapping("/current")
    public Count getCurrent() {
        return countService.getCurrent();
    }
    @GetMapping("/increment")
    public Count increment() {
        return countService.increment();
    }
}
