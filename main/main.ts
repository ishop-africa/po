import { MakeMoneyOnline } from './makemoney';

import { curencies } from './curencies'
import { makePopup } from "./popup"
import { EshopPayments } from "./estore";
import { auth } from './key';
import { PaymentsService } from './payment-auth';
(async () => {
     // Fetches the data from the server
     await new PaymentsService(auth.key, auth.url).getPubKey();
     // Runs if the page is index.html
     makePopup();
     // Estore
     // await EshopPayments()
     // checks for current curencies
     await curencies()
     // make money online function
     // MakeMoneyOnline()
})()



