package br.com.mcoder.ecommerce.utils;

import br.com.mcoder.ecommerce.entities.Product;
import br.com.mcoder.ecommerce.projections.IdProjection;
import br.com.mcoder.ecommerce.projections.ProductProjection;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Utils {

    public static <ID> List<? extends IdProjection<ID>> replace(List<? extends IdProjection<ID>> ordered, List<? extends IdProjection<ID>> unordered) {

        Map<ID, IdProjection<ID>> productMap = new HashMap<>(); // preencher esse map com uma lista desordenada

        for (IdProjection<ID>obj : unordered){
            productMap.put(obj.getId(), obj); //copiou todos os produtos que estão na lista unordered para um map
            // Pois quando precisar encontrar um produto nesse map a buscar ira ser instantanea
            //metodo eficiente
        }
        List<IdProjection<ID>> result = new ArrayList<>();
        // Criar uma lista de produtos ordenada
        for(IdProjection<ID> obj : ordered){ // para cada projection, adicionar o produto correspondente a projection
            result.add(productMap.get(obj.getId()));
            // Perocrrendo uma lista de projections que esta ordenada e para cada objeto desta lista  ordenada
            //... pega o id dele, acesso a entidade produto do map correspondente à ele e adiciona na lista de resultados
        }

        return result;
    }
}
