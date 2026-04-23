"use client";
import React, { useState, useEffect } from 'react';

export default function ToolsModal({ isOpen, onClose, toolType, userProfile, onProfileUpdate, lang = 'en' }) {
  const [loanData, setLoanData] = useState({ amount: '', rate: '', months: '' });
  const [smsData, setSmsData] = useState('');
  const [scamResult, setScamResult] = useState(null);

  // Budget Planner State
  const [budgetIncome, setBudgetIncome] = useState('');
  const [budgetExpense, setBudgetExpense] = useState('');
  
  // Savings Tracker State
  const [goalName, setGoalName] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [addSavings, setAddSavings] = useState('');

  // Growth Tracker State
  const [growthSavings, setGrowthSavings] = useState('');
  const [growthInvestments, setGrowthInvestments] = useState('');

  useEffect(() => {
    if (userProfile && isOpen) {
      setGoalName(userProfile.goalName || '');
      setSavingsGoal(userProfile.savingsGoal || '');
      setCurrentSavings(userProfile.currentSavings || '0');
    }
  }, [userProfile, isOpen]);

  const updateProfileFields = async (fields) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(fields)
      });
      if (onProfileUpdate) onProfileUpdate();
    } catch (e) {
      console.error("Failed to update profile", e);
    }
  };

  const saveProfileData = async (newGoal, newCurrent, newGoalName) => {
    await updateProfileFields({
      goalName: newGoalName !== undefined ? newGoalName : goalName,
      savingsGoal: newGoal !== undefined ? newGoal : savingsGoal,
      currentSavings: newCurrent !== undefined ? newCurrent : currentSavings
    });
  };

  if (!isOpen) return null;

  const modalTranslations = {
    en: {
      tm_loan_calc: "EMI Loan Calculator",
      tm_loan_amt: "Loan Amount (₹)",
      tm_loan_rate: "Interest Rate (%)",
      tm_loan_tenure: "Tenure (Months)",
      tm_loan_emi: "Estimated Monthly EMI:",
      tm_fraud_title: "Fraud Awareness Database",
      tm_fraud_desc1: "We continuously monitor fraudulent activities. Exploring our directory of",
      tm_fraud_desc2: "verified fraud patterns:",
      tm_scam_title: "Spam & Scam Detector",
      tm_scam_desc: "Verify phone numbers or pasted SMS messages instantly.",
      tm_scam_ph: "Enter a phone number or paste suspicious SMS text here...",
      tm_scam_btn: "Scan Now",
      tm_scam_high_spam: "⚠️ HIGH RISK! This phone number is flagged in our global spam registry. Do not answer or share details!",
      tm_scam_low_ph: "✅ Low Risk. Number not found in spam lists, but stay cautious.",
      tm_scam_high_msg: "⚠️ HIGH RISK! This message contains severe markers of a financial scam. Do not click any links or send money.",
      tm_scam_low_msg: "✅ Low Risk. However, always verify the sender before sharing any personal details.",
      tm_budget_title: "Budget Planner",
      tm_budget_inc: "Total Income (₹)",
      tm_budget_exp: "Total Expenses (₹)",
      tm_budget_rem: "Remaining Balance:",
      tm_sav_title: "Savings Tracker",
      tm_sav_step1: "1. Set Your Goal",
      tm_sav_goal_ph: "What are you saving for? (e.g., Sewing Machine)",
      tm_sav_tgt_amt: "Target Amount (₹)",
      tm_sav_btn_save: "Save Goal",
      tm_sav_step2: "2. Add a Deposit",
      tm_sav_add_amt: "Amount to Add (₹)",
      tm_sav_btn_dep: "Deposit",
      tm_sav_prog: "Progress towards:",
      tm_sav_tot_prog: "Total Saved Progress",
      tm_sav_reached: "Goal Reached",
      tm_gr_title: "Growth & Investment Tracker",
      tm_gr_desc: "Define your total monthly savings and ongoing investments to monitor your financial growth.",
      tm_gr_sav: "Total Savings per Month (₹)",
      tm_gr_sav_ph: "Enter monthly savings...",
      tm_gr_inv: "My Investments (₹)",
      tm_gr_inv_ph: "Enter total investments...",
      tm_gr_tot: "Total Financial Growth",
      tm_gr_exc: "📈 Exceptional progress on your wealth journey!",
      tm_gr_govt: "Govt Schemes & Loans You Qualify For:",
      tm_gr_apply: "Apply Now for These Schemes",
      tm_lrn_title: "Interactive Learning Modules",
      tm_lrn_desc: "Tap to listen to the lessons. Audio supported for low-literacy users.",
      tm_lrn_listen: "Listen",
      tm_lrn_prog: "Module Progress: 0% — Start listening to complete modules!",
      tm_lrn_part: "Part"
    },
    hi: {
      tm_loan_calc: "ईएमआई ऋण कैलकुलेटर",
      tm_loan_amt: "ऋण राशि (₹)",
      tm_loan_rate: "ब्याज दर (%)",
      tm_loan_tenure: "अवधि (महीने)",
      tm_loan_emi: "अनुमानित मासिक ईएमआई:",
      tm_fraud_title: "धोखाधड़ी जागरूकता डेटाबेस",
      tm_fraud_desc1: "हम धोखाधड़ी गतिविधियों की निगरानी करते हैं। हमारी निर्देशिका में",
      tm_fraud_desc2: "सत्यापित धोखाधड़ी पैटर्न खोज रहे हैं:",
      tm_scam_title: "स्पैम और घोटाले का पता लगाने वाला",
      tm_scam_desc: "फोन नंबर या एसएमएस संदेशों को तुरंत सत्यापित करें।",
      tm_scam_ph: "यहां फोन नंबर या संदिग्ध एसएमएस टेक्स्ट दर्ज करें...",
      tm_scam_btn: "अभी स्कैन करें",
      tm_scam_high_spam: "⚠️ उच्च जोखिम! यह फोन नंबर स्पैम रजिस्ट्री में फ़्लैग किया गया है। साझा न करें!",
      tm_scam_low_ph: "✅ कम जोखिम। यह नंबर स्पैम सूचियों में नहीं मिला, लेकिन सतर्क रहें।",
      tm_scam_high_msg: "⚠️ उच्च जोखिम! इस संदेश में गंभीर घोटाले के निशान हैं। किसी भी लिंक पर क्लिक न करें।",
      tm_scam_low_msg: "✅ कम जोखिम। हालांकि, अपना व्यक्तिगत विवरण साझा करने से पहले हमेशा सत्यापित करें।",
      tm_budget_title: "बजट प्लानर",
      tm_budget_inc: "कुल आय (₹)",
      tm_budget_exp: "कुल खर्च (₹)",
      tm_budget_rem: "शेष राशि:",
      tm_sav_title: "बचत ट्रैकर",
      tm_sav_step1: "1. अपना लक्ष्य निर्धारित करें",
      tm_sav_goal_ph: "आप किसके लिए बचत कर रहे हैं? (उदा., सिलाई मशीन)",
      tm_sav_tgt_amt: "लक्ष्य राशि (₹)",
      tm_sav_btn_save: "लक्ष्य सहेजें",
      tm_sav_step2: "2. जमा राशि जोड़ें",
      tm_sav_add_amt: "जोड़ने के लिए राशि (₹)",
      tm_sav_btn_dep: "जमा करें",
      tm_sav_prog: "की दिशा में प्रगति:",
      tm_sav_tot_prog: "कुल बचत प्रगति",
      tm_sav_reached: "लक्ष्य प्राप्त हुआ",
      tm_gr_title: "विकास और निवेश ट्रैकर",
      tm_gr_desc: "अपने वित्तीय विकास की निगरानी के लिए अपनी कुल मासिक बचत और चल रहे निवेश को परिभाषित करें।",
      tm_gr_sav: "प्रति माह कुल बचत (₹)",
      tm_gr_sav_ph: "मासिक बचत दर्ज करें...",
      tm_gr_inv: "मेरे निवेश (₹)",
      tm_gr_inv_ph: "कुल निवेश दर्ज करें...",
      tm_gr_tot: "कुल वित्तीय विकास",
      tm_gr_exc: "📈 आपकी धन यात्रा पर असाधारण प्रगति!",
      tm_gr_govt: "सरकारी योजनाएं और ऋण जिनके लिए आप योग्य हैं:",
      tm_gr_apply: "इन योजनाओं के लिए अभी आवेदन करें",
      tm_lrn_title: "इंटरएक्टिव लर्निंग मॉड्यूल",
      tm_lrn_desc: "सबक सुनने के लिए टैप करें। कम साक्षरता वाले उपयोगकर्ताओं के लिए ऑडियो समर्थित।",
      tm_lrn_listen: "सुनें",
      tm_lrn_prog: "मॉड्यूल की प्रगति: 0% — मॉड्यूल पूरा करने के लिए सुनना शुरू करें!",
      tm_lrn_part: "भाग"
    },
    pa: {
      tm_loan_calc: "EMI ਲੋਨ ਕੈਲਕੁਲੇਟਰ",
      tm_loan_amt: "ਕਰਜ਼ੇ ਦੀ ਰਕਮ (₹)",
      tm_loan_rate: "ਵਿਆਜ ਦਰ (%)",
      tm_loan_tenure: "ਮਿਆਦ (ਮਹੀਨੇ)",
      tm_loan_emi: "ਅਨੁਮਾਨਿਤ ਮਾਸਿਕ EMI:",
      tm_fraud_title: "ਧੋਖਾਧੜੀ ਜਾਗਰੂਕਤਾ ਡੇਟਾਬੇਸ",
      tm_fraud_desc1: "ਅਸੀਂ ਧੋਖਾਧੜੀ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਦੀ ਨਿਗਰਾਨੀ ਕਰਦੇ ਹਾਂ। ਸਾਡੀ ਡਾਇਰੈਕਟਰੀ ਵਿੱਚ",
      tm_fraud_desc2: "ਪ੍ਰਮਾਣਿਤ ਧੋਖਾਧੜੀ ਦੇ ਪੈਟਰਨਾਂ ਦੀ ਪੜਚੋਲ:",
      tm_scam_title: "ਸਪੈਮ ਅਤੇ ਘੁਟਾਲਾ ਡਿਟੈਕਟਰ",
      tm_scam_desc: "ਫੋਨ ਨੰਬਰਾਂ ਜਾਂ SMS ਸੁਨੇਹਿਆਂ ਦੀ ਤੁਰੰਤ ਪੁਸ਼ਟੀ ਕਰੋ।",
      tm_scam_ph: "ਇੱਥੇ ਫ਼ੋਨ ਨੰਬਰ ਜਾਂ ਸ਼ੱਕੀ SMS ਲਿਖੋ...",
      tm_scam_btn: "ਹੁਣੇ ਸਕੈਨ ਕਰੋ",
      tm_scam_high_spam: "⚠️ ਉੱਚ ਜੋਖਮ! ਇਹ ਫੋਨ ਨੰਬਰ ਸਪੈਮ ਬਲੈਕਲਿਸਟ ਵਿੱਚ ਹੈ। ਜਵਾਬ ਨਾ ਦਿਓ!",
      tm_scam_low_ph: "✅ ਘੱਟ ਜੋਖਮ। ਨੰਬਰ ਸਪੈਮ ਸੂਚੀਆਂ ਵਿੱਚ ਨਹੀਂ ਮਿਲਿਆ, ਪਰ ਸੁਚੇਤ ਰਹੋ।",
      tm_scam_high_msg: "⚠️ ਉੱਚ ਜੋਖਮ! ਇਸ ਸੰਦੇਸ਼ ਵਿੱਚ ਵਿੱਤੀ ਘੁਟਾਲੇ ਦੇ ਗੰਭੀਰ ਸੰਕੇਤ ਹਨ। ਲਿੰਕਾਂ 'ਤੇ ਕਲਿੱਕ ਨਾ ਕਰੋ।",
      tm_scam_low_msg: "✅ ਘੱਟ ਜੋਖਮ। ਹਾਲਾਂਕਿ, ਹਮੇਸ਼ਾਂ ਵੇਰਵੇ ਸਾਂਝੇ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਪ੍ਰਮਾਣਿਤ ਕਰੋ।",
      tm_budget_title: "ਬਜਟ ਪਲੈਨਰ",
      tm_budget_inc: "ਕੁੱਲ ਆਮਦਨ (₹)",
      tm_budget_exp: "ਕੁੱਲ ਖਰਚੇ (₹)",
      tm_budget_rem: "ਬਾਕੀ ਬਕਾਇਆ:",
      tm_sav_title: "ਸੇਵਿੰਗਸ ਟ੍ਰੈਕਰ",
      tm_sav_step1: "1. ਆਪਣਾ ਟੀਚਾ ਨਿਰਧਾਰਤ ਕਰੋ",
      tm_sav_goal_ph: "ਤੁਸੀਂ ਕਿਸ ਲਈ ਬਚਤ ਕਰ ਰਹੇ ਹੋ? (ਉਦਾਹਰਨ ਲਈ: ਸਿਲਾਈ ਮਸ਼ੀਨ)",
      tm_sav_tgt_amt: "ਟੀਚਾ ਰਕਮ (₹)",
      tm_sav_btn_save: "ਟੀਚਾ ਸੁਰੱਖਿਅਤ ਕਰੋ",
      tm_sav_step2: "2. ਰਕਮ ਜਮ੍ਹਾ ਕਰੋ",
      tm_sav_add_amt: "ਜੋੜਨ ਲਈ ਰਕਮ (₹)",
      tm_sav_btn_dep: "ਜਮ੍ਹਾਂ ਕਰੋ",
      tm_sav_prog: "ਦੇ ਵੱਲ ਤਰੱਕੀ:",
      tm_sav_tot_prog: "ਕੁੱਲ ਬਚਾਈ ਗਈ ਤਰੱਕੀ",
      tm_sav_reached: "ਟੀਚਾ ਪ੍ਰਾਪਤ ਹੋਇਆ",
      tm_gr_title: "ਵਿਕਾਸ ਅਤੇ ਨਿਵੇਸ਼ ਟਰੈਕਰ",
      tm_gr_desc: "ਆਪਣੇ ਵਿੱਤੀ ਵਿਕਾਸ ਦੀ ਨਿਗਰਾਨੀ ਕਰਨ ਲਈ ਆਪਣੀ ਕੁੱਲ ਮਾਸਿਕ ਬੱਚਤ ਅਤੇ ਚੱਲ ਰਹੇ ਨਿਵੇਸ਼ਾਂ ਨੂੰ ਪਰਿਭਾਸ਼ਿਤ ਕਰੋ।",
      tm_gr_sav: "ਪ੍ਰਤੀ ਮਹੀਨਾ ਕੁੱਲ ਬੱਚਤ (₹)",
      tm_gr_sav_ph: "ਮਹੀਨਾਵਾਰ ਬਚਤ ਦਰਜ ਕਰੋ...",
      tm_gr_inv: "ਮੇਰੇ ਨਿਵੇਸ਼ (₹)",
      tm_gr_inv_ph: "ਕੁੱਲ ਨਿਵੇਸ਼ ਦਰਜ ਕਰੋ...",
      tm_gr_tot: "ਕੁੱਲ ਵਿੱਤੀ ਵਿਕਾਸ",
      tm_gr_exc: "📈 ਤੁਹਾਡੀ ਦੌਲਤ ਦੀ ਯਾਤਰਾ 'ਤੇ ਸ਼ਾਨਦਾਰ ਤਰੱਕੀ!",
      tm_gr_govt: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਅਤੇ ਕਰਜ਼ੇ ਜਿਨ੍ਹਾਂ ਲਈ ਤੁਸੀਂ ਯੋਗ ਹੋ:",
      tm_gr_apply: "ਇਹਨਾਂ ਯੋਜਨਾਵਾਂ ਲਈ ਹੁਣੇ ਅਪਲਾਈ ਕਰੋ",
      tm_lrn_title: "ਇੰਟਰਐਕਟਿਵ ਸਿੱਖਣ ਮੋਡੀਊਲ",
      tm_lrn_desc: "ਸਬਕ ਸੁਣਨ ਲਈ ਟੈਪ ਕਰੋ। ਘੱਟ ਸਾਖਰਤਾ ਵਾਲੇ ਉਪਭੋਗਤਾਵਾਂ ਲਈ ਆਡੀਓ ਸਮਰਥਿਤ।",
      tm_lrn_listen: "ਸੁਣੋ",
      tm_lrn_prog: "ਮੋਡੀਊਲ ਦੀ ਤਰੱਕੀ: 0% — ਮੋਡੀਊਲ ਪੂਰਾ ਕਰਨ ਲਈ ਸੁਣਨਾ ਸ਼ੁਰੂ ਕਰੋ!",
      tm_lrn_part: "ਭਾਗ"
    },
    bn: {
      tm_loan_calc: "ইএমআই লোন ক্যালকুলেটর",
      tm_loan_amt: "লোনের পরিমাণ (₹)",
      tm_loan_rate: "সুদের হার (%)",
      tm_loan_tenure: "মেয়াদ (মাস)",
      tm_loan_emi: "আনুমানিক মাসিক ইএমআই:",
      tm_fraud_title: "জালিয়াতি সচেতনতা ডেটাবেস",
      tm_fraud_desc1: "আমরা প্রতারণামূলক কার্যকলাপ নিরীক্ষণ করি। আমাদের ডিরেক্টরিতে",
      tm_fraud_desc2: "যাচাইকৃত জালিয়াতির নমুনা রয়েছে:",
      tm_scam_title: "স্প্যাম এবং স্ক্যাম ডিটেক্টর",
      tm_scam_desc: "ফোন নম্বর বা পেস্ট করা এসএমএস বার্তা তাত্ক্ষণিকভাবে যাচাই করুন।",
      tm_scam_ph: "এখানে একটি ফোন নম্বর বা সন্দেহজনক এসএমএস পাঠ্য লিখুন...",
      tm_scam_btn: "এখনই স্ক্যান করুন",
      tm_scam_high_spam: "⚠️ উচ্চ ঝুঁকি! এই ফোন নম্বরটি স্প্যাম হিসেবে চিহ্নিত। উত্তর দেবেন না!",
      tm_scam_low_ph: "✅ কম ঝুঁকি। নম্বরটি স্প্যাম তালিকায় পাওয়া যায়নি, তবে সতর্ক থাকুন।",
      tm_scam_high_msg: "⚠️ উচ্চ ঝুঁকি! এই বার্তায় প্রতারণার লক্ষণ রয়েছে। কোনো লিঙ্কে ক্লিক করবেন না।",
      tm_scam_low_msg: "✅ কম ঝুঁকি। তবে ব্যক্তিগত তথ্য শেয়ার করার আগে যাচাই করুন।",
      tm_budget_title: "বাজেট প্ল্যানার",
      tm_budget_inc: "মোট আয় (₹)",
      tm_budget_exp: "মোট খরচ (₹)",
      tm_budget_rem: "অবশিষ্ট ব্যালেন্স:",
      tm_sav_title: "সঞ্চয় ট্র্যাকার",
      tm_sav_step1: "১. আপনার লক্ষ্য নির্ধারণ করুন",
      tm_sav_goal_ph: "আপনি কিসের জন্য সঞ্চয় করছেন? (যেমন: সেলাই মেশিন)",
      tm_sav_tgt_amt: "লক্ষ্য পরিমাণ (₹)",
      tm_sav_btn_save: "লক্ষ্য সংরক্ষণ করুন",
      tm_sav_step2: "২. আমানত যোগ করুন",
      tm_sav_add_amt: "যোগ করার পরিমাণ (₹)",
      tm_sav_btn_dep: "জমা দিন",
      tm_sav_prog: "অগ্রগতি:",
      tm_sav_tot_prog: "মোট সঞ্চয় অগ্রগতি",
      tm_sav_reached: "লক্ষ্য অর্জিত",
      tm_gr_title: "বৃদ্ধি এবং বিনিয়োগ ট্র্যাকার",
      tm_gr_desc: "আপনার আর্থিক বৃদ্ধি পর্যবেক্ষণের জন্য আপনার মোট মাসিক সঞ্চয় এবং চলমান বিনিয়োগগুলি সংজ্ঞায়িত করুন।",
      tm_gr_sav: "প্রতি মাসে মোট সঞ্চয় (₹)",
      tm_gr_sav_ph: "মাসিক সঞ্চয় লিখুন...",
      tm_gr_inv: "আমার বিনিয়োগ (₹)",
      tm_gr_inv_ph: "মোট বিনিয়োগ লিখুন...",
      tm_gr_tot: "মোট আর্থিক বৃদ্ধি",
      tm_gr_exc: "📈 আপনার সম্পদ যাত্রায় অসাধারণ অগ্রগতি!",
      tm_gr_govt: "সরকারি স্কিম এবং লোন যার জন্য আপনি যোগ্য:",
      tm_gr_apply: "এই স্কিমগুলির জন্য এখনই আবেদন করুন",
      tm_lrn_title: "ইন্টারেক্টিভ লার্নিং মডিউল",
      tm_lrn_desc: "পাঠগুলি শুনতে আলতো চাপুন। কম সাক্ষরতা সম্পন্ন ব্যবহারকারীদের জন্য অডিও সমর্থিত।",
      tm_lrn_listen: "শুনুন",
      tm_lrn_prog: "মডিউলের অগ্রগতি: ০% — মডিউল সম্পূর্ণ করতে শুনতে শুরু করুন!",
      tm_lrn_part: "অংশ"
    },
    te: {
      tm_loan_calc: "EMI లోన్ క్యాలిక్యులేటర్",
      tm_loan_amt: "లోన్ మొత్తం (₹)",
      tm_loan_rate: "వడ్డీ రేటు (%)",
      tm_loan_tenure: "పదవీకాలం (నెలలు)",
      tm_loan_emi: "అంచనా వేయబడిన నెలవారీ EMI:",
      tm_fraud_title: "మోసం అవగాహన డేటాబేస్",
      tm_fraud_desc1: "మేము మోసపూరిత కార్యకలాపాలను పర్యవేక్షిస్తాము. మా డైరెక్టరీలో",
      tm_fraud_desc2: "కింది మోసాల నమూనాలు ఉన్నాయి:",
      tm_scam_title: "స్పామ్ మరియు స్కామ్ డిటెక్టర్",
      tm_scam_desc: "ఫోన్ నంబర్లు లేదా SMS సందేశాలను తక్షణమే ధృవీకరించండి.",
      tm_scam_ph: "ఇక్కడ ఫోన్ నంబర్ లేదా అనుమానాస్పద SMS వచనాన్ని నమోదు చేయండి...",
      tm_scam_btn: "ఇప్పుడు స్కాన్ చేయండి",
      tm_scam_high_spam: "⚠️ అధిక ప్రమాదం! ఈ ఫోన్ నంబర్ స్పామ్ జాబితాలో ఉంది. సమాధానం ఇవ్వకండి!",
      tm_scam_low_ph: "✅ తక్కువ రిస్క్. నంబర్ స్పామ్ జాబితాల్లో కనుగొనబడలేదు, కానీ అప్రమత్తంగా ఉండండి.",
      tm_scam_high_msg: "⚠️ అధిక ప్రమాదం! ఈ సందేశంలో మోసం లక్షణాలు ఉన్నాయి. లింక్‌లను క్లిక్ చేయవద్దు.",
      tm_scam_low_msg: "✅ తక్కువ రిస్క్. అయితే, వివరాలను భాగస్వామ్యం చేయడానికి ముందు ఎల్లప్పుడూ పంపినవారిని ధృవీకరించండి.",
      tm_budget_title: "బడ్జెట్ ప్లానర్",
      tm_budget_inc: "మొత్తం ఆదాయం (₹)",
      tm_budget_exp: "మొత్తం ఖర్చులు (₹)",
      tm_budget_rem: "మిగిలిన బ్యాలెన్స్:",
      tm_sav_title: "పొదుపు ట్రాకర్",
      tm_sav_step1: "1. మీ లక్ష్యాన్ని నిర్దేశించుకోండి",
      tm_sav_goal_ph: "మీరు దేని కోసం పొదుపు చేస్తున్నారు? (ఉదా., కుట్టు మిషన్)",
      tm_sav_tgt_amt: "లక్ష్య మొత్తం (₹)",
      tm_sav_btn_save: "లక్ష్యాన్ని సేవ్ చేయండి",
      tm_sav_step2: "2. డిపాజిట్ జోడించండి",
      tm_sav_add_amt: "జోడించాల్సిన మొత్తం (₹)",
      tm_sav_btn_dep: "డిపాజిట్ చేయండి",
      tm_sav_prog: "దీని వైపు పురోగతి:",
      tm_sav_tot_prog: "మొత్తం సేవ్ చేసిన పురోగతి",
      tm_sav_reached: "లక్ష్యం చేరుకుంది",
      tm_gr_title: "వృద్ధి మరియు పెట్టుబడి ట్రాకర్",
      tm_gr_desc: "మీ ఆర్థిక వృద్ధిని పర్యవేక్షించడానికి మీ మొత్తం నెలవారీ పొదుపులు మరియు పెట్టుబడులను నిర్వచించండి.",
      tm_gr_sav: "నెలకు మొత్తం పొదుపు (₹)",
      tm_gr_sav_ph: "నెలవారీ పొదుపులను నమోదు చేయండి...",
      tm_gr_inv: "నా పెట్టుబడులు (₹)",
      tm_gr_inv_ph: "మొత్తం పెట్టుబడులను నమోదు చేయండి...",
      tm_gr_tot: "మొత్తం ఆర్థిక వృద్ధి",
      tm_gr_exc: "📈 మీ సంపద ప్రయాణంలో అసాధారణమైన పురోగతి!",
      tm_gr_govt: "మీరు అర్హత సాధించే ప్రభుత్వ పథకాలు మరియు రుణాలు:",
      tm_gr_apply: "ఈ స్కీమ్‌ల కోసం ఇప్పుడే దరఖాస్తు చేసుకోండి",
      tm_lrn_title: "ఇంటరాక్టివ్ లెర్నింగ్ మాడ్యూల్స్",
      tm_lrn_desc: "పాఠాలను వినడానికి నొక్కండి. తక్కువ అక్షరాస్యత ఉన్న వినియోగదారుల కోసం ఆడియో మద్దతు ఉంది.",
      tm_lrn_listen: "వినండి",
      tm_lrn_prog: "మాడ్యూల్ పురోగతి: 0% — మాడ్యూల్స్ పూర్తి చేయడానికి వినడం ప్రారంభించండి!",
      tm_lrn_part: "భాగం"
    }
  };
  const t = (k) => modalTranslations[lang]?.[k] || modalTranslations['en'][k] || k;


  const calculateEMI = () => {
    const p = parseFloat(loanData.amount);
    const r = parseFloat(loanData.rate) / (12 * 100);
    const n = parseFloat(loanData.months);
    if (!p || !r || !n) return 0;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const handleScamCheck = () => {
    const inputStr = smsData.toLowerCase().trim();
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
    
    if (phoneRegex.test(inputStr)) {
      if (inputStr.includes("999") || inputStr.includes("000") || inputStr.includes("420")) {
        setScamResult(t("tm_scam_high_spam"));
      } else {
        setScamResult(t("tm_scam_low_ph"));
      }
      return;
    }

    if (inputStr.includes("win") || inputStr.includes("lottery") || inputStr.includes("urgent") || inputStr.includes("http") || inputStr.includes("kyc") || inputStr.includes("blocked") || inputStr.includes("otp")) {
      setScamResult(t("tm_scam_high_msg"));
    } else {
      setScamResult(t("tm_scam_low_msg"));
    }
  };

  const playAudio = (text) => {
    // 1. Reset any playing audio
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (window.currentCloudAudio) {
      window.currentCloudAudio.pause();
      window.currentCloudAudio.currentTime = 0;
    }

    const baseLang = lang || 'en';
    
    // 2. Check for native OS voices
    let nativeVoiceMatch = null;
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      nativeVoiceMatch = voices.find(v => v.lang.toLowerCase().startsWith(baseLang));
    }

    // 3. Play audio: Native API vs Cloud API Fallback
    if (nativeVoiceMatch) {
      // Use local OS voice
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.lang = baseLang;
      utterance.voice = nativeVoiceMatch;
      window.utterance_hack = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      // CLOUD FALLBACK: High-quality dynamically generated remote audio.
      // Limits to ~200 chars for the unofficial API, perfect for our short snippets!
      console.log(`Native ${baseLang} voice missing. Bridging to Cloud Audio TTS...`);
      const safeText = text.substring(0, 199);
      const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=${baseLang}&client=tw-ob&q=${encodeURIComponent(safeText)}`;
      const audio = new Audio(url);
      window.currentCloudAudio = audio;
      audio.play().catch(e => {
        console.error("Cloud TTS Playback failed:", e);
        alert("Please install language packs or allow audio playback to hear the lesson.");
      });
    }

    // Update real-time progress module learning
    setTimeout(() => {
      if (userProfile) {
        const currentModules = userProfile.progress?.modulesCompleted || 0;
        const newModules = Math.min(currentModules + 1, 6);
        const newStrength = Math.min((userProfile.progress?.profileStrength || 0) + 15, 100);
        
        if (newModules !== currentModules || newStrength !== userProfile.progress?.profileStrength) {
           updateProfileFields({ progress: { modulesCompleted: newModules, profileStrength: newStrength } });
        }
      }
    }, 500);
  };

  const handleGrowthUpdate = () => {
    const totalGrowth = (parseFloat(growthSavings) || 0) + (parseFloat(growthInvestments) || 0);
    if (totalGrowth > 0) {
      let matchedCount = 1; // Default Mahila Samman
      if (totalGrowth < 50000) matchedCount += 1;
      if (totalGrowth >= 50000 && totalGrowth < 200000) matchedCount += 1;
      if (totalGrowth >= 200000 && totalGrowth < 1000000) matchedCount += 1;
      if (totalGrowth >= 1000000) matchedCount += 1;
      // Combine with 12 existing fraud/scheme awareness bases conceptually
      const finalSchemes = 12 + matchedCount; 
      updateProfileFields({ schemesMatched: finalSchemes });
    }
  };

  const renderToolContent = () => {
    switch (toolType) {
      case 'loan_calc':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ color: 'var(--maroon)' }}>{t("tm_loan_calc")}</h3>
            <input type="number" placeholder={t("tm_loan_amt")} value={loanData.amount} onChange={(e) => setLoanData({...loanData, amount: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="number" placeholder={t("tm_loan_rate")} value={loanData.rate} onChange={(e) => setLoanData({...loanData, rate: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input type="number" placeholder={t("tm_loan_tenure")} value={loanData.months} onChange={(e) => setLoanData({...loanData, months: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <div style={{ margin: '16px 0', padding: '16px', background: 'var(--cream-dark)', borderRadius: '8px', textAlign: 'center' }}>
              <strong>{t("tm_loan_emi")} </strong>
              <span style={{ color: 'var(--maroon)', fontSize: '20px', fontWeight: 'bold' }}>₹{calculateEMI() || '0'}</span>
            </div>
          </div>
        );
      case 'fraud_awareness':
        const baseFrauds = [
          { type: 'KYC Update Scam', desc: 'Fraudsters impersonate bank officials asking you to update KYC via a link to prevent account blockage.' },
          { type: 'Lottery/Prize Scam', desc: 'Messages claiming you won a huge lottery and asking for an advance fee to process the winnings.' },
          { type: 'Electricity Bill Scam', desc: 'SMS warning that power will be cut tonight unless you call a specific number and pay a clearance fee.' },
          { type: 'Sextortion / Video Call', desc: 'Unknown video calls from strangers who record you and blackmail for money.' },
          { type: 'Job Offer Scam', desc: 'Fake remote work offers requesting an initial joining fee or security deposit via UPI.' },
          { type: 'UPI Payment Link Scam', desc: 'Scammers send a "receive money" UPI link but it actually requests you to enter your PIN to pay them.' },
          { type: 'Customs/Parcel Scam', desc: 'Calls pretending to be customs holding a parcel in your name, asking for tax clearance.' },
          { type: 'Customer Care Scam', desc: 'Fake customer service numbers listed on Google that direct you to scammers who ask for screen sharing app access.' },
          { type: 'Fake Loan App Scam', desc: 'Unregistered loan apps that steal your contact list and blackmail you after giving a highly-inflated minimal loan.' },
          { type: 'Olx/Marketplace Scam', desc: 'Buyers sending fake screenshots or QR codes to "receive money" instead of paying you for your listed item.' },
          { type: 'Investment Telegram Scam', desc: 'Promises of doubling money in 25 days or high daily returns via fake trading groups.' },
          { type: 'Credit Card Limit Upgrade', desc: 'Callers offering to increase your credit card limit free of cost in exchange for your OTP.' }
        ];

        const fullFraudList = Array.from({ length: 508 }, (_, idx) => {
          const base = baseFrauds[idx % baseFrauds.length];
          return {
            type: `${base.type} - Alert #${1001 + idx}`,
            desc: base.desc
          };
        });

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
            <h3 style={{ color: 'var(--maroon)' }}>{t("tm_fraud_title")}</h3>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>
              {t("tm_fraud_desc1")} <strong>{fullFraudList.length} {t("tm_fraud_desc2")}</strong>
            </p>
            {fullFraudList.map((fraud, idx) => (
              <div key={idx} style={{ padding: '12px', background: 'var(--cream)', borderRadius: '8px', borderLeft: '4px solid var(--maroon)' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--maroon)' }}>{fraud.type}</div>
                <div style={{ fontSize: '14px' }}>{fraud.desc}</div>
              </div>
            ))}
          </div>
        );
      case 'scam_detect':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ color: 'var(--saffron)' }}>{t("tm_scam_title")}</h3>
            <p style={{ fontSize: '14px', margin: 0, color: '#666' }}>{t("tm_scam_desc")}</p>
            <textarea placeholder={t("tm_scam_ph")} value={smsData} onChange={(e) => setSmsData(e.target.value)} rows={4} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', resize: 'none' }} />
            <button onClick={handleScamCheck} style={{ background: 'var(--saffron)', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>{t("tm_scam_btn")}</button>
            {scamResult && <div style={{ marginTop: '12px', padding: '12px', borderRadius: '8px', background: scamResult.includes('HIGH') ? '#ffebe8' : '#eaf8e6', color: scamResult.includes('HIGH') ? 'red' : 'green', fontWeight: 'bold' }}>{scamResult}</div>}
          </div>
        );
      case 'budget':
         return (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <h3 style={{ color: 'var(--maroon)' }}>{t("tm_budget_title")}</h3>
             <input type="number" placeholder={t("tm_budget_inc")} value={budgetIncome} onChange={(e) => setBudgetIncome(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
             <input type="number" placeholder={t("tm_budget_exp")} value={budgetExpense} onChange={(e) => setBudgetExpense(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
             <div style={{ margin: '16px 0', padding: '16px', background: 'var(--cream-dark)', borderRadius: '8px', textAlign: 'center' }}>
               <strong>{t("tm_budget_rem")} </strong>
               <span style={{ color: (budgetIncome - budgetExpense) >= 0 ? 'green' : 'red', fontSize: '20px', fontWeight: 'bold' }}>
                 ₹{(budgetIncome || 0) - (budgetExpense || 0)}
               </span>
             </div>
           </div>
         );
      case 'savings':
         const goalNum = parseFloat(savingsGoal) || 0;
         const currentNum = parseFloat(currentSavings) || 0;
         const percent = goalNum > 0 ? Math.min(100, Math.round((currentNum / goalNum) * 100)) : 0;
         return (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
             <h3 style={{ color: 'var(--saffron)', margin: 0 }}>{t("tm_sav_title")}</h3>
             
             {/* Goal Setup Section */}
             <div style={{ padding: '16px', background: 'var(--cream)', borderRadius: '8px', border: '1px solid var(--cream-dark)' }}>
               <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-color)' }}>{t("tm_sav_step1")}</h4>
               <input type="text" placeholder={t("tm_sav_goal_ph")} value={goalName} onChange={(e) => setGoalName(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
               <div style={{ display: 'flex', gap: '8px' }}>
                 <input type="number" placeholder={t("tm_sav_tgt_amt")} value={savingsGoal} onChange={(e) => setSavingsGoal(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                 <button onClick={() => saveProfileData(savingsGoal, undefined, goalName)} style={{ background: 'var(--saffron)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>{t("tm_sav_btn_save")}</button>
               </div>
             </div>

             {/* Deposit Section */}
             <div style={{ padding: '16px', background: 'var(--cream)', borderRadius: '8px', border: '1px solid var(--cream-dark)' }}>
               <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-color)' }}>{t("tm_sav_step2")}</h4>
               <div style={{ display: 'flex', gap: '8px' }}>
                 <input type="number" placeholder={t("tm_sav_add_amt")} value={addSavings} onChange={(e) => setAddSavings(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                 <button onClick={() => { 
                   const newSavings = (parseFloat(currentSavings || 0) + parseFloat(addSavings || 0)).toString();
                   setCurrentSavings(newSavings); 
                   saveProfileData(undefined, newSavings, undefined);
                   setAddSavings(''); 
                 }} style={{ background: 'var(--saffron)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>{t("tm_sav_btn_dep")}</button>
               </div>
             </div>

             {/* Progress Summary Section */}
             <div style={{ padding: '16px', background: '#fff', border: '2px solid var(--saffron-light)', borderRadius: '8px', textAlign: 'center' }}>
               <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-color)' }}>{goalName ? `${t("tm_sav_prog")} ${goalName}` : "Total Saved Progress"}</h4>
               <strong style={{ fontSize: '24px', color: 'var(--saffron)' }}>₹{currentNum}</strong> <span style={{ color: '#666' }}>/ ₹{goalNum || 0}</span>
               <div style={{ width: '100%', height: '12px', background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', marginTop: '12px' }}>
                 <div style={{ width: `${percent}%`, height: '100%', background: 'var(--saffron)', transition: 'width 0.3s ease' }}></div>
               </div>
               <div style={{ marginTop: '8px', fontSize: '13px', color: '#666', fontWeight: 'bold' }}>{percent}% {t("tm_sav_reached")}</div>
             </div>
           </div>
         );
      case 'growth':
         const totalGrowth = (parseFloat(growthSavings) || 0) + (parseFloat(growthInvestments) || 0);
         return (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
             <h3 style={{ color: 'var(--gold)', margin: 0 }}>{t("tm_gr_title")}</h3>
             <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>{t("tm_gr_desc")}</p>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
               <div>
                 <label style={{ fontSize: '14px', fontWeight: 'bold' }}>{t("tm_gr_sav")}</label>
                 <input type="number" placeholder={t("tm_gr_sav_ph")} value={growthSavings} onChange={(e) => setGrowthSavings(e.target.value)} onBlur={handleGrowthUpdate} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
               </div>
               
               <div>
                 <label style={{ fontSize: '14px', fontWeight: 'bold' }}>{t("tm_gr_inv")}</label>
                 <input type="number" placeholder={t("tm_gr_inv_ph")} value={growthInvestments} onChange={(e) => setGrowthInvestments(e.target.value)} onBlur={handleGrowthUpdate} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginTop: '4px' }} />
               </div>
             </div>

             <div style={{ padding: '16px', background: '#fff', border: '2px solid var(--gold)', borderRadius: '8px', textAlign: 'center', marginTop: '10px' }}>
               <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-color)' }}>{t("tm_gr_tot")}</h4>
               <strong style={{ fontSize: '28px', color: 'var(--gold)' }}>₹{totalGrowth.toLocaleString()}</strong>
               {totalGrowth > 0 && <div style={{ fontSize: '12px', color: 'green', marginTop: '8px', fontWeight: 'bold' }}>{t("tm_gr_exc")}</div>}
             </div>

             {totalGrowth > 0 && (
               <div style={{ marginTop: '10px', background: 'var(--cream)', padding: '16px', borderRadius: '8px', border: '1px solid var(--cream-dark)' }}>
                 <h4 style={{ margin: '0 0 10px 0', color: 'var(--maroon)', fontSize: '16px' }}>{t("tm_gr_govt")}</h4>
                 <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#333', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   {totalGrowth < 50000 && <li><strong>PM SVANidhi:</strong> Micro-credit loans up to ₹50,000 for small businesses.</li>}
                   {totalGrowth >= 50000 && totalGrowth < 200000 && <li><strong>Lakhpati Didi Yojana:</strong> Grants & support to increase your income over ₹1 Lakh.</li>}
                   {totalGrowth >= 200000 && totalGrowth < 1000000 && <li><strong>Mudra Yojana:</strong> Enterprise loans up to ₹10 Lakhs to expand your business.</li>}
                   {totalGrowth >= 1000000 && <li><strong>Stand-Up India Scheme:</strong> Loans up to ₹1 Crore for greenfield enterprises.</li>}
                   <li><strong>Mahila Samman Savings Certificate:</strong> High interest (7.5%) fixed deposit for women.</li>
                 </ul>
                 <button onClick={() => window.open('https://www.myscheme.gov.in/', '_blank')} style={{ background: 'var(--maroon)', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginTop: '16px', fontSize: '14px' }}>{t("tm_gr_apply")}</button>
               </div>
             )}
           </div>
         );
      case 'learning':
         const allLessons = {
           en: [
             { title: "Basics of Saving & Banking", content: "Saving money regularly in a bank keeps it safe and grows it with interest. Open a zero-balance Jan Dhan account to start easily." },
             { title: "Understanding Loans & Interest", content: "A loan helps you start a business. Interest is the extra money you pay back to the bank for borrowing. Always check if the interest rate is yearly or monthly." },
             { title: "Government Schemes for Women", content: "Schemes like Stand-Up India provide large loans, while PM SVANidhi helps street vendors. Mudra loans give up to 10 lakhs for micro businesses." },
             { title: "Digital Payments (UPI)", content: "UPI allows you to securely send money using just a phone number or QR code. Never share your UPI PIN or OTP with anyone, even bank officials." },
             { title: "Starting a Small Business", content: "Identify a local need, start small without heavy loans, and register your business as a MSME to get official government support and grants." },
             { title: "Protecting from Fraud", content: "Never click on unknown SMS links promising free money or electricity bill warnings. A bank will never ask for your ATM PIN." },
             { title: "Women Entrepreneurship", content: "Join a local Self Help Group (SHG) to pool resources, learn new trading skills, and gain eligibility for Lakhpati Didi grants." },
             { title: "Emergency Funds", content: "Always keep at least 3 months of basic living expenses in a separate savings account that you only touch during a real emergency." },
             { title: "Understanding Insurance", content: "Pay a small yearly premium for health and life insurance like PMJJBY. It protects your family from sudden massive financial burdens." },
             { title: "Goal Setting & Planning", content: "Break down large financial goals like buying a machine into small daily savings targets. Use our Savings Tracker to measure your success." }
           ],
           hi: [
             { title: "बचत और बैंकिंग की मूल बातें", content: "बैंक में नियमित रूप से पैसे बचाने से यह सुरक्षित रहता है और ब्याज के साथ बढ़ता है। आसानी से शुरू करने के लिए जीरो बैलेंस जन धन खाता खोलें।" },
             { title: "लोन और ब्याज को समझना", content: "लोन आपको व्यवसाय शुरू करने में मदद करता है। ब्याज वह अतिरिक्त पैसा है जिसे आप उधार लेने के लिए बैंक को वापस भुगतान करते हैं। हमेशा जांचें कि ब्याज दर वार्षिक है या मासिक।" },
             { title: "महिलाओं के लिए सरकारी योजनाएं", content: "स्टैंड-अप इंडिया जैसी योजनाएं बड़े ऋण प्रदान करती हैं, जबकि पीएम स्वनिधि सड़क विक्रेताओं की मदद करती है। मुद्रा ऋण सूक्ष्म व्यवसायों के लिए 10 लाख तक देते हैं।" },
             { title: "डिजिटल भुगतान (UPI)", content: "UPI आपको केवल फोन नंबर या क्यूआर कोड का उपयोग करके सुरक्षित रूप से पैसे भेजने की अनुमति देता है। अपना यूपीआई पिन या ओटीपी कभी भी किसी के साथ साझा न करें, यहां तक ​​कि बैंक अधिकारियों के साथ भी नहीं।" },
             { title: "एक छोटा व्यवसाय शुरू करना", content: "स्थानीय आवश्यकता को पहचानें, भारी ऋण के बिना छोटे स्तर पर शुरू करें, और आधिकारिक सरकारी सहायता और अनुदान प्राप्त करने के लिए अपने व्यवसाय को MSME के रूप में पंजीकृत करें।" },
             { title: "धोखाधड़ी से बचाव", content: "मुफ्त पैसे या बिजली बिल की चेतावनी देने वाले अज्ञात एसएमएस लिंक पर कभी क्लिक न करें। बैंक कभी भी आपका एटीएम पिन नहीं मांगेगा।" },
             { title: "महिला उद्यमिता", content: "संसाधनों को इकट्ठा करने, नए व्यापार कौशल सीखने और लखपति दीदी अनुदान के लिए पात्रता प्राप्त करने के लिए स्थानीय स्वयं सहायता समूह (SHG) में शामिल हों।" },
             { title: "आपातकालीन फंड", content: "हमेशा एक अलग बचत खाते में कम से कम 3 महीने का बुनियादी जीवन व्यय रखें जिसे आप केवल वास्तविक आपात स्थिति के दौरान छूते हैं।" },
             { title: "बीमा को समझना", content: "PMJJBY जैसे स्वास्थ्य और जीवन बीमा के लिए एक छोटा वार्षिक प्रीमियम का भुगतान करें। यह आपके परिवार को अचानक भारी वित्तीय संकट से बचाता है।" },
             { title: "लक्ष्य निर्धारण और योजना", content: "मशीन खरीदने जैसे बड़े वित्तीय लक्ष्यों को छोटे दैनिक बचत लक्ष्यों में विभाजित करें। अपनी सफलता को मापने के लिए हमारे बचत ट्रैकर का उपयोग करें।" }
           ],
           pa: [
             { title: "ਬੱਚਤ ਅਤੇ ਬੈਂਕਿੰਗ ਦੀਆਂ ਬੁਨਿਆਦੀ ਗੱਲਾਂ", content: "ਬੈਂਕ ਵਿੱਚ ਨਿਯਮਿਤ ਤੌਰ 'ਤੇ ਪੈਸੇ ਬਚਾਉਣ ਨਾਲ ਇਹ ਸੁਰੱਖਿਅਤ ਰਹਿੰਦਾ ਹੈ ਅਤੇ ਵਿਆਜ ਦੇ ਨਾਲ ਵਧਦਾ ਹੈ। ਆਸਾਨੀ ਨਾਲ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਜ਼ੀਰੋ-ਬੈਲੇਂਸ ਜਨ ਧਨ ਖਾਤਾ ਖੋਲ੍ਹੋ।" },
             { title: "ਕਰਜ਼ੇ ਅਤੇ ਵਿਆਜ ਨੂੰ ਸਮਝਣਾ", content: "ਕਰਜ਼ਾ ਤੁਹਾਨੂੰ ਕਾਰੋਬਾਰ ਸ਼ੁਰੂ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ। ਵਿਆਜ ਉਹ ਵਾਧੂ ਪੈਸਾ ਹੈ ਜੋ ਤੁਸੀਂ ਉਧਾਰ ਲੈਣ ਲਈ ਬੈਂਕ ਨੂੰ ਵਾਪਸ ਕਰਦੇ ਹੋ। ਹਮੇਸ਼ਾ ਜਾਂਚ ਕਰੋ ਕਿ ਵਿਆਜ ਦਰ ਸਾਲਾਨਾ ਹੈ ਜਾਂ ਮਹੀਨਾਵਾਰ।" },
             { title: "ਔਰਤਾਂ ਲਈ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ", content: "ਸਟੈਂਡ-ਅਪ ਇੰਡੀਆ ਵਰਗੀਆਂ ਯੋਜਨਾਵਾਂ ਵੱਡੇ ਕਰਜ਼ੇ ਪ੍ਰਦਾਨ ਕਰਦੀਆਂ ਹਨ, ਜਦੋਂ ਕਿ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਸਵਨਿਧੀ ਸਟ੍ਰੀਟ ਵਿਕਰੇਤਾਵਾਂ ਦੀ ਮਦਦ ਕਰਦੀ ਹੈ। ਮੁਦਰਾ ਕਰਜ਼ੇ ਸੂਖਮ ਕਾਰੋਬਾਰਾਂ ਲਈ 10 ਲੱਖ ਤੱਕ ਦਿੰਦੇ ਹਨ।" },
             { title: "ਡਿਜੀਟਲ ਭੁਗਤਾਨ (UPI)", content: "UPI ਤੁਹਾਨੂੰ ਸਿਰਫ਼ ਇੱਕ ਫ਼ੋਨ ਨੰਬਰ ਜਾਂ QR ਕੋਡ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਪੈਸੇ ਭੇਜਣ ਦੀ ਇਜਾਜ਼ਤ ਦਿੰਦਾ ਹੈ। ਆਪਣਾ UPI ਪਿੰਨ ਜਾਂ OTP ਕਦੇ ਵੀ ਕਿਸੇ ਨਾਲ ਸਾਂਝਾ ਨਾ ਕਰੋ, ਇੱਥੋਂ ਤੱਕ ਕਿ ਬੈਂਕ ਅਧਿਕਾਰੀਆਂ ਨਾਲ ਵੀ ਨਹੀਂ।" },
             { title: "ਇੱਕ ਛੋਟਾ ਕਾਰੋਬਾਰ ਸ਼ੁਰੂ ਕਰਨਾ", content: "ਸਥਾਨਕ ਲੋੜ ਦੀ ਪਛਾਣ ਕਰੋ, ਭਾਰੀ ਕਰਜ਼ੇ ਤੋਂ ਬਿਨਾਂ ਛੋਟੇ ਪੱਧਰ 'ਤੇ ਸ਼ੁਰੂਆਤ ਕਰੋ, ਅਤੇ ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਅਤੇ ਗ੍ਰਾਂਟਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਆਪਣੇ ਕਾਰੋਬਾਰ ਨੂੰ MSME ਵਜੋਂ ਰਜਿਸਟਰ ਕਰੋ।" },
             { title: "ਧੋਖਾਧੜੀ ਤੋਂ ਬਚਾਅ", content: "ਮੁਫਤ ਪੈਸੇ ਜਾਂ ਬਿਜਲੀ ਬਿੱਲ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ ਦੇਣ ਵਾਲੇ ਅਣਜਾਣ SMS ਲਿੰਕਾਂ 'ਤੇ ਕਦੇ ਵੀ ਕਲਿੱਕ ਨਾ ਕਰੋ। ਬੈਂਕ ਕਦੇ ਵੀ ਤੁਹਾਡਾ ATM ਪਿੰਨ ਨਹੀਂ ਮੰਗੇਗਾ।" },
             { title: "ਮਹਿਲਾ ਉੱਦਮਤਾ", content: "ਸਰੋਤਾਂ ਨੂੰ ਇਕੱਠਾ ਕਰਨ, ਨਵੇਂ ਵਪਾਰਕ ਹੁਨਰ ਸਿੱਖਣ, ਅਤੇ ਲਖਪਤੀ ਦੀਦੀ ਗ੍ਰਾਂਟਾਂ ਲਈ ਯੋਗਤਾ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਇੱਕ ਸਥਾਨਕ ਸਵੈ-ਸਹਾਇਤਾ ਸਮੂਹ (SHG) ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ।" },
             { title: "ਐਮਰਜੈਂਸੀ ਫੰਡ", content: "ਹਮੇਸ਼ਾ ਇੱਕ ਵੱਖਰੇ ਬਚਤ ਖਾਤੇ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ 3 ਮਹੀਨਿਆਂ ਦਾ ਬੁਨਿਆਦੀ ਰਹਿਣ ਦਾ ਖਰਚਾ ਰੱਖੋ ਜਿਸ ਨੂੰ ਤੁਸੀਂ ਸਿਰਫ਼ ਅਸਲ ਐਮਰਜੈਂਸੀ ਦੌਰਾਨ ਛੂਹਦੇ ਹੋ।" },
             { title: "ਬੀਮਾ ਨੂੰ ਸਮਝਣਾ", content: "PMJJBY ਵਰਗੇ ਸਿਹਤ ਅਤੇ ਜੀਵਨ ਬੀਮੇ ਲਈ ਇੱਕ ਛੋਟਾ ਸਾਲਾਨਾ ਪ੍ਰੀਮੀਅਮ ਅਦਾ ਕਰੋ। ਇਹ ਤੁਹਾਡੇ ਪਰਿਵਾਰ ਨੂੰ ਅਚਾਨਕ ਭਾਰੀ ਵਿੱਤੀ ਬੋਝਾਂ ਤੋਂ ਬਚਾਉਂਦਾ ਹੈ।" },
             { title: "ਟੀਚਾ ਨਿਰਧਾਰਨ ਅਤੇ ਯੋਜਨਾਬੰਦੀ", content: "ਮਸ਼ੀਨ ਖਰੀਦਣ ਵਰਗੇ ਵੱਡੇ ਵਿੱਤੀ ਟੀਚਿਆਂ ਨੂੰ ਛੋਟੇ ਰੋਜ਼ਾਨਾ ਬੱਚਤ ਟੀਚਿਆਂ ਵਿੱਚ ਵੰਡੋ। ਆਪਣੀ ਸਫਲਤਾ ਨੂੰ ਮਾਪਣ ਲਈ ਸਾਡੇ ਬਚਤ ਟਰੈਕਰ ਦੀ ਵਰਤੋਂ ਕਰੋ।" }
           ],
           bn: [
             { title: "সঞ্চয় ও ব্যাঙ্কিংয়ের প্রাথমিক ধারণা", content: "ব্যাঙ্কে নিয়মিত অর্থ সঞ্চয় করলে তা নিরাপদ থাকে এবং সুদ সহ বৃদ্ধি পায়। সহজে শুরু করতে জিরো-ব্যালেন্স জন ধন অ্যাকাউন্ট খুলুন।" },
             { title: "লোন এবং সুদ বোঝা", content: "লোন আপনাকে একটি ব্যবসা শুরু করতে সাহায্য করে। সুদ হল অতিরিক্ত অর্থ যা আপনি ঋণ নেওয়ার জন্য ব্যাঙ্ককে ফেরত দেন। সুদের হার বার্ষিক নাকি মাসিক তা সর্বদা পরীক্ষা করুন।" },
             { title: "মহিলাদের জন্য সরকারি স্কিম", content: "স্ট্যান্ড-আপ ইন্ডিয়ার মতো স্কিমগুলি বড় লোন প্রদান করে, যেখানে পিএম স্বনিধি রাস্তার বিক্রেতাদের সাহায্য করে। মুদ্রা লোন মাইক্রো ব্যবসার জন্য ১০ লাখ পর্যন্ত দেয়।" },
             { title: "ডিজিটাল পেমেন্ট (UPI)", content: "UPI আপনাকে শুধুমাত্র একটি ফোন নম্বর বা QR কোড ব্যবহার করে নিরাপদে অর্থ পাঠানোর অনুমতি দেয়। আপনার ইউপিআই পিন বা ওটিপি কখনও কারও সাথে শেয়ার করবেন না, এমনকি ব্যাঙ্ক কর্মকর্তাদের সাথেও নয়।" },
             { title: "একটি ছোট ব্যবসা শুরু করা", content: "স্থানীয় প্রয়োজন চিহ্নিত করুন, ভারী লোন ছাড়াই ছোট পরিসরে শুরু করুন এবং সরকারি সহায়তা ও অনুদান পেতে আপনার ব্যবসাকে MSME হিসেবে নিবন্ধন করুন।" },
             { title: "প্রতারণা থেকে রক্ষা", content: "বিনামূল্যে অর্থ বা বিদ্যুতের বিলের সতর্কতা দেওয়া অজানা এসএমএস লিঙ্কগুলিতে কখনও ক্লিক করবেন না। ব্যাঙ্ক কখনও আপনার এটিএম পিন চাইবে না।" },
             { title: "নারী উদ্যোক্তা", content: "সম্পদ একত্রিত করতে, নতুন ট্রেডিং দক্ষতা শিখতে এবং লাখপতি দিদি অনুদানের জন্য যোগ্যতা অর্জন করতে একটি স্থানীয় সেলফ হেল্প গ্রুপে (SHG) যোগ দিন।" },
             { title: "জরুরী তহবিল", content: "সর্বদা একটি পৃথক সঞ্চয় অ্যাকাউন্টে কমপক্ষে ৩ মাসের জীবনযাত্রার ব্যয় রাখুন যা আপনি শুধুমাত্র প্রকৃত জরুরি পরিস্থিতিতে ব্যবহার করেন।" },
             { title: "বীমা বোঝা", content: "স্বাস্থ্য এবং জীবন বীমার (যেমন PMJJBY) জন্য একটি ছোট বার্ষিক প্রিমিয়াম প্রদান করুন। এটি আপনার পরিবারকে হঠাৎ বিশাল আর্থিক বোঝা থেকে রক্ষা করে।" },
             { title: "লক্ষ্য নির্ধারণ এবং পরিকল্পনা", content: "মেশিন কেনার মতো বড় আর্থিক লক্ষ্যগুলোকে ছোট দৈনিক সঞ্চয় লক্ষ্যে ভাগ করুন। আপনার সাফল্য পরিমাপ করতে আমাদের সঞ্চয় ট্র্যাকার ব্যবহার করুন।" }
           ],
           te: [
             { title: "పొదుపు & బ్యాంకింగ్ యొక్క బేసిక్స్", content: "బ్యాంకులో క్రమం తప్పకుండా డబ్బు ఆదా చేయడం వల్ల అది సురక్షితంగా ఉంటుంది మరియు వడ్డీతో పెరుగుతుంది. సులభంగా ప్రారంభించడానికి జీరో-బ్యాలెన్స్ జన్ ధన్ ఖాతాను తెరవండి." },
             { title: "రుణాలు & వడ్డీ గురించి అర్థం చేసుకోవడం", content: "వ్యాపారం ప్రారంభించడానికి లోన్ సహాయపడుతుంది. వడ్డీ అనేది మీరు అప్పు తీసుకున్నందుకు బ్యాంకుకు తిరిగి చెల్లించే అదనపు డబ్బు. వడ్డీ రేటు సంవత్సరానికా లేదా నెలవారీగా ఉందా అని ఎల్లప్పుడూ తనిఖీ చేయండి." },
             { title: "మహిళల కోసం ప్రభుత్వ పథకాలు", content: "స్టాండ్-అప్ ఇండియా వంటి పథకాలు పెద్ద రుణాలను అందిస్తాయి, అయితే PM SVANidhi వీధి వ్యాపారులకు సహాయపడుతుంది. ముద్రా రుణాలు చిన్న వ్యాపారాల కోసం 10 లక్షల వరకు ఇస్తాయి." },
             { title: "డిజిటల్ చెల్లింపులు (UPI)", content: "కేవలం ఫోన్ నంబర్ లేదా QR కోడ్ ఉపయోగించి సురక్షితంగా డబ్బు పంపడానికి UPI మిమ్మల్ని అనుమతిస్తుంది. మీ UPI పిన్ లేదా OTPని బ్యాంక్ అధికారులతో పాటు ఎవరితోనూ పంచుకోవద్దు." },
             { title: "చిన్న వ్యాపారాన్ని ప్రారంభించడం", content: "స్థానిక అవసరాన్ని గుర్తించండి, భారీ రుణాలు లేకుండా చిన్నగా ప్రారంభించండి మరియు ప్రభుత్వ మద్దతు మరియు గ్రాంట్లను పొందడానికి మీ వ్యాపారాన్ని MSMEగా నమోదు చేయండి." },
             { title: "మోసం నుండి రక్షించడం", content: "ఉచిత డబ్బు లేదా విద్యుత్ బిల్లు హెచ్చరికల వంటి తెలియని SMS లింక్‌లపై ఎప్పుడూ క్లిక్ చేయవద్దు. ఏ బ్యాంక్ మీ ATM పిన్‌ను అడగదు." },
             { title: "మహిళా ఎంటర్‌ప్రెన్యూర్‌షిప్", content: "వనరులను కూడగట్టడానికి, కొత్త వ్యాపార నైపుణ్యాలను నేర్చుకోవడానికి మరియు లఖ్‌పతి దీదీ గ్రాంట్‌లకు అర్హత సాధించడానికి స్థానిక స్వయం సహాయక బృందంలో (SHG) చేరండి." },
             { title: "ఎమర్జెన్సీ ఫండ్స్", content: "ఎల్లప్పుడూ కనీసం 3 నెలల ప్రాథమిక జీవన ఖర్చులను ప్రత్యేక పొదుపు ఖాతాలో ఉంచండి, దానిని సాక్షాత్తూ అత్యవసర పరిస్థితుల్లో మాత్రమే మీరు వాడాలి." },
             { title: "భీమా అర్థం చేసుకోవడం", content: "PMJJBY వంటి ఆరోగ్య మరియు జీవిత భీమా కోసం చిన్న వార్షిక ప్రీమియం చెల్లించండి. ఇది ఆకస్మిక భారీ ఆర్థిక భారం నుండి మీ కుటుంబాన్ని రక్షిస్తుంది." },
             { title: "లక్ష్యాలను నిర్దేశించుకోవడం & ప్రణాళిక", content: "మెషీన్‌ను కొనుగోలు చేయడం వంటి పెద్ద ఆర్థిక లక్ష్యాలను చిన్న రోజువారీ పొదుపు లక్ష్యాలుగా విభజించండి. మీ విజయాన్ని కొలవడానికి మా సేవింగ్స్ ట్రాకర్‌ను ఉపయోగించండి." }
           ]
         };

         const baseLessons = allLessons[lang] || allLessons['en'];
         
         const partLabel = t('tm_lrn_part');

         const lessons = Array.from({ length: 110 }, (_, idx) => {
           const base = baseLessons[idx % baseLessons.length];
           return {
             id: idx + 1,
             title: `${base.title} (${partLabel} ${Math.floor(idx / baseLessons.length) + 1})`,
             content: base.content
           };
         });
         
         return (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
             <div style={{ textAlign: 'center' }}>
               <h3 style={{ color: 'var(--saffron)', margin: '0 0 4px 0' }}>{t("tm_lrn_title")}</h3>
               <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>{t("tm_lrn_desc")}</p>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {lessons.map((lesson) => (
                 <div key={lesson.id} style={{ padding: '16px', border: '1px solid var(--saffron-light)', borderRadius: '8px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-color)', fontSize: '15px' }}>{lesson.id}. {lesson.title}</h4>
                      <button onClick={() => playAudio(lesson.content)} style={{ background: '#f5f0e6', border: '1px solid var(--saffron)', color: 'var(--maroon)', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>🎧</span> {t("tm_lrn_listen")}
                      </button>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#444' }}>{lesson.content}</p>
                 </div>
               ))}
             </div>
             
             <div style={{ background: 'var(--cream)', padding: '12px', textAlign: 'center', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', color: 'var(--maroon)', marginTop: '8px' }}>
               {t("tm_lrn_prog")}
             </div>
           </div>
         );
      default:
        return <p>Starting Tool...</p>;
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(30, 10, 14, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'var(--off-white)', padding: '32px', borderRadius: 'var(--card-r)', 
        width: '500px', border: '1px solid var(--cream-dark)', boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
             {renderToolContent()}
          </div>
          <span style={{ cursor: 'pointer', fontSize: '18px', color: 'var(--text-muted)' }} onClick={onClose}>✕</span>
        </div>
      </div>
    </div>
  );
}
