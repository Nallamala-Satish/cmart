import images from '../assets/images';
import strings from '../i18n/strings';
import {StackNav} from '../navigation/NavigationKeys';

const OnBoardingSlide = [
  {
    text: 'We provide high quality products just for you',
    image: images.onBordingImg1,
  },
  {
    text: 'Your satisfaction is our number one priority',
    image: images.onBordingImg2,
  },
  {
    text: "Let's fulfill your daily needs with Ecomark right now!",
    image: images.onBordingImg3,
  },
];

const GenderData = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

const ProfileSetting = [
  {
    id: 1,
    title: strings.editProfile,
    icon: 'person-outline',
    route: StackNav.SetUpProfile,
    header: strings.editProfile,
  },
  {
    id: 2,
    title: strings.address,
    icon: 'location-outline',
    route: StackNav.Address,
  },
  {
    id: 2,
    title: strings.notification,
    icon: 'notifications-outline',
    route: StackNav.NotificationSetting,
  },
  {
    id: 3,
    title: strings.payment,
    icon: 'wallet-outline',
    route: StackNav.Payment,
  },
  {
    id: 4,
    title: strings.security,
    icon: 'shield-checkmark-outline',
    route: StackNav.Security,
  },
  {
    id: 5,
    title: strings.language,
    icon: 'options-outline',
    value: 'English(US)',
    route: StackNav.Language,
  },
  {
    id: 6,
    title: strings.darkMode,
    icon: 'contrast-outline',
    rightIcon: 'rightIcon',
  },
  {
    id: 7,
    title: strings.privacyPolicy,
    icon: 'lock-closed-outline',
    route: StackNav.PrivacyPolicy,
  },
  {
    id: 8,
    title: strings.helpCenter,
    icon: 'information-circle-outline',
    route: StackNav.HelpCenter,
  },
  {
    id: 8,
    title: strings.inviteFriends,
    icon: 'people-outline',
    route: StackNav.InviteFriends,
  },
];

const contactUsData = [
  {
    id: 1,
    title: 'Customer Service',
    icon: 'headset',
  },
  {
    id: 2,
    title: 'WhatsApp',
    icon: 'whatsapp',
  },
  {
    id: 3,
    title: 'Website',
    icon: 'google-earth',
  },
  {
    id: 4,
    title: 'Facebook',
    icon: 'facebook',
  },
  {
    id: 5,
    title: 'Instagram',
    icon: 'instagram',
  },
  {
    id: 6,
    title: 'Twitter',
    icon: 'twitter',
  },
];

const helperCategoryData = [
  'General',
  'Account',
  'Payment',
  'Subscription',
  'Others',
];

const helperData = [
  {
    title: 'What is Ecomark?',
    description:
      'Anistream is a streaming service that offers a wide variety of anime titles.',
  },
  {
    title: 'How to use Ecomark?',
    description:
      'You can sign up for Anistream by downloading the app from the App Store or Google Play Store.',
  },
  {
    title: 'How do I cancel a orders product?',
    description:
      'You can remove anime on your wishlist by clicking the heart icon on the anime details page.',
  },
  {
    title: 'Is Ecomark free to use?',
    description:
      'You can subscribe to premium by clicking the premium button on the home page.',
  },
  {
    title: 'How to add promo on Ecomark?',
    description:
      'You can download anime by clicking the download icon on the anime details page.',
  },
  {
    title: 'How to unsubscribe from premium?',
    description:
      'You can unsubscribe from premium by clicking the premium button on the home page.',
  },
];

const languageData = [
  {
    title: 'Suggested',
    data: [{lnName: 'English(US)'}, {lnName: 'English(UK)'}],
  },
  {
    title: 'Language',
    data: [
      {
        lnName: 'English',
      },
      {
        lnName: 'Spanish',
      },
      {
        lnName: 'French',
      },
      {
        lnName: 'German',
      },
      {
        lnName: 'Italian',
      },
      {
        lnName: 'Portuguese',
      },
      {
        lnName: 'Russian',
      },
      {
        lnName: 'Turkish',
      },
      {
        lnName: 'Chinese',
      },
      {
        lnName: 'Japanese',
      },
      {
        lnName: 'Korean',
      },
      {
        lnName: 'Arabic',
      },
      {
        lnName: 'Hindi',
      },
      {
        lnName: 'Indonesian',
      },
      {
        lnName: 'Malay',
      },
      {
        lnName: 'Thai',
      },
    ],
  },
];

const privacyPolicyData = [
  {
    title: strings.privacyPolicy1,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy2,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy3,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy2,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy3,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy2,
    description: strings.privacyPolicyDesc,
  },
  {
    title: strings.privacyPolicy3,
    description: strings.privacyPolicyDesc,
  },
];

const userDetail = [
  {
    name: 'Dracel Steward',
    description: 'arianacooper | 24.5M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
  },
  {
    name: 'John Doe',
    description: 'johndoe | 10M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Jane Smith',
    description: 'janesmith | 5M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHVzZXIlMjBwcm9maWxlJTIwd2l0aCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Bob Johnson',
    description: 'bobjohnson | 2M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Sara Wilson',
    description: 'sarawilson | 1M followers',
    imgUrl:
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Tom Wilson',
    description: 'tomwilson | 500K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Alice Brown',
    description: 'alicebrown | 250K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Emily Davis',
    description: 'emilydavis | 100K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Mark Lee',
    description: 'marklee | 50K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Laura Lee',
    description: 'lauralee | 10K followers',
    imgUrl:
      'https://images.unsplash.com/photo-1610737241336-371badac3b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  },
];

const chatData = [
  {
    id: 1,
    message: 'Hi Theresa, good morning 😄',
    time: '12:00',
    type: 'sender',
  },
  {
    id: 2,
    message: 'Hi there, good morning! How are you?',
    time: '12:01',
    type: 'receiver',
  },
  {
    id: 3,
    message: 'I am doing well, thanks for asking 😊',
    time: '12:02',
    type: 'sender',
  },
  {
    id: 4,
    message: "That's great to hear! What are your plans for the day?",
    time: '12:03',
    type: 'receiver',
  },
  {
    id: 5,
    message:
      'I have a few meetings scheduled, but otherwise just working from home. How about you?',
    time: '12:04',
    type: 'sender',
  },
  {
    id: 1,
    message: 'Hi Theresa, good morning 😄',
    time: '12:00',
    type: 'sender',
  },
  {
    id: 2,
    message: 'Hi there, good morning! How are you?',
    time: '12:01',
    type: 'receiver',
  },
  {
    id: 3,
    message: 'I am doing well, thanks for asking 😊',
    time: '12:02',
    type: 'sender',
  },
  {
    id: 4,
    message: "That's great to hear! What are your plans for the day?",
    time: '12:03',
    type: 'receiver',
  },
  {
    id: 5,
    message:
      'I have a few meetings scheduled, but otherwise just working from home. How about you?',
    time: '12:04',
    type: 'sender',
  },
  {
    id: 1,
    message: 'Hi Theresa, good morning 😄',
    time: '12:00',
    type: 'sender',
  },
  {
    id: 2,
    message: 'Hi there, good morning! How are you?',
    time: '12:01',
    type: 'receiver',
  },
  {
    id: 3,
    message: 'I am doing well, thanks for asking 😊',
    time: '12:02',
    type: 'sender',
  },
  {
    id: 4,
    message: "That's great to hear! What are your plans for the day?",
    time: '12:03',
    type: 'receiver',
  },
  {
    id: 5,
    message:
      'I have a few meetings scheduled, but otherwise just working from home. How about you?',
    time: '12:04',
    type: 'sender',
  },
];

const AddressData = [
  {
    id: 1,
    title: 'Home',
    address: '123, Main Street, New York, USA',
    isDefault: true,
  },
  {
    id: 2,
    title: 'Office',
    address: '345, Second Street, New York, USA',
    isDefault: false,
  },
  {
    id: 3,
    title: 'Appartment',
    address: '567, Third Street, New York, USA',
    isDefault: false,
  },
  {
    id: 4,
    title: "Parent's House",
    address: '789, Fourth Street, New York, USA',
    isDefault: false,
  },
  {
    id: 5,
    title: 'Farm House',
    address: '101, Fifth Street, New York, USA',
    isDefault: false,
  },
  {
    id: 6,
    title: 'Town Square',
    address: '123, Main Street, New York, USA',
    isDefault: false,
  },
];

const walletData = [
  {
    id: 1,
    product: 'Suga Leather Shoes',
    price: '$100',
    date: 'Dec 15, 2024 | 12:00 PM',
    status: strings.orders,
    productImage: images.shoes1,
  },
  {
    id: 2,
    product: strings.topUpWallet,
    price: '$150',
    date: 'Jan 05, 2023 | 12:50 PM',
    status: strings.topUp,
  },
  {
    id: 3,
    product: 'Werolla Cardigans',
    price: '$385',
    date: 'Dec 14, 2024 | 11:34 PM',
    status: strings.orders,
    productImage: images.clothe3,
  },
  {
    id: 4,
    product: 'Mini Leather Bag',
    price: '$653',
    date: 'Dec 13, 2024 | 03:23 AM',
    status: strings.orders,
    productImage: images.bag1,
  },
  {
    id: 5,
    product: strings.topUpWallet,
    price: '$600',
    date: 'Dec 12, 2024 | 02:50 AM',
    status: strings.topUp,
  },
  {
    id: 6,
    product: 'Puma Leather Shoes',
    price: '$356',
    date: 'Dec 03, 2024 | 02:34 PM',
    status: strings.orders,
    productImage: images.shoes2,
  },
  {
    id: 7,
    product: 'Sony Microphone',
    price: '$354',
    date: 'Aug 07, 2023 | 05:40 PM ',
    status: strings.orders,
    productImage: images.mic1,
  },
  {
    id: 8,
    product: 'Gucci Leather Bag',
    price: '$100',
    date: 'Jul 15, 2023 | 12:00 PM',
    status: strings.orders,
    productImage: images.bag2,
  },
  {
    id: 9,
    product: strings.topUpWallet,
    price: '$560',
    date: 'Jan 05, 2023 | 12:50 PM',
    status: strings.topUp,
  },
];

const onGoingData = [
  {
    id: 1,
    product: 'Suga Leather Shoes',
    price: '$100',
    date: 'Dec 15, 2024 | 12:00 PM',
    status: strings.orders,
    productImage: images.shoes1,
    color: '#7A5548',
    size: '38',
  },
  {
    id: 2,
    product: 'Werolla Cardigans',
    price: '$385',
    date: 'Dec 14, 2024 | 11:34 PM',
    status: strings.orders,
    productImage: images.clothe3,
    color: '#949494',
    size: 'M',
  },
  {
    id: 3,
    product: 'Mini Leather Bag',
    price: '$653',
    date: 'Dec 13, 2024 | 03:23 AM',
    status: strings.orders,
    productImage: images.bag1,
    color: '#101010',
    size: 'S',
  },
  {
    id: 4,
    product: 'Puma Leather Shoes',
    price: '$356',
    date: 'Dec 03, 2024 | 02:34 PM',
    status: strings.orders,
    productImage: images.shoes2,
    color: '#101010',
    size: '40',
  },
  {
    id: 5,
    product: 'Sony Microphone',
    price: '$354',
    date: 'Aug 07, 2023 | 05:40 PM ',
    status: strings.orders,
    productImage: images.mic1,
    color: '#7A5548',
  },
  {
    id: 6,
    product: 'Gucci Leather Bag',
    price: '$100',
    date: 'Jul 15, 2023 | 12:00 PM',
    status: strings.orders,
    productImage: images.bag2,
    color: '#101010',
    size: 'M',
  },
];

const completedOrderData = [
  {
    id: 1,
    product: 'Sonia Headphone',
    price: '$325.00',
    date: 'Dec 15, 2024 | 12:00 PM',
    status: strings.orders,
    productImage: images.headphone1,
    color: '#000',
  },
  {
    id: 2,
    product: 'Mini Leather Bag',
    price: '$540.00',
    date: 'Dec 14, 2024 | 11:34 PM',
    status: strings.orders,
    productImage: images.bag1,
    color: '#949494',
  },
  {
    id: 3,
    product: 'Puma Sneaker Shoe',
    price: '$390.00',
    date: 'Dec 13, 2024 | 03:23 AM',
    status: strings.orders,
    productImage: images.shoes3,
    color: '#101010',
    size: '32',
  },
  {
    id: 4,
    product: 'Fujifilm Camera',
    price: '$870.00',
    date: 'Dec 03, 2024 | 02:34 PM',
    status: strings.orders,
    productImage: images.camera1,
    color: '#101010',
  },
  {
    id: 5,
    product: 'Zonio Super Watch',
    price: '$850.00',
    date: 'Aug 07, 2023 | 05:40 PM ',
    status: strings.orders,
    productImage: images.watch1,
    color: '#E7E7E7',
  },
  {
    id: 6,
    product: 'Gucci Leather Bag',
    price: '$100',
    date: 'Jul 15, 2023 | 12:00 PM',
    status: strings.orders,
    productImage: images.bag2,
    color: '#101010',
    size: 'M',
  },
];

const orderStatus = [
  {
    id: 1,
    title: 'Order In Transit - Dec 17',
    time: '12:00 PM',
    status: '32 Manchester Ave. Ringgold, GA 30736',
  },
  {
    id: 2,
    title: 'Order ... Customs Port - Dec 16',
    time: '14:40 PM',
    status: '4 Evergreen Street Lake Zurich, IL 60047',
  },
  {
    id: 3,
    title: 'Orders are ... Shipped - Dec 15',
    time: '11:30 AM',
    status: '9177 Hillcrest Street Wheeling, WV 26003',
  },
  {
    id: 4,
    title: 'Order is in Packing - Dec 15',
    time: '10:25 PM',
    status: '891 Glen Ridge St. Gainesville, VA 20155',
  },
  {
    id: 5,
    title: 'Verified Payments - Dec 15',
    time: '10:04 PM',
    status: '55 Summerhouse Dr. Apopka, FL 32703',
  },
];

const orderStatusCategory = [
  {
    id: 1,
    image: images.seller,
    position: 1,
    isHide: false,
  },
  {
    id: 2,
    image: images.shipping,
    position: 2,
    isHide: true,
  },
  {
    id: 3,
    image: images.courier,
    position: 3,
    isHide: true,
  },
  {
    id: 4,
    image: images.delivered,
    position: 4,
    isHide: true,
  },
];

const homeCategoryData = [
  {
    id: 1,
    image: images.categoryClothes,
    title: strings.clothes,
    data: [
      {
        id: 1,
        product: 'Venesa Long Shirt',
        price: '$320.00',
        date: 'Dec 15, 2024 | 12:00 PM',
        status: strings.orders,
        productImage: images.clothe1,
        color: '#000',
        rating: '4.8',
        sold: '9,742',
        size: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 2,
        product: 'Werolla Cardigans',
        price: '$345.00',
        date: 'Dec 14, 2024 | 11:34 PM',
        status: strings.orders,
        productImage: images.clothe2,
        color: '#949494',
        rating: '4.5',
        sold: '6.4k',
        size: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 3,
        product: 'Viyara Ma Blazer',
        price: '$385.00',
        date: 'Dec 13, 2024 | 03:23 AM',
        status: strings.orders,
        productImage: images.clothe3,
        color: '#101010',
        rating: '3.2',
        sold: '4.6k',
        size: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 4,
        product: 'Moco Blue Suit',
        price: '$410.00',
        date: 'Dec 03, 2024 | 02:34 PM',
        status: strings.orders,
        productImage: images.clothe4,
        color: '#101010',
        rating: '4.1',
        sold: '11.3k',
        size: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 5,
        product: 'Black Jacket',
        price: '$390.00',
        date: 'Aug 07, 2023 | 05:40 PM ',
        status: strings.orders,
        productImage: images.clothe6,
        color: '#E7E7E7',
        rating: '4.5',
        sold: '3642',
        size: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 6,
        product: 'Black Turtleneck',
        price: '$550.00',
        date: 'Jul 15, 2023 | 12:00 PM',
        status: strings.orders,
        productImage: images.clothe5,
        color: '#101010',
        rating: '4.5',
        sold: '5642',
        size: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 2,
    image: images.categoryShoes,
    title: strings.shoes,
    data: [
      {
        id: 1,
        product: 'Suga Leather Shoes',
        price: '$375.00',
        date: 'Dec 15, 2024 | 12:00 PM',
        status: strings.number,
        productImage: images.shoes1,
        color: '#000',
        rating: '4.7',
        sold: '7,483',
        size: ['6', '7', '8', '9', '10', '11', '12'],
      },
      {
        id: 2,
        product: 'Puma Black Shoes',
        price: '$345.00',
        date: 'Dec 14, 2024 | 11:34 PM',
        status: strings.number,
        productImage: images.shoes2,
        color: '#949494',
        rating: '4.5',
        sold: '6.4k',
        size: ['6', '7', '8', '9', '10', '11', '12'],
      },
      {
        id: 3,
        product: 'Puma Casual Shoes',
        price: '$385.00',
        date: 'Dec 13, 2024 | 03:23 AM',
        status: strings.number,
        productImage: images.shoes3,
        color: '#101010',
        rating: '3.2',
        sold: '4.6k',
        size: ['6', '7', '8', '9', '10', '11', '12'],
      },
      {
        id: 4,
        product: 'Puma White Shoes',
        price: '$410.00',
        date: 'Dec 03, 2024 | 02:34 PM',
        status: strings.number,
        productImage: images.shoes4,
        color: '#101010',
        rating: '4.1',
        sold: '11.3k',
        size: ['6', '7', '8', '9', '10', '11', '12'],
      },
      {
        id: 5,
        product: 'Nike Casual Shoes',
        price: '$390.00',
        date: 'Aug 07, 2023 | 05:40 PM ',
        status: strings.number,
        productImage: images.shoes5,
        color: '#E7E7E7',
        rating: '4.5',
        sold: '3642',
        size: ['6', '7', '8', '9', '10', '11', '12'],
      },
      {
        id: 6,
        product: 'Black White Shoes',
        price: '$550.00',
        date: 'Jul 15, 2023 | 12:00 PM',
        status: strings.number,
        productImage: images.shoes6,
        color: '#101010',
        rating: '4.5',
        sold: '5642',
        size: ['6', '7', '8', '9', '10', '11', '12'],
      },
      {
        id: 7,
        product: 'Nike Red Shoes',
        price: '$476.00',
        date: 'Jul 15, 2023 | 12:00 PM',
        status: strings.number,
        productImage: images.shoes7,
        color: '#101010',
        rating: '4.5',
        sold: '6833',
        size: ['6', '7', '8', '9', '10', '11', '12'],
      },
    ],
  },
  {
    id: 3,
    image: images.categoryBag,
    title: strings.bags,
    data: [
      {
        id: 1,
        product: 'Mini Leather Bag',
        price: '$540.00',
        date: 'Dec 15, 2024 | 12:00 PM',
        status: strings.number,
        productImage: images.bag2,
        color: '#000',
        rating: '4.5',
        sold: '9,546',
      },
      {
        id: 2,
        product: 'Snake Leather Bag',
        price: '$280.00',
        date: 'Dec 14, 2024 | 11:34 PM',
        status: strings.number,
        productImage: images.bag3,
        color: '#949494',
        rating: '4.8',
        sold: '6.4k',
      },
      {
        id: 3,
        product: 'Orange Leather Bag',
        price: '$385.00',
        date: 'Dec 13, 2024 | 03:23 AM',
        status: strings.number,
        productImage: images.bag4,
        color: '#101010',
        rating: '3.2',
        sold: '4.6k',
      },
      {
        id: 4,
        product: 'Red Leather Bag',
        price: '$410.00',
        date: 'Dec 03, 2024 | 02:34 PM',
        status: strings.number,
        productImage: images.bag5,
        color: '#101010',
        rating: '3.4',
        sold: '11.3k',
      },
      {
        id: 5,
        product: 'GG Leather Bag',
        price: '$220.00',
        date: 'Aug 07, 2023 | 05:40 PM ',
        status: strings.number,
        productImage: images.bag6,
        color: '#E7E7E7',
        rating: '4.2',
        sold: '3642',
      },
      {
        id: 6,
        product: 'Brown Leather Bag',
        price: '$270.00',
        date: 'Jul 15, 2023 | 12:00 PM',
        status: strings.number,
        productImage: images.bag1,
        color: '#101010',
        rating: '4.4',
        sold: '5642',
      },
    ],
  },
  {
    id: 4,
    image: images.categoryElectronics,
    title: strings.electronics,
    data: [
      {
        id: 1,
        product: 'Vinia Headphone',
        price: '$360.00',
        date: 'Dec 15, 2024 | 12:00 PM',
        status: strings.number,
        productImage: images.headphone2,
        color: '#000',
        rating: '4.9',
        sold: '7,474',
      },
      {
        id: 2,
        product: 'Fujifilm Camera',
        price: '$290.00',
        date: 'Dec 14, 2024 | 11:34 PM',
        status: strings.number,
        productImage: images.camera1,
        color: '#949494',
        rating: '4.3',
        sold: '4.4k',
      },
      {
        id: 3,
        product: 'Rode Microphone',
        price: '$265.00',
        date: 'Dec 13, 2024 | 03:23 AM',
        status: strings.number,
        productImage: images.mic3,
        color: '#101010',
        rating: '3.5',
        sold: '7.3k',
      },
      {
        id: 4,
        product: 'Sonia Headphone',
        price: '$570.00',
        date: 'Dec 03, 2024 | 02:34 PM',
        status: strings.number,
        productImage: images.headphone1,
        color: '#101010',
        rating: '4.7',
        sold: '11.3k',
      },
      {
        id: 5,
        product: 'Canon Camera',
        price: '$532.00',
        date: 'Aug 07, 2023 | 05:40 PM ',
        status: strings.number,
        productImage: images.camera2,
        color: '#E7E7E7',
        rating: '3.2',
        sold: '4.8k',
      },
      {
        id: 6,
        product: 'Airtight Microphone',
        price: '$423.00',
        date: 'Jul 15, 2023 | 12:00 PM',
        status: strings.number,
        productImage: images.mic1,
        color: '#101010',
        rating: '3.6',
        sold: '8.9k',
      },
    ],
  },
  {
    id: 5,
    image: images.categoryWatch,
    title: strings.watch,
    data: [
      {
        id: 1,
        product: 'Zonio Super Watch',
        price: '$850.00',
        date: 'Dec 15, 2024 | 12:00 PM',
        status: strings.number,
        productImage: images.watch1,
        color: '#000',
        rating: '4.9',
        sold: '7,884',
      },
      {
        id: 2,
        product: 'Golden Ring Watch',
        price: '$790.00',
        date: 'Dec 14, 2024 | 11:34 PM',
        status: strings.number,
        productImage: images.watch2,
        color: '#949494',
        rating: '4.3',
        sold: '4.4k',
      },
      {
        id: 3,
        product: 'Black Fire Watch',
        price: '$435.00',
        date: 'Dec 13, 2024 | 03:23 AM',
        status: strings.number,
        productImage: images.watch3,
        color: '#101010',
        rating: '5.0',
        sold: '10.3k',
      },
      {
        id: 4,
        product: 'Glassia Watch',
        price: '$455.00',
        date: 'Dec 03, 2024 | 02:34 PM',
        status: strings.number,
        productImage: images.watch4,
        color: '#101010',
        rating: '4.9',
        sold: '4.6k',
      },
      {
        id: 5,
        product: 'Silver Watch',
        price: '$550.00',
        date: 'Aug 07, 2023 | 05:40 PM ',
        status: strings.number,
        productImage: images.watch5,
        color: '#E7E7E7',
        rating: '3.2',
        sold: '4.8k',
      },
      {
        id: 6,
        product: 'Golden Watch',
        price: '$390.00',
        date: 'Jul 15, 2023 | 12:00 PM',
        status: strings.number,
        productImage: images.watch6,
        color: '#101010',
        rating: '4.6',
        sold: '4.9k',
      },
    ],
  },
  {
    id: 6,
    image: images.categoryJewelry,
    title: strings.jewelry,
    data: [
      {
        id: 1,
        product: 'Red Ruby Rings',
        price: '$960.00',
        date: 'Dec 15, 2024 | 12:00 PM',
        status: strings.number,
        productImage: images.jewelry1,
        color: '#000',
        rating: '4.9',
        sold: '6,694',
      },
      {
        id: 2,
        product: 'Viya Blue Diamond',
        price: '$850.00',
        date: 'Dec 14, 2024 | 11:34 PM',
        status: strings.number,
        productImage: images.jewelry2,
        color: '#949494',
        rating: '4.3',
        sold: '4.4k',
      },
      {
        id: 3,
        product: 'Hujia Silver Rings',
        price: '$920.00',
        date: 'Dec 13, 2024 | 03:23 AM',
        status: strings.number,
        productImage: images.jewelry3,
        color: '#101010',
        rating: '5.0',
        sold: '10.3k',
      },
      {
        id: 4,
        product: 'Riana Silver Ring',
        price: '$740.00',
        date: 'Dec 03, 2024 | 02:34 PM',
        status: strings.number,
        productImage: images.jewelry4,
        color: '#101010',
        rating: '4.9',
        sold: '5602',
      },
      {
        id: 5,
        product: 'Silver jewelry',
        price: '$590.00',
        date: 'Aug 07, 2023 | 05:40 PM ',
        status: strings.number,
        productImage: images.jewelry5,
        color: '#E7E7E7',
        rating: '3.2',
        sold: '6413',
      },
      {
        id: 6,
        product: 'Golden jewelry',
        price: '$930.00',
        date: 'Jul 15, 2023 | 12:00 PM',
        status: strings.number,
        productImage: images.jewelry6,
        color: '#101010',
        rating: '4.6',
        sold: '9534',
      },
    ],
  },
  {
    id: 7,
    image: images.categoryKitchen,
    title: strings.kitchen,
    data: [
      {
        id: 1,
        product: 'Slicia Silver Knife',
        price: '$120.00',
        date: 'Dec 15, 2024 | 12:00 PM',
        status: strings.number,
        productImage: images.kitchen1,
        color: '#000',
        rating: '4.9',
        sold: '7,543',
      },
      {
        id: 2,
        product: 'Spoon Bowl Set',
        price: '$180.00',
        date: 'Dec 14, 2024 | 11:34 PM',
        status: strings.number,
        productImage: images.kitchen2,
        color: '#949494',
        rating: '4.3',
        sold: '2.4k',
      },
      {
        id: 3,
        product: 'Double Butcher Knife',
        price: '$155.00',
        date: 'Dec 13, 2024 | 03:23 AM',
        status: strings.number,
        productImage: images.kitchen3,
        color: '#101010',
        rating: '5.0',
        sold: '7.3k',
      },
      {
        id: 4,
        product: 'Wooden Bowl Set',
        price: '$155.00',
        date: 'Dec 03, 2024 | 02:34 PM',
        status: strings.number,
        productImage: images.kitchen4,
        color: '#101010',
        rating: '4.9',
        sold: '2365',
      },
      {
        id: 5,
        product: 'Kitchen Knife Set',
        price: '$140.00',
        date: 'Aug 07, 2023 | 05:40 PM ',
        status: strings.number,
        productImage: images.kitchen5,
        color: '#E7E7E7',
        rating: '4.2',
        sold: '4.8k',
      },
      {
        id: 6,
        product: 'Kitchen Cutlery Set',
        price: '$190.00',
        date: 'Jul 15, 2023 | 12:00 PM',
        status: strings.number,
        productImage: images.kitchen6,
        color: '#101010',
        rating: '4.6',
        sold: '4.9k',
      },
    ],
  },
  {
    id: 8,
    image: images.categoryToys,
    title: strings.toys,
    data: [
      {
        id: 1,
        product: 'Batmobile Batman',
        price: '$430.00',
        date: 'Dec 15, 2024 | 12:00 PM',
        status: strings.number,
        productImage: images.toy1,
        color: '#000',
        rating: '4.8',
        sold: '6,328',
      },
      {
        id: 2,
        product: 'Mini Cutie Groot',
        price: '$390.00',
        date: 'Dec 14, 2024 | 11:34 PM',
        status: strings.number,
        productImage: images.toy2,
        color: '#949494',
        rating: '4.6',
        sold: '5.573',
      },
      {
        id: 3,
        product: 'Cutie Rabbit',
        price: '$329.00',
        date: 'Dec 13, 2024 | 03:23 AM',
        status: strings.number,
        productImage: images.toy3,
        color: '#101010',
        rating: '4.0',
        sold: '8.2k',
      },
      {
        id: 4,
        product: 'Masya Teddy Bear',
        price: '$155.00',
        date: 'Dec 03, 2024 | 02:34 PM',
        status: strings.number,
        productImage: images.toy4,
        color: '#101010',
        rating: '4.5',
        sold: '4.6k',
      },
      {
        id: 5,
        product: 'Yellow Lego Toys',
        price: '$350.00',
        date: 'Aug 07, 2023 | 05:40 PM ',
        status: strings.number,
        productImage: images.toy5,
        color: '#E7E7E7',
        rating: '3.2',
        sold: '4.8k',
      },
      {
        id: 6,
        product: 'Female Teddy Bear',
        price: '$450.00',
        date: 'Jul 15, 2023 | 12:00 PM',
        status: strings.number,
        productImage: images.toy6,
        color: '#101010',
        rating: '4.6',
        sold: '4.9k',
      },
    ],
  },
];

const mostPopularData = [
  strings.all,
  strings.clothes,
  strings.shoes,
  strings.bags,
  strings.electronics,
  strings.watch,
  strings.jewelry,
  strings.kitchen,
  strings.toys,
];

const homeProductData = [
  {
    id: 1,
    product: 'Sonia Headphone',
    price: '$325.00',
    date: 'Dec 15, 2024 | 12:00 PM',
    status: strings.orders,
    productImage: images.headphone1,
    color: '#000',
    rating: '4.3',
    sold: '23.5k',
  },
  {
    id: 2,
    product: 'Mini Leather Bag',
    price: '$540.00',
    date: 'Dec 14, 2024 | 11:34 PM',
    status: strings.orders,
    productImage: images.bag1,
    color: '#949494',
    rating: '4.5',
    sold: '6.4k',
  },
  {
    id: 3,
    product: 'Puma Casual Shoes',
    price: '$390.00',
    date: 'Dec 13, 2024 | 03:23 AM',
    status: strings.orders,
    productImage: images.shoes3,
    color: '#101010',
    size: ['6', '7', '8', '9', '10', '11', '12'],
    rating: '3.2',
    sold: '4.6k',
  },
  {
    id: 4,
    product: 'Fujifilm Camera',
    price: '$870.00',
    date: 'Dec 03, 2024 | 02:34 PM',
    status: strings.orders,
    productImage: images.camera1,
    color: '#101010',
    rating: '4.1',
    sold: '11.3k',
  },
  {
    id: 5,
    product: 'Zonio Super Watch',
    price: '$850.00',
    date: 'Aug 07, 2023 | 05:40 PM ',
    status: strings.orders,
    productImage: images.watch1,
    color: '#E7E7E7',
    rating: '4.5',
    sold: '3642',
  },
  {
    id: 6,
    product: 'Gucci Leather Bag',
    price: '$100',
    date: 'Jul 15, 2023 | 12:00 PM',
    status: strings.orders,
    productImage: images.bag2,
    color: '#101010',
    size: 'M',
    rating: '4.5',
    sold: '5642',
  },
];

const notificationData = [
  {
    title: 'Today',
    data: [
      {
        id: 1,
        image: images.discountIcon,
        title: '30% Special Discount!',
        description: 'Special promotion only valid today',
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: 1,
        image: images.walletIcon,
        title: 'Top Up E-Wallet Successful!',
        description: 'You have to top up your e-wallet',
      },
      {
        id: 1,
        image: images.locationIcon,
        title: 'New Services Available!',
        description: 'Now you can track orders in real time',
      },
    ],
  },
  {
    title: 'December 22, 2024',
    data: [
      {
        id: 1,
        image: images.creditCardIcon,
        title: 'Credit Card Connected!',
        description: 'Credit Card has been linked!',
      },
      {
        id: 1,
        image: images.profileIcon,
        title: 'Account Setup Successful!',
        description: 'Your account has been created!',
      },
    ],
  },
];

const colorData = [
  '#7A5548',
  '#797979',
  '#9F9F9F',
  '#673AB3',
  '#FF981F',
  '#607D8A',
  '#3F51B2',
];

const ratingData = [strings.all, '5', '4', '3', '2', '1'];

const reviewsData = [
  {
    id: 1,
    name: 'John Duew',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',

    rating: 5,
    review:
      'The item is very good, my son likes it very much and plays every day 💯💯💯',
    like: 352,
    time: '6 days ago',
  },
  {
    id: 2,
    name: 'Jane Doe',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',

    rating: 4,
    review:
      'The item is good, but it could be better. My son likes it, but he has some complaints about it.',
    like: 100,
    time: '2 days ago',
  },
  {
    id: 3,
    name: 'Bob Smith',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',

    rating: 3,
    review:
      'The item is okay, but it could be better. My son likes it, but he has some complaints about it.',
    like: 50,
    time: '1 day ago',
  },
  {
    id: 4,
    name: 'Alice Johnson',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',

    rating: 2,
    review:
      'The item is not very good. My son does not like it very much and does not play with it often.',
    like: 10,
    time: '1 hour ago',
  },
  {
    id: 5,
    name: 'Tom Hanks',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',

    rating: 1,
    review:
      'The item is terrible. My son hates it and does not play with it at all.',
    like: 1,
    time: '1 minute ago',
  },
  {
    id: 6,
    name: 'Megan Fox',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',

    rating: 5,
    review:
      'The item is very good, my son likes it very much and plays every day 💯💯💯',
    like: 352,
    time: '6 days ago',
  },
  {
    id: 7,
    name: 'Samantha Smith',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',

    rating: 4,
    review:
      'The item is good, but it could be better. My daughter likes it, but she has some complaints about it.',
    like: 200,
    time: '3 days ago',
  },
  {
    id: 8,
    name: 'David Johnson',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',

    rating: 3,
    review:
      'The item is okay, but it could be better. My daughter likes it, but she has some complaints about it.',
    like: 100,
    time: '2 days ago',
  },
  {
    id: 9,
    name: 'Emily Brown',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',

    rating: 2,
    review:
      'The item is not very good. My daughter does not like it very much and does not play with it often.',
    like: 20,
    time: '1 day ago',
  },
  {
    id: 10,
    name: 'Olivia Davis',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',

    rating: 1,
    review:
      'The item is terrible. My daughter hates it and does not play with it at all.',
    like: 2,
    time: '1 hour ago',
  },
  {
    id: 11,
    name: 'Sophia Wilson',
    image: 'https://randomuser.me/api/portraits/women/7.jpg',

    rating: 5,
    review:
      'The item is very good, my daughter likes it very much and plays every day 💯💯💯',
    like: 352,
    time: '6 days ago',
  },
];

const sortAndFilterData = [
  strings.mostPopular,
  strings.mostRecent,
  strings.oldest,
  strings.priceLowToHigh,
  strings.priceHighToLow,
];

const shippingData = [
  {
    id: 1,
    title: 'Economy',
    description: 'Delivery in 3-5 days',
    price: '$10',
    image: images.shipping1,
  },
  {
    id: 2,
    title: 'Regular',
    description: 'Delivery in 2-3 days',
    price: '$15',
    image: images.seller,
  },
  {
    id: 3,
    title: 'Cargo',
    description: 'Delivery in 1-2 days',
    price: '$20',
    image: images.shipping,
  },
  {
    id: 3,
    title: 'Express',
    description: 'Delivery in 1 days',
    price: '$25',
    image: images.shipping2,
  },
];

const addPromoData = [
  {
    id: 1,
    title: 'Special 25% Off',
    description: 'Special promo only today!',
  },
  {
    id: 2,
    title: 'Discount 30% Off',
    description: 'New user special promo',
  },
  {
    id: 3,
    title: 'Special 20% Off',
    description: 'Special promo only today!',
  },
  {
    id: 4,
    title: 'Discount 15% Off',
    description: 'Special promo only valid today!',
  },
  {
    id: 5,
    title: 'Discount 35% Off',
    description: 'Special promo only valid today!',
  },
];

export {
  ProfileSetting,
  GenderData,
  OnBoardingSlide,
  contactUsData,
  helperCategoryData,
  helperData,
  languageData,
  privacyPolicyData,
  userDetail,
  chatData,
  AddressData,
  walletData,
  onGoingData,
  orderStatus,
  orderStatusCategory,
  completedOrderData,
  homeCategoryData,
  mostPopularData,
  homeProductData,
  notificationData,
  colorData,
  ratingData,
  reviewsData,
  sortAndFilterData,
  shippingData,
  addPromoData,
};
