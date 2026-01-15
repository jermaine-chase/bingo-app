package com.itgnomes.bingo_app.entity;

import jakarta.persistence.*;

@Entity
public class Tile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String value;
    private boolean marked;

    public Tile(String value) {
        this.value = value;
        this.marked = false;
    }

    public String getValue() {
        return value;
    }

    public boolean isMarked() {
        return marked;
    }

    public void setMarked(boolean marked) {
        this.marked = marked;
    }
}