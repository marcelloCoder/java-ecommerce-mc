package br.com.mcoder.ecommerce.services.exceptions;

public class ForbiddenException extends RuntimeException{

    public ForbiddenException(String message){
        super(message);
    }
}
