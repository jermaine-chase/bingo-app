package com.itgnomes.bingo_app.controller;
import com.itgnomes.bingo_app.entity.Card;
import com.itgnomes.bingo_app.service.BingoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bingo")
public class BingoAppController {

    @Autowired
    private BingoService bingoService;

    @GetMapping("/cards")
    @ResponseBody
    public List<Card> getBingoCards() {
        return bingoService.getAllCards();
    }

    @GetMapping("/card/{id}")
    @ResponseBody
    public Card getBingoCardById(@PathVariable Long id) {
        return bingoService.getCardById(id).orElse(null);
    }

    @PatchMapping("/cards/{id}/cell/{location}")
    @ResponseBody
    public Card completeTask(@PathVariable Long id, @PathVariable int location) {
        return bingoService.markTile(id, location);
    }

    @PostMapping("/cards")
    @ResponseBody
    public String createBingoCard(@RequestBody Card card) {
        bingoService.createCard(card);
        return "Created Bingo Card with ID: " + card.getId();
    }
}