/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Bot, User, GraduationCap, Bus, BookOpen, Info, Moon, Sun, Image as ImageIcon, ArrowRight, Trash2, FileText, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// College Data Constants
const COLLEGE_DATA = {
  GENERAL: {
    group: "Excel Group of Institutions",
    address: "NH-544, Salem-Coimbatore Highway, Komarapalayam, Namakkal District – 637303, Tamil Nadu, India",
    contact: "9965523999",
    email: "info@excelcolleges.com",
    vision: "To educate and empower the aspiring young generation and mould ideal citizens.",
    mission: "To create total personality development through knowledge, skill and technology."
  },
  CAMPUSES: {
    technical: [
      "Excel Engineering College",
      "Excel College for Commerce & Science",
      "Excel Polytechnic College & ITI",
      "Excel College of Education",
      "Excel Fitness & Sports Academy"
    ],
    medical: [
      "Excel Homoeopathy Medical College",
      "Excel Siddha Medical College & Research Centre",
      "Excel Medical College for Naturopathy & Yoga",
      "Excel College of Pharmacy",
      "Excel Nursing College",
      "Excel College of Physiotherapy",
      "Excel College of Occupational Therapy",
      "Excel Institute of Health Science"
    ]
  },
  COURSES: {
    polytechnic: [
      "Diploma in Computer Science Engineering",
      "Diploma in Mechanical Engineering",
      "Diploma in Civil Engineering",
      "Diploma in Electronics and Communication Engineering",
      "Diploma in Electrical and Electronics Engineering (EEE)",
      "Diploma in Automobile Engineering",
      "Diploma in Medical Laboratory Technology (MLT)"
    ],
    engineering_ug: [
      "B.E Civil Engineering",
      "B.E Mechanical Engineering",
      "B.E Computer Science Engineering",
      "B.E Electrical and Electronics Engineering",
      "B.E Electronics and Communication Engineering",
      "B.Tech Artificial Intelligence & Data Science",
      "B.Tech Artificial Intelligence & Machine Learning",
      "B.Tech Information Technology",
      "B.E Biomedical Engineering",
      "B.E Aeronautical Engineering",
      "B.E Agriculture Engineering",
      "B.E Safety & Fire Engineering",
      "B.Tech Food Technology",
      "B.E Petrochemical Engineering",
      "B.Tech Computer Science and Business Systems"
    ],
    medical: [
      "Homoeopathy",
      "Siddha",
      "Naturopathy & Yoga",
      "Pharmacy",
      "Nursing",
      "Physiotherapy",
      "Occupational Therapy",
      "Allied Health Sciences"
    ]
  },
  TRANSPORT: {
    routes: [
      { num: 42, route: "Poonachi", morning: "7:40 AM / 9:00 AM", evening: "4:45 PM / 6:15 PM", incharge: "Periya Sami" },
      { num: 115, route: "Gobi via Nambiyur", morning: "7:15 AM / 9:00 AM", evening: "4:45 PM / 6:15 PM", incharge: "Arul Kumar" },
      { num: 84, route: "Pudhur", morning: "7:40 AM / 9:00 AM", evening: "4:45 PM / 6:00 PM", incharge: "Arun Kumar" },
      { num: 72, route: "Nerunjipettai", morning: "8:00 AM / 9:00 AM", evening: "4:45 PM / 6:00 PM", incharge: "Sathish" },
      { num: 54, route: "Gobi via Kavandapadi", morning: "7:45 AM / 9:00 AM", evening: "4:45 PM / 6:20 PM", incharge: "Thiyagu" },
      { num: 86, route: "Salem via Elampillai", morning: "7:30 AM / 9:00 AM", evening: "4:45 PM / 6:30 PM", incharge: "Ravi" },
      { num: 123, route: "Mettur", morning: "7:30 AM / 9:00 AM", evening: "4:45 PM / 7:30 PM", incharge: "Sakthi Kumar" },
      { num: 81, route: "Kannamoochi", morning: "7:30 AM / 9:00 AM", evening: "4:45 PM / 6:00 PM", incharge: "Murthi" }
    ]
  },
  PLACEMENTS: {
    total: "850+ students placed.",
    officer: {
      name: "Er. O. Obulakshmi B.E., M.E.",
      email: "placement@excelcolleges.com"
    },
    it_recruiters: ["TCS", "Infosys", "Wipro", "HCL", "Zoho"],
    core_companies: [
      "Hyundai Motors India", "Sharda Motors Industries", "Royal Enfield",
      "Larsen & Toubro", "Schneider Electric", "TVS Training & Service",
      "Sakthi Auto Components", "Santhi Gears"
    ]
  },
  CAMPUS_IMAGES: [
    "https://i.postimg.cc/2yCT33nQ/layout-image.jpg",
    "https://www.agarum.com/photos/1/1/15/205/c/l/07ca789bc30ba134509f463b4b3b80c3.jpg",
    "https://assets.allegiance-educare.com/colleges/1480678672acd2.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6h-Yr_I8hLLz6HAk7qtyEHkbffnAS4DaTRA&s"
  ]
};

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  image?: string;
};

export default function App() {
  const [welcomeSearch, setWelcomeSearch] = useState('');
  const [isCollegeSelected, setIsCollegeSelected] = useState(false);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isAwakening, setIsAwakening] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewingDocs, setViewingDocs] = useState(false);
  const [viewingCampus, setViewingCampus] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Official Enquiry Bot for Excel Group of Institutions. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const startEnquiry = () => {
    setIsAwakening(true);
    setTimeout(() => {
      setIsAwakening(false);
      setIsChatStarted(true);
    }, 7000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: "Chat cleared. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (isChatStarted) {
      speak("Official Enquiry Bot for Excel Group of Institutions. How can I help you today?");
    }
  }, [isChatStarted]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatStarted]);

  const getBotResponse = (query: string): { text: string; image?: string } => {
    const q = query.toLowerCase();

    // Keyword Sets
    const DIPLOMA_KWS = ['diploma', 'diplomo', 'diplamo', 'dipamo', 'dplamo', 'polytechnic'];
    const ENG_KWS = ['engineering', 'engg', 'engieering', 'b.e', 'be', 'btech', 'b.tech', 'ug course'];
    const MED_KWS = ['medical', 'pharmacy', 'nursing', 'physiotherapy', 'siddha', 'homoeopathy', 'naturopathy', 'ayush'];
    const PLACE_KWS = ['placement', 'recruiter', 'company', 'job', 'placed'];
    const TRANS_KWS = ['bus', 'transport', 'route', 'timing'];
    const GEN_KWS = ['address', 'contact', 'phone', 'email', 'vision', 'mission', 'location', 'map'];
    const CAMPUS_KWS = ['campus', 'institutions', 'colleges list', 'technical', 'medical campus'];

    // 1. Transport / Bus Details
    if (TRANS_KWS.some(kw => q.includes(kw)) || q.includes('incharge')) {
      const routes = COLLEGE_DATA.TRANSPORT.routes;
      if (q.includes('what') || q.includes('list') || q.includes('all') || (q.includes('route') && !routes.some(r => q.includes(r.route.toLowerCase())))) {
        return { text: routes.map(r => `Bus ${r.num} – ${r.route} – ${r.morning} – ${r.evening} – Incharge: ${r.incharge}`).join('\n') };
      }
      const foundBus = routes.find(r => q.includes(r.route.toLowerCase()) || (q.includes(r.num.toString()) && r.num > 0));
      if (foundBus) {
        return { text: `Bus ${foundBus.num} – ${foundBus.route} – ${foundBus.morning} – ${foundBus.evening} – Incharge: ${foundBus.incharge}` };
      }
      return { text: "This bus route is not available in the transport database." };
    }

    // 2. Polytechnic (Diploma) Courses
    if (DIPLOMA_KWS.some(kw => q.includes(kw))) {
      const list = COLLEGE_DATA.COURSES.polytechnic;
      const courseKeywords = ['cse', 'computer', 'mechanical', 'civil', 'ece', 'eee', 'electrical', 'electronics', 'automobile', 'mlt', 'medical lab'];
      const requestedCourse = courseKeywords.find(kw => q.includes(kw));
      
      if (requestedCourse) {
        const match = list.find(c => {
          if (requestedCourse === 'eee' && c.includes('(EEE)')) return true;
          if (requestedCourse === 'mlt' && c.includes('(MLT)')) return true;
          return c.toLowerCase().includes(requestedCourse);
        });
        if (match) return { text: `Yes. ${match} is available.` };
        return { text: "This course is not available in this category." };
      }
      return { text: list.join('\n') };
    }

    // 3. Engineering (UG) Courses
    if (ENG_KWS.some(kw => q.includes(kw))) {
      const list = COLLEGE_DATA.COURSES.engineering_ug;
      const courseKeywords = ['cse', 'computer', 'mechanical', 'civil', 'ece', 'eee', 'electrical', 'electronics', 'ai', 'ds', 'ml', 'it', 'information', 'biomedical', 'aeronautical', 'agriculture', 'safety', 'fire', 'food', 'petrochemical', 'business'];
      const requestedCourse = courseKeywords.find(kw => q.includes(kw));

      if (requestedCourse) {
        const match = list.find(c => {
          if (requestedCourse === 'ai' && c.includes('Artificial Intelligence')) return true;
          if (requestedCourse === 'ds' && c.includes('Data Science')) return true;
          if (requestedCourse === 'ml' && c.includes('Machine Learning')) return true;
          return c.toLowerCase().includes(requestedCourse);
        });
        if (match) return { text: `Yes. ${match} is available.` };
        return { text: "This course is not available in this category." };
      }
      return { text: list.join('\n') };
    }

    // 4. Medical Courses
    if (MED_KWS.some(kw => q.includes(kw))) {
      const list = COLLEGE_DATA.COURSES.medical;
      const requestedCourse = MED_KWS.find(kw => q.includes(kw) && kw !== 'medical' && kw !== 'ayush');
      
      if (requestedCourse) {
        const match = list.find(c => c.toLowerCase().includes(requestedCourse));
        if (match) return { text: `Yes. ${match} is available.` };
        return { text: "This course is not available in this category." };
      }
      return { text: list.join('\n') };
    }

    // 5. Placement Details
    if (PLACE_KWS.some(kw => q.includes(kw))) {
      const p = COLLEGE_DATA.PLACEMENTS;
      if (q.includes('how many') || q.includes('total')) return { text: p.total };
      if (q.includes('officer')) return { text: `${p.officer.name}\nEmail: ${p.officer.email}` };
      if (q.includes('it company')) return { text: p.it_recruiters.join('\n') };
      if (q.includes('core company')) return { text: p.core_companies.join('\n') };
      return { text: `Total: ${p.total}\nIT Recruiters: ${p.it_recruiters.join(', ')}\nCore Companies: ${p.core_companies.join(', ')}` };
    }

    // 6. Campus Information
    if (CAMPUS_KWS.some(kw => q.includes(kw))) {
      const c = COLLEGE_DATA.CAMPUSES;
      if (q.includes('technical')) return { text: c.technical.join('\n') };
      if (q.includes('medical')) return { text: c.medical.join('\n') };
      return { text: `Technical Campus:\n- ${c.technical.join('\n- ')}\n\nMedical Campus:\n- ${c.medical.join('\n- ')}` };
    }

    // 7. General Information
    if (GEN_KWS.some(kw => q.includes(kw)) || q.includes('group')) {
      const d = COLLEGE_DATA.GENERAL;
      if (q.includes('address')) return { text: d.address };
      if (q.includes('contact') || q.includes('phone')) return { text: d.contact };
      if (q.includes('vision')) return { text: d.vision };
      if (q.includes('mission')) return { text: d.mission };
      if (q.includes('email')) return { text: d.email };
      return { text: `Address: ${d.address}\nPhone: ${d.contact}\nEmail: ${d.email}` };
    }

    // Photo check
    if (q.includes('photo') || q.includes('pic') || q.includes('image') || q.includes('view')) {
      const nextIndex = (photoIndex + 1) % COLLEGE_DATA.CAMPUS_IMAGES.length;
      setPhotoIndex(nextIndex);
      return { 
        text: "Campus View",
        image: COLLEGE_DATA.CAMPUS_IMAGES[photoIndex]
      };
    }

    return { text: "Sorry, this information is not available. Please contact the college office." };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(input);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        image: response.image,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      speak(response.text);
    }, 500);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8fafc] text-[#1e293b]'}`}>
      <AnimatePresence mode="wait">
        {viewingDocs ? (
          <motion.div
            key="docs"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 p-6 sm:p-12 max-w-5xl mx-auto w-full overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">Project Documentation</h2>
              <button 
                onClick={() => setViewingDocs(false)}
                className={`p-3 rounded-2xl transition-all ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                <X size={24} />
              </button>
            </div>

            <div className={`space-y-12 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
              <section>
                <h3 className={`text-xl font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Project Title</h3>
                <p className="text-2xl font-medium">CHATBOT FOR COLLEGE ENQUIRE USING PYTHON</p>
              </section>

              <section>
                <h3 className={`text-xl font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Project Overview</h3>
                <p className="text-lg">
                  The College Enquiry Chatbot is an AI-powered web application designed to provide instant responses to student queries regarding courses, placements, transport, and general college information.
                  The system uses a prompt-engineered AI model integrated into a web interface to ensure controlled and accurate responses.
                  The chatbot enhances user experience by offering real-time enquiry handling and structured information delivery.
                </p>
              </section>

              <section>
                <h3 className={`text-xl font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Methodology Implemented</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500" /> User Interface Module</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-500" /> AI Prompt Control Module</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-amber-500" /> Structured Data Management</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-rose-500" /> Response Filtering Mechanism</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-sky-500" /> Deployment Module</li>
                </ul>
              </section>

              <section>
                <h3 className={`text-xl font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Tools Used</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} shadow-lg`}>
                    <p className="font-bold mb-2 text-emerald-500">Frontend</p>
                    <p>HTML, CSS, JavaScript / React</p>
                  </div>
                  <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} shadow-lg`}>
                    <p className="font-bold mb-2 text-indigo-500">Backend</p>
                    <p>Python (Main Engine)</p>
                  </div>
                  <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} shadow-lg`}>
                    <p className="font-bold mb-2 text-amber-500">AI Integration</p>
                    <p>Google AI Studio (Gemini Model)</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className={`text-xl font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>System Architecture</h3>
                <div className={`p-8 rounded-3xl text-center font-bold text-xl border ${darkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
                  User → Web Interface → AI Model (Prompt Engineered) → Structured Data Control → Response Displayed
                </div>
                <p className="mt-6 text-lg italic opacity-80">
                  "The chatbot does not directly generate random answers. It responds strictly based on structured college data provided inside the system prompt."
                </p>
              </section>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/10 text-center">
              <button 
                onClick={() => setViewingDocs(false)}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white rounded-2xl font-bold hover:from-emerald-700 hover:to-indigo-700 transition-all shadow-xl"
              >
                Back to Application
              </button>
            </div>
          </motion.div>
        ) : viewingCampus ? (
          <motion.div
            key="campus"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 p-6 sm:p-12 max-w-5xl mx-auto w-full overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">Campus Map & Block Charts</h2>
              <button 
                onClick={() => setViewingCampus(false)}
                className={`p-3 rounded-2xl transition-all ${darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-12">
              <section className={`p-8 rounded-[2rem] border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
                <h3 className={`text-xl font-black mb-6 uppercase tracking-widest ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Campus Layout Map</h3>
                <div className="rounded-3xl overflow-hidden border-4 border-indigo-500/20 shadow-2xl mb-8">
                  <img 
                    src="https://i.postimg.cc/2yCT33nQ/layout-image.jpg" 
                    alt="Campus Layout Map" 
                    className="w-full h-auto"
                  />
                </div>
                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-indigo-500/10 text-indigo-100' : 'bg-indigo-50 text-indigo-900'} border border-indigo-500/20`}>
                  <p className="font-bold mb-2">Layout Overview:</p>
                  <p className="text-sm leading-relaxed opacity-90">
                    The comprehensive campus layout map provides a bird's-eye view of the entire Excel Group of Institutions. It delineates the technical and medical campuses, sports complexes, residential hostels, and green spaces. This master plan ensures efficient navigation across the sprawling infrastructure, connecting academic excellence with world-class facilities.
                  </p>
                </div>
              </section>

              <section className={`p-8 rounded-[2rem] border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
                <h3 className={`text-xl font-black mb-6 uppercase tracking-widest ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Polytechnic Block Diagram</h3>
                <div className="rounded-3xl overflow-hidden border-4 border-emerald-500/20 shadow-2xl mb-8">
                  <img 
                    src="https://i.postimg.cc/BQgk5f6N/block-diagram-for-diplamo.jpg" 
                    alt="Polytechnic Block Diagram" 
                    className="w-full h-auto"
                  />
                </div>
                <div className={`p-6 rounded-2xl ${darkMode ? 'bg-emerald-500/10 text-emerald-100' : 'bg-emerald-50 text-emerald-900'} border border-emerald-500/20`}>
                  <p className="font-bold mb-2">Diagram Explanation:</p>
                  <p className="text-sm leading-relaxed opacity-90">
                    This block diagram illustrates the strategic layout of the Polytechnic (Diploma) campus. It highlights the interconnected academic wings, specialized laboratories for EEE, Mechanical, and CSE departments, administrative hubs, and student amenity zones. The design ensures seamless movement between theory classrooms and practical workshop areas, optimizing the technical learning environment.
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {COLLEGE_DATA.CAMPUS_IMAGES.map((img, idx) => (
                  <div key={idx} className="rounded-3xl overflow-hidden shadow-lg border border-white/10">
                    <img src={img} alt={`Campus View ${idx + 1}`} className="w-full h-64 object-cover" />
                  </div>
                ))}
              </section>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 text-center">
              <button 
                onClick={() => setViewingCampus(false)}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-indigo-600 text-white rounded-2xl font-bold hover:from-emerald-700 hover:to-indigo-700 transition-all shadow-xl"
              >
                Back to Application
              </button>
            </div>
          </motion.div>
        ) : isAwakening ? (
          <motion.div
            key="awakening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#0a0a0a]"
          >
            <div className="relative w-72 h-72 mb-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full rounded-full overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.3)] border-4 border-emerald-500/20"
              >
                <img 
                  src="https://cdn.dribbble.com/userupload/22506373/file/original-b6754f2973470beb1e8f91d242b76b59.gif" 
                  alt="AI Awakening" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Scanning Overlay */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-10"
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl font-black tracking-tighter text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                AI Awakening
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >...</motion.span>
              </h2>
              <div className="flex flex-col items-center gap-2">
                <p className="text-emerald-400 font-mono text-xs uppercase tracking-[0.4em] animate-pulse drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
                  Synchronizing Neural Networks
                </p>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : !isChatStarted ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`w-36 h-36 rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl border-4 ${darkMode ? 'border-white/10' : 'border-black/5'}`}
            >
              <img 
                src="https://i.postimg.cc/VJP3dmY3/chatbot-image.jpg" 
                alt="Excel College Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 uppercase bg-gradient-to-r from-emerald-500 via-indigo-500 to-amber-500 bg-clip-text text-transparent"
            >
              CHATBOT FOR COLLEGE ENQUIRE USING PYTHON
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-lg mb-8 max-w-2xl ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}
            >
              Welcome to the official enquiry portal for Excel Group of Institutions. Get instant information about campuses, transport, and more.
            </motion.p>

            {/* College Search Bar */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="w-full max-w-md mb-10 relative"
            >
              <div className="relative">
                <input
                  type="text"
                  value={welcomeSearch}
                  onChange={(e) => setWelcomeSearch(e.target.value)}
                  placeholder="Search your college (e.g. Excel)..."
                  className={`w-full rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 transition-all shadow-xl ${
                    darkMode 
                      ? 'bg-slate-900 border-white/10 text-white focus:ring-emerald-500/10 focus:border-emerald-500' 
                      : 'bg-white border-slate-200 text-slate-800 focus:ring-emerald-500/20 focus:border-emerald-500'
                  } border`}
                />
                {(welcomeSearch.toLowerCase().includes('excel') || welcomeSearch.toLowerCase().includes('exe')) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-3xl shadow-2xl border-2 transition-all flex flex-col items-center gap-3 cursor-pointer ${
                      isCollegeSelected 
                        ? 'border-emerald-500 bg-emerald-500/5' 
                        : darkMode ? 'bg-slate-800 border-white/10 hover:border-emerald-500/50' : 'bg-white border-slate-100 hover:border-emerald-500/50'
                    }`}
                    onClick={() => setIsCollegeSelected(true)}
                  >
                    <img 
                      src="https://i.postimg.cc/DyM3GKmq/serach-logo.jpg" 
                      alt="Search Logo" 
                      className="w-full h-40 rounded-2xl object-cover shadow-lg"
                    />
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isCollegeSelected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                      <p className={`text-xs font-black uppercase tracking-widest ${isCollegeSelected ? 'text-emerald-500' : 'text-slate-500'}`}>
                        {isCollegeSelected ? 'College Selected' : 'Tap to Select College'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <button
                onClick={startEnquiry}
                disabled={!isCollegeSelected}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-600 transition-all shadow-xl hover:shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale"
              >
                Start Enquiry
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setViewingDocs(true)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                  darkMode 
                    ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-md'
                }`}
              >
                <FileText size={20} className="text-indigo-500" />
                Project Docs
              </button>

              {isCollegeSelected && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setViewingCampus(true)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                    darkMode 
                      ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-md'
                  }`}
                >
                  <ImageIcon size={20} className="text-amber-500" />
                  Campus Map
                </motion.button>
              )}

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 ${
                  darkMode 
                    ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-md'
                }`}
              >
                {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-500" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col h-screen"
          >
            {/* Header */}
            <header className={`border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-md transition-colors ${
              darkMode ? 'bg-[#121212] border-white/5' : 'bg-white border-slate-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center border ${darkMode ? 'border-white/10' : 'border-slate-200 shadow-sm'}`}>
                  <img 
                    src="https://i.postimg.cc/VJP3dmY3/chatbot-image.jpg" 
                    alt="Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">Excel Group of Institutions</h1>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Official Enquiry Bot
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  title={voiceEnabled ? "Mute Voice" : "Unmute Voice"}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    darkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {voiceEnabled ? <Volume2 size={20} className="text-emerald-500" /> : <VolumeX size={20} className="text-rose-500" />}
                </button>
                <button
                  onClick={() => setViewingDocs(true)}
                  title="Project Docs"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    darkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <FileText size={20} className="text-indigo-500" />
                </button>
                <button
                  onClick={() => setViewingCampus(true)}
                  title="Campus Map"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    darkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <ImageIcon size={20} className="text-amber-500" />
                </button>
                <button
                  onClick={clearChat}
                  title="Clear Chat"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    darkMode ? 'bg-white/5 text-red-400 hover:bg-red-500/10' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                  }`}
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    darkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {darkMode ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-indigo-500" />}
                </button>
              </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 overflow-y-auto">
              <div className="space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-br from-indigo-600 to-indigo-500 text-white' 
                            : 'bg-gradient-to-br from-emerald-500 to-emerald-400 text-white'
                        }`}>
                          {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div className={`p-4 rounded-2xl shadow-md ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-none' 
                            : (darkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800') + ' rounded-tl-none border ' + (darkMode ? 'border-white/5' : 'border-slate-100')
                        }`}>
                          {message.image && (
                            <div className="mb-3 overflow-hidden rounded-xl border border-white/10 shadow-inner">
                              <img src={message.image} alt="Campus View" className="w-full h-auto" referrerPolicy="no-referrer" />
                            </div>
                          )}
                          <p className="text-sm leading-relaxed whitespace-pre-line font-medium">{message.text}</p>
                          <span className={`text-[10px] mt-2 block font-bold uppercase tracking-tighter opacity-60 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </main>

            {/* Quick Actions */}
            <div className="max-w-4xl w-full mx-auto px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {[
                { label: 'Campus Photos', icon: <ImageIcon size={14} className="text-amber-500" />, query: 'Show me campus photos' },
                { label: 'Medical Courses', icon: <GraduationCap size={14} className="text-rose-500" />, query: 'List medical courses' },
                { label: 'Engineering', icon: <BookOpen size={14} className="text-indigo-500" />, query: 'List engineering courses' },
                { label: 'Diploma', icon: <GraduationCap size={14} className="text-emerald-500" />, query: 'List diploma courses' },
                { label: 'Bus Routes', icon: <Bus size={14} className="text-sky-500" />, query: 'Tell me about bus routes' },
                { label: 'Placements', icon: <Info size={14} className="text-amber-500" />, query: 'Placement details' },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    setInput(action.query);
                    setTimeout(handleSend, 0);
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black transition-all shadow-sm border ${
                    darkMode 
                      ? 'bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:shadow-md'
                  }`}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <footer className={`p-4 sm:p-6 sticky bottom-0 transition-colors ${darkMode ? 'bg-[#0a0a0a] border-t border-white/5' : 'bg-white border-t border-slate-100'}`}>
              <div className="max-w-4xl w-full mx-auto relative">
                {input.toLowerCase().includes('exe') && (
                  <div className="absolute -top-16 left-0 bg-white p-2 rounded-xl shadow-lg border border-slate-200">
                    <img src="https://i.postimg.cc/Y9pGZ0pM/excel-logo.png" alt="Excel Logo" className="w-12 h-12 object-contain" />
                  </div>
                )}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about courses, placements, transport..."
                  className={`w-full rounded-2xl px-6 py-4 pr-14 text-sm focus:outline-none focus:ring-4 transition-all shadow-inner ${
                    darkMode 
                      ? 'bg-slate-900 border-white/10 text-white focus:ring-emerald-500/10 focus:border-emerald-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-emerald-500/20 focus:border-emerald-500'
                  } border`}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg ${
                    darkMode ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-gradient-to-br from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600'
                  } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-black">
                Excel Group of Institutions &copy; {new Date().getFullYear()} | CHATBOT FOR COLLEGE ENQUIRE USING PYTHON
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
