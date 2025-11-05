import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRoleSelect = (role) => {
    if (role === 'Get Started' || role === 'Patient' || role === 'Dietitian') {
      window.location.href = '/get-started';
    } else if (role === 'Learn More') {
      // Scroll to the history section
      document.querySelector('#history-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgAnimation}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.bgCircle,
              left: `${20 * i}%`,
              animationDelay: `${i * 3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🌿</span>
            <span>AyurEssence</span>
          </div>
          <div style={styles.navButtons}>
            <button 
              onClick={() => window.location.href = '/login'}
              style={styles.navButton}
            >
              Login
            </button>
            <button 
              onClick={() => handleRoleSelect('Get Started')}
              style={styles.navButtonPrimary}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>Ancient Wisdom for Modern Wellness</h1>
            <p style={styles.heroSubtitle}>
              Discover the 5000-year-old science of Ayurveda and transform your health through personalized diet management by our expert dietitians.
            </p>
            <div style={styles.heroButtons}>
              <button 
                onClick={() => handleRoleSelect('Get Started')}
                style={styles.primaryButton}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Get Started
              </button>
              <button 
                onClick={() => handleRoleSelect('Learn More')}
                style={styles.secondaryButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(31, 122, 140, 0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Learn More
              </button>
            </div>
          </div>
          <div style={styles.heroImage}>
            🕉️
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history-section" style={styles.section}>
        <h2 style={styles.sectionTitle}>The Journey Through Time</h2>
        <p style={styles.sectionSubtitle}>
          Ayurveda, meaning "Science of Life," has been healing humanity for over 5000 years, originating in the ancient Vedic civilization of India.
        </p>
        
        <div style={styles.historyGrid}>
          {[
            {
              icon: "📜",
              title: "Ancient Origins",
              desc: "Dating back to 3000 BCE, Ayurveda was passed down through oral tradition by enlightened sages and later documented in sacred texts called the Vedas. The Charaka Samhita and Sushruta Samhita remain foundational texts even today."
            },
            {
              icon: "🧠",
              title: "Holistic Science",
              desc: "Unlike conventional medicine, Ayurveda treats the whole person—body, mind, and spirit. It recognizes that true health is a delicate balance between our physical constitution, mental state, and spiritual wellbeing."
            },
            {
              icon: "🌍",
              title: "Global Renaissance",
              desc: "After centuries of practice in India, Ayurveda is experiencing a worldwide revival. Modern research validates ancient wisdom, with millions embracing this natural approach to health and wellness."
            }
          ].map((item, i) => (
            <HistoryCard key={i} item={item} />
          ))}
        </div>
      </section>

      {/* Doshas Section */}
      <section style={styles.doshaSection}>
        <h2 style={styles.sectionTitle}>The Three Doshas</h2>
        <p style={styles.sectionSubtitle}>
          Ayurveda identifies three fundamental energies that govern our physiology and personality—Vata, Pitta, and Kapha.
        </p>
        
        <div style={styles.doshaGrid}>
          {[
            {
              icon: "",
              name: "Vata",
              element: "Air + Space",
              desc: "Governs movement, creativity, and flexibility. Vata types are energetic, creative, and quick-thinking but can be prone to anxiety when imbalanced."
            },
            {
              icon: "",
              name: "Pitta",
              element: "Fire + Water",
              desc: "Controls metabolism, digestion, and transformation. Pitta individuals are intelligent, focused, and goal-oriented but may experience anger or inflammation when out of balance."
            },
            {
              icon: "",
              name: "Kapha",
              element: "Water + Earth",
              desc: "Provides structure, stability, and lubrication. Kapha types are calm, grounded, and nurturing but can become sluggish or gain weight when imbalanced."
            }
          ].map((dosha, i) => (
            <DoshaCard key={i} dosha={dosha} />
          ))}
        </div>
      </section>

      {/* Components Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Ayurvedic Food Components</h2>
        <p style={styles.sectionSubtitle}>
          Understanding the six tastes and their effects on our doshas is fundamental to Ayurvedic nutrition.
        </p>
        
        <div style={styles.componentGrid}>
          {[
            { name: "Sweet (Madhura)", effect: "Builds tissue, calms Vata & Pitta", examples: "Rice, milk, dates" },
            { name: "Sour (Amla)", effect: "Stimulates digestion, increases Pitta", examples: "Yogurt, lemon, tamarind" },
            { name: "Salty (Lavana)", effect: "Enhances taste, retains water", examples: "Sea salt, seaweed" },
            { name: "Pungent (Katu)", effect: "Increases metabolism, reduces Kapha", examples: "Ginger, pepper, chili" },
            { name: "Bitter (Tikta)", effect: "Detoxifies, reduces Pitta & Kapha", examples: "Turmeric, neem, greens" },
            { name: "Astringent (Kashaya)", effect: "Tones tissues, balances Kapha", examples: "Beans, pomegranate, tea" }
          ].map((component, i) => (
            <ComponentItem key={i} component={component} />
          ))}
        </div>
      </section>

      {/* Future Section */}
      <section style={styles.futureSection}>
        <h2 style={styles.sectionTitle}>Ayurveda for the New Generation</h2>
        <p style={styles.sectionSubtitle}>
          In our fast-paced modern world, Ayurveda offers timeless solutions to contemporary health challenges.
        </p>
        
        <div style={styles.futureContent}>
          <div style={styles.benefitsGrid}>
            {[
              {
                icon: "",
                title: "Preventive Healthcare",
                desc: "Ayurveda emphasizes prevention over cure, teaching us to maintain balance before disease manifests—crucial for today's stress-filled lifestyle."
              },
              {
                icon: "",
                title: "Personalized Nutrition",
                desc: "No one-size-fits-all diets. Ayurveda recognizes individual constitution and recommends foods that work specifically for your body type."
              },
              {
                icon: "",
                title: "Mental Wellness",
                desc: "Beyond physical health, Ayurveda addresses anxiety, depression, and stress through diet, herbs, and lifestyle practices—essential for mental health."
              },
              {
                icon: "",
                title: "Sustainable Living",
                desc: "Ayurveda promotes harmony with nature, seasonal eating, and sustainable practices—aligning perfectly with environmental consciousness."
              }
            ].map((benefit, i) => (
              <BenefitItem key={i} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section style={styles.roleSection}>
        <h2 style={styles.sectionTitle}>Begin Your Journey</h2>
        <p style={styles.roleSectionSubtitle}>
          Choose your path to personalized Ayurvedic wellness
        </p>
        
        <div style={styles.roleButtons}>
          {['Patient', 'Dietitian'].map((role, i) => (
            <RoleButton key={i} role={role} onClick={() => handleRoleSelect(role)} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <div style={styles.footerLogo}>
              <span style={styles.logoIcon}></span>
              <span style={styles.footerLogoText}>AyurEssence</span>
            </div>
            <p style={styles.footerDesc}>
              Bringing ancient wisdom to modern wellness through personalized Ayurvedic diet management.
            </p>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerHeading}>Quick Links</h3>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>About Us</li>
              <li style={styles.footerListItem}>Services</li>
              <li style={styles.footerListItem}>Consultation</li>
              <li style={styles.footerListItem}>Resources</li>
            </ul>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerHeading}>Support</h3>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>Help Center</li>
              <li style={styles.footerListItem}>Contact Us</li>
              <li style={styles.footerListItem}>Privacy Policy</li>
              <li style={styles.footerListItem}>Terms of Service</li>
            </ul>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerHeading}>Connect</h3>
            <ul style={styles.footerList}>
              <li style={styles.footerListItem}>Newsletter</li>
              <li style={styles.footerListItem}>Community</li>
              <li style={styles.footerListItem}>Blog</li>
              <li style={styles.footerListItem}>Events</li>
            </ul>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>© 2025 AyurEssence. All rights reserved. Embrace wellness, naturally.</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0.6;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// Component Cards
function HistoryCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.historyCard,
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        borderColor: isHovered ? '#1f7a8c' : 'transparent',
        boxShadow: isHovered ? '0 20px 60px rgba(31, 122, 140, 0.3)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.cardIcon}>{item.icon}</div>
      <h3 style={styles.cardTitle}>{item.title}</h3>
      <p style={styles.cardDesc}>{item.desc}</p>
    </div>
  );
}

function DoshaCard({ dosha }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.doshaCard,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        borderColor: isHovered ? '#1f7a8c' : 'transparent',
        boxShadow: isHovered ? '0 30px 80px rgba(31, 122, 140, 0.4)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{...styles.doshaIcon, transform: isHovered ? 'scale(1.1)' : 'scale(1)'}}>{dosha.icon}</div>
      <h3 style={styles.doshaName}>{dosha.name}</h3>
      <p style={styles.doshaElement}>{dosha.element}</p>
      <p style={styles.doshaDesc}>{dosha.desc}</p>
    </div>
  );
}

function ComponentItem({ component }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.componentItem,
        transform: isHovered ? 'translateX(10px)' : 'translateX(0)',
        borderLeftWidth: isHovered ? '8px' : '4px',
        backgroundColor: isHovered ? 'rgba(31, 122, 140, 0.1)' : '#1e293b'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h4 style={styles.componentName}>{component.name}</h4>
      <p style={styles.componentEffect}>{component.effect}</p>
      <p style={styles.componentExamples}>{component.examples}</p>
    </div>
  );
}

function BenefitItem({ benefit }) {
  return (
    <div style={styles.benefitItem}>
      <div style={styles.benefitIcon}>{benefit.icon}</div>
      <div>
        <h4 style={styles.benefitTitle}>{benefit.title}</h4>
        <p style={styles.benefitDesc}>{benefit.desc}</p>
      </div>
    </div>
  );
}

function RoleButton({ role, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.roleButton,
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 50px rgba(31, 122, 140, 0.5)' : '0 10px 30px rgba(31, 122, 140, 0.3)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {role}
    </button>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f1f5f9',
    overflowX: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  bgAnimation: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.1,
    pointerEvents: 'none'
  },
  bgCircle: {
    position: 'absolute',
    width: '50px',
    height: '50px',
    background: '#1f7a8c',
    borderRadius: '50%',
    animation: 'float 15s infinite'
  },
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '1.5rem 5%',
    zIndex: 1000,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
  },
  navContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #1f7a8c, #3aa1a8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  logoIcon: {
    fontSize: '2rem'
  },
  navButtons: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  navButton: {
    padding: '0.7rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: 'transparent',
    color: '#1f7a8c',
    border: '2px solid #1f7a8c',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600'
  },
  navButtonPrimary: {
    padding: '0.7rem 1.5rem',
    fontSize: '1rem',
    background: 'linear-gradient(135deg, #1f7a8c, #145b63)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600'
  },
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8rem 5% 4rem'
  },
  heroContent: {
    maxWidth: '1400px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center'
  },
  heroText: {
    animation: 'slideInLeft 1s ease'
  },
  heroTitle: {
    fontSize: '4rem',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #1f7a8c, #3aa1a8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.2'
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    color: '#cbd5e1',
    marginBottom: '2rem',
    lineHeight: '1.6'
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  primaryButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    background: 'linear-gradient(135deg, #1f7a8c, #145b63)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    boxShadow: '0 10px 30px rgba(31, 122, 140, 0.3)'
  },
  secondaryButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid #1f7a8c',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600'
  },
  heroImage: {
    textAlign: 'center',
    fontSize: '15rem',
    filter: 'drop-shadow(0 20px 50px rgba(31, 122, 140, 0.4))',
    animation: 'fadeIn 1s ease 0.4s both'
  },
  section: {
    padding: '5rem 5%',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #1f7a8c, #3aa1a8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  sectionSubtitle: {
    textAlign: 'center',
    color: '#cbd5e1',
    maxWidth: '800px',
    margin: '0 auto 3rem',
    fontSize: '1.1rem',
    lineHeight: '1.6'
  },
  historyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  },
  historyCard: {
    backgroundColor: '#1e293b',
    padding: '2rem',
    borderRadius: '20px',
    border: '2px solid transparent',
    transition: 'all 0.3s ease'
  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  cardTitle: {
    color: '#1f7a8c',
    marginBottom: '1rem',
    fontSize: '1.5rem'
  },
  cardDesc: {
    color: '#cbd5e1',
    lineHeight: '1.6'
  },
  doshaSection: {
    padding: '5rem 5%',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    maxWidth: '100%'
  },
  doshaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
    maxWidth: '1400px',
    margin: '3rem auto 0'
  },
  doshaCard: {
    background: 'linear-gradient(135deg, #1e293b, rgba(31, 122, 140, 0.1))',
    padding: '2.5rem',
    borderRadius: '20px',
    textAlign: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '2px solid transparent'
  },
  doshaIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    transition: 'transform 0.3s ease',
    display: 'inline-block'
  },
  doshaName: {
    color: '#3aa1a8',
    fontSize: '2rem',
    marginBottom: '0.5rem'
  },
  doshaElement: {
    color: '#1f7a8c',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  doshaDesc: {
    color: '#cbd5e1',
    lineHeight: '1.6'
  },
  componentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '3rem'
  },
  componentItem: {
    backgroundColor: '#1e293b',
    padding: '1.5rem',
    borderRadius: '15px',
    borderLeft: '4px solid #1f7a8c',
    transition: 'all 0.3s ease'
  },
  componentName: {
    color: '#1f7a8c',
    marginBottom: '0.5rem',
    fontSize: '1.1rem'
  },
  componentEffect: {
    color: '#cbd5e1',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  },
  componentExamples: {
    color: '#64748b',
    fontSize: '0.85rem',
    fontStyle: 'italic'
  },
  futureSection: {
    padding: '5rem 5%',
    background: 'linear-gradient(135deg, rgba(31, 122, 140, 0.1), rgba(58, 161, 168, 0.1))'
  },
  futureContent: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    padding: '3rem',
    borderRadius: '30px',
    marginTop: '2rem',
    border: '2px solid rgba(31, 122, 140, 0.3)',
    maxWidth: '1400px',
    margin: '2rem auto 0'
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem'
  },
  benefitIcon: {
    fontSize: '2.5rem',
    flexShrink: 0
  },
  benefitTitle: {
    color: '#1f7a8c',
    fontSize: '1.3rem',
    marginBottom: '0.5rem'
  },
  benefitDesc: {
    color: '#cbd5e1',
    lineHeight: '1.6'
  },
  roleSection: {
    textAlign: 'center',
    padding: '5rem 5%',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  roleSectionSubtitle: {
    fontSize: '1.3rem',
    color: '#cbd5e1',
    marginBottom: '3rem'
  },
  roleButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap'
  },
  roleButton: {
    padding: '1.5rem 3rem',
    fontSize: '1.2rem',
    background: 'linear-gradient(135deg, #1f7a8c, #145b63)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    boxShadow: '0 10px 30px rgba(31, 122, 140, 0.3)',
    fontWeight: '600',
    minWidth: '200px'
  },
  footer: {
    backgroundColor: '#1e293b',
    padding: '3rem 5%',
    borderTop: '2px solid #1f7a8c'
  },
  footerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '2rem'
  },
  footerSection: {},
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  footerLogoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #1f7a8c, #3aa1a8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  footerDesc: {
    color: '#cbd5e1',
    fontSize: '0.9rem',
    lineHeight: '1.6'
  },
  footerHeading: {
    color: '#1f7a8c',
    marginBottom: '1rem',
    fontSize: '1.2rem'
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  footerListItem: {
    color: '#cbd5e1',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  },
  footerBottom: {
    textAlign: 'center',
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(31, 122, 140, 0.2)',
    color: '#cbd5e1',
    maxWidth: '1400px',
    margin: '3rem auto 0'
  }
};