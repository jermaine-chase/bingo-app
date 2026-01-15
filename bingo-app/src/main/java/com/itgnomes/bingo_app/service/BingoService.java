package com.itgnomes.bingo_app.service;

import com.itgnomes.bingo_app.entity.Card;
import com.itgnomes.bingo_app.repository.BingoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BingoService {

    @Autowired
    private BingoRepository cardRepository;

    @Transactional
    public Card markTile(Long cardId, int location) {
        // 1. Find the card
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        // 2. Find the specific tile and mark it
        card.getTiles().get(location).setMarked(true);

        // 3. Save and return (Transactional handles the update automatically)
        return cardRepository.save(card);
    }

    public Optional<Card> getCardById(Long cardId) {
        return cardRepository.findById(cardId);
    }

    public Optional<Card> getCardByName(String cardName) {
        return cardRepository.findByName(cardName);
    }

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public void createCard(Card card) {
        cardRepository.save(card);
    }
}