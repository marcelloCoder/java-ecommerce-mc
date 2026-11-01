package br.com.mcoder.ecommerce.dto;


import br.com.mcoder.ecommerce.entities.Payment;

import java.time.Instant;

public class PaymentDTO {
    private Long id;
    private Instant moment;
    public PaymentDTO(Long id, Instant moment) {
        this.id = id;
        this.moment = moment;
    }

    public PaymentDTO(Payment payment) {
    }

    public Long getId() {
        return id;
    }
    public Instant getMoment() {
        return moment;
    }
}
