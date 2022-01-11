const db = require('./connection');
const { User, Stall, StallProduct, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Fruit' },
    { name: 'Vegetables' }
  ]);

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Apple x12',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'apples.jpg',
      category: categories[0]._id
    },
    {
      name: 'Pear x12',
      description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'pears.jpg',
      category: categories[0]._id
    },
    {
      name: 'Green Pepper',
      description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'green-peppers.jpg',
      category: categories[1]._id
    },
    {
      name: 'Red Pepper',
      description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'red-peppers.jpg',
      category: categories[1]._id
    },
    {
      name: 'Carrot x24',
      description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'carrots.jpg',
      category: categories[1]._id
    },
    {
      name: 'Banana x6',
      description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'bananas.jpg',
      category: categories[0]._id
    },
    {
      name: 'Orange x12',
      description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'oranges.jpg',
      category: categories[0]._id
    },
    {
      name: 'Cucumber',
      description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cucumbers.jpg',
      category: categories[1]._id
    },
    {
      name: 'Strawberries x36',
      description: 
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'strawberries.jpg',
      category: categories[0]._id
    },
    {
      name: 'Raspberries x48',
      description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'raspberries.jpg',
      category: categories[0]._id
    }
  ]);

  console.log('products seeded');

  await Stall.deleteMany()

  const stalls = await Stall.insertMany([
    {
      name: "Pam's Stall",
      upvotes: 50,
      products: [
        {details: products[0]._id, price: 3.99, quantity: 200}, 
        {details: products[1]._id, price: 2.99, quantity: 400}, 
        {details: products[2]._id, price: 5.99, quantity: 150}],
      image: 'pams-stall.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.'
    },
    {
      name: "Elijah's Stall",
      upvotes: 30,
      products: [
        {details: products[0]._id, price: 4.99, quantity: 100}, 
        {details: products[3]._id, price: 6.99, quantity: 325}, 
        {details: products[7]._id, price: 2.99, quantity: 250},
        {details: products[8]._id, price: 7.99, quantity: 50}],
      image: 'elijahs-stall.jpg',
      description: 'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.'
    }
  ])

  console.log('Stalls Seeded')

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    username: 'PamPam123',
    email: 'pamela@testmail.com',
    password: 'password12345',
    stall: stalls[0]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    username: 'eholt123',
    email: 'eholt@testmail.com',
    password: 'password12345',
    stall: stalls[1]
  });

  console.log('users seeded');

  process.exit();
});
