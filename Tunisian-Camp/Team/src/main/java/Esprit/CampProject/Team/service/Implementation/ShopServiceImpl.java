package Esprit.CampProject.Team.service.Implementation;

import Esprit.CampProject.Team.entities.Order;
import Esprit.CampProject.Team.entities.Produit;
import Esprit.CampProject.Team.entities.Shop;
import Esprit.CampProject.Team.repository.ShopRepository;
import Esprit.CampProject.Team.service.ShopService;

import java.util.Set;

public class ShopServiceImpl implements ShopService {

    private ShopRepository shopRepository;
    private Shop shop;
    private Set<Produit> produitSet;
    private Order order;

    @Override
    public void addProduit(Produit p){
//        shop.getProduits().add(p);
//        shopRepository.save(shop);
    }

    @Override
    public void deleteProduit(Long id){
//        shop.getProduits().removeIf(produit -> produit.getId().equals(id));
//        shopRepository.save(shop);
    }

    @Override
    public void CreateOrder(String id){
//        order.Setuserid(id);
//        shop.getOrders().add(order);
//        shopRepository.save(shop);
    }

    @Override
    public void  CancelOrder(Long id){
//        shop.getOrders().removeIf(order -> order.getId().equals(id));
//        shopRepository.save(shop);
    }



}
