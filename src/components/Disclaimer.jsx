import React, { useState } from 'react';
import { Divider, Text } from '@mantine/core';


const Disclaimer = () => {
  const [opened, setOpened] = useState(false);

  return (  
   <><Text size='xl' weight='800' align='center' variant='gradient' gradient={{from: 'blue', to: 'green', deg:100}}>
     FLORINOUNS DISCLAIMER PAGE
    </Text><>
        <div>
          <Divider size="md" />
        </div>
        <Text>
          All FloriNouns purchased through minting via this site or through a
          third party are under your own discretion. Please review laws and
          taxations surounding cryptocurrency and NFTs in your country before
          purchase. We are not liable for any legalities that comes from using our website.
        </Text>
      </></>
     
  );
};

export default Disclaimer;
