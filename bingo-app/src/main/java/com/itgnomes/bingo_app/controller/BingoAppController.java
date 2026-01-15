package com.itgnomes.bingo_app.controller;
import com.itgnomes.bingo_app.entity.Card;
import com.itgnomes.bingo_app.service.BingoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bingo")
public class BingoAppController {

    @Autowired
    private BingoService bingoService;

    @GetMapping("/cards")
    @ResponseBody
    public List<String> getBingoCards() {
        List<Card> cards = bingoService.getAllCards();
        return cards.stream().map(Card::getName).toList();
    }

    @GetMapping("/card/{id}")
    @ResponseBody
    public Card getBingoCardById(@PathVariable Long id) {
        // Placeholder for actual bingo card retrieval by ID logic
        return new Card(id,"");
    }

    @PatchMapping("/cards/{id}/cell/{location}")
    @ResponseBody
    public String completeTask(@PathVariable Long id, @PathVariable int location) {
        // Placeholder for actual task completion logic
        return "Marked task at location " + location + " as complete for Bingo Card ID: " + id;
    }
}