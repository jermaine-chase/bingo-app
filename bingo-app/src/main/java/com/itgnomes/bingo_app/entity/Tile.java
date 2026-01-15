package com.itgnomes.bingo_app.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Tile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private final String label;
    private boolean marked;

    @JsonCreator
    public Tile(@JsonProperty("label") String value) {
        this.label = value;
        this.marked = false;
    }

    public Long getId() {
        return id;
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