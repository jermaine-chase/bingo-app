package com.itgnomes.bingo_app.service;

import com.itgnomes.bingo_app.entity.Card;
import com.itgnomes.bingo_app.entity.Tile;
import com.itgnomes.bingo_app.repository.BingoCardRepository;
import com.itgnomes.bingo_app.repository.BingoTileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BingoService {

    @Autowired
    private BingoCardRepository cardRepository;

    @Autowired
    private BingoTileRepository tileRepository;

    @Transactional
    public Card markTile(Long cardId, Long location) {
        Tile t = tileRepository.findById(location)
                .orElseThrow(() -> new RuntimeException("Tile not found with id: " + location));
        t.setMarked(true);
        tileRepository.save(t);
        return cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card not found with id: " + cardId));

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
        // Build a fresh Card instance (id == null) and new Tile instances copied from the request
        // This ensures Hibernate will persist a new entity instead of trying to merge a potentially
        // detached or stale instance that can trigger optimistic locking exceptions.
        Card newCard = new Card(null, card.getName());
        if (card.getTiles() != null) {
            for (Tile t : card.getTiles()) {
                Tile nt = new Tile(t.getLabel());
                nt.setMarked(t.isMarked());
                newCard.getTiles().add(nt);
            }
        }

        Card saved = cardRepository.save(card);

        // Update the incoming object with the generated id so controller can report it back
        card.setId(saved.getId());
    }
}