import { useState } from 'react';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';

import ChatBox from 'src/components/chat-box/chat-box';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

// ----------------------------------------------------------------------

export function CarouselAlign() {
  const carousel = useCarousel({
    containScroll: false,
    slideSpacing: '20px',
  });
  const [chatBoxImage] = useState('../../assets/images/chatImage/location.png'); // Static image
  const [chatData, setChatData] = useState([
    {
      id: 1,
      name: 'Ayush',
      product: 'Headway Bassheads',
      quantity: 2,
      orderId: '12345',
      address: '123 Street, City',
      deliveryDate: '2024-09-10',
    },
  ]); // Initial card data with only one card

  // Function to generate random card data
  const generateRandomData = () => {
    const names = ['Ayush', 'Ankit', 'Nikhil', 'Sarthak', 'Rajendra'];
    const products = ['Headway Bassheads', 'Xiaomi Earbuds', 'Sony Headphones', 'JBL Speakers'];
    const addresses = [
      '123 Street, City',
      '456 Avenue, City',
      '789 Block, Town',
      '101 Circle, Village',
    ];
    const randomIndex = (arr) => Math.floor(Math.random() * arr.length);

    return {
      id: chatData.length + 1, // Increment ID
      name: names[randomIndex(names)],
      product: products[randomIndex(products)],
      quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1 and 5
      orderId: Math.random().toString(36).substring(7), // Random order ID
      address: addresses[randomIndex(addresses)],
      deliveryDate: `2024-09-${Math.floor(Math.random() * 30) + 1}`, // Random date in September
    };
  };

  // Function to handle adding a new card
  const addCard = () => {
    if (chatData.length < 10) {
      const newCard = generateRandomData();
      setChatData((prevData) => [...prevData, newCard]); // Add new card to the state
    }
  };

  // Function to handle deleting the most recent card
  const deleteCard = () => {
    if (chatData.length > 1) {
      setChatData((prevData) => prevData.slice(0, -1)); // Remove the last card
    }
  };

  return (
    <>
      <Carousel carousel={carousel} sx={{ width: '335px' }}>
        {chatData.map((item) => (
          <Box key={item.id} sx={{ width: '335px' }}>
            <ChatBox
              coverSrc={chatBoxImage}
              showImage
              text={
                <>
                  <span style={{ fontWeight: '600' }}>{`Hi ${item.name}! 🎧🛒`}</span> <br /> <br />
                  {`Congratulations! 🎉 Your order for the ${item.product} has been confirmed. 🙌`}
                  <br /> <br />
                  `Order Details:`
                  <br />
                  {`Product: ${item.product}`}
                  <br />
                  {`Quantity: ${item.quantity}`}
                  <br />
                  {`Order ID: ${item.orderId}`}
                  <br />
                  {`Delivery Address: ${item.address}`}
                  <br />
                  {`Estimated Delivery Date: ${item.deliveryDate}`}
                </>
              }
              showLinks
              showVisit
            />
          </Box>
        ))}
      </Carousel>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>
        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />

        <CarouselDotButtons
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />
      </Box>
      <Box display="flex" alignItems="center" gap={2} sx={{ mt: 1 }}>
        <Button onClick={addCard} disabled={chatData.length >= 10} variant="outlined">
          Add Card
        </Button>

        <Button onClick={deleteCard} disabled={chatData.length <= 1} variant="outlined" color='error'>
          Delete Card
        </Button>
      </Box>
    </>
  );
}
