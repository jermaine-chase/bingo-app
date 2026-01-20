package com.itgnomes.bingo_app.controller;
import com.itgnomes.bingo_app.entity.Card;
import com.itgnomes.bingo_app.service.BingoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BingoAppController {

    private static final Logger logger = LoggerFactory.getLogger(BingoAppController.class);

    @Autowired
    private BingoService bingoService;

    @GetMapping("/cards")
    @ResponseBody
    public List<Card> getBingoCards() {
        logger.info("getBingoCards");
        return bingoService.getAllCards();
    }

    @GetMapping("/card/{id}")
    @ResponseBody
    public Card getBingoCardById(@PathVariable Long id) {
        logger.info("getBingoCardById");
        logger.debug("Fetching bingo card with ID: {}", id);
        return bingoService.getCardById(id).orElse(null);
    }

    @PatchMapping("/cards/{id}/cell/{location}")
    @ResponseBody
    public Card completeTask(@PathVariable Long id, @PathVariable Long location) {
        logger.info("completeTask");
        logger.debug("Marking tile at location {} for card ID {}", location, id);
        return bingoService.markTile(id, location);
    }

    @PostMapping("/cards")
    @ResponseBody
    public String createBingoCard(@RequestBody Card card) {
        logger.info("createBingoCard");
        logger.debug("Creating bingo card: {}", card);
        bingoService.createCard(card);
        return "Created Bingo Card with ID: " + card.getId();
    }
}