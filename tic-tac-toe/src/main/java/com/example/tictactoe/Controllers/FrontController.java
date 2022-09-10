package com.example.tictactoe.Controllers;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

@Controller
public class FrontController {

    @GetMapping("/")
    public String getIndex(){
        return "index";
    }
}
