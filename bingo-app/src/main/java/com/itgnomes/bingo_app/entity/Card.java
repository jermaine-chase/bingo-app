package com.itgnomes.bingo_app.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "card_id")
    private List<Tile> tiles;

    public Card(Long id, String name) {
        this.id = id;
        this.name = name;
        this.tiles = new ArrayList<>();
    }

    public Card() {
        this.tiles = new ArrayList<>();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public  void setName(String name) {
        this.name = name;
    }

    public List<Tile> getTiles() {
        return this.tiles;
    }
}