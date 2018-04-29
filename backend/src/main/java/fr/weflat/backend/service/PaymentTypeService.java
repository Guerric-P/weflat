package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.PaymentType;

public interface PaymentTypeService {
	Set<PaymentType> getAll();
}
