package br.com.mcoder.ecommerce.repositories;

import br.com.mcoder.ecommerce.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
