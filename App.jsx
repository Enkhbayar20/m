import { useState } from 'react';
import './App.css';

function App() {
  
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    year: 'Freshmen',
    major: 'IM',
    // 0-3 scale questions
    q1: '1', // Enjoying activities
    q2: '1', // Sleep well
    q3: '1', // Energy
    q4: '1', // Appetite
    q5: '1', // Focus
    q6: '1', // Calm
    q7: '1', // Manage worries
    q8: '1', // Chill time
    q9: '1', // Handle frustrations
    q10: '1', // Future comfort
    q11: '1', // Daily responsibilities
    q12: '1', // Emotional effectiveness
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 2. Өгөгдөл өөрчлөх
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. Тооцоолох товч
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    
    setTimeout(() => {
      analyzeDetailedHealth();
      setLoading(false);
    }, 1500);
  };

  
  const analyzeDetailedHealth = () => {
    // Асуултуудын хариултыг тоонд шилжүүлэх
    const scores = [
      parseInt(formData.q1), parseInt(formData.q2), parseInt(formData.q3),
      parseInt(formData.q4), parseInt(formData.q5), parseInt(formData.q6),
      parseInt(formData.q7), parseInt(formData.q8), parseInt(formData.q9),
      parseInt(formData.q10), parseInt(formData.q11), parseInt(formData.q12)
    ];

    // Нийт оноог бодох (Max: 12 * 3 = 36)
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const maxScore = 36;
    
    // 100% руу хөрвүүлэх
    const wellnessPercentage = Math.round((totalScore / maxScore) * 100);

    let mainStatus = "";
    let colorClass = "";
    let adviceList = [];

    // --- Үнэлгээний Логик ---
    if (wellnessPercentage >= 75) {
      mainStatus = "Excellent / Thriving";
      colorClass = "success";
      adviceList.push("🌟 You are doing amazing! Your mental resilience is very high.");
      adviceList.push("✅ Keep up your current routine and continue balancing your studies and personal life.");
    } else if (wellnessPercentage >= 50) {
      mainStatus = "Good / Stable";
      colorClass = "warning"; // Yellow/Orange
      adviceList.push("⚖️ You are doing okay, but there is room for improvement.");
      adviceList.push("💡 Try to focus on the specific areas where you scored '0' or '1'.");
      if (parseInt(formData.q2) < 2) adviceList.push("😴 Prioritize your sleep pattern to boost your energy levels.");
      if (parseInt(formData.q5) < 2) adviceList.push("🎯 Consider time-management techniques like Pomodoro to improve focus.");
    } else {
      mainStatus = "Needs Attention / At Risk";
      colorClass = "danger";
      adviceList.push("🚨 Your scores indicate you might be struggling with stress or burnout.");
      adviceList.push("🗣️ Don't hesitate to reach out to student counseling services or a trusted friend.");
      adviceList.push("🛑 Take a break. Your mental health is more important than grades.");
    }

    setResult({ 
      age: formData.age,
      major: formData.major,
      score: wellnessPercentage, 
      status: mainStatus, 
      advice: adviceList, 
      colorClass 
    });
  };

  // Асуултуудын жагсаалт (Код бичихэд хялбар болгох үүднээс массив ашиглав)
  const questions = [
    { id: 'q1', text: "Are you enjoying your usual activities and interests?" },
    { id: 'q2', text: "Do you sleep well and wake up feeling rested?" },
    { id: 'q3', text: "Do you have enough energy to get through the day?" },
    { id: 'q4', text: "Do you eat regularly and maintain a balanced appetite?" },
    { id: 'q5', text: "Are you able to stay focused on your tasks or studies?" },
    { id: 'q6', text: "Do you usually feel calm and relaxed?" },
    { id: 'q7', text: "Do you manage your worries effectively?" },
    { id: 'q8', text: "Do you take time to chill and relax after school or work?" },
    { id: 'q9', text: "Do you handle small problems or frustrations well?" },
    { id: 'q10', text: "Do you feel comfortable about what lies ahead?" },
    { id: 'q11', text: "Do you handle your daily responsibilities well?" },
    { id: 'q12', text: "Are your emotions allowing you to work, study, or interact with others effectively?" },
  ];

  return (
    <div className="app-container">
      <div className="card">
        <header>
          <h1>🎓  Mental Health Predictor  </h1>
          
        </header>

        <div className="content">
          {/* --- LEFT SIDE: FORM --- */}
          <form onSubmit={handleSubmit} className="predictor-form">
            
            {/* Section: Demographics */}
            <h5 className="section-title">Demographics</h5>
            <div className="row-group">
              <div className="form-group half">
                <label>Age</label>
                <input type="number" name="age" placeholder="Age" required onChange={handleChange} />
              </div>
              <div className="form-group half">
                <label>Gender</label>
                <select name="gender" onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="row-group">
              <div className="form-group half">
                <label>Year of Study</label>
                <select name="year" onChange={handleChange}>
                  <option value="Freshmen">Freshmen</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <div className="form-group half">
                <label>Major</label>
                <select name="major" onChange={handleChange}>
                  <option value="IM">IM</option>
                  <option value="BA">BA</option>
                  <option value="IR">IR</option>
                  <option value="MC">MC</option>
                  <option value="CS">CS</option>
                  <option value="ME">ME</option>
                  <option value="EE">EE</option>
                  <option value="FD">FD</option>
                  <option value="LEI">LEI</option>
                </select>
              </div>
            </div>

            {/* Section: Well-being Questions */}
            <h5 className="section-title">Well-being Assessment</h5>
            <p className="instruction-text">Scale: 0 (Never) - 3 (Always)</p>
            
            <div className="questions-grid">
              {questions.map((q) => (
                <div key={q.id} className="form-group question-box">
                  <label>{q.text}</label>
                  <select name={q.id} onChange={handleChange} className="score-select">
                    <option value="0">0 — Never</option>
                    <option value="1">1 — Sometimes</option>
                    <option value="2">2 — Often</option>
                    <option value="3">3 — Always</option>
                  </select>
                </div>
              ))}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Analyzing...' : 'Submit Assessment'}
            </button>
          </form>

          {/* --- RIGHT SIDE: RESULT --- */}
          <div className="result-section">
            {loading && (
              <div className="loader-box">
                <div className="spinner"></div>
                <p>Calculating wellness score...</p>
              </div>
            )}

            {!loading && result && (
              <div className={`result-card ${result.colorClass} fade-in`}>
                <div className="score-badge">Score: {result.score}%</div>
                
                <h3>Assessment Result</h3>
                <p style={{fontSize: '0.9rem', color: '#666'}}>
                  {result.age} years old | {result.major} Major
                </p>
                
                <h4 className="status-text">{result.status}</h4>
                
                <div className="advice-container">
                  <h5>💡 Feedback:</h5>
                  <ul className="advice-list">
                    {result.advice.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <button className="reset-btn" onClick={() => setResult(null)}>New Assessment</button>
              </div>
            )}

            {!loading && !result && (
              <div className="placeholder-text">
                <p>Please answer all questions honestly to get an accurate assessment of your current mental well-being.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;