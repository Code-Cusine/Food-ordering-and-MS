import boy_removebg_preview from "../assets/boy_removebg_preview.png";
import girl_removebg_preview from "../assets/girl_removebg_preview.png";
import kids_removebg_preview from "../assets/kids_removebg_preview.png";
import onion_and_capsicum_pizza from '../assets/food_images_veg/6__Onion_And_Capcicum_Pizza.jpg'
import tomato_pan_pizza from '../assets/food_images_veg/7__Tomato_Pan_Pizza.jpg'
import cheese_corn_pizza from '../assets/food_images_veg/8___Cheese_Corn_Pizza.jpg'
import blackberry_pizza from '../assets/food_images_veg/9__Blackberry_Pizza.jpg'
import caponito_pizza_medium from '../assets/food_images_veg/9__Caponito_Pizza_Medioum.jpg'
import medium_onion_capscicum_pizza from '../assets/food_images_veg/9__Medium_Onion_Capsicum_Pizza.jpg'
import aloo_paratha from '../assets/food_images_veg/Aloo_Paratha.jpg'
import aloo_tikki_burger from '../assets/food_images_veg/Aloo_Tikki_Burger.jpg'
import besan_paratha from '../assets/food_images_veg/Besan_Paratha.jpg'
import butter_naan from '../assets/food_images_veg/Butter_Naan.jpg'
import cheese_podi_masala_dosa from '../assets/food_images_veg/Cheese_Podi_Masala_Dosa.jpg'
import cheese_tomato_pizza from '../assets/food_images_veg/Cheese_Tomato_Pizza.jpg'
import strips_with_dynamite_sauce from '../assets/food_images_veg/10pc_Strips_with_Dynamite_Sauce.jpg'
import delhi_belly_pizza from '../assets/food_images_veg/10__Delhi_Belly_Pizza.jpg'
import cheese_lover_pizza from '../assets/food_images_veg/11___Cheese_Lover_Pizza.jpg'
import bangali_fish_thali from '../assets/food_images_non_veg/Bangali_Fish_Thali_Meal.jpg'
import crispy_chicken_burger from '../assets/food_images_non_veg/2_x_Krispy_Chicken_Burger.jpg'
import afghani_tikka from '../assets/food_images_non_veg/Afgani_Chicken_Tikka.jpg'
import bbq_chicken from '../assets/food_images_non_veg/Bbq_Chicken_Burger.jpg'
import afghani_murgh from '../assets/food_images_non_veg/Afghani_Murgh.jpg'
import amritsar_fish from '../assets/food_images_non_veg/Amritsari_Fish_Pakoda__6_Pcs_.jpg'
import anda_pasta from '../assets/food_images_non_veg/Anda_Pasta.jpg'
import boiled_egg from '../assets/food_images_non_veg/Boiled_Egg__1_Pc_.jpg'
import boneless_fish_fry from '../assets/food_images_non_veg/Boneless_Fish_Fry.jpg'
import butter_egg_burger from '../assets/food_images_non_veg/Butter_Egg_Burger.jpg'
import cheesy_chicken_shots from '../assets/food_images_non_veg/Cheesy_Chicken_Shots.jpg'
import chicken65 from '../assets/food_images_non_veg/Chicken_65.jpg'

let all_product = [
  {
    id: 1,
    name: "Caffe Americano",
    description: "Rich in flavour, full-bodied espresso with hot water.",
    price:  241.50,
    image: boy_removebg_preview,
    category : 'Drinks',
},
{
    id: 2,
    name: "Cold Coffee",
    description: "Our signature rich in flavour espresso blended with delicate coffee.",
    price:  304.50,
    image: girl_removebg_preview,
    category : 'Drinks',
},
{
    id: 3,
    name: "Java Chip Frappuccino",
    description: "Mocha sauce and Frappuccino chips blended into one.",
    price:  325.50,
    image: kids_removebg_preview ,
    category : 'Drinks',
},

{
    id: 4,
    name: "Masala Chai",
    description: "A spiced, flavorful tea made by brewing black tea with aromatic Indian spices.",
    price:  150.00,
    image: kids_removebg_preview, // Replace with appropriate image
    category: 'Drinks',
},
{
    id: 5,
    name: "Filter Coffee",
    description: "Traditional South Indian coffee brewed to perfection with a smooth and rich taste.",
    price:  120.00,
    image: kids_removebg_preview, // Replace with appropriate image
    category: 'Drinks',
},
{
    id: 6,
    name: "Hot Chocolate",
    description: "Rich and creamy hot chocolate made from premium cocoa for a comforting drink.",
    price: 180.00,
    image: kids_removebg_preview, // Replace with appropriate image
    category: 'Drinks',
},
{
    id: 7,
    name: "Green Tea",
    description: "A soothing cup of antioxidant-rich green tea with delicate earthy flavors.",
    price: 130.00,
    image: kids_removebg_preview, // Replace with appropriate image
    category: 'Drinks',
},
{
    id: 8,
    name: "Iced Tea",
    description: "Chilled and refreshing iced tea, available in lemon or peach flavor.",
    price: 160.00,
    image: kids_removebg_preview, // Replace with appropriate image
    category: 'Drinks',
},
{
    id: 9,
    name: "Lemonade",
    description: "A zesty and refreshing lemonade made with freshly squeezed lemons.",
    price: 100.00,
    image: kids_removebg_preview, // Replace with appropriate image
    category: 'Drinks',
},
{
    id: 10,
    name: "Buttermilk",
    description: "A cool and refreshing buttermilk spiced with traditional Indian flavors.",
    price: 90.00,
    image: kids_removebg_preview, // Replace with appropriate image
    category: 'Drinks',
},
{
    id: 11,
    name: "Mango Smoothie",
    description: "A creamy mango smoothie made with ripe mangoes and yogurt for a tropical treat.",
    price: 200.00,
    image: kids_removebg_preview, // Replace with appropriate image
    category: 'Drinks',
},
{
    id: 12,
    name: "Sweet Lassi",
    description: "A thick and creamy yogurt-based drink sweetened with sugar and flavored with cardamom.",
    price: 110.00,
    image: kids_removebg_preview, // Replace with appropriate image
    category: 'Drinks',
},

{
    id: 13,
     name: "Onion and Capsicum Pizza", 
    description: "A flavorful pizza loaded with sautéed onions and capsicums, perfect for those who love a savory twist.", 
    price: 250.00, 
    image: onion_and_capsicum_pizza, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 14, 
    name: "Tomato Pan Pizza", 
    description: "A classic pan pizza smothered in a rich tomato sauce and melted mozzarella cheese.", 
    price: 220.00, 
    image: tomato_pan_pizza, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
    
},
{
    id: 15, 
    name: "Cheese Corn Pizza", 
    description: "A delightful combination of melted cheese and sweet corn, perfect for a comforting meal.", 
    price: 280.00, 
    image: cheese_corn_pizza, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 16, 
    name: "Blackberry Pizza", 
    description: "A sweet and savory pizza featuring blackberry sauce as the base, topped with mozzarella cheese and fresh basil.", 
    price: 300.00, 
    image: blackberry_pizza, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 17, 
    name: "Caponito Pizza Medium", 
    description: "A medium-sized Caponito pizza, loaded with an assortment of toppings, perfect for a satisfying meal.", 
    price: 350.00, 
    image: caponito_pizza_medium, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 18, 
    name: "Medium Onion Capsicum Pizza", 
    description: "A medium-sized pizza loaded with sautéed onions and capsicums, perfect for a flavorful meal.", 
    price: 320.00, 
    image: medium_onion_capscicum_pizza, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 19, 
    name: "Aloo Paratha", 
    description: "A crispy and flavorful paratha stuffed with spiced potatoes, served with a side of chutney.", 
    price: 80.00, 
    image: aloo_paratha, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 20, 
    name: "Aloo Tikki Burger", 
    description: "A vegetarian burger featuring a crispy aloo tikki patty, served with lettuce, tomato, and mayo", 
    price: 150.00, 
    image: aloo_tikki_burger, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 21, 
    name: "Besan Paratha", 
    description: "A crispy and flavorful paratha made with besan flour, served with a side of chutney.", 
    price: 70.00, 
    image: besan_paratha, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 22, 
    name: "Butter Naan", 
    description: "A soft and fluffy naan bread smothered in melted butter, perfect for sopping up curries.", 
    price: 60.00, 
    image: butter_naan, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 23, 
    name: "Cheese Podi Masala Dosa", 
    description: "A crispy dosa filled with spiced potatoes, onions, and melted cheese, served with a side of sambar and chutney.", 
    price: 120.00, 
    image: cheese_podi_masala_dosa, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 24, 
    name: "Cheese Tomato Pizza", 
    description: "A classic pizza featuring a rich tomato sauce, melted mozzarella cheese, and fresh basil.", 
    price: 240.00, 
    image: cheese_tomato_pizza, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 25, 
    name: "Strips with Dynamite sauce", 
    description: "Crispy chicken strips served with a fiery dynamite sauce for an explosive flavor kick. ", 
    price: 299.00, 
    image: strips_with_dynamite_sauce, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 26, 
    name: "Delhi Belly Pizza", 
    description: "A fusion pizza topped with spicy tandoori chicken, onions, and peppers for a bold, Indian-inspired taste.", 
    price: 499.00, 
    image: delhi_belly_pizza, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 27, 
    name: "Cheese Lover Pizza", 
    description: "A heavenly pizza smothered with a blend of four rich, gooey cheeses for the ultimate cheese indulgence.", 
    price: 399.00, 
    image: cheese_lover_pizza, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : true,
},
{
    id: 28, 
    name: "Crispy Chicken Burger", 
    description: "A juicy chicken patty coated in a crispy batter, served with lettuce, tomato, and mayo on a soft bun", 
    price: 180.00, 
    image: crispy_chicken_burger, // Replace with appropriate image category: 'Pizzas',
    category : 'Food',
    isVeg : false,
},
{
    id: 29, 
    name: "Afghani Chicken Tikka", 
    description: "Tender chicken marinated in a rich, creamy yogurt blend with Afghan spices, grilled to perfection.", 
    price: 250.00, 
    image: afghani_tikka, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 30, 
    name: "Bbq Chicken Burger", 
    description: "Grilled chicken breast smothered in smoky BBQ sauce, topped with cheese, lettuce, and onions on a soft bun.", 
    price: 220.00, 
    image: bbq_chicken, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 31, 
    name: "Afghani Murgh", 
    description: "Delicately spiced chicken simmered in a creamy, yogurt-based Afghan curry, served with a side of naan.", 
    price: 280.00, 
    image: afghani_murgh, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 32, 
    name: "Bangali Fish Thali Meal", 
    description: "A traditional Bengali meal with fried fish, rice, dal, and a variety of regional sides.", 
    price: 350.00, 
    image: bangali_fish_thali, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 33, 
    name: "Amritsar Fish Pakoda", 
    description: "Crispy, golden-brown fish fritters with a hint of Amritsari spices, served with mint chutney.", 
    price: 190.00, 
    image: amritsar_fish, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 34, 
    name: "Anda Pasta", 
    description: "Creamy, cheesy pasta topped with soft-boiled eggs and seasoned with herbs and spices.", 
    price: 180.00, 
    image: anda_pasta, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 35, 
    name: "Boiled Egg", 
    description: "Perfectly boiled eggs with a dash of salt and pepper, served with a side of toast.", 
    price: 50.00, 
    image: boiled_egg, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 36, 
    name: "Boneless Fish Fry", 
    description: "Crispy, boneless fish fillets fried to perfection, served with a tangy dipping sauce.", 
    price: 230.00, 
    image: boneless_fish_fry, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 37, 
    name: "Butter Egg Burger", 
    description: "Buttery soft bun filled with a fried egg, melted cheese, lettuce, and a touch of mayonnaise.", 
    price: 150.00, 
    image: butter_egg_burger, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 38, 
    name: "Cheesy Chicken Shots", 
    description: "Bite-sized chicken pieces coated in cheese and breadcrumbs, fried till golden and crispy.", 
    price: 200.00, 
    image: cheesy_chicken_shots, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
},
{
    id: 39, 
    name: "Chicken 65", 
    description: "Spicy, deep-fried chicken chunks tossed in a flavorful South Indian marinade with curry leaves.", 
    price: 220.00, 
    image: chicken65, // Replace with appropriate image
    category: 'Food',
    isVeg: false,
}


];

export default all_product;
