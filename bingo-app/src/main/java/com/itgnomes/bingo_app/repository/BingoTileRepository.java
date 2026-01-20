package com.itgnomes.bingo_app.repository;

import com.itgnomes.bingo_app.entity.Tile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BingoTileRepository extends JpaRepository<Tile, Long> {

}