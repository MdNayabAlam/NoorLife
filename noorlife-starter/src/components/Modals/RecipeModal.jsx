import React, { useState, useEffect } from "react";
import { X, Clock, Flame, Check, UtensilsCrossed, Languages, Volume2, VolumeX, Sparkles } from "lucide-react";

const CANONICAL_MEAL_TRANSLATIONS = {
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

const UI_STRINGS = {
  en: {
    langName: "English",
    ingredientsTitle: "Ingredients Required",
    stepsTitle: "Step-by-Step Cooking Guide",
    pureHalal: "Halal & Pure",
    prep: "Prep",
    closeBtn: "Close Recipe",
    listenBtn: "Listen Recipe",
    stopBtn: "Stop Audio",
    today: "Today",
    lunch: "Lunch",
    dayLabel: "Day",
  },
  hi: {
    langName: "हिन्दी",
    ingredientsTitle: "आवश्यक सामग्री (Ingredients)",
    stepsTitle: "बनाने की विधि (Step-by-Step)",
    pureHalal: "शुद्ध व हलाल",
    prep: "तैयारी",
    closeBtn: "रेसिपी बंद करें",
    listenBtn: "रेसिपी सुनें (Audio)",
    stopBtn: "रोकें",
    today: "आज",
    lunch: "दोपहर का भोजन",
    dayLabel: "दिन",
  },
  ur: {
    langName: "اردو",
    ingredientsTitle: "ضروری اجزاء (Ingredients)",
    stepsTitle: "پکانے کا طریقہ (Step-by-Step)",
    pureHalal: "حلال اور پاکیزہ",
    prep: "وقت",
    closeBtn: "بند کریں",
    listenBtn: "ترکیب سنیں (Audio)",
    stopBtn: "آواز روکیں",
    today: "آج",
    lunch: "دوپہر کا کھانا",
    dayLabel: "دن",
  }
};

export function RecipeModal({ isOpen, onClose, meal }) {
  const [recipeLang, setRecipeLang] = useState(() => {
    return localStorage.getItem("noorlife_recipe_lang") || "en";
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    localStorage.setItem("noorlife_recipe_lang", recipeLang);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [recipeLang]);

  // Cleanup speech synthesis on close or unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen]);

  if (!isOpen || !meal) return null;

  const ui = UI_STRINGS[recipeLang] || UI_STRINGS.en;
  const isRTL = recipeLang === "ur";

  // Resolve matching day key (e.g. "Thu", "Thursday", or title match)
  let dayKey = null;
  if (meal.day) {
    dayKey = meal.day.substring(0, 3);
  } else if (meal.title) {
    if (meal.title.toLowerCase().includes("rajma")) dayKey = "Mon";
    else if (meal.title.toLowerCase().includes("chicken bhuna")) dayKey = "Tue";
    else if (meal.title.toLowerCase().includes("palak paneer")) dayKey = "Wed";
    else if (meal.title.toLowerCase().includes("dal tadka")) dayKey = "Thu";
    else if (meal.title.toLowerCase().includes("biryani")) dayKey = "Fri";
    else if (meal.title.toLowerCase().includes("chole")) dayKey = "Sat";
    else if (meal.title.toLowerCase().includes("kadhi")) dayKey = "Sun";
  }

  const canonical = (dayKey && CANONICAL_MEAL_TRANSLATIONS[dayKey]) || null;
  const tData = meal.translations?.[recipeLang] || canonical?.[recipeLang];

  const displayTitle = (recipeLang !== "en" && tData?.title) 
    ? tData.title 
    : (recipeLang === "hi" ? meal.title_hi : (recipeLang === "ur" ? meal.title_ur : null)) || (recipeLang === "en" ? (meal.translations?.en?.title || meal.title) : (tData?.title || meal.title));

  const displaySubtitle = (recipeLang !== "en" && tData?.subtitle)
    ? tData.subtitle
    : (recipeLang === "hi" ? meal.subtitle_hi : (recipeLang === "ur" ? meal.subtitle_ur : null)) || (recipeLang === "en" ? (meal.translations?.en?.subtitle || meal.subtitle || meal.description) : (tData?.subtitle || meal.subtitle || meal.description)) || "A nutritious, balanced homemade halal meal prepared with love.";

  // Extract ingredients in active language
  let ingredientsList = [];
  if (recipeLang !== "en" && tData?.ingredients && Array.isArray(tData.ingredients)) {
    ingredientsList = tData.ingredients;
  } else if (recipeLang === "en" && meal.translations?.en?.ingredients && Array.isArray(meal.translations.en.ingredients)) {
    ingredientsList = meal.translations.en.ingredients;
  } else if (meal.recipe && typeof meal.recipe === "object" && Array.isArray(meal.recipe.ingredients) && meal.recipe.ingredients.length > 0) {
    ingredientsList = meal.recipe.ingredients.map((item) =>
      typeof item === "string" ? item : (item.amount ? `${item.amount} ${item.name}` : (item.name || JSON.stringify(item)))
    );
  } else if (Array.isArray(meal.ingredients) && meal.ingredients.length > 0) {
    ingredientsList = meal.ingredients.map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        return item.amount ? `${item.amount} ${item.name}` : (item.name || JSON.stringify(item));
      }
      return String(item);
    });
  } else {
    ingredientsList = recipeLang === "hi" 
      ? ["1.5 कप मुख्य सामग्री (दाल / पनीर / चिकन / राजमा)", "ताज़ी कटी सब्ज़ियां, प्याज और टमाटर प्यूरी", "2 बड़े चम्मच शुद्ध देसी घी या तेल", "साबुत सुगंधित मसाले (जीरा, लौंग, इलायची, हींग)", "स्वादानुसार नमक, हल्दी, लाल मिर्च और गरम मसाला", "बारीक कटा ताजा हरा धनिया गार्निश के लिए"]
      : recipeLang === "ur"
      ? ["1.5 کپ بنیادی اشیاء (دال / پنیر / چکن / راجما)", "تازہ کٹی ہوئی سبزیاں، پیاز اور ٹماٹر کی پیوری", "2 کھانے کے چمچ خالص دیسی گھی یا تیل", "ثابت خوشبودار مصالحہ جات (زیرہ، لونگ، الائچی اور ہینگ)", "حسب ذائقہ نمک، ہلدی، لال مرچ اور گرم مصالحہ", "تازہ ہرا دھنیا اور ہری مرچیں گارنش کے لیے"]
      : [
          "1 cup Primary Grain / Dal / Protein",
          "Fresh seasonal vegetables",
          "2 tbsp Pure Desi Ghee or Cold-pressed Oil",
          "Aromatic whole spices (Cumin, Cloves, Cardamom)",
          "Fresh coriander, lemon & green chilies for garnish"
        ];
  }

  // Extract steps in active language
  let stepsList = [];
  if (recipeLang !== "en" && tData?.steps && Array.isArray(tData.steps)) {
    stepsList = tData.steps;
  } else if (recipeLang === "en" && meal.translations?.en?.steps && Array.isArray(meal.translations.en.steps)) {
    stepsList = meal.translations.en.steps;
  } else if (meal.recipe && typeof meal.recipe === "object" && Array.isArray(meal.recipe.steps) && meal.recipe.steps.length > 0) {
    stepsList = meal.recipe.steps;
  } else if (Array.isArray(meal.steps) && meal.steps.length > 0) {
    stepsList = meal.steps;
  } else if (typeof meal.recipe === "string" && meal.recipe.trim().length > 0) {
    const rawSteps = meal.recipe
      .split(/(?:\r?\n|\.\s+(?=[A-Z0-9]))/)
      .map((s) => s.trim().replace(/^\d+[\.\)]\s*/, ""))
      .filter((s) => s.length > 4);
    stepsList = rawSteps.length > 0 ? rawSteps : [meal.recipe.trim()];
  } else if (meal.description && typeof meal.description === "string" && meal.description.trim().length > 0) {
    stepsList = [meal.description.trim()];
  } else {
    stepsList = recipeLang === "hi"
      ? [
          "सभी ताज़ा हलाल सामग्रियों को अच्छी तरह धोकर 'बिस्मिल्लाह' पढ़कर तैयारी शुरू करें।",
          "कड़ाही या पैन में देसी घी गरम करके खड़े मसाले, प्याज और अदरक-लहसुन को मध्यम आंच पर सुनहरा भूनें।",
          "टमाटर प्यूरी व सभी मसाले मिलाकर तेल छूटने तक भूनें, फिर मुख्य सामग्री डालकर धीमी आंच पर अच्छे से पकने दें।",
          "गरमा-गरम तैयार व्यंजन को हरे धनिए से सजाकर रोटी या चावल के साथ दस्तरख्वान पर पेश करें।"
        ]
      : recipeLang === "ur"
      ? [
          "تمام تازہ حلال اجزاء کو اچھی طرح دھو کر 'بسم اللہ' پڑھ کر پکانے کا آغاز کریں۔",
          "کڑاہی یا پین میں دیسی گھی گرم کر کے ثابت مصالحے، پیاز اور ادرک لہسن کو درمیانی آنچ پر سنہری بھونیں۔",
          "ٹماٹر کی پیوری اور تمام مصالحے شامل کر کے تیل الگ ہونے تک خوب بھونیں، پھر بنیادی اجزاء شامل کر کے دھیمی آنچ پر دم دیں۔",
          "گرما گرم تیار کھانا ہرے دھنیے سے سجا کر روٹی یا چاول کے ساتھ پیش کریں۔"
        ]
      : [
          "Wash and prepare all fresh halal ingredients with care and recite Bismillah.",
          "Sauté aromatics and whole spices on medium heat until fragrant.",
          "Cook thoroughly until tender, flavors are well-blended, and garnish with fresh herbs before serving."
        ];
  }

  // Audio Read-aloud Speech Synthesis
  const toggleSpeakRecipe = () => {
    if (!window.speechSynthesis) {
      alert("Aapke browser me Text-to-Speech support nahi hai.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${displayTitle}. ${displaySubtitle}. ${ui.ingredientsTitle}: ${ingredientsList.join(", ")}. ${ui.stepsTitle}: ${stepsList.join(". ")}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = recipeLang === "hi" ? "hi-IN" : recipeLang === "ur" ? "ur-PK" : "en-US";
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const mealImg = meal.image || "/images/meal_thu.jpg";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        style={{
          maxWidth: "640px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          direction: isRTL ? "rtl" : "ltr",
          fontFamily: isRTL ? "'Noto Nastaliq Urdu', 'Segoe UI', Tahoma, sans-serif" : "inherit"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Language Switcher */}
        <div className="modal-header" style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-color)" }}>
          <div style={{ flex: 1, paddingRight: isRTL ? "0" : "12px", paddingLeft: isRTL ? "12px" : "0" }}>
            <h3 style={{ fontSize: isRTL ? "20px" : "18px", color: "var(--text-heading)", fontWeight: "800", lineHeight: "1.3" }}>
              {displayTitle}
            </h3>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "inline-block", marginTop: "2px" }}>
              {meal.day || ui.today} • {meal.mealType || ui.lunch}
            </span>
          </div>

          {/* Language Selector in Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
                background: "var(--bg-subtle)",
                padding: "3px 6px",
                borderRadius: "20px",
                border: "1px solid var(--border-color)",
                direction: "ltr"
              }}
            >
              <Languages size={13} color="var(--primary-green)" style={{ marginLeft: "2px" }} />
              <button
                type="button"
                className={`difficulty-pill-btn ${recipeLang === "en" ? "active" : ""}`}
                style={{
                  padding: "4px 9px",
                  fontSize: "11px",
                  fontWeight: "700",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  background: recipeLang === "en" ? "var(--primary-green)" : "transparent",
                  color: recipeLang === "en" ? "#ffffff" : "var(--text-muted)"
                }}
                onClick={() => setRecipeLang("en")}
              >
                English
              </button>
              <button
                type="button"
                className={`difficulty-pill-btn ${recipeLang === "hi" ? "active" : ""}`}
                style={{
                  padding: "4px 9px",
                  fontSize: "11px",
                  fontWeight: "700",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  background: recipeLang === "hi" ? "var(--primary-green)" : "transparent",
                  color: recipeLang === "hi" ? "#ffffff" : "var(--text-muted)"
                }}
                onClick={() => setRecipeLang("hi")}
              >
                हिन्दी
              </button>
              <button
                type="button"
                className={`difficulty-pill-btn ${recipeLang === "ur" ? "active" : ""}`}
                style={{
                  padding: "4px 9px",
                  fontSize: "11px",
                  fontWeight: "700",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  background: recipeLang === "ur" ? "var(--primary-green)" : "transparent",
                  color: recipeLang === "ur" ? "#ffffff" : "var(--text-muted)"
                }}
                onClick={() => setRecipeLang("ur")}
              >
                اردو
              </button>
            </div>

            <button className="action-icon-btn" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ overflowY: "auto", padding: "16px 20px" }}>
          {/* Top Preview Card with Authentic Photo */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              background: "var(--bg-subtle)",
              padding: "14px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-color)",
              flexDirection: isRTL ? "row-reverse" : "row"
            }}
          >
            <img
              src={mealImg}
              alt={displayTitle}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/meal_thu.jpg";
              }}
              style={{
                width: "125px",
                height: "125px",
                borderRadius: "var(--radius-md)",
                objectFit: "cover",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                flexShrink: 0
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, textAlign: isRTL ? "right" : "left" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", flexDirection: isRTL ? "row-reverse" : "row" }}>
                <span className="search-badge" style={{ background: "#fef3c7", color: "#b45309", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: "700" }}>
                  <Clock size={12} /> {ui.prep}: {meal.prepTime || "30 mins"}
                </span>
                <span className="search-badge" style={{ background: "#fee2e2", color: "#b91c1c", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: "700" }}>
                  <Flame size={12} /> {meal.calories ? (String(meal.calories).includes("kcal") ? meal.calories : `${meal.calories} kcal`) : "450 kcal"}
                </span>
                <span className="search-badge" style={{ background: "#e0f2fe", color: "#0369a1", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: "700" }}>
                  <UtensilsCrossed size={12} /> {ui.pureHalal}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px", lineHeight: "1.5" }}>
                {displaySubtitle}
              </p>

              {/* Audio Listen Recipe Button */}
              <div style={{ marginTop: "4px" }}>
                <button
                  type="button"
                  onClick={toggleSpeakRecipe}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: isSpeaking ? "#ef4444" : "rgba(4, 120, 87, 0.12)",
                    color: isSpeaking ? "#ffffff" : "var(--primary-green)",
                    border: `1px solid ${isSpeaking ? "#ef4444" : "rgba(4, 120, 87, 0.3)"}`,
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "11.5px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  title={isSpeaking ? ui.stopBtn : ui.listenBtn}
                >
                  {isSpeaking ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  <span>{isSpeaking ? ui.stopBtn : ui.listenBtn}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div style={{ marginTop: "18px" }}>
            <h4
              style={{
                fontSize: "14.5px",
                fontWeight: "800",
                marginBottom: "10px",
                color: "var(--text-heading)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexDirection: isRTL ? "row-reverse" : "row"
              }}
            >
              <span>🛒</span>
              <span>{ui.ingredientsTitle} ({ingredientsList.length})</span>
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "8px" }}>
              {ingredientsList.map((ing, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: isRTL ? "13px" : "12.5px",
                    background: "var(--bg-subtle)",
                    padding: "7px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-color)",
                    flexDirection: isRTL ? "row-reverse" : "row",
                    textAlign: isRTL ? "right" : "left"
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary-green)", flexShrink: 0 }} />
                  <span style={{ color: "var(--text-heading)", fontWeight: "500", flex: 1 }}>{ing}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Steps Section */}
          <div style={{ marginTop: "20px" }}>
            <h4
              style={{
                fontSize: "14.5px",
                fontWeight: "800",
                marginBottom: "10px",
                color: "var(--text-heading)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexDirection: isRTL ? "row-reverse" : "row"
              }}
            >
              <span>👩‍🍳</span>
              <span>{ui.stepsTitle}</span>
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {stepsList.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: isRTL ? "13.5px" : "12.5px",
                    lineHeight: "1.6",
                    background: "var(--bg-card)",
                    padding: "12px 14px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    flexDirection: isRTL ? "row-reverse" : "row",
                    textAlign: isRTL ? "right" : "left"
                  }}
                >
                  <span
                    style={{
                      fontWeight: "800",
                      color: "white",
                      background: "var(--primary-green)",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      flexShrink: 0
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span style={{ color: "var(--text-heading)", paddingTop: "1px", flex: 1 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className="modal-footer"
          style={{
            borderTop: "1px solid var(--border-color)",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: isRTL ? "row-reverse" : "row"
          }}
        >
          <div style={{ fontSize: "11.5px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
            <Sparkles size={13} color="var(--primary-green)" />
            <span>Zabaan: <strong>{ui.langName}</strong></span>
          </div>

          <button
            type="button"
            className="card-action-btn-green"
            onClick={onClose}
            style={{ padding: "8px 24px" }}
          >
            {ui.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
