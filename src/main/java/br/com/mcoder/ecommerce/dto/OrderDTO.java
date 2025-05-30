package br.com.mcoder.ecommerce.dto;

import br.com.mcoder.ecommerce.entities.Order;
import br.com.mcoder.ecommerce.entities.OrderItem;
import br.com.mcoder.ecommerce.entities.Payment;
import br.com.mcoder.ecommerce.entities.User;
import br.com.mcoder.ecommerce.entities.enums.OrderStatus;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class OrderDTO {
    private final Long id;
    private final Instant moment;
    private final OrderStatus status;
    private final ClientDTO client;
    private final PaymentDTO payment;
    private final List<OrderItemDTO> items = new ArrayList<>();

    public OrderDTO(Long id, Instant moment, OrderStatus status, ClientDTO client, PaymentDTO payment) {
        this.id = id;
        this.moment = moment;
        this.status = status;
        this.client = client;
        this.payment = payment;
    }

    public OrderDTO(Order entity) {
        this.id = entity.getId();
        this.moment = entity.getMoment();
        this.status = entity.getStatus();
        this.client = new ClientDTO(entity.getClient());
        this.payment = entity.getPayment() != null ? new PaymentDTO(entity.getPayment()) : null;
        for (OrderItem orderItem : entity.getItemSet()){
            OrderItemDTO itemDTO = new OrderItemDTO(orderItem);
            items.add(itemDTO);
        }
    }

    public Long getId() {
        return id;
    }

    public Instant getMoment() {
        return moment;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public ClientDTO getClient() {
        return client;
    }

    public PaymentDTO getPayment() {
        return payment;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public Double getTotal(){
        double sum = 0.0;
        for (OrderItemDTO itemDTO : items){
            sum = sum + itemDTO.getSubTotal();
        }
        return sum;
    }
}
