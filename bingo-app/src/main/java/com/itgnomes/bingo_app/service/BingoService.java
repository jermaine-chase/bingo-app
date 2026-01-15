package com.itgnomes.bingo_app.service;

import com.itgnomes.bingo_app.entity.Card;
import com.itgnomes.bingo_app.entity.Tile;
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
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new RuntimeException("Card not found"));

        if (location < 0 || location >= card.getTiles().size()) {
            throw new IllegalArgumentException("Invalid tile location: " + location);
        }

        card.getTiles().get(location).setMarked(true);

        // Do not call save() on a managed entity inside the same transaction.
        // Transactional commit will flush changes and handle versioning.
        return card;
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