package com.simon.cinnamonroll;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Punto de entrada de la aplicacion.
 * Spring Boot sirve automaticamente todo lo que hay en /resources/static
 * (index.html, css, js, imagenes) como un sitio estatico normal.
 * El unico trabajo "de backend" real es el pequeno endpoint de frases
 * que usa el cinnamon roll interactivo (ver FraseController).
 */
@SpringBootApplication
public class CinnamonRollApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinnamonRollApplication.class, args);
    }

}
