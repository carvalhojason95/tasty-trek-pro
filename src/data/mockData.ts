import foodPho from "@/assets/food-pho.jpg";
import foodBurger from "@/assets/food-burger.jpg";
import foodPoke from "@/assets/food-poke.jpg";
import foodPizza from "@/assets/food-pizza.jpg";
import foodCurry from "@/assets/food-curry.jpg";
import foodSushi from "@/assets/food-sushi.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  deliveryTime: number;
  prepTime: number;
  priceRange: string;
  rating: number;
  reviewCount: number;
  image: string;
  menu: MenuItem[];
}

export interface PastOrder {
  id: string;
  dishName: string;
  restaurantName: string;
  image: string;
  price: number;
  restaurantId: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantName: string;
  restaurantId: string;
}

export interface OrderTracking {
  id: string;
  status: "confirmed" | "preparing" | "picked_up" | "delivering" | "delivered";
  estimatedTime: number;
  restaurantName: string;
  items: { name: string; quantity: number }[];
  total: number;
  driverName: string;
}

export const pastOrders: PastOrder[] = [
  { id: "po1", dishName: "Chicken Pho", restaurantName: "Saigon Shack", image: foodPho, price: 14.99, restaurantId: "r1" },
  { id: "po2", dishName: "Classic Burger", restaurantName: "Burger Joint", image: foodBurger, price: 12.49, restaurantId: "r2" },
  { id: "po3", dishName: "Salmon Poke Bowl", restaurantName: "Aloha Bowls", image: foodPoke, price: 16.99, restaurantId: "r3" },
  { id: "po4", dishName: "Butter Chicken", restaurantName: "Spice Route", image: foodCurry, price: 15.49, restaurantId: "r5" },
];

export const restaurants: Restaurant[] = [
  {
    id: "r1", name: "Saigon Shack", cuisine: "Vietnamese", deliveryTime: 18, prepTime: 12,
    priceRange: "$$", rating: 4.7, reviewCount: 342, image: foodPho,
    menu: [
      { id: "m1", name: "Chicken Pho", description: "Rice noodles in aromatic broth with tender chicken, herbs, and lime", price: 14.99, image: foodPho, isPopular: true },
      { id: "m2", name: "Beef Pho", description: "Traditional beef broth with rare steak, brisket, and fresh herbs", price: 16.99, image: foodPho },
      { id: "m3", name: "Banh Mi", description: "Crispy baguette with grilled pork, pickled vegetables, and cilantro", price: 11.99, image: foodPho },
    ],
  },
  {
    id: "r2", name: "Burger Joint", cuisine: "American", deliveryTime: 15, prepTime: 10,
    priceRange: "$", rating: 4.5, reviewCount: 521, image: foodBurger,
    menu: [
      { id: "m4", name: "Classic Cheeseburger", description: "Angus beef, cheddar, lettuce, tomato, house sauce", price: 12.49, image: foodBurger, isPopular: true },
      { id: "m5", name: "Double Smash Burger", description: "Two smashed patties, American cheese, pickles, onion", price: 15.99, image: foodBurger },
      { id: "m6", name: "Chicken Burger", description: "Crispy chicken thigh, slaw, spicy mayo", price: 13.49, image: foodBurger },
    ],
  },
  {
    id: "r3", name: "Aloha Bowls", cuisine: "Hawaiian", deliveryTime: 22, prepTime: 8,
    priceRange: "$$", rating: 4.8, reviewCount: 189, image: foodPoke,
    menu: [
      { id: "m7", name: "Salmon Poke Bowl", description: "Fresh salmon, avocado, edamame, sesame, sushi rice", price: 16.99, image: foodPoke, isPopular: true },
      { id: "m8", name: "Tuna Poke Bowl", description: "Ahi tuna, mango, cucumber, ponzu, crispy onion", price: 17.99, image: foodPoke },
    ],
  },
  {
    id: "r4", name: "Napoli Express", cuisine: "Italian", deliveryTime: 25, prepTime: 15,
    priceRange: "$$", rating: 4.6, reviewCount: 412, image: foodPizza,
    menu: [
      { id: "m9", name: "Margherita Pizza", description: "San Marzano tomatoes, fresh mozzarella, basil", price: 14.99, image: foodPizza, isPopular: true },
      { id: "m10", name: "Pepperoni Pizza", description: "Spicy pepperoni, mozzarella, oregano", price: 16.99, image: foodPizza },
    ],
  },
  {
    id: "r5", name: "Spice Route", cuisine: "Indian", deliveryTime: 30, prepTime: 20,
    priceRange: "$$", rating: 4.9, reviewCount: 278, image: foodCurry,
    menu: [
      { id: "m11", name: "Butter Chicken", description: "Tender chicken in rich tomato-cream sauce with naan", price: 15.49, image: foodCurry, isPopular: true },
      { id: "m12", name: "Lamb Biryani", description: "Fragrant basmati rice layered with spiced lamb", price: 18.99, image: foodCurry },
      { id: "m13", name: "Palak Paneer", description: "Cottage cheese cubes in creamy spinach gravy", price: 13.99, image: foodCurry },
    ],
  },
  {
    id: "r6", name: "Sakura Sushi", cuisine: "Japanese", deliveryTime: 20, prepTime: 15,
    priceRange: "$$$", rating: 4.8, reviewCount: 156, image: foodSushi,
    menu: [
      { id: "m14", name: "Salmon Nigiri Set", description: "6 pieces of fresh salmon nigiri with wasabi and ginger", price: 19.99, image: foodSushi, isPopular: true },
      { id: "m15", name: "Dragon Roll", description: "Shrimp tempura, avocado, eel sauce, tobiko", price: 16.99, image: foodSushi },
    ],
  },
];

export const activeOrder: OrderTracking = {
  id: "ord-001",
  status: "preparing",
  estimatedTime: 18,
  restaurantName: "Saigon Shack",
  items: [
    { name: "Chicken Pho", quantity: 1 },
    { name: "Banh Mi", quantity: 1 },
  ],
  total: 26.98,
  driverName: "Alex M.",
};
