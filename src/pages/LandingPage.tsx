import { Link } from "react-router-dom";
import { Code2, Users, Zap, Github, ArrowRight, Sparkles, Terminal, Globe } from "lucide-react";
import { useState, useEffect } from "react";

export function LandingPage() {
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = `function collaborate() {\n  console.log('Code together!');\n}`;

  // Typing animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <header className="w-full border-b border-slate-800/50 backdrop-blur-sm bg-slate-950/80 sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xl font-bold shadow-lg group-hover:shadow-cyan-500/50 transition-shadow">
              D
            </span>
            <span className="text-lg font-semibold tracking-tight">DevCollab</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors smooth-scroll">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors smooth-scroll">
              How it works
            </a>
            <a href="#tech" className="hover:text-emerald-400 transition-colors smooth-scroll">
              Tech Stack
            </a>
            <Link
              to="/app"
              className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105"
            >
              Launch App
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Link
            to="/app"
            className="md:hidden rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-1.5 text-sm font-medium text-slate-950"
          >
            Launch
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,1fr] items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Real-time collaboration made simple
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Code together,
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  in real time
                </span>
              </h1>
              
              <p className="text-slate-400 text-lg sm:text-xl max-w-xl leading-relaxed">
                DevCollab is a collaborative code editor built for pair programming, mentoring, and team coding sessions. 
                No setup, no accounts—just share a link and start coding.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/app"
                  className="group rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 hover:shadow-xl hover:shadow-emerald-500/50 transition-all hover:scale-105 flex items-center gap-2"
                >
                  Start Coding Together
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <a
                  href="https://github.com/chriscod3/code-collab"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-slate-700 px-6 py-3 text-base font-medium text-slate-200 hover:border-emerald-400 hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  No signup required
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Instant sharing
                </div>
              </div>
            </div>

            {/* Interactive Preview Card */}
            <div className="relative group animate-slide-in">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              
              <div className="relative rounded-xl border border-slate-800 bg-slate-900/90 backdrop-blur-sm shadow-2xl overflow-hidden">
                {/* Window Chrome */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Users className="w-3 h-3" />
                      <span>2 users</span>
                    </div>
                  </div>
                </div>

                {/* Code Editor Mockup */}
                <div className="p-4 bg-slate-900">
                  <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                    <Terminal className="w-3 h-3" />
                    <span>main.js</span>
                  </div>
                  
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm">
                    <pre className="text-slate-300">
                      <code>
                        {typedText}
                        <span className={`inline-block w-2 h-5 bg-emerald-400 ml-0.5 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
                      </code>
                    </pre>
                  </div>

                  {/* Collaborative Cursors */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-medium text-[10px]">
                        JD
                      </div>
                      <span className="text-slate-400">John editing...</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium text-[10px]">
                        SK
                      </div>
                      <span className="text-slate-400">Sarah viewing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything you need to code <span className="text-emerald-400">together</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Built for developers who want to collaborate without friction
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Real-time collaboration",
                  description: "See changes instantly as your team codes together. Perfect for pair programming and code reviews.",
                  color: "from-emerald-500 to-cyan-500"
                },
                {
                  icon: <Code2 className="w-6 h-6" />,
                  title: "Monaco editor powered",
                  description: "Professional editing experience with syntax highlighting, IntelliSense, and keyboard shortcuts.",
                  color: "from-cyan-500 to-blue-500"
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Instant sharing",
                  description: "Create a room in seconds, share the link, and start coding. No signups or installations required.",
                  color: "from-blue-500 to-purple-500"
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Multi-language support",
                  description: "Write in JavaScript, TypeScript, Python, Java, C++, and more. Switch languages on the fly.",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: <Terminal className="w-6 h-6" />,
                  title: "Integrated chat",
                  description: "Communicate with your team without leaving the editor. Discuss code, share ideas, and collaborate.",
                  color: "from-pink-500 to-red-500"
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Clean & modern UI",
                  description: "Beautiful dark theme optimized for long coding sessions. Distraction-free interface that just works.",
                  color: "from-emerald-500 to-teal-500"
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 hover:bg-slate-900/80 transition-all hover:scale-105 hover:shadow-xl"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl transition-shadow`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-100">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="border-t border-slate-800/50">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Start collaborating in <span className="text-cyan-400">3 simple steps</span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Create a room",
                  description: "Click 'Launch App' and create a new coding session. Get a unique room code instantly."
                },
                {
                  step: "02",
                  title: "Share the link",
                  description: "Send the room code or link to your teammates. They can join with a single click."
                },
                {
                  step: "03",
                  title: "Code together",
                  description: "Start writing code together in real-time. See cursors, edits, and chat with your team."
                }
              ].map((step, i) => (
                <div key={i} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xl mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-slate-100">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 hover:shadow-xl hover:shadow-emerald-500/50 transition-all hover:scale-105"
              >
                Try it now - No signup needed
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="border-t border-slate-800/50 bg-slate-950/50">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Built with modern <span className="text-purple-400">technology</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Powered by a cutting-edge stack for performance and reliability
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              {[
                "React + TypeScript",
                "Vite for blazing fast builds",
                "Tailwind CSS + ShadCN UI",
                "Monaco Editor (VS Code)",
                "Supabase real-time database",
                "React Router for navigation"
              ].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-slate-300">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-slate-800/50">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-sm p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-purple-500/5" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to start coding together?
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                  Join developers already using DevCollab for pair programming, mentoring, and team collaboration.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/app"
                    className="rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 hover:shadow-xl hover:shadow-emerald-500/50 transition-all hover:scale-105"
                  >
                    Launch DevCollab
                  </Link>
                  
                  <a
                    href="https://github.com/chriscod3/code-collab"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-slate-700 px-8 py-4 text-lg font-medium text-slate-200 hover:border-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Star on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/50 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-slate-950">
                D
              </span>
              <span>© {new Date().getFullYear()} DevCollab · Built by Chris A</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/chriscod3/code-collab"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <Link to="/app" className="hover:text-emerald-400 transition-colors">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}