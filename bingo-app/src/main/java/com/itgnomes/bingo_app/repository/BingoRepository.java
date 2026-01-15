package com.itgnomes.bingo_app.repository;

import com.itgnomes.bingo_app.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BingoRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByName(String cardName);
}