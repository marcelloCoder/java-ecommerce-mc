package br.com.mcoder.ecommerce.repositories;

import br.com.mcoder.ecommerce.entities.Order;
import br.com.mcoder.ecommerce.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
