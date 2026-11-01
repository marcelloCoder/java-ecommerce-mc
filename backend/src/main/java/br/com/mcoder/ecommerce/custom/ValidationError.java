package br.com.mcoder.ecommerce.custom;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class ValidationError extends CustomError {

    private final List<FieldMessage> errors = new ArrayList<>();
    public ValidationError(Instant timestamp, Integer status, String error, String path) {
        super(timestamp, status, error, path);
    }

    public List<FieldMessage> getFieldMessages() {
        return errors;
    }

    public void addError(String fieldName, String message) {
        errors.removeIf(x -> x.fieldName().equals(fieldName));
        errors.add(new FieldMessage(fieldName,message));
    }
}
