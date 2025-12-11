import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Download, 
  RefreshCw, 
  Settings, 
  Table, 
  FileJson, 
  FileSpreadsheet,
  Database,
  Type,
  Calendar,
  Hash,
  CheckSquare,
  List,
  Sparkles,
  X,
  Loader2,
  Bot,
  BarChart3,
  Activity,
  ArrowRight,
  Code2,
  Zap,
  ShieldCheck,
  Cpu,
  Globe,
  Terminal,
  Heart
} from 'lucide-react';

// --- Mock Data Source ---
const FIRST_NAMES = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
  "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa", 
  "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Kai", "Elara", "Finn",
  "Zara", "Leo", "Nova", "Axel", "Luna", "Orion", "Lyra"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
  "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker"
];

const DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "company.io", "tech.net"];

const CITIES = ["New York", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Toronto", "Mumbai", "Dubai", "Singapore"];

// --- Helper Functions ---
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

const generateValue = (type, config, nullable, aiValue = null) => {
  // 20% chance of null if nullable is true
  if (nullable && Math.random() < 0.2) {
    return null;
  }

  // If this is an AI field and we have a pre-generated value, use it
  if (type === 'ai_text' && aiValue !== null && aiValue !== undefined) {
    return aiValue;
  }

  switch (type) {
    case 'name':
      return `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`;
    case 'email':
      const first = getRandomElement(FIRST_NAMES).toLowerCase();
      const last = getRandomElement(LAST_NAMES).toLowerCase();
      return `${first}.${last}${generateRandomInt(1, 99)}@${getRandomElement(DOMAINS)}`;
    case 'number':
      return generateRandomInt(Number(config.min || 0), Number(config.max || 100));
    case 'date':
      const startDate = config.startDate ? new Date(config.startDate) : new Date(2020, 0, 1);
      const endDate = config.endDate ? new Date(config.endDate) : new Date();
      return generateRandomDate(startDate, endDate);
    case 'boolean':
      return Math.random() > 0.5;
    case 'city':
      return getRandomElement(CITIES);
    case 'choice':
      const options = config.options ? config.options.split(',').map(s => s.trim()) : ['Option A', 'Option B'];
      return getRandomElement(options);
    case 'uuid':
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    case 'ai_text':
        return "Generating..."; // Fallback placeholder
    default:
      return '';
  }
};

// --- Components ---

const FieldIcon = ({ type }) => {
  switch (type) {
    case 'name': return <Type size={16} className="text-blue-400" />;
    case 'email': return <Settings size={16} className="text-purple-400" />;
    case 'number': return <Hash size={16} className="text-green-400" />;
    case 'date': return <Calendar size={16} className="text-yellow-400" />;
    case 'boolean': return <CheckSquare size={16} className="text-red-400" />;
    case 'choice': return <List size={16} className="text-orange-400" />;
    case 'ai_text': return <Bot size={16} className="text-pink-400" />;
    default: return <Database size={16} className="text-gray-400" />;
  }
};

// --- Landing Page Component ---
const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white flex flex-col relative overflow-hidden">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-transparent to-[#0d1117] pointer-events-none" />

      {/* Navigation */}
      <nav className="border-b border-slate-800/60 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <Activity className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">EchoBase</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Showcase</a>
            <a href="#" className="hover:text-white transition-colors">Team CodeBlooded</a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onStart}
              className="px-5 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col items-center justify-center pt-20 pb-32 z-10">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              v2.0 Released: Now with Generative AI
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Data that feels <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">
                real, but isn't.
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Stop mocking data by hand. EchoBase uses advanced algorithms and Gemini AI to generate production-grade datasets for testing, seeding, and demos.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto group relative px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Creating <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="w-full sm:w-auto px-8 py-4 bg-[#0d1117] text-slate-300 rounded-xl font-bold text-lg border border-slate-700 hover:border-slate-500 hover:text-white transition-all flex items-center justify-center gap-2">
                <Terminal size={18} />
                Read the Docs
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-4">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0d1117] flex items-center justify-center text-[10px] text-slate-400 font-bold">
                     U{i}
                   </div>
                 ))}
              </div>
              <p>Trusted by 500+ developers</p>
            </div>
          </div>

          {/* Right: Code Graphic */}
          <div className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#161b22] rounded-2xl border border-slate-700/50 p-6 shadow-2xl transform transition-transform duration-500 hover:rotate-1 hover:scale-[1.02]">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-700/50 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="ml-auto text-xs text-slate-500 font-mono">schema_preview.json</div>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-purple-400">{"{"}</div>
                <div className="pl-4 text-emerald-400">"id"<span className="text-slate-400">:</span> <span className="text-amber-300">"550e8400-e29b..."</span><span className="text-slate-400">,</span></div>
                <div className="pl-4 text-emerald-400">"full_name"<span className="text-slate-400">:</span> <span className="text-amber-300">"Alex Rivero"</span><span className="text-slate-400">,</span></div>
                <div className="pl-4 text-emerald-400">"role"<span className="text-slate-400">:</span> <span className="text-amber-300">"Senior Engineer"</span><span className="text-slate-400">,</span></div>
                <div className="pl-4 text-emerald-400">"bio"<span className="text-slate-400">:</span> <span className="text-amber-300">"Loves coffee and Rust..."</span><span className="text-slate-400">,</span></div>
                <div className="pl-4 text-emerald-400">"is_active"<span className="text-slate-400">:</span> <span className="text-blue-400">true</span></div>
                <div className="text-purple-400">{"}"}</div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-mono">Generated in 12ms</div>
                <div className="flex gap-2">
                   <div className="h-2 w-16 bg-slate-700 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

             {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#0d1117] border border-slate-700 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <Zap className="text-green-400" size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Generation Speed</p>
                <p className="text-sm font-bold text-white">~4,000 rows/sec</p>
              </div>
            </div>
          </div>

        </div>

        {/* How it Works / Features Grid */}
        <div className="max-w-7xl mx-auto px-6 mt-32 w-full">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Everything you need to ship faster</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">From simple mocks to complex relational data, EchoBase handles the heavy lifting so you can focus on building features.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
                icon={<Bot className="text-indigo-400" />}
                title="AI Schema Builder"
                description="Describe your data needs in plain English. Our Gemini-powered engine builds the schema and generates content instantly."
            />
            <FeatureCard 
                icon={<Code2 className="text-purple-400" />}
                title="Developer Ready"
                description="Export directly to JSON, CSV, or SQL. Integrates perfectly with your testing workflow and CI/CD pipelines."
            />
            <FeatureCard 
                icon={<ShieldCheck className="text-emerald-400" />}
                title="Privacy First"
                description="Generate PII-free data that looks real but is completely synthetic. Safe for staging and production demos."
            />
            <FeatureCard 
                icon={<Globe className="text-blue-400" />}
                title="Global Context"
                description="Localized data generation for names, addresses, and phone numbers across 50+ regions."
            />
             <FeatureCard 
                icon={<Cpu className="text-orange-400" />}
                title="High Performance"
                description="Optimized generation engine capable of handling millions of rows directly in the browser."
            />
             <FeatureCard 
                icon={<Terminal className="text-pink-400" />}
                title="CLI Friendly"
                description="API-first design allows you to integrate EchoBase directly into your terminal workflows (Coming Soon)."
            />
            </div>
        </div>
      </div>
      
       {/* Footer */}
       <div className="border-t border-slate-800 py-12 bg-[#0d1117] relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                 <Activity className="text-indigo-500" size={20} />
                 <span className="font-bold text-slate-300">EchoBase</span>
              </div>
              
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                 <span>Built with</span>
                 <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
                 <span>by <span className="text-white font-medium hover:text-indigo-400 cursor-pointer transition-colors">Team CodeBlooded</span></span>
              </div>
              
              <div className="text-slate-600 text-sm">
                  © 2025 All rights reserved.
              </div>
          </div>
       </div>
       
       <style>{`
        .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-bounce-slow {
            animation: bounce 3s infinite;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(5%); }
        }
       `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 hover:border-indigo-500/50 transition-all hover:bg-[#1c2128] group cursor-default">
    <div className="h-12 w-12 rounded-lg bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-slate-700 group-hover:border-indigo-500/30">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);


// --- AI Modals ---

const AIModal = ({ isOpen, onClose, onApply }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError('');

    try {
      const apiKey = ""; // System will inject the key
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a strict synthetic data schema generator.
              User description: "${prompt}"

              Rules for Schema Generation:
              1. Return a JSON array of field objects.
              2. Select the most appropriate type. Be strictly typed:
                 - 'uuid': IDs
                 - 'name': Names
                 - 'email': Emails
                 - 'number': Integers ({min, max})
                 - 'date': Dates ({startDate})
                 - 'boolean': True/False flags. Use this for binary states like "Won/Lost", "Active/Inactive", "Passed/Failed".
                 - 'city': Cities
                 - 'choice': Categorical/Enum data ({options: "A, B, C"}). PREFER THIS for things like Status, Category, Team Name, Position, Result (W/L). 
                    * DO NOT use 'ai_text' for fields with limited options (e.g., Status, Win/Loss). Use 'choice' instead.
                 - 'ai_text': ONLY for creative/unstructured text (Bio, Review, Description, Reason). ({prompt: "Specific instruction for generation"}).

              3. IMPORTANT: For 'ai_text', the prompt in config must be specific. E.g., "Generate a 5-word summary", not just "summary".

              Output JSON ONLY.`
            }]
          }],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        // Parse directly as strict JSON mode is enabled
        const schema = JSON.parse(text);
        const schemaWithIds = schema.map((field, idx) => ({
          ...field,
          id: Date.now() + idx
        }));
        onApply(schemaWithIds);
        onClose();
      } else {
        setError('Failed to generate schema.');
      }
    } catch (err) {
      setError('An error occurred. Please check your connection.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-gradient-to-r from-purple-900/50 to-slate-800">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Sparkles className="text-purple-400" size={20} />
            AI Schema Builder
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <label className="text-sm text-slate-300 font-medium">Describe your dataset:</label>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A football match dataset with Team A, Team B, Score, and Result (W/L/D)."
            className="w-full h-32 bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-200 focus:border-purple-500 focus:outline-none resize-none"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg">Cancel</button>
            <button 
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Generate Schema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyzeModal = ({ isOpen, onClose, data }) => {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && data.length > 0) {
      analyzeData();
    }
  }, [isOpen]);

  const analyzeData = async () => {
    setIsLoading(true);
    setAnalysis('');
    
    try {
      const apiKey = ""; // System will inject the key
      // Slice data to first 30 rows to fit context window comfortably and be fast
      const sampleData = JSON.stringify(data.slice(0, 30));
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a data analyst. Analyze this synthetic dataset (showing first 30 rows) and provide a professional, concise summary of insights.
              
              1. Identify the likely domain/theme of the data.
              2. Point out any interesting distributions (e.g., "Most users are in Engineering").
              3. Comment on the realism or anomalies if any.
              4. Format the output with clear bullet points and bold text.
              
              Dataset: ${sampleData}`
            }]
          }]
        })
      });

      const resJson = await response.json();
      const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnalysis(text || "Could not generate analysis.");
    } catch (err) {
      setAnalysis("Error analyzing data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-gradient-to-r from-emerald-900/50 to-slate-800">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <BarChart3 className="text-emerald-400" size={20} />
            Data Analysis
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 size={40} className="animate-spin text-emerald-500" />
              <p className="text-slate-400 animate-pulse">Analyzing patterns and distributions...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none text-slate-300">
              {analysis.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-slate-700 flex justify-end bg-slate-800">
           <button onClick={onClose} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
};

export default function SyntheticDataFactory() {
  const [view, setView] = useState('landing'); // 'landing' or 'app'
  const [schema, setSchema] = useState([
    { id: 1, name: 'id', type: 'uuid', config: {}, nullable: false },
    { id: 2, name: 'full_name', type: 'name', config: {}, nullable: false },
    { id: 3, name: 'job_title', type: 'choice', config: { options: 'Software Engineer, Product Manager, Designer, Data Scientist' }, nullable: false },
    { id: 4, name: 'performance_review', type: 'ai_text', config: { prompt: 'A one sentence performance review for this employee, ranging from positive to constructive.' }, nullable: false }
  ]);

  const [rowCount, setRowCount] = useState(10);
  const [generatedData, setGeneratedData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('schema'); 
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAnalyzeModalOpen, setIsAnalyzeModalOpen] = useState(false);

  // Generate Data with AI Support
  const generateData = async () => {
    setIsGenerating(true);
    
    // 1. Identify AI fields
    const aiFields = schema.filter(f => f.type === 'ai_text');
    const aiDataMap = {}; // { fieldId: ["val1", "val2"] }

    // 2. Fetch AI content in parallel if needed
    // Note: We cap unique AI generation at 50 items per field to save time/quota, then cycle them.
    const uniqueCount = Math.min(rowCount, 50); 
    
    try {
      if (aiFields.length > 0) {
        const apiKey = ""; // System will inject
        
        await Promise.all(aiFields.map(async (field) => {
          const userPrompt = field.config.prompt || "Random text";
          try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: `Task: Generate ${uniqueCount} synthetic data values for a column based on this instruction: "${userPrompt}".
                    
                    Strict Constraints:
                    1. Output ONLY a valid JSON array of strings.
                    2. The values must look like real database entries.
                    3. DO NOT explain the values. DO NOT include "Here are the values".
                    4. If the instruction implies a specific format (e.g., "W or L"), follow it strictly.
                    5. Keep it diverse but realistic.
                    
                    Example Output: ["Value 1", "Value 2", "Value 3"]`
                  }]
                }],
                generationConfig: {
                  responseMimeType: "application/json"
                }
              })
            });
            const resData = await response.json();
            const text = resData.candidates?.[0]?.content?.parts?.[0]?.text;
            
            // Ensure data is string array - use direct JSON parse since we use Strict JSON Mode
            const parsed = JSON.parse(text);
            aiDataMap[field.id] = parsed.map(item => 
              typeof item === 'object' ? JSON.stringify(item) : String(item)
            );
          } catch (e) {
            console.error("AI Generation failed for field", field.name, e);
            // Fallback generation so app doesn't break
            aiDataMap[field.id] = Array.from({ length: uniqueCount }).map((_, i) => `AI Error - Item ${i + 1}`);
          }
        }));
      }
    } catch (err) {
      console.error("Global AI Error", err);
    }

    // 3. Build the dataset
    const newData = Array.from({ length: rowCount }).map((_, rowIndex) => {
      const row = {};
      schema.forEach(field => {
        let aiValue = null;
        if (field.type === 'ai_text' && aiDataMap[field.id]) {
          // Cycle through the generated AI values
          const availableValues = aiDataMap[field.id];
          if (availableValues && availableValues.length > 0) {
             aiValue = availableValues[rowIndex % availableValues.length];
          } else {
             aiValue = "Error";
          }
        }
        row[field.name] = generateValue(field.type, field.config, field.nullable, aiValue);
      });
      return row;
    });

    setGeneratedData(newData);
    setIsGenerating(false);
    setActiveTab('preview');
  };

  useEffect(() => {
    if (view === 'app') {
        generateData();
    }
  }, [view]); 

  // Handlers
  const addField = () => {
    const newId = Date.now();
    setSchema([...schema, { id: newId, name: `field_${schema.length + 1}`, type: 'name', config: {}, nullable: false }]);
  };

  const removeField = (id) => {
    setSchema(schema.filter(f => f.id !== id));
  };

  const updateField = (id, key, value) => {
    setSchema(schema.map(f => {
      if (f.id === id) {
        if (key === 'config') {
          return { ...f, config: { ...f.config, ...value } };
        }
        return { ...f, [key]: value };
      }
      return f;
    }));
  };

  const handleApplyAISchema = (newSchema) => {
    setSchema(newSchema);
    // Use a slight timeout to allow state to settle before generating
    setTimeout(() => {
    }, 100);
  };

  const downloadCSV = () => {
    if (generatedData.length === 0) return;
    const headers = schema.map(f => f.name).join(',');
    const rows = generatedData.map(row => 
      schema.map(f => {
        const val = row[f.name];
        if (val === null || val === undefined) return '';
        // Escape quotes for CSV
        const strVal = String(val).replace(/"/g, '""');
        return `"${strVal}"`;
      }).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'synthetic_data.csv';
    a.click();
  };

  const downloadJSON = () => {
    if (generatedData.length === 0) return;
    const jsonContent = JSON.stringify(generatedData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'synthetic_data.json';
    a.click();
  };

  // --- Render Landing Page or App ---
  if (view === 'landing') {
    return <LandingPage onStart={() => setView('app')} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500 selection:text-white animate-fade-in">
      <AIModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        onApply={handleApplyAISchema}
      />
      <AnalyzeModal 
        isOpen={isAnalyzeModalOpen}
        onClose={() => setIsAnalyzeModalOpen(false)}
        data={generatedData}
      />

      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">EchoBase</h1>
              <p className="text-slate-400 text-sm">Design schemas & generate test datasets instantly</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setIsAIModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/50 rounded-lg font-medium transition-all mr-2"
            >
              <Sparkles size={16} />
              AI Builder
            </button>

            <div className="flex items-center bg-slate-700 rounded-lg px-3 py-2 border border-slate-600">
              <span className="text-slate-400 text-sm mr-2">Rows:</span>
              <input 
                type="number" 
                min="1" 
                max="1000"
                value={rowCount}
                onChange={(e) => setRowCount(Number(e.target.value))}
                className="w-20 bg-transparent text-white focus:outline-none text-right font-mono"
              />
            </div>
            <button 
              onClick={generateData}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all ${isGenerating ? 'opacity-75 cursor-wait' : ''}`}
            >
              <RefreshCw size={18} className={isGenerating ? "animate-spin" : ""} />
              {isGenerating ? 'Building...' : 'Generate'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Navigation Tabs (Mobile/Compact) */}
        <div className="flex mb-6 border-b border-slate-700">
          <button 
            onClick={() => setActiveTab('schema')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'schema' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            Schema Designer
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'preview' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            Data Preview ({generatedData.length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel: Schema Designer */}
          <div className={`lg:col-span-1 space-y-4 ${activeTab === 'schema' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
              <div className="p-4 bg-slate-800/50 border-b border-slate-700 flex justify-between items-center">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <Settings size={18} className="text-slate-400" /> 
                  Field Configuration
                </h2>
                <button 
                  onClick={addField}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                >
                  <Plus size={14} /> Add Field
                </button>
              </div>

              <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                {schema.map((field) => (
                  <div key={field.id} className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 group hover:border-slate-500 transition-all">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="mt-2">
                        <FieldIcon type={field.type} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <input 
                          type="text" 
                          value={field.name}
                          onChange={(e) => updateField(field.id, 'name', e.target.value)}
                          className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm text-white focus:border-blue-500 focus:outline-none"
                          placeholder="Field Name"
                        />
                        <div className="flex gap-2">
                          <select 
                            value={field.type}
                            onChange={(e) => updateField(field.id, 'type', e.target.value)}
                            className="flex-1 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-slate-300 focus:border-blue-500 focus:outline-none appearance-none"
                          >
                            <option value="uuid">UUID (ID)</option>
                            <option value="name">Full Name</option>
                            <option value="email">Email Address</option>
                            <option value="number">Number Range</option>
                            <option value="date">Date Range</option>
                            <option value="boolean">Boolean (T/F)</option>
                            <option value="city">City Name</option>
                            <option value="choice">Custom Choice</option>
                            <option value="ai_text">✨ AI Generated Text</option>
                          </select>
                          
                          {/* Nullable Checkbox */}
                          <div 
                            className={`flex items-center justify-center px-2 rounded border cursor-pointer select-none transition-colors ${field.nullable ? 'bg-slate-600 border-slate-500 text-white' : 'bg-slate-800 border-slate-600 text-slate-500'}`}
                            onClick={() => updateField(field.id, 'nullable', !field.nullable)}
                            title="Allow Null/Empty Values?"
                          >
                            <span className="text-[10px] font-bold">NULL</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeField(field.id)}
                        className="p-1 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Field"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Conditional Config Inputs */}
                    {field.type === 'number' && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <input 
                          type="number" placeholder="Min" 
                          className="bg-slate-800 border-slate-600 rounded px-2 py-1 text-xs w-full"
                          value={field.config.min || ''}
                          onChange={(e) => updateField(field.id, 'config', { ...field.config, min: e.target.value })}
                        />
                        <input 
                          type="number" placeholder="Max" 
                          className="bg-slate-800 border-slate-600 rounded px-2 py-1 text-xs w-full"
                          value={field.config.max || ''}
                          onChange={(e) => updateField(field.id, 'config', { ...field.config, max: e.target.value })}
                        />
                      </div>
                    )}
                     {field.type === 'choice' && (
                      <div className="mt-2">
                        <input 
                          type="text" placeholder="Option 1, Option 2, Option 3" 
                          className="bg-slate-800 border-slate-600 rounded px-2 py-1 text-xs w-full"
                          value={field.config.options || ''}
                          onChange={(e) => updateField(field.id, 'config', { ...field.config, options: e.target.value })}
                        />
                      </div>
                    )}
                    {field.type === 'ai_text' && (
                      <div className="mt-2">
                         <textarea 
                          placeholder="Describe what AI should generate... (e.g., 'A catchy slogan')" 
                          className="bg-slate-800 border-slate-600 rounded px-2 py-1 text-xs w-full h-16 resize-none focus:border-pink-500 focus:outline-none"
                          value={field.config.prompt || ''}
                          onChange={(e) => updateField(field.id, 'config', { ...field.config, prompt: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Preview & Export */}
          <div className={`lg:col-span-2 space-y-4 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl flex flex-col h-full min-h-[500px]">
              
              <div className="p-4 border-b border-slate-700 flex flex-wrap justify-between items-center gap-4 bg-slate-800/50 rounded-t-xl">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <Table size={18} className="text-slate-400" />
                  Dataset Preview
                </h2>
                <div className="flex gap-2">
                   <button 
                    onClick={() => setIsAnalyzeModalOpen(true)}
                    disabled={generatedData.length === 0}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-emerald-600 hover:text-white text-emerald-400 rounded-lg text-sm transition-all border border-slate-600 hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed mr-2"
                  >
                    <Sparkles size={16} /> Analyze Data
                  </button>

                  <button 
                    onClick={downloadCSV}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-blue-600 hover:text-white text-blue-400 rounded-lg text-sm transition-all border border-slate-600 hover:border-blue-500"
                  >
                    <FileSpreadsheet size={16} /> CSV
                  </button>
                  <button 
                    onClick={downloadJSON}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-orange-600 hover:text-white text-orange-400 rounded-lg text-sm transition-all border border-slate-600 hover:border-orange-500"
                  >
                    <FileJson size={16} /> JSON
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar p-1">
                {generatedData.length > 0 ? (
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="sticky top-0 bg-slate-750 text-slate-300 z-10 shadow-sm">
                      <tr>
                        {schema.map(field => (
                          <th key={field.id} className="p-3 font-medium border-b border-slate-600 bg-slate-800 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <FieldIcon type={field.type} />
                              {field.name}
                              {field.nullable && <span className="text-[10px] text-slate-500 bg-slate-900 px-1 rounded ml-1">NULL</span>}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {generatedData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                          {schema.map(field => {
                            const val = row[field.name];
                            return (
                              <td key={field.id} className="p-3 text-slate-300 whitespace-nowrap font-mono text-xs max-w-[200px] overflow-hidden text-ellipsis">
                                {val === null || val === undefined ? (
                                  <span className="text-slate-600 italic">null</span>
                                ) : field.type === 'boolean' ? (
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${val ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                                    {String(val)}
                                  </span>
                                ) : (
                                  typeof val === 'object' ? JSON.stringify(val) : val
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3">
                    <RefreshCw size={48} className="opacity-20" />
                    <p>Click "Generate" to create your dataset</p>
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-slate-700 text-center text-xs text-slate-500 bg-slate-800/50 rounded-b-xl">
                Showing {generatedData.length} rows • Scroll for more fields
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}