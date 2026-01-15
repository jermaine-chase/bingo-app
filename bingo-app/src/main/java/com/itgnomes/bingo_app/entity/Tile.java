package com.itgnomes.bingo_app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tiles")
public class Tile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private final String label;
    private boolean marked;

    public Tile(String value) {
        this.label = value;
        this.marked = false;
    }

    public String getLabel() {
        return label;
    }

    public boolean isMarked() {
        return marked;
    }

    public void setMarked(boolean marked) {
        this.marked = marked;
    }
}