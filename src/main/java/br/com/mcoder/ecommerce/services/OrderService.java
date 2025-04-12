package br.com.mcoder.ecommerce.services;

import br.com.mcoder.ecommerce.dto.OrderDTO;
import br.com.mcoder.ecommerce.dto.OrderItemDTO;
import br.com.mcoder.ecommerce.dto.ProductDTO;
import br.com.mcoder.ecommerce.entities.*;
import br.com.mcoder.ecommerce.entities.enums.OrderStatus;
import br.com.mcoder.ecommerce.repositories.OrderItemRepository;
import br.com.mcoder.ecommerce.repositories.OrderRepository;
import br.com.mcoder.ecommerce.repositories.PaymentRepository;
import br.com.mcoder.ecommerce.repositories.ProductRepository;
import br.com.mcoder.ecommerce.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class OrderService {

    private final OrderRepository repository;

    private final UserService userService;

    private final ProductRepository productRepository;

    private final OrderItemRepository orderItemRepository;

    private final AuthService authService;

    private final PaymentRepository paymentRepository;

    public OrderService(OrderRepository repository, UserService userService, ProductRepository productRepository, OrderItemRepository orderItemRepository, AuthService authService, PaymentRepository paymentRepository) {
        this.repository = repository;
        this.userService = userService;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.authService = authService;
        this.paymentRepository = paymentRepository;
    }

    @Transactional(readOnly = true)
    public OrderDTO findById(Long id) {
        Order order = repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Recurso não encontrado"));
        authService.validateSelfOrAdmin(order.getClient().getId());
        return new OrderDTO(order);
    }

    @Transactional
    public OrderDTO insert(OrderDTO orderDTO) {
        Order order = new Order();
        order.setMoment(Instant.now());
        order.setStatus(OrderStatus.WAITING_PAYMENT);

        User user = userService.authenticated();
        order.setClient(user);

        for (OrderItemDTO itemDTO : orderDTO.getItems()){
            Product product = productRepository.getReferenceById(itemDTO.getProductId());
            OrderItem orderItem = new OrderItem(order, product, itemDTO.getQuantity(), product.getPrice());
            order.getItemSet().add(orderItem);
        }
        repository.save(order);
        orderItemRepository.saveAll(order.getItemSet());

        return new OrderDTO(order);
    }
}
