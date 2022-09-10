package com.example.tictactoe.Controllers;


import com.example.tictactoe.DTO.Container;
import com.example.tictactoe.Services.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MainController {

    @Autowired
    private MainService service;


    private static final Container data = new Container();

    @PutMapping("/game")
    public Container getStarted(@RequestBody Container container){
        return service.getGameProcess(container);

    }

}
