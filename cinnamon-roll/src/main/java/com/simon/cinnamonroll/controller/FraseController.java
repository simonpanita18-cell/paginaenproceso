package com.simon.cinnamonroll.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Unica pieza de "logica de backend" del proyecto.
 * Entrega las frases que aparecen al tocar el cinnamon roll interactivo.
 * Si mas adelante quieres agregar o quitar frases, hazlo directamente
 * en la lista de abajo: no requiere base de datos ni reiniciar nada mas
 * que la aplicacion.
 */
@RestController
@CrossOrigin(origins = "*")
public class FraseController {

    private static final List<String> FRASES = List.of(
            "Te quiero 🍥",
            "Gracias por estar",
            "Me haces sonreir",
            "Quiero que estemos bien",
            "No necesito perfeccion",
            "Solo sinceridad",
            "Aunque estemos lejos, te siento cerca",
            "Contigo, incluso en la distancia"
    );

    @GetMapping("/api/frases")
    public List<String> obtenerFrases() {
        return FRASES;
    }
}
