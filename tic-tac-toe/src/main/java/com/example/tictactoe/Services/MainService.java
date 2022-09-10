package com.example.tictactoe.Services;

import com.example.tictactoe.DTO.Container;
import org.json.JSONArray;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class MainService {

    public Container getGameProcess(Container container){

        int state = Integer.valueOf(container.getState());
        List<List<Integer>> data = container.getData();


        if(state==1||state==2||state==-1){
            container.setData(
                    Arrays.asList(
                            Arrays.asList(0, 0, 0),
                            Arrays.asList(0, 0, 0),
                            Arrays.asList(0, 0, 0))
            );

            container.setState(0);
        } else if (!container.getData().get(0).contains(0)&&!container.getData().get(1).contains(0)&&!container.getData().get(2).contains(0)) {
            container.setState(-1);
        } else {
            int amountOf1 = Collections.frequency(data.get(0), 1) + Collections.frequency(data.get(1), 1) + Collections.frequency(data.get(2), 1);
            int amountOf2 = Collections.frequency(data.get(0), 2) + Collections.frequency(data.get(1), 2) + Collections.frequency(data.get(2), 2);

            List<List<Integer>> winningCombinations = Arrays.asList(
                    Arrays.asList(0,1,2),
                    Arrays.asList(3,4,5),
                    Arrays.asList(6,7,8),
                    Arrays.asList(0,3,6),
                    Arrays.asList(1,4,7),
                    Arrays.asList(2,5,8),
                    Arrays.asList(0,4,8),
                    Arrays.asList(2,4,6)
            );

            if(amountOf1>amountOf2){

                List<Integer> positionsOf1 = new ArrayList<Integer>();
                int index = 0;
                for(List<Integer> list : data){

                    for(int i : list){

                        if(i==1){
                            positionsOf1.add(index);

                        }
                        index++;
                    }
                }



                for(List<Integer> comb : winningCombinations){
                    if(positionsOf1.containsAll(comb)){

                        container.setState(1);

                    }
                }

            } else if (amountOf1==amountOf2) {

                List<Integer> positionsOf2 = new ArrayList<Integer>();
                int index = 0;
                for(List<Integer> list : data){

                    for(int i : list){

                        if(i==2){
                            positionsOf2.add(index);

                        }
                        index++;
                    }
                }

                for(List<Integer> comb : winningCombinations){

                    if(positionsOf2.containsAll(comb)){

                        container.setState(2);

                    }
                }
            }
        }

//        JSONArray array = new JSONArray(container.getData());

//        int[][] data = new int[3][3];
//
//        for(int i = 0; i<3; i++){
//            for(int g = 0; g<3; g++){
//                data[i][g] = array.getJSONArray(i).getInt(g);
//            }
//        }


        return container;
    }
}
