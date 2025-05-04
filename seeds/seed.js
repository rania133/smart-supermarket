const mongoose =require('mongoose');
const product = require('../models/productSchema');
const QRCode = require('qrcode'); 

    const seedProducts = [
        // Dairy Category
    { 
      name: "Juhayna Full Cream Milk", 
      description: "1 liter of full cream milk, rich in calcium and perfect for cooking.", 
      price: 25.00, 
      category: "Dairy", 
      imageUrl: "https://example.com/juhayna_milk.jpg", 
      stock: 120, 
      sizes: [
        { size: "1L", price: 25.00, stock: 120 }
      ]
    },
    { 
      name: "Domty Processed Cheese", 
      description: "500g pack of creamy processed cheese, ideal for sandwiches.", 
      price: 55.00, 
      category: "Dairy", 
      imageUrl: "https://example.com/domty_cheese.jpg", 
      stock: 50, 
      sizes: [
        { size: "500g", price: 55.00, stock: 50 }
      ]
    },
    { 
      name: "Lactel Yoghurt", 
      description: "500g of strawberry yogurt, a sweet and tangy treat.", 
      price: 18.00, 
      category: "Dairy", 
      imageUrl: "https://example.com/lactel_yogurt.jpg", 
      stock: 80, 
      sizes: [

        { size: "500g", price: 18.00, stock: 80 }
      ]
    },
    { 
      name: "Pinar Butter", 
      description: "250g of rich and creamy butter, perfect for bread or cooking.", 
      price: 45.00, 
      category: "Dairy", 
      imageUrl: "https://example.com/pinar_butter.jpg", 
      stock: 60, 
      sizes: [
        { size: "250g", price: 45.00, stock: 60 }
      ]
    },
    { 
      name: "Juhayna Yoghurt", 
      description: "500g of natural yogurt, great for breakfast or dessert.", 
      price: 18.00, 
      category: "Dairy", 
      imageUrl: "https://example.com/juhayna_yogurt.jpg", 
      stock: 70, 
      sizes: [
        { size: "500g", price: 18.00, stock: 70 }
      ]
    },

   
 

   // Fruits Category

    { 
        name: "Apples", 
        description: "Crisp and juicy apples, perfect for snacking.", 
        price: 35.00, 
        category: "Fruits", 
        imageUrl: "https://example.com/apples.jpg", 
        stock: 100, 
        sizes: [
          { size: "1kg", price: 35.00, stock: 100 }
        ]
      },
      { 
        name: "Oranges", 
        description: "Sweet and tangy oranges, rich in vitamin C.", 
        price: 25.00, 
        category: "Fruits", 
        imageUrl: "https://example.com/oranges.jpg", 
        stock: 120, 
        sizes: [
          { size: "1kg", price: 25.00, stock: 120 }
        ]
      },

      { 
        name: "Mangoes", 
        description: "Sweet and tropical mangoes, perfect for fruit salads.", 
        price: 45.00, 
        category: "Fruits", 
        imageUrl: "https://example.com/mangoes.jpg", 
        stock: 90, 
        sizes: [
          { size: "1kg", price: 45.00, stock: 90 }
        ]
      },
  
      { 
        name: "Strawberries", 
        description: "Fresh strawberries, perfect for desserts or smoothies.", 
        price: 35.00, 
        category: "Fruits", 
        imageUrl: "https://example.com/strawberries.jpg", 
        stock: 75, 
        sizes: [
          { size: "500g", price: 35.00, stock: 75 }
        ]
      },
      { 
        name: "Bananas", 
        description: "Fresh bananas, ideal for smoothies or eating fresh.", 
        price: 18.00, 
        category: "Fruits", 
        imageUrl: "https://example.com/bananas.jpg", 
        stock: 150, 
        sizes: [
          { size: "1kg", price: 18.00, stock: 150 }
        ]
      },
     // Bakery Category
      { 
        name: "Baladi Bread", 
        description: "Traditional brown bread loaf, freshly baked daily.", 
        price: 7.00, 
        category: "Bakery", 
        imageUrl: "https://example.com/baladi_bread.jpg", 
        stock: 60, 
        sizes: [
          { size: "1 loaf", price: 7.00, stock: 60 }
        ]
      },
      { 
        name: "Pita Bread", 
        description: "Soft and warm pita bread, great for wraps or dipping.", 
        price: 5.00, 
        category: "Bakery", 
        imageUrl: "https://example.com/pita_bread.jpg", 
        stock: 100, 
        sizes: [
          { size: "1 pack (6 pieces)", price: 5.00, stock: 100 }
        ]
      },
      { 
        name: "Fayrouz Croissant", 
        description: "Flaky, buttery croissants, ideal for breakfast or snacks.", 
        price: 12.00, 
        category: "Bakery", 
        imageUrl: "https://example.com/fayrouz_croissant.jpg", 
        stock: 80, 
        sizes: [
          { size: "1 piece", price: 12.00, stock: 80 }
        ]
      },
      { 
        name: "Bakery Sweets", 
        description: "Delicious sweets like Basbousa, ideal for dessert.", 
        price: 14.00, 
        category: "Bakery", 
        imageUrl: "https://example.com/bakery_sweets.jpg", 
        stock: 50, 
        sizes: [
          { size: "1 pack (6 pieces)", price: 14.00, stock: 50 }
        ]
      },
      { 
        name: "Whole Wheat Bread", 
        description: "Whole wheat bread, packed with fiber and nutrients.", 
        price: 8.50, 
        category: "Bakery", 
        imageUrl: "https://example.com/whole_wheat_bread.jpg", 
        stock: 90, 
        sizes: [
          { size: "1 loaf", price: 8.50, stock: 90 }
        ]
      },        
        
        // Beverages Category
        { 
            name: "Sinacolaegy", 
            description: "Classic soda, refreshing and sweet.", 
            price: 12.00, 
            category: "Beverages", 
            imageUrl: "https://example.com/sinacolaegy.jpg", 
            stock: 200, 
            sizes: [
              { size: "500ml", price: 12.00, stock: 200 },
              { size: "1L", price: 20.00, stock: 150 }
            ]
          },
          { 
            name: "Spiro Spathis", 
            description: "Iconic soda, made for a refreshing taste.", 
            price: 12.00, 
            category: "Beverages", 
            imageUrl: "https://example.com/spiro_spathis.jpg", 
            stock: 180, 
            sizes: [
              { size: "500ml", price: 12.00, stock: 180 },
              { size: "1L", price: 20.00, stock: 160 }
            ]
          },
          { 
            name: "El Arosa Tea", 
            description: "Iced tea, refreshing and sweet, available in various flavors.", 
            price: 15.00, 
            category: "Beverages", 
            imageUrl: "https://example.com/el_arosa_tea.jpg", 
            stock: 150, 
            sizes: [
              { size: "500ml", price: 15.00, stock: 150 },
              { size: "1L", price: 25.00, stock: 120 }
            ]
          },
          { 
            name: "Al Ahram Water", 
            description: "Pure natural water, refreshing and hydrating.", 
            price: 8.00, 
            category: "Beverages", 
            imageUrl: "https://example.com/al_ahram_water.jpg", 
            stock: 250, 
            sizes: [
              { size: "500ml", price: 8.00, stock: 250 },
              { size: "1.5L", price: 15.00, stock: 200 }
            ]
          },
          { 
            name: "Baraka Water", 
            description: "Natural mineral water, refreshing and clean.", 
            price: 10.00, 
            category: "Beverages", 
            imageUrl: "https://example.com/baraka_water.jpg", 
            stock: 200, 
            sizes: [
              { size: "500ml", price: 10.00, stock: 200 },
              { size: "1.5L", price: 18.00, stock: 180 }
            ]
          },
          { 
            name: "Vimto", 
            description: "A fruity drink, perfect for summer.", 
            price: 15.00, 
            category: "Beverages", 
            imageUrl: "https://example.com/vimto.jpg", 
            stock: 140, 
            sizes: [
              { size: "500ml", price: 15.00, stock: 140 },
              { size: "1L", price: 25.00, stock: 120 }
            ]
          },

          // Snacks Category

          {
            name: "Tiger Chips",
            description: "Crunchy and flavorful potato chips with spicy flavor, perfect for a quick snack.",
            price: 7.00,
            category: "Snacks",
            imageUrl: "https://example.com/tiger_chips.jpg",
            stock: 100,
            sizes: [
              { size: "50g", price: 7.00, stock: 60 },
              { size: "100g", price: 12.00, stock: 40 }
            ]
          },
          {
            name: "Big Chips",
            description: "Classic Egyptian potato chips available in multiple flavors like salt and vinegar, ketchup, and cheese.",
            price: 6.00,
            category: "Snacks",
            imageUrl: "https://example.com/chipsy.jpg",
            stock: 120,
            sizes: [
              { size: "45g", price: 6.00, stock: 70 },
              { size: "90g", price: 10.00, stock: 50 }
            ]
          },
          {
            name: "Molto Croissant",
            description: "Soft and fluffy croissant filled with chocolate or cream, a popular on-the-go snack.",
            price: 5.00,
            category: "Snacks",
            imageUrl: "https://example.com/molto.jpg",
            stock: 150,
            sizes: [
              { size: "Regular", price: 5.00, stock: 100 },
              { size: "Large", price: 8.00, stock: 50 }
            ]
          },
    
   
          {
            name: "Corona Chocolate",
            description: "Egyptian chocolate bar made with premium cocoa, rich and smooth.",
            price: 10.00,
            category: "Snacks",
            imageUrl: "https://example.com/corona_chocolate.jpg",
            stock: 80,
            sizes: [
              { size: "30g", price: 10.00, stock: 50 },
              { size: "60g", price: 18.00, stock: 30 }
            ]
          },
      
          {
            name: "Halawa Bar",
            description: "Sweet sesame paste bar, a traditional and filling Egyptian snack.",
            price: 5.50,
            category: "Snacks",
            imageUrl: "https://example.com/halawa.jpg",
            stock: 95,
            sizes: [
              { size: "50g", price: 5.50, stock: 60 },
              { size: "100g", price: 9.00, stock: 35 }
            ]
          },


          // Vegetables Category

    {
      name: "Tomatoes",
      description: "Fresh and juicy red tomatoes, perfect for cooking or salads.",
      price: 10.00,
      category: "Vegetables",
      imageUrl: "https://example.com/tomatoes.jpg",
      stock: 150,
      sizes: [
        { size: "1kg", price: 10.00, stock: 90 },
        { size: "2kg", price: 18.00, stock: 60 }
      ]
    },
    {
      name: "Potatoes",
      description: "Locally grown potatoes, ideal for fries, stews, or baking.",
      price: 9.00,
      category: "Vegetables",
      imageUrl: "https://example.com/potatoes.jpg",
      stock: 130,
      sizes: [
        { size: "1kg", price: 9.00, stock: 80 },
        { size: "2kg", price: 16.00, stock: 50 }
      ]
    },
    {
      name: "Onions",
      description: "Golden onions, essential for everyday cooking.",
      price: 8.00,
      category: "Vegetables",
      imageUrl: "https://example.com/onions.jpg",
      stock: 140,
      sizes: [
        { size: "1kg", price: 8.00, stock: 100 },
        { size: "2kg", price: 14.00, stock: 40 }
      ]
    },
    {
      name: "Cucumbers",
      description: "Crunchy cucumbers, great for salads and sandwiches.",
      price: 10.00,
      category: "Vegetables",
      imageUrl: "https://example.com/cucumbers.jpg",
      stock: 100,
      sizes: [
        { size: "1kg", price: 10.00, stock: 70 },
        { size: "500g", price: 6.00, stock: 30 }
      ]
    },
    {
      name: "Carrots",
      description: "Sweet and firm carrots, ideal for juicing, cooking, or snacking.",
      price: 11.00,
      category: "Vegetables",
      imageUrl: "https://example.com/carrots.jpg",
      stock: 90,
      sizes: [
        { size: "1kg", price: 11.00, stock: 60 },
        { size: "2kg", price: 20.00, stock: 30 }
      ]
    },
    {
      name: "Garlic",
      description: "Fresh garlic bulbs with strong aroma and flavor, essential for seasoning.",
      price: 20.00,
      category: "Vegetables",
      imageUrl: "https://example.com/garlic.jpg",
      stock: 80,
      sizes: [
        { size: "500g", price: 20.00, stock: 50 },
        { size: "1kg", price: 38.00, stock: 30 }
      ]
    },
  
    {
      name: "Eggplants",
      description: "Fresh eggplants, ideal for grilling or making moussaka.",
      price: 13.00,
      category: "Vegetables",
      imageUrl: "https://example.com/eggplants.jpg",
      stock: 85,
      sizes: [
        { size: "1kg", price: 13.00, stock: 60 },
        { size: "2kg", price: 24.00, stock: 25 }
      ]
    },
    {
      name: "Lettuce",
      description: "Crispy green lettuce, perfect for salads and sandwiches.",
      price: 7.00,
      category: "Vegetables",
      imageUrl: "https://example.com/lettuce.jpg",
      stock: 70,
      sizes: [
        { size: "1 head", price: 7.00, stock: 70 }
      ]
    },
    {
      name: "Molokhia",
      description: "Traditional Egyptian leafy green, great for molokhia soup.",
      price: 12.00,
      category: "Vegetables",
      imageUrl: "https://example.com/molokhia.jpg",
      stock: 90,
      sizes: [
        { size: "500g", price: 12.00, stock: 50 },
        { size: "1kg", price: 22.00, stock: 40 }
      ]
    },

    // Meats and Fish Category

    {
      name: "Beef Mince",
      description: "Freshly ground local beef, perfect for kofta or pasta dishes.",
      price: 160.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/beef_mince.jpg",
      stock: 60,
      sizes: [
        { size: "500g", price: 85.00, stock: 40 },
        { size: "1kg", price: 160.00, stock: 20 }
      ]
    },
    {
      name: "Veal Cubes",
      description: "Tender veal cubes, great for stews and casseroles.",
      price: 200.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/veal_cubes.jpg",
      stock: 40,
      sizes: [
        { size: "500g", price: 110.00, stock: 25 },
        { size: "1kg", price: 200.00, stock: 15 }
      ]
    },
    {
      name: "Chicken Breast",
      description: "Boneless skinless chicken breasts, perfect for grilling or frying.",
      price: 130.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/chicken_breast.jpg",
      stock: 80,
      sizes: [
        { size: "500g", price: 70.00, stock: 50 },
        { size: "1kg", price: 130.00, stock: 30 }
      ]
    },
    {
      name: "Whole Chicken",
      description: "Farm-raised whole chicken, ideal for roasting or boiling.",
      price: 115.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/whole_chicken.jpg",
      stock: 45,
      sizes: [
        { size: "1.2kg", price: 115.00, stock: 45 }
      ]
    },
    {
      name: "Alexandrian Sausages",
      description: "Traditional spicy Alexandrian beef sausages.",
      price: 140.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/sausage.jpg",
      stock: 50,
      sizes: [
        { size: "500g", price: 75.00, stock: 30 },
        { size: "1kg", price: 140.00, stock: 20 }
      ]
    },
    {
      name: "Baladi Liver",
      description: "Fresh local liver, rich in iron and flavor.",
      price: 120.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/liver.jpg",
      stock: 55,
      sizes: [
        { size: "500g", price: 65.00, stock: 35 },
        { size: "1kg", price: 120.00, stock: 20 }
      ]
    },
    {
      name: "Tilapia Fish",
      description: "Fresh Nile tilapia, great for grilling or frying.",
      price: 90.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/tilapia.jpg",
      stock: 60,
      sizes: [
        { size: "1kg", price: 90.00, stock: 60 }
      ]
    },
    {
      name: "Mullet Fish (Bouri)",
      description: "Popular Mediterranean fish, firm texture and mild flavor.",
      price: 110.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/bouri.jpg",
      stock: 45,
      sizes: [
        { size: "1kg", price: 110.00, stock: 45 }
      ]
    },
    {
      name: "Shrimp",
      description: "Fresh medium-sized shrimp, ideal for frying or pasta dishes.",
      price: 260.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/shrimp.jpg",
      stock: 35,
      sizes: [
        { size: "500g", price: 135.00, stock: 20 },
        { size: "1kg", price: 260.00, stock: 15 }
      ]
    },
    {
      name: "Calamari Rings",
      description: "Tender squid rings, cleaned and ready to cook.",
      price: 240.00,
      category: "Meats and Fish",
      imageUrl: "https://example.com/calamari.jpg",
      stock: 25,
      sizes: [
        { size: "500g", price: 125.00, stock: 15 },
        { size: "1kg", price: 240.00, stock: 10 }
      ]
    } 
        
    ];


    const seedDatabase = async () => {
      try {
        const productRow = [];
    
        for (let p of seedProducts) {
          const productData = { ...p };
          const qrData = `Product: ${p.name}, Price: ${p.price}, Description: ${p.description}`;
          productData.qrCode = await QRCode.toDataURL(qrData); // Add QR code (base64 string)
          productRow.push(productData); 
        }
    
        // Insert the products into the database
        await product.insertMany(productRow);
    
        console.log('Products seeded with data');
      } catch (err) {
        console.error('Error seeding products:', err); 
      } finally { 
        mongoose.disconnect();  // Close the connection
      }
    }; 
    
    module.exports = seedDatabase;