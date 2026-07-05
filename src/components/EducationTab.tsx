import React, { useState } from "react";
import { educationLevelsDb } from "../data/medicalEducation";
import { 
  BookOpen, 
  HelpCircle, 
  Layers, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  RefreshCw, 
  Sparkles,
  BookmarkCheck,
  Flame,
  User,
  Medal,
  Clock,
  Heart
} from "lucide-react";
import { PersonalInfo } from "../types";

interface EducationTabProps {
  personalInfo: PersonalInfo;
}

export default function EducationTab({ personalInfo }: EducationTabProps) {
  const [selectedLevelId, setSelectedLevelId] = useState("mbbs-year1");
  const [selectedSubjectName, setSelectedSubjectName] = useState("Anatomy");
  
  // Interactive Flashcard state
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  
  // Interactive Quiz state
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Clinical Case study interactive quiz state
  const [caseAnswers, setCaseAnswers] = useState<{ [caseId: string]: { [qIdx: number]: number } }>({});
  const [caseSubmitted, setCaseSubmitted] = useState<{ [caseId: string]: boolean }>({});

  // Active sub-tab under Education
  const [activeSubTab, setActiveSubTab] = useState<"lessons" | "flashcards" | "quizzes" | "cases" | "certificate">("lessons");

  const activeLevel = educationLevelsDb.find(l => l.id === selectedLevelId) || educationLevelsDb[1]; // default MBBS Year 1
  const activeSubject = activeLevel.subjects[selectedSubjectName] || Object.values(activeLevel.subjects)[0];

  const handleFlipCard = (cardId: string) => {
    setFlippedCardId(flippedCardId === cardId ? null : cardId);
  };

  const handleSelectQuizOption = (qId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers({ ...userAnswers, [qId]: optionIdx });
  };

  const handleSubmitQuiz = () => {
    if (quizSubmitted) return;
    let score = 0;
    activeSubject.mcqs.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // Case study interactive answers
  const handleSelectCaseOption = (caseId: string, qIdx: number, optionIdx: number) => {
    if (caseSubmitted[caseId]) return;
    const currentCaseAnswers = caseAnswers[caseId] || {};
    setCaseAnswers({
      ...caseAnswers,
      [caseId]: { ...currentCaseAnswers, [qIdx]: optionIdx }
    });
  };

  const handleSubmitCase = (caseId: string) => {
    setCaseSubmitted({ ...caseSubmitted, [caseId]: true });
  };

  const handleResetCase = (caseId: string) => {
    setCaseAnswers({ ...caseAnswers, [caseId]: {} });
    setCaseSubmitted({ ...caseSubmitted, [caseId]: false });
  };

  // Mock certificate completion checker
  const canUnlockCertificate = quizSubmitted && (quizScore === activeSubject.mcqs.length);

  return (
    <div className="space-y-6">
      {/* Subject and Level Selectors */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Academic Track:</span>
          {educationLevelsDb.map((level) => (
            <button
              key={level.id}
              onClick={() => {
                setSelectedLevelId(level.id);
                const subKeys = Object.keys(level.subjects);
                if (subKeys.length > 0) {
                  setSelectedSubjectName(subKeys[0]);
                }
                setActiveSubTab("lessons");
                handleResetQuiz();
              }}
              className={`text-[11px] px-3 py-1.5 rounded-xl transition-all border font-semibold ${
                selectedLevelId === level.id
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-slate-900/40 text-slate-400 border-transparent hover:text-slate-200"
              }`}
            >
              {level.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Active Subject:</span>
          <select
            value={selectedSubjectName}
            onChange={(e) => {
              setSelectedSubjectName(e.target.value);
              handleResetQuiz();
            }}
            className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-emerald-500"
          >
            {Object.keys(activeLevel.subjects).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Navigation panel for sections */}
        <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-2 font-mono">Module Syllabus</span>
          
          <button
            onClick={() => setActiveSubTab("lessons")}
            className={`flex items-center justify-between text-xs font-semibold p-3 rounded-xl transition-all border ${
              activeSubTab === "lessons"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4" />
              <span>Animated Lessons</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">
              {activeSubject?.lessons?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("flashcards")}
            className={`flex items-center justify-between text-xs font-semibold p-3 rounded-xl transition-all border ${
              activeSubTab === "flashcards"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>Interactive Flashcards</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">
              {activeSubject?.flashcards?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("quizzes")}
            className={`flex items-center justify-between text-xs font-semibold p-3 rounded-xl transition-all border ${
              activeSubTab === "quizzes"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4" />
              <span>Interactive Quizzes</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">
              {activeSubject?.mcqs?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("cases")}
            className={`flex items-center justify-between text-xs font-semibold p-3 rounded-xl transition-all border ${
              activeSubTab === "cases"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookmarkCheck className="w-4 h-4" />
              <span>Clinical Case Studies</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">
              {activeSubject?.cases?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("certificate")}
            className={`flex items-center justify-between text-xs font-semibold p-3 rounded-xl transition-all border ${
              activeSubTab === "certificate"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                : "bg-transparent text-slate-400 hover:text-slate-200 border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4" />
              <span>Academic Certificates</span>
            </div>
            {canUnlockCertificate ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ) : null}
          </button>

          {/* Daily streak metrics */}
          <div className="border-t border-white/5 mt-6 pt-4 space-y-3 px-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-white">Daily Streak: 3 Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span className="text-xs text-slate-400">Time Logged: 1.2 hrs</span>
            </div>
          </div>
        </div>

        {/* Dynamic Display Area based on sub-tab */}
        <div className="lg:col-span-9 bg-slate-900/60 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          
          {/* Sub-tab: LESSONS */}
          {activeSubTab === "lessons" && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase font-mono">{selectedSubjectName} Lesson Plans</span>
                <h3 className="text-lg font-bold text-white mt-1">Core Clinical Curriculum</h3>
              </div>

              {activeSubject?.lessons?.map((lesson) => (
                <div key={lesson.id} className="bg-white/5 border border-white/5 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400 text-xs font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">Lesson</span>
                    {lesson.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">{lesson.content}</p>

                  {/* Schema / Interactive Diagram Placeholder */}
                  {lesson.diagramDescription && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span>Anatomical Diagram Schematic</span>
                        <span className="text-emerald-400">● Live Preview Active</span>
                      </div>
                      <div className="h-28 bg-emerald-950/10 rounded border border-emerald-500/10 flex items-center justify-center p-3">
                        <span className="text-2xl mr-3">🫀</span>
                        <p className="text-xs text-slate-400 italic text-center max-w-sm">
                          {lesson.diagramDescription}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {(!activeSubject?.lessons || activeSubject.lessons.length === 0) && (
                <div className="text-center py-12 text-slate-500 italic text-xs">No lessons entered for this module yet. Select another level.</div>
              )}
            </div>
          )}

          {/* Sub-tab: FLASHCARDS */}
          {activeSubTab === "flashcards" && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase font-mono">Memory Recall Flashcards</span>
                <h3 className="text-lg font-bold text-white mt-1">Somatic Recall</h3>
                <p className="text-xs text-slate-400 mt-1">Flip card to reveal clinical definitions, pathological reasons, and medical terms.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeSubject?.flashcards?.map((card) => {
                  const isFlipped = flippedCardId === card.id;
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleFlipCard(card.id)}
                      className="cursor-pointer h-44 group perspective"
                    >
                      <div className={`relative w-full h-full duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
                        {/* Front Side */}
                        <div className="absolute inset-0 backface-hidden bg-slate-950 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">SUBJECT: {card.subject}</span>
                          <p className="text-sm font-semibold text-white text-center py-4">{card.front}</p>
                          <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider text-right">Click to flip ↺</div>
                        </div>

                        {/* Back Side */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 border border-emerald-500/20 rounded-2xl p-5 flex flex-col justify-between">
                          <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold font-mono">DEFINITION / EXPLANATION</span>
                          <p className="text-xs text-slate-300 leading-normal text-center py-2">{card.back}</p>
                          <div className="text-[10px] text-slate-500 font-mono text-left">Tap to return</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {(!activeSubject?.flashcards || activeSubject.flashcards.length === 0) && (
                <div className="text-center py-12 text-slate-500 italic text-xs">No flashcards entered for this module yet. Select another level.</div>
              )}
            </div>
          )}

          {/* Sub-tab: QUIZZES */}
          {activeSubTab === "quizzes" && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase font-mono">Interactive Multiple Choice Questions</span>
                  <h3 className="text-lg font-bold text-white mt-1">Continuous Competency Assessment</h3>
                </div>
                {quizSubmitted && (
                  <span className="text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                    Score: {quizScore} / {activeSubject?.mcqs?.length}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {activeSubject?.mcqs?.map((q, qIdx) => {
                  const isSelected = userAnswers[q.id] !== undefined;
                  const chosenAnswer = userAnswers[q.id];
                  return (
                    <div key={q.id} className="bg-white/5 border border-white/5 rounded-xl p-5 space-y-4">
                      <div className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-mono text-sm font-bold">Q{qIdx+1}.</span>
                        <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((option, idx) => {
                          let optionClass = "bg-slate-900/40 text-slate-300 border-white/5 hover:bg-white/5";
                          
                          if (isSelected && chosenAnswer === idx) {
                            optionClass = "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
                          }
                          
                          if (quizSubmitted) {
                            if (idx === q.correctAnswer) {
                              optionClass = "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-semibold";
                            } else if (chosenAnswer === idx && chosenAnswer !== q.correctAnswer) {
                              optionClass = "bg-red-500/20 text-red-400 border-red-500/40";
                            } else {
                              optionClass = "bg-slate-900/40 text-slate-500 border-transparent opacity-60";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectQuizOption(q.id, idx)}
                              disabled={quizSubmitted}
                              className={`text-left text-xs p-3 rounded-xl border transition-all ${optionClass}`}
                            >
                              <span className="font-mono text-[10px] text-slate-500 mr-2 uppercase">{String.fromCharCode(97 + idx)})</span>
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="bg-slate-950 p-3.5 rounded-lg border border-white/5">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono block mb-1">Diagnostic Review</span>
                          <p className="text-xs text-slate-400 leading-normal">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {activeSubject?.mcqs?.length > 0 ? (
                <div className="flex gap-2.5 justify-end mt-4">
                  {quizSubmitted ? (
                    <button
                      onClick={handleResetQuiz}
                      className="bg-white/5 hover:bg-white/10 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors border border-white/5 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Re-take Quiz
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(userAnswers).length < activeSubject.mcqs.length}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-md disabled:opacity-50"
                    >
                      Submit Competency Answers
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 italic text-xs">No quiz questions entered for this module yet. Select another level.</div>
              )}
            </div>
          )}

          {/* Sub-tab: CLINICAL CASE STUDIES */}
          {activeSubTab === "cases" && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase font-mono">Patient Clinical Cases</span>
                <h3 className="text-lg font-bold text-white mt-1">Interactive Diagnostic Rounds</h3>
                <p className="text-xs text-slate-400 mt-1">Review subjective histories, objective exams, and vitals to make optimal differential judgements.</p>
              </div>

              <div className="space-y-6">
                {activeSubject?.cases?.map((cCase) => {
                  const isSubmitted = caseSubmitted[cCase.id];
                  const answers = caseAnswers[cCase.id] || {};
                  return (
                    <div key={cCase.id} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <span className="text-amber-400 text-[10px] uppercase font-mono font-bold bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">Case Round</span>
                        {cCase.title}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">Clinical Presentation</span>
                          <p className="text-xs text-slate-300 leading-relaxed italic">{cCase.presentation}</p>
                          <div className="border-t border-white/5 mt-3 pt-3">
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">Physical Exam findings</span>
                            <p className="text-xs text-slate-400 leading-normal mt-1">{cCase.physicalExam}</p>
                          </div>
                        </div>

                        {/* Patient vitals */}
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-3">
                          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold font-mono">Vitals Monitor</span>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-slate-950 p-2 rounded border border-white/5">
                              <span className="text-[10px] text-slate-500 block">TEMP</span>
                              <span className="font-bold font-mono text-white">{cCase.vitals.temp}</span>
                            </div>
                            <div className="bg-slate-950 p-2 rounded border border-white/5">
                              <span className="text-[10px] text-slate-500 block">BP</span>
                              <span className="font-bold font-mono text-white">{cCase.vitals.bp}</span>
                            </div>
                            <div className="bg-slate-950 p-2 rounded border border-white/5">
                              <span className="text-[10px] text-slate-500 block">HR</span>
                              <span className="font-bold font-mono text-white">{cCase.vitals.hr}</span>
                            </div>
                            <div className="bg-slate-950 p-2 rounded border border-white/5">
                              <span className="text-[10px] text-slate-500 block">RR</span>
                              <span className="font-bold font-mono text-white">{cCase.vitals.rr}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Question inside Case Study */}
                      <div className="space-y-4 pt-2">
                        {cCase.questions.map((q, qIdx) => {
                          const chosenOpt = answers[qIdx];
                          const answered = chosenOpt !== undefined;
                          return (
                            <div key={qIdx} className="space-y-2">
                              <span className="text-xs font-bold text-white block">Question: {q.question}</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {q.options.map((opt, optIdx) => {
                                  let btnClass = "bg-slate-900/40 text-slate-300 border-white/5 hover:bg-white/5";
                                  
                                  if (answered && chosenOpt === optIdx) {
                                    btnClass = "bg-amber-500/10 text-amber-300 border-amber-500/30";
                                  }

                                  if (isSubmitted) {
                                    if (optIdx === q.correctAnswer) {
                                      btnClass = "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-semibold";
                                    } else if (chosenOpt === optIdx && chosenOpt !== q.correctAnswer) {
                                      btnClass = "bg-red-500/20 text-red-400 border-red-500/40";
                                    } else {
                                      btnClass = "bg-slate-900/40 text-slate-500 border-transparent opacity-60";
                                    }
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleSelectCaseOption(cCase.id, qIdx, optIdx)}
                                      disabled={isSubmitted}
                                      className={`text-left text-xs p-3 rounded-xl border transition-all ${btnClass}`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {isSubmitted && (
                                <div className="bg-slate-950 p-3 rounded border border-white/5 text-xs text-slate-400 mt-2">
                                  <span className="font-semibold text-emerald-400 block mb-0.5">Explanation:</span>
                                  {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex justify-end gap-2.5 pt-2">
                        {isSubmitted ? (
                          <button
                            onClick={() => handleResetCase(cCase.id)}
                            className="text-xs font-semibold text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/10"
                          >
                            Reset Round
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSubmitCase(cCase.id)}
                            disabled={Object.keys(answers).length < cCase.questions.length}
                            className="text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 px-3 py-1.5 rounded-lg transition-colors shadow disabled:opacity-50"
                          >
                            Submit Clinical Judgement
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {(!activeSubject?.cases || activeSubject.cases.length === 0) && (
                  <div className="text-center py-12 text-slate-500 italic text-xs">No clinical rounds registered for this module yet. Select MBBS Year 1.</div>
                )}
              </div>
            </div>
          )}

          {/* Sub-tab: CERTIFICATE */}
          {activeSubTab === "certificate" && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              {canUnlockCertificate ? (
                <div className="bg-slate-950 border-2 border-emerald-500/30 rounded-2xl p-8 max-w-xl shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
                  
                  <div className="flex flex-col items-center">
                    <Award className="w-16 h-16 text-yellow-400 animate-bounce mb-3" />
                    <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase font-mono">HEALTHVERSE ACADEMY OF MEDICINE</span>
                    <h3 className="text-xl font-bold text-white mt-1">Certificate of Competency</h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                    This document certifies that the user has completed 100% of the interactive clinical MCQ quizzes for the topic of <span className="text-white font-bold">{selectedSubjectName}</span> within the <span className="text-emerald-300 font-bold">{activeLevel.name}</span> educational module with flawless metrics.
                  </p>

                  <div className="border-t border-b border-white/5 py-4 space-y-1">
                    <span className="text-[10px] uppercase text-slate-500 font-mono block">RECIPIENT ACADEMIC ID</span>
                    <span className="text-xs font-mono font-bold text-white uppercase">{personalInfo.name || "Anonymous Learner"}</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 px-4">
                    <span>Date: {new Date().toLocaleDateString()}</span>
                    <span>Verification ID: #HV-EDU-88392</span>
                  </div>
                </div>
              ) : (
                <div className="max-w-md space-y-4">
                  <Award className="w-16 h-16 text-slate-700 mx-auto" />
                  <h3 className="text-base font-bold text-white">Academic Certificates Locked</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    To claim your verified HealthVerse Academy of Medicine competency certificate, you must review the animated lessons and pass the **{selectedSubjectName} Interactive Quiz** on this topic with a perfect 100% score.
                  </p>
                  <button
                    onClick={() => setActiveSubTab("quizzes")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md inline-flex items-center gap-1.5"
                  >
                    Take Topic Quiz <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
