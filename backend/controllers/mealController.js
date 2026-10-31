const MealPlan = require("../models/MealPlan");
const { getDBStatus } = require("../config/db");

let memoryMeals = [
  {
    id: "m-1",
    day: "Mon",
    date: "12 May",
    mealType: "Lunch",
    title: "Rajma Masala with Jeera Rice",
    description: "Hearty red kidney beans simmered in spiced onion-tomato gravy, paired with cumin basmati rice and fresh kachumber.",
    prepTime: "40 mins",
    calories: 520,
    image: "/images/meal_mon.jpg",
    ingredients: [
      { name: "Rajma (Red Kidney Beans)", amount: "1.5 cups soaked" },
      { name: "Basmati Rice & Jeera", amount: "1.5 cups" },
      { name: "Onion & Tomato Puree", amount: "1 cup each" },
      { name: "Ginger-Garlic Paste", amount: "1 tbsp" },
      { name: "Ghee & Garam Masala", amount: "2 tbsp" }
    ],
    recipe: "Pressure cook soaked rajma with turmeric and salt for 5-6 whistles until soft. In a kadai, heat ghee, splutter cumin, sauté onion and tomato puree with ginger-garlic and spices until oil separates. Add boiled rajma, simmer on low heat for 15 mins, and garnish with fresh coriander."
  },
  {
    id: "m-2",
    day: "Tue",
    date: "13 May",
    mealType: "Lunch",
    title: "Chicken Bhuna & Warm Phulkas",
    description: "Tender halal chicken slow-cooked with caramelized onions, whole spices, and served with soft whole wheat rotis.",
    prepTime: "35 mins",
    calories: 520,
    image: "/images/meal_tue.jpg",
    ingredients: [
      { name: "Halal Chicken", amount: "500g" },
      { name: "Onions (sliced thin)", amount: "3 large" },
      { name: "Tomato Puree & Curd", amount: "1/2 cup each" },
      { name: "Ginger-Garlic Paste", amount: "1.5 tbsp" },
      { name: "Whole Wheat Atta (for Phulkas)", amount: "2 cups" }
    ],
    recipe: "Heat mustard oil in kadai, brown sliced onions until deep golden. Add ginger-garlic paste, spices and tomato puree; sauté until oil releases. Add chicken pieces and roast on medium flame until thick, rich gravy coats the chicken. Serve steaming hot with soft, puffed whole wheat phulkas."
  },
  {
    id: "m-3",
    day: "Wed",
    date: "14 May",
    mealType: "Lunch",
    title: "Palak Paneer with Garlic Naan",
    description: "Fresh spinach puree blended with soft cottage cheese cubes, garlic butter naan, and aromatic roasted spices.",
    prepTime: "35 mins",
    calories: 580,
    image: "/images/meal_wed.jpg",
    ingredients: [
      { name: "Fresh Spinach (Palak)", amount: "500g blanched" },
      { name: "Fresh Malai Paneer", amount: "250g cubed" },
      { name: "Garlic Cloves & Butter", amount: "2 tbsp" },
      { name: "Kasuri Methi & Cream", amount: "2 tbsp" },
      { name: "Naan / Roti Flour", amount: "2 cups" }
    ],
    recipe: "Blanch spinach in boiling water for 2 mins, shock in ice water and blend. Sauté garlic and onions, add spinach puree and mild spices. Gently fold in paneer cubes and finish with a swirl of cream and crushed kasuri methi."
  },
  {
    id: "m-4",
    day: "Thu",
    date: "15 May",
    mealType: "Lunch",
    title: "Yellow Dal Tadka, Steamed Rice & Salad",
    description: "Soul-soothing yellow lentils tempered with ghee, garlic, hing, and cumin, served with piping hot rice and fresh salad.",
    prepTime: "25 mins",
    calories: 390,
    image: "/images/meal_thu.jpg",
    ingredients: [
      { name: "Toor / Arhar Dal", amount: "1 cup" },
      { name: "Desi Ghee", amount: "2 tbsp" },
      { name: "Garlic Cloves & Cumin", amount: "1 tbsp" },
      { name: "Turmeric & Kashmiri Chilli", amount: "1 tsp each" },
      { name: "Fresh Cucumber & Lemon", amount: "for salad" }
    ],
    recipe: "Pressure cook dal with turmeric, salt, and water until soft. In a small pan, heat ghee and add cumin, crushed garlic, and dry red chillies. Pour sizzling tadka over the dal and cover immediately. Serve hot with steamed rice and crisp salad!"
  },
  {
    id: "m-5",
    day: "Fri",
    date: "16 May",
    mealType: "Lunch",
    title: "Jumu'ah Special Royal Dum Biryani",
    description: "Classic royal dum biryani layered with marinated chicken, saffron milk, caramelized onions, and cooling raita.",
    prepTime: "60 mins",
    calories: 720,
    image: "/images/meal_fri.jpg",
    ingredients: [
      { name: "Halal Chicken / Mutton", amount: "500g" },
      { name: "Aged Basmati Rice", amount: "2 cups soaked" },
      { name: "Biryani Masala & Saffron", amount: "2 tbsp" },
      { name: "Fried Onions (Birista)", amount: "1 cup" },
      { name: "Fresh Mint & Coriander", amount: "1 bunch" }
    ],
    recipe: "Marinate chicken with yogurt, ginger-garlic paste, red chili, biryani spices and half the fried onions for 1 hour. Boil rice with whole spices until 70% cooked. Layer chicken and rice alternately in heavy-bottom pot, top with saffron milk, mint and ghee. Seal with dough or foil, cook on high 5 mins, then dum on low heat for 25 mins."
  },
  {
    id: "m-6",
    day: "Sat",
    date: "17 May",
    mealType: "Lunch",
    title: "Chole Bhature with Pickled Onions",
    description: "Punjabi spiced chickpeas in tangy pomegranate-amchur gravy served with golden puffed bhature and spicy green chutney.",
    prepTime: "45 mins",
    calories: 680,
    image: "/images/meal_sat.jpg",
    ingredients: [
      { name: "Kabuli Chana (Chickpeas)", amount: "2 cups soaked" },
      { name: "Chole Masala & Anardana", amount: "2 tbsp" },
      { name: "Maida & Suji for Bhatura", amount: "2 cups" },
      { name: "Curd & Green Chilies", amount: "for dough & tadka" }
    ],
    recipe: "Boil soaked chickpeas with black tea bag for rich dark color. Sauté ginger, green chillies, and tomato masala. Simmer chickpeas with chole masala until thick and flavorful. Fry puffed golden bhaturas and serve piping hot."
  },
  {
    id: "m-7",
    day: "Sun",
    date: "18 May",
    mealType: "Lunch",
    title: "Punjabi Kadhi Pakora with Veg Pulao",
    description: "Velvety spiced besan & sour curd kadhi with soft crispy onion pakoras, served alongside aromatic vegetable pulao.",
    prepTime: "40 mins",
    calories: 510,
    image: "/images/meal_sun.jpg",
    ingredients: [
      { name: "Besan (Gram Flour)", amount: "1 cup" },
      { name: "Sour Curd / Dahi", amount: "1.5 cups" },
      { name: "Onions for Pakoras", amount: "2 sliced" },
      { name: "Curry Leaves & Mustard Seeds", amount: "1 tbsp" },
      { name: "Basmati Rice & Veggies", amount: "1.5 cups" }
    ],
    recipe: "Whisk curd and besan with turmeric and water into a smooth batter; simmer gently for 30 minutes until velvety. Fry spiced onion pakoras until crisp and drop into bubbling kadhi. Temper with hot ghee, mustard seeds, curry leaves, and dry chilies. Pair with warm vegetable pulao."
  }
];

const mealTranslations = {
  Mon: {
    hi: {
      title: "राजमा मसाला और जीरा राइस",
      subtitle: "स्वादिष्ट राजमा, बासमती चावल, पुदीना रायता और सलाद",
      ingredients: [
        "1.5 कप लाल राजमा (रात भर भिगोया हुआ)",
        "2 मध्यम प्याज (बारीक पिसा हुआ पेस्ट)",
        "2 पके टमाटर (ताज़ा प्यूरी)",
        "1 बड़ा चम्मच अदरक-लहसुन का पेस्ट",
        "1 छोटा चम्मच जीरा और 1 चुटकी हींग",
        "1 छोटा चम्मच गरम मसाला, हल्दी और धनिया पाउडर",
        "बारीक कटा ताजा हरा धनिया गार्निश के लिए"
      ],
      steps: [
        "भिगोए हुए राजमा को नमक और हल्दी के साथ कुकर में 5-6 सीटी आने तक अच्छी तरह उबालें।",
        "कड़ाही में 2 चम्मच देसी घी या तेल गरम करें, जीरा चटकाएं और प्याज का पेस्ट डालकर सुनहरा भूरा होने तक भूनें।",
        "अदरक-लहसुन का पेस्ट, टमाटर की प्यूरी और सभी मसाले डालकर तब तक पकाएं जब तक कि तेल अलग न होने लगे।",
        "उबला हुआ राजमा पानी सहित मिलाएं और धीमी आंच पर 15-20 मिनट पकने दें। ऊपर से ताजा हरा धनिया डालकर गरमा-गरम जीरा राइस के साथ परोसें।"
      ]
    },
    ur: {
      title: "راجما مصالحہ اور زیرہ چاول",
      subtitle: "لذیذ راجما، باسمتی چاول، پودینہ رائتہ اور تازہ سلاد",
      ingredients: [
        "1.5 کپ سرخ راجما (رات بھر بھیگا ہوا)",
        "2 عدد درمیانی پیاز (پسی ہوئی پیوری)",
        "2 عدد سرخ ٹماٹر (تازہ پیوری)",
        "1 چمچ ادرک لہسن پیسٹ",
        "1 چائے کا چمچ زیرہ اور چٹکی بھر ہینگ",
        "1 چائے کا چمچ گرم مصالحہ، ہلدی اور دھنیا پاؤڈر",
        "تازہ ہرا دھنیا گارنش کے لیے"
      ],
      steps: [
        "بھیگے ہوئے راجما کو نمک اور ہلدی کے ساتھ پریشر ککر میں 5 سے 6 سیٹیاں دے کر نرم گلا لیں۔",
        "پین میں 2 چمچ دیسی گھی گرم کریں، زیرہ کڑکڑائیں اور پیاز کا پیسٹ ڈال کر سنہری بھون لیں۔",
        "ادرک لہسن پیسٹ، ٹماٹر کی پیوری اور مصالحہ جات شامل کریں اور تیل الگ ہونے تک اچھی طرح بھونیں۔",
        "ابلا ہوا راجما پانی سمیت ڈال کر دھیمی آنچ پر 15-20 منٹ دم دیں۔ تازہ ہرے دھنیے سے سجا کر گرما گرم زیرہ چاول کے ساتھ پیش کریں۔"
      ]
    }
  },
  Tue: {
    hi: {
      title: "चिकन भुना और गरम फुल्के",
      subtitle: "मसालेदार चिकन भुना, 3 नरम फुल्के, ताज़ा दही और अचार",
      ingredients: [
        "500 ग्राम हलाल चिकन",
        "3 प्याज (बारीक लच्छेदार कटे हुए)",
        "2 पके टमाटर की ताज़ा प्यूरी",
        "1.5 बड़ा चम्मच अदरक-लहसुन का पेस्ट",
        "गरम मसाला, हल्दी, कश्मीरी लाल मिर्च और कसूरी मेथी",
        "फुल्के के लिए ताज़ा गेहूं का आटा"
      ],
      steps: [
        "कड़ाही में सरसों का तेल या घी गरम करें और कटे हुए प्याज को गहरा सुनहरा होने तक भूनें।",
        "अदरक-लहसुन पेस्ट, टमाटर प्यूरी और सभी सूखे मसाले डालकर तेल छूटने तक अच्छी तरह भूनें।",
        "चिकन के टुकड़े डालें और मध्यम आंच पर तब तक भूनें जब तक गाढ़ी भुनी हुई ग्रेवी चिकन पर अच्छे से लिपट न जाए।",
        "गैस बंद करके कसूरी मेथी छिड़कें और गरमा-गरम फूली हुई रोटियों (फुल्के) के साथ दस्तरख्वान पर पेश करें।"
      ]
    },
    ur: {
      title: "چکن بھنا اور گرم پھلکے",
      subtitle: "ذائقہ دار چکن بھنا، 3 نرم پھلکے، دہی اور چٹپٹا اچار",
      ingredients: [
        "500 گرام حلال چکن",
        "3 عدد باریک کٹی ہوئی پیاز",
        "2 عدد سرخ ٹماٹر کی پیوری",
        "1.5 کھانے کا چمچ ادرک لہسن پیسٹ",
        "گرم مصالحہ، کشمیری لال مرچ اور قصوری میتھی",
        "پھلکوں کے لیے گندم کا خالص آٹا"
      ],
      steps: [
        "کڑاہی میں سرسوں کا تیل یا گھی گرم کریں اور پیاز کو خوبصورت سنہری ہونے تک فرائی کریں۔",
        "ادرک لہسن کا پیسٹ، ٹماٹر کی پیوری اور تمام مصالحے ڈال کر تیل چھوٹنے تک خوب بھونیں۔",
        "چکن کے ٹکڑے شامل کریں اور درمیانی آنچ پر مسلسل بھونیں یہاں تک کہ چکن گل جائے اور مصالحہ چکن پر لپٹ جائے۔",
        "قصوری میتھی چھڑک کر نرم گرم روٹیوں اور دہی کے ساتھ لطف اٹھائیں۔"
      ]
    }
  },
  Wed: {
    hi: {
      title: "पालक पनीर और गार्लिक नान",
      subtitle: "ताज़ा पालक पनीर, 2 गार्लिक नान या रोटी, जीरा राइस",
      ingredients: [
        "250 ग्राम ताज़ा पनीर के टुकड़े",
        "500 ग्राम ताज़ा पालक (उबाला हुआ)",
        "2 हरी मिर्च और लहसुन की कलियां",
        "1 बड़ा चम्मच कसूरी मेथी",
        "2 बड़े चम्मच ताज़ा मलाई (क्रीम)",
        "जीरा, गरम मसाला और मक्खन/घी"
      ],
      steps: [
        "पालक को 2 मिनट उबलते पानी में डालकर ठंडे पानी में निकालें, फिर हरी मिर्च के साथ पीसकर मुलायम प्यूरी बना लें।",
        "कड़ाही में मक्खन या घी गरम करके जीरा और लहसुन भूनें, फिर पालक की प्यूरी डालकर 8 मिनट तक पकाएं।",
        "पनीर के टुकड़े मिलाएं और ऊपर से ताज़ा मलाई व भुनी हुई कसूरी मेथी डालकर गरमा-गरम नान या रोटी के साथ परोसें।"
      ]
    },
    ur: {
      title: "پالک پنیر اور گارلک نان",
      subtitle: "تازہ پالک پنیر، 2 عدد گارلک نان یا تندوری روٹی، زیرہ چاول",
      ingredients: [
        "250 گرام تازہ پنیر کیوبز",
        "500 گرام تازہ پالک (ابلی ہوئی)",
        "2 عدد ہری مرچیں اور لہسن",
        "1 چمچ قصوری میتھی",
        "2 چمچ تازہ بالائی (کریم)",
        "مکھن یا دیسی گھی اور گرم مصالحہ"
      ],
      steps: [
        "پالک کو ابلتے پانی میں 2 منٹ ڈال کر فورا ٹھنڈے پانی میں ڈالیں، پھر ہری مرچوں کے ساتھ باریک پیس لیں۔",
        "پین میں مکھن یا گھی گرم کر کے لہسن اور زیرہ کڑکڑائیں، پھر پسی ہوئی پالک ڈال کر 8 منٹ پکائیں۔",
        "پنیر کے ٹکڑے شامل کریں اور اوپر سے تازہ کریم اور قصوری میتھی چھڑک کر نان کے ساتھ پیش کریں۔"
      ]
    }
  },
  Thu: {
    hi: {
      title: "पीली दाल तड़का, बासमती चावल और सलाद",
      subtitle: "देसी घी तड़का दाल, खिले हुए चावल, खीरा-प्याज सलाद और 2 गरम रोटियां",
      ingredients: [
        "1 कप अरहर / तूर दाल (धुली हुई)",
        "1 बारीक कटा टमाटर और 2 हरी मिर्च",
        "तड़के के लिए: 2 बड़े चम्मच देसी घी, 1 चम्मच जीरा, 4 लहसुन की कलियां, 2 सूखी लाल मिर्च, चुटकी भर हींग",
        "सलाद के लिए कटा खीरा, प्याज, नींबू",
        "गरम-गरम गेहूं की रोटियां"
      ],
      steps: [
        "प्रेशर कुकर में अरहर दाल को पानी, हल्दी और नमक के साथ 3 सीटी आने तक अच्छी तरह पकाएं।",
        "तड़का पैन में देसी घी गरम करें, उसमें जीरा, कटा लहसुन, हींग और सूखी लाल मिर्च डालकर तड़कने दें।",
        "गरमा-गरम तड़के को दाल के ऊपर डालें और खुशबू बनाए रखने के लिए तुरंत ढक्कन बंद कर दें।",
        "गरम बासमती चावल, घी लगी रोटियों और नींबू वाले कचुम्बर सलाद के साथ परोसें।"
      ]
    },
    ur: {
      title: "پیلی دال تڑکا، ابلے ہوئے چاول اور سلاد",
      subtitle: "دیسی گھی سے لگی تڑکا دال، خوشبودار چاول، ککڑی پیاز سلاد اور 2 روٹیاں",
      ingredients: [
        "1 کپ تور / ارہر کی دال (دھلی ہوئی)",
        "1 عدد کٹا ہوا ٹماٹر اور 2 ہری مرچیں",
        "تڑکے کے لیے: 2 کھانے کے چمچ دیسی گھی، 1 چمچ زیرہ، 4 جوئے کٹا لہسن، 2 گول لال مرچیں، چٹکی بھر ہینگ",
        "سلاد کے لیے ککڑی، پیاز اور لیموں",
        "گرم گرم پھلی ہوئی روٹیاں"
      ],
      steps: [
        "ارہر کی دال کو نمک اور ہلدی کے ساتھ پریشر ککر میں 3 سیٹیاں آنے تک نرم پکا لیں۔",
        "چھوٹے پین میں دیسی گھی گرم کر کے زیرہ، کٹا ہوا لہسن، ہینگ اور سرخ مرچوں کا خوشبودار تڑکا تیار کریں۔",
        "گرما گرم تڑکا دال میں ڈالیں اور خوشبو کو برقرار رکھنے کے لیے فورا ڈھکن بند کر دیں۔",
        "باسمتی چاول، گھی لگی نرم روٹی اور تازہ سلاد کے ساتھ نوش فرمائیں۔"
      ]
    }
  },
  Fri: {
    hi: {
      title: "जुमा स्पेशल शाही दम बिरयानी",
      subtitle: "खुशबूदार दम बिरयानी, मिर्ची का सालन और बुरानी रायता",
      ingredients: [
        "500 ग्राम हलाल चिकन",
        "2 कप पुराना बासमती चावल (30 मिनट भिगोया)",
        "1 कप तला हुआ प्याज (बरिस्ता)",
        "आधा कप गाढ़ा दही",
        "शाही बिरयानी मसाला और खड़े गरम मसाले",
        "गुनगुने दूध में भीगा केसर, पुदीना, हरा धनिया और देसी घी"
      ],
      steps: [
        "चिकन को दही, अदरक-लहसुन, लाल मिर्च, बिरयानी मसाला और आधे तले प्याज के साथ 1 घंटे के लिए मैरीनेट करें।",
        "एक बड़े बर्तन में पानी, खड़े मसाले और नमक डालकर चावल को 70% (एक कनी) तक उबाल लें।",
        "भारी तले के बर्तन में पहले चिकन की परत और ऊपर से चावल की परत लगाएं। ऊपर से केसर का दूध, पुदीना और देसी घी डालें।",
        "आटे या फॉयल से सील करके 5 मिनट तेज आंच पर, फिर तवे के ऊपर रखकर 25 मिनट धीमी आंच पर दम दें।"
      ]
    },
    ur: {
      title: "جمعہ اسپیشل شاہی دم بریانی",
      subtitle: "خوشبودار چکن دم بریانی، مرچی کا سالن اور لہسنی برانی رائتہ",
      ingredients: [
        "500 گرام حلال چکن",
        "2 کپ پرانا باسمتی چاول (30 منٹ بھیگا ہوا)",
        "1 کپ براؤن تلی ہوئی پیاز (برستہ)",
        "آدھا کپ گاڑھا دہی",
        "بریانی مصالحہ اور ثابت گرم مصالحہ جات",
        "زعفران گھلا گرم دودھ، تازہ پودینہ اور دیسی گھی"
      ],
      steps: [
        "چکن کو دہی، ادرک لہسن، لال مرچ، بریانی مصالحہ اور آدھی تلی پیاز کے ساتھ 1 گھنٹہ میرینیٹ کریں۔",
        "ایک دیگچی میں پانی اور ثابت گرم مصالحوں کے ساتھ چاول کو 70 فیصد (ایک کنی) ابال لیں۔",
        "بھاری تلے والی دیگچی میں نیچے چکن اور اوپر ابلے چاولوں کی تہہ بچھائیں۔ اوپر سے زعفرانی دودھ، پودینہ اور گھی ڈالیں۔",
        "ڈھکن پر آٹا لگا کر یا فوائل پیپر سے سیل کریں، 5 منٹ تیز آنچ پر اور پھر 25 منٹ ہلکی آنچ پر دم دیں۔"
      ]
    }
  },
  Sat: {
    hi: {
      title: "अमृतसरी छोले भटूरे और सिरके वाले प्याज",
      subtitle: "चटपटे पिंडी छोले, 2 फूले हुए भटूरे, तीखी हरी चटनी और अचार",
      ingredients: [
        "2 कप काबुली चना (चाय की पोटली के साथ उबला)",
        "अनारदाना पाउडर, छोले मसाला, अमचूर और कसूरी मेथी",
        "दही और सूजी से गूंथा हुआ मैदा भटूरों के लिए",
        "बारीक कटे अदरक के लच्छे और तली हुई हरी मिर्चें"
      ],
      steps: [
        "काबुली चने को तेजपत्ता, लौंग, नमक और चाय पत्ती की पोटली के साथ कुकर में अच्छी तरह उबालें।",
        "कड़ाही में घी/तेल गरम करके अदरक, हरी मिर्च, टमाटर और अनारदाना मसाला भूनें, फिर उबले छोले डालकर गाढ़ा पकाएं।",
        "गरम तेल में भटूरों को फुलाकर सुनहरा तलें और तीखे छोलों व हरी चटनी के साथ पेश करें।"
      ]
    },
    ur: {
      title: "امرتسری چھولے بھٹورے اور اچاری پیاز",
      subtitle: "چٹپٹے لاہوری چھولے، 2 پھولے ہوئے بھٹورے، ہری چٹنی اور سلاد",
      ingredients: [
        "2 کپ سفید چنے (چائے کی پوٹلی کے ساتھ ابلے ہوئے)",
        "انار دانہ، چھولے مصالحہ، آمچور اور زیرہ پاؤڈر",
        "میدہ اور سوجی کا دہی سے گندھا ہوا خمیری آٹا",
        "ادرک کے باریک لچھے اور تلی ہوئی ہری مرچیں"
      ],
      steps: [
        "سفید چنوں کو نمک اور چائے کی پتی کی پوٹلی کے ساتھ پریشر ککر میں نرم گلا لیں۔",
        "کڑاہی میں گھی گرم کر کے ادرک لہسن، ٹماٹر اور انار دانہ چھولے مصالحہ بھونیں اور چنے شامل کر کے دھیمی آنچ پر پکائیں۔",
        "گرم تیل میں گول خستہ بھٹورے تلیں اور گرما گرم چٹپٹے چھولوں کے ساتھ پیش کریں۔"
      ]
    }
  },
  Sun: {
    hi: {
      title: "पंजाबी कढ़ी पकोड़ा और वेज पुलाव",
      subtitle: "सब्जियों वाला पुलाव, कुरकुरे प्याज के पकोड़े वाली मलाईदार कढ़ी",
      ingredients: [
        "खट्टा दही और बेसन (अच्छी तरह फेंटा हुआ)",
        "प्याज, अजवाइन और हरी मिर्च के तले हुए कुरकुरे पकोड़े",
        "मेथी दाना, राई, करी पत्ता और कश्मीरी लाल मिर्च का तड़का",
        "गाजर, मटर और बीन्स वाला खुशबूदार पुलाव"
      ],
      steps: [
        "दही और बेसन के घोल में हल्दी और नमक डालकर धीमी आंच पर 30 मिनट तक लगातार चलाते हुए पकाएं।",
        "दूसरे पैन में प्याज के स्वादिष्ट पकोड़े तलकर तैयार कढ़ी में डालें।",
        "देसी घी में राई, मेथी दाना, करी पत्ता और सूखी लाल मिर्च का तड़का कढ़ी पर लगाएं और गरमा-गरम वेज पुलाव के साथ परोसें।"
      ]
    },
    ur: {
      title: "پنجابی کڑھی پکوڑا اور سبزی پلاؤ",
      subtitle: "خوشبودار سبزیوں کا پلاؤ، نرم پکوڑوں والی گاڑھی ذائقہ دار کڑھی",
      ingredients: [
        "کھٹا دہی اور بیسن (اچھی طرح پھینٹا ہوا)",
        "پیاز، اجوائن اور ہری مرچوں کے خستہ پکوڑے",
        "میتھی دانہ، رائی، کڑی پتہ اور کشمیری لال مرچ کا تڑکا",
        "گاجر، مٹر اور پھلیوں سے بنا گرما گرم پلاؤ"
      ],
      steps: [
        "دہی اور بیسن کے آمیزے کو نمک اور ہلدی کے ساتھ ہلکی آنچ پر 30 منٹ پکائیں تاکہ کڑھی خوب گاڑھی اور ملائم ہو جائے۔",
        "پیاز کے خستہ تلے ہوئے پکوڑے کڑھی میں شامل کریں۔",
        "دیسی گھی میں رائی، کڑی پتہ اور لال مرچ کا تڑکا لگائیں اور گرما گرم سبزی پلاؤ کے ساتھ پیش کریں۔"
      ]
    }
  }
};

memoryMeals = memoryMeals.map((m) => {
  const trans = mealTranslations[m.day];
  return {
    ...m,
    translations: trans
      ? {
          en: {
            title: m.title,
            subtitle: m.description,
            ingredients: (m.ingredients || []).map((i) => `${i.amount} ${i.name}`),
            steps: [m.recipe]
          },
          ...trans
        }
      : undefined
  };
});

// @desc    Get weekly meal plan
// @route   GET /api/v1/meals
exports.getMeals = async (req, res) => {
  try {
    if (getDBStatus()) {
      const dbMeals = await MealPlan.find({ userId: req.user._id }).sort({ createdAt: 1 });
      if (dbMeals && dbMeals.length > 0) {
        return res.json({ success: true, count: dbMeals.length, data: dbMeals });
      }
    }
    return res.json({ success: true, count: memoryMeals.length, data: memoryMeals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create a meal
// @route   POST /api/v1/meals
exports.createMeal = async (req, res) => {
  try {
    const { day, mealType, title, description, recipe, prepTime, calories, ingredients } = req.body;
    if (!title || !day) {
      return res.status(400).json({ success: false, message: "Title and day are required." });
    }

    if (getDBStatus()) {
      const meal = await MealPlan.create({
        userId: req.user._id,
        day,
        mealType: mealType || "Lunch",
        title,
        description: description || "",
        recipe: recipe || "",
        prepTime: prepTime || "30 mins",
        calories: Number(calories) || 450,
        ingredients: ingredients || [],
      });
      return res.status(201).json({ success: true, data: meal });
    }

    const newMeal = {
      id: "m-" + Date.now(),
      day,
      mealType: mealType || "Lunch",
      title,
      description: description || "",
      recipe: recipe || "",
      prepTime: prepTime || "30 mins",
      calories: Number(calories) || 450,
      image: "/images/meal_thali.jpg",
      ingredients: ingredients || [],
    };
    memoryMeals.push(newMeal);
    return res.status(201).json({ success: true, data: newMeal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update a meal
// @route   PATCH /api/v1/meals/:id
exports.updateMeal = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const meal = await MealPlan.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        req.body,
        { new: true }
      );
      if (!meal) {
        return res.status(404).json({ success: false, message: "Meal not found." });
      }
      return res.json({ success: true, data: meal });
    }

    const idx = memoryMeals.findIndex((m) => m.id === id);
    if (idx !== -1) {
      memoryMeals[idx] = { ...memoryMeals[idx], ...req.body };
      return res.json({ success: true, data: memoryMeals[idx] });
    }
    return res.status(404).json({ success: false, message: "Meal not found." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete a meal
// @route   DELETE /api/v1/meals/:id
exports.deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const meal = await MealPlan.findOneAndDelete({ _id: id, userId: req.user._id });
      if (!meal) {
        return res.status(404).json({ success: false, message: "Meal not found." });
      }
      return res.json({ success: true, message: "Meal deleted." });
    }

    memoryMeals = memoryMeals.filter((m) => m.id !== id);
    return res.json({ success: true, message: "Meal deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
