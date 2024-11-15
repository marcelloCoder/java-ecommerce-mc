package br.com.mcoder.ecommerce.repositories;

import br.com.mcoder.ecommerce.entities.Order;
import br.com.mcoder.ecommerce.entities.OrderItem;
import br.com.mcoder.ecommerce.entities.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
}
