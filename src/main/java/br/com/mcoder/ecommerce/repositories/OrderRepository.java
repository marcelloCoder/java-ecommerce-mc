package br.com.mcoder.ecommerce.repositories;

import br.com.mcoder.ecommerce.entities.Order;
import br.com.mcoder.ecommerce.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.payment WHERE o.id = :id")
    Optional<Order> findOrderWithPayment(@Param("id") Long id);
}
