import React, { useEffect, useRef, useState } from 'react'
import emailjs from 'emailjs-com'


const NAME = "HARIHARAN S"
const TITLE = "Full Stack Developer | AI & Data Science Student"
const TAGLINE = "Building scalable web applications powered by AI and modern web technologies."
const EMAIL = "hariharansathasivam08@gmail.com"
const GITHUB = "https://github.com/hariharan-875"
const LINKEDIN = "https://www.linkedin.com/in/hariharan-s-88a20724a"

const EMAILJS_SERVICE_ID = "service_7hrrcpn"
const EMAILJS_TEMPLATE_ID = "template_sb2rr8y"
const EMAILJS_PUBLIC_KEY = "hcTv7decesG2VHw0-"

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
]

export default function App(){
  const [formStatus, setFormStatus] = useState(null) 
  const [isSending, setIsSending] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const progressRef = useRef(null)

  const [loading, setLoading] = useState(true)
  useEffect(()=> {
    const t = setTimeout(()=> setLoading(false), 800)
    return ()=> clearTimeout(t)
  }, [])

  useEffect(()=>{
    const onScroll = () => {
      const top = window.scrollY + 120
      let current = 'home'
      document.querySelectorAll('section').forEach(sec => {
        if(top >= sec.offsetTop) current = sec.getAttribute('id')
      })
      document.querySelectorAll('.nav a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current)
      })

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      if(progressRef.current) progressRef.current.style.width = pct + '%'

      setShowTop(scrollTop > 400)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(()=>{
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.add('show')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return ()=> io.disconnect()
  }, [loading])

  useEffect(()=>{
    const links = Array.from(document.querySelectorAll('a[href^="#"]'))
    const handler = e => {
      e.preventDefault()
      const id = e.currentTarget.getAttribute('href').slice(1)
      const el = document.getElementById(id)
      if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    links.forEach(l => l.addEventListener('click', handler))
    return ()=> links.forEach(l => l.removeEventListener('click', handler))
  }, [])

  // contact form send
  function sendEmail(e){
    e.preventDefault()
    setIsSending(true)
    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      e.target,
      EMAILJS_PUBLIC_KEY
    ).then(() => {
      setFormStatus('success')
      setIsSending(false)
      e.target.reset()
      setTimeout(()=> setFormStatus(null), 4000)
    }, () => {
      setFormStatus('error')
      setIsSending(false)
      setTimeout(()=> setFormStatus(null), 4000)
    })
  }

  return (
    <div>
      {loading && (
        <div className="splash">
          <div className="logo">
            <span className="dot"></span>
            <h1>{NAME}</h1>
          </div>
        </div>
      )}

      <div ref={progressRef} className="progress" />

      <nav className="nav">
        <div className="container nav-inner">
          <div className="brand">
            <span className="dot"></span>
            <h1>{NAME}</h1>
          </div>
          <div>
            {SECTIONS.map(s => (
              <a key={s.id} href={'#' + s.id}>{s.label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* HOME */}
      <header id="home" className="section">
        <div className="container hero">
          <div className="reveal">
            <span className="badge"><span className="glow"></span> Available for work</span>
            <h2 className="title">{NAME}</h2>
            <p className="subtitle">{TITLE}</p>
            <p className="subtitle small">{TAGLINE}</p>
            <div className="cta">
              <a className="btn" href="#projects">View Projects</a>
              <a className="btn secondary" href="/HariharanS_Resume_OnePage.pdf" download>Download Resume</a>
            </div>
          </div>

          <div className="photo-wrapper reveal">
            <img src="/Photo.jpg" alt="Profile" className="profile-photo" />
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container about-grid">
          <div className="reveal">
            <h2>About</h2>
            <p className="small">
              I’m an aspiring Full Stack Developer with a foundation in Artificial Intelligence and Data Science.
              I specialize in building efficient, scalable web applications using React.js, Node.js, and Express.js.
            </p>
            <hr className="sep" />
            <p className="small">
              I enjoy integrating AI and modern technologies to build meaningful digital experiences and learning new frameworks.
            </p>
          </div>

          <div className="card reveal">
            <h3>Quick Facts</h3>
            <p className="small">• Location: Tiruchirappalli, India</p>
            <p className="small">• Student: AI & Data Science — Kongunadu College of Engineering</p>
            <p className="small">• Open to full-stack & AI-integrated roles</p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <div className="container">
          <h2 className="reveal">Technical Skills</h2>
          <div className="card-grid">
            {['Python','JavaScript','React.js','Node.js','Express.js','HTML5','CSS3','MongoDB','MySQL','Firebase','Git','REST APIs'].map(s => (
              <div className="card reveal" key={s}>
                <h3>{s}</h3>
                <p>Proficient in {s} development.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="reveal">Projects</h2>
          <p className="section-desc reveal">A selection of recent work.</p>

          <div className="card-grid">
            <article className="card reveal">
              <h3>Petition Categorization Using Gen-AI</h3>
              <p>AI-driven grievance classification with Generative AI, integrated FCM and MySQL for real-time tracking.</p>
              <div className="tags">
                <span className="tag">Gen-AI</span>
                <span className="tag">Firebase</span>
                <span className="tag">MySQL</span>
              </div>
              <div className="cta" style={{marginTop:12}}>
                <a className="btn" href="#" target="_blank" rel="noreferrer">Live</a>
                <a className="btn secondary" href={GITHUB} target="_blank" rel="noreferrer">Code</a>
              </div>
            </article>

            <article className="card reveal">
              <h3>Traffic Sign Recognition Using Machine Learning</h3>
              <p>Developed a CV model for traffic sign classification with responsive UI and authentication.</p>
              <div className="tags">
                <span className="tag">Python</span>
                <span className="tag">ML</span>
                <span className="tag">React</span>
              </div>
              <div className="cta" style={{marginTop:12}}>
                <a className="btn" href="#" target="_blank" rel="noreferrer">Live</a>
                <a className="btn secondary" href={GITHUB} target="_blank" rel="noreferrer">Code</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section">
        <div className="container">
          <h2 className="reveal">Certifications</h2>
          <p className="section-desc reveal">Completed certifications in core web & programming technologies.</p>

          <div className="card-grid">
            {[
              { img: '/MAIN JS.jpg', title: 'HTML, CSS & JavaScript' },
              { img: '/PYTHON.jpg', title: 'Python Programming' },
              { img: '/REACT JS.jpg', title: 'React.js Development' },
              { img: '/NODE JS.jpg', title: 'Node.js & Express' },
              { img: '/SQL.jpg', title: 'SQL / MySQL' }
            ].map((c, idx) => (
              <div className="card reveal" key={idx}>
                <img src={c.img} alt={c.title} style={{ width: '100%', borderRadius:12, marginBottom:12 }} />
                <h3>{c.title}</h3>
                <p className="small">Verified certification</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="reveal">Contact</h2>
          <p className="section-desc reveal">Let’s collaborate — send me a message below or use the links.</p>

          <form className="form" onSubmit={sendEmail}>
            <input className="input" name="from_name" placeholder="Your name" required />
            <input className="input" name="from_email" placeholder="Email" type="email" required />
            <textarea className="textarea full" name="message" placeholder="Message" required />
            <button className="btn submit" type="submit" disabled={isSending}>
              {isSending ? 'Sending…' : 'Send Message'}
            </button>

            {formStatus === 'success' && <p className="success-msg">✅ Message sent successfully!</p>}
            {formStatus === 'error' && <p className="error-msg">❌ Failed to send. Try again later.</p>}
          </form>

          <div className="contact-links small" style={{marginTop:16}}>
            <a href={`mailto:${EMAIL}`}>📧 {EMAIL}</a> &nbsp; • &nbsp;
            <a href={GITHUB} target="_blank" rel="noreferrer">💻 GitHub</a> &nbsp; • &nbsp;
            <a href={LINKEDIN} target="_blank" rel="noreferrer">🔗 LinkedIn</a>
          </div>
        </div>
      </section>

      {/* Back to top */}
      <div className={'to-top ' + (showTop ? 'visible' : '')}>
        <button onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' }) }>↑</button>
      </div>

      <footer className="footer">
        <div className="container small">© {new Date().getFullYear()} {NAME}. All rights reserved.</div>
      </footer>
    </div>
  )
}
