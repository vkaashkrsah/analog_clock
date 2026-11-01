
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  // Live clock state
  const [currentTime, setCurrentTime] = useState(new Date())

  // Backend connection status
  const [backendStatus, setBackendStatus] = useState('Checking backend...')

  // Customization state
  const [numeralStyle, setNumeralStyle] = useState('arabic')
  const [handStyle, setHandStyle] = useState('classic')
  const [dialDesign, setDialDesign] = useState('sunburst')
  const [watchColor, setWatchColor] = useState('midnight')
  const [backgroundColor, setBackgroundColor] = useState('navy')

  // Custom color state
  const [customDial, setCustomDial] = useState('#0b1d38')
  const [customBackground, setCustomBackground] = useState('#071329')

  // Update the clock every 50 milliseconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 50)

    return () => clearInterval(timer)
  }, [])

  // Check whether the Express backend is available
  useEffect(() => {
    axios
      .get('http://localhost:5001/api/health')
      .then((response) => {
        setBackendStatus(response.data.message)
      })
      .catch((error) => {
        console.error('Backend connection error:', error)
        setBackendStatus('Backend connection failed')
      })
  }, [])

  // Clock numerals
  const arabicNumbers = [
    '12', '1', '2', '3', '4', '5',
    '6', '7', '8', '9', '10', '11'
  ]

  const romanNumbers = [
    'XII', 'I', 'II', 'III', 'IV', 'V',
    'VI', 'VII', 'VIII', 'IX', 'X', 'XI'
  ]

  // Calculate clock hand angles
  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()
  const milliseconds = currentTime.getMilliseconds()

  const secondAngle = (seconds + milliseconds / 1000) * 6
  const minuteAngle = (minutes + seconds / 60) * 6
  const hourAngle = ((hours % 12) + minutes / 60) * 30

  // Format digital time
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

  // Format date inside the clock
  const weekday = currentTime
    .toLocaleDateString('en-US', { weekday: 'short' })
    .toUpperCase()

  const shortDate = currentTime
    .toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
    .toUpperCase()

  // Format digital date
  const day = String(currentTime.getDate()).padStart(2, '0')
  const month = String(currentTime.getMonth() + 1).padStart(2, '0')
  const year = currentTime.getFullYear()
  const formattedDate = `${day}/${month}/${year}`

  // Reset all customization options
  function resetDesign() {
    setNumeralStyle('arabic')
    setHandStyle('classic')
    setDialDesign('sunburst')
    setWatchColor('midnight')
    setBackgroundColor('navy')
    setCustomDial('#0b1d38')
    setCustomBackground('#071329')
  }

  // Custom colors are passed to CSS
  const customStyles = {
    '--dial': customDial,
    '--dial-light': customDial,
    '--background': customBackground,
    '--background-glow': customBackground
  }

  // Watch and background theme classes
  const themeClass =
    watchColor === 'midnight' ? '' : `theme-${watchColor}`

  const backgroundClass =
    backgroundColor === 'navy' ? '' : `bg-${backgroundColor}`

  return (
    <main
      className={`showroom ${themeClass} ${backgroundClass}`}
      style={customStyles}
    >

      {/* HEADER */}
      <header className="page-header">
        <p className="eyebrow">
          TIMELESS DESIGN · PERSONAL EDITION
        </p>

        <h1>VIKASH</h1>

        <p className="subtitle">
          A PERSONAL TIMEPIECE
        </p>
      </header>

      {/* ANALOG CLOCK */}
      <section className="clock-stage" aria-label="Live analog clock">
        <div className="clock">
          <div className="bezel">

            <div className={`dial pattern-${dialDesign}`}>

              <div className="dial-pattern"></div>

              {/* MINUTE MARKERS */}
              <div className="minute-markers">
                {Array.from({ length: 60 }, (_, i) => (
                  <div
                    key={i}
                    className={`minute-marker ${
                      i % 5 === 0 ? 'major' : ''
                    }`}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `
                        translate(-50%, -50%)
                        rotate(${i * 6}deg)
                        translateY(-44cqw)
                      `
                    }}
                  />
                ))}
              </div>

              {/* HOUR NUMERALS */}
              <div className="hour-markers">
                {Array.from({ length: 12 }, (_, i) => {
                  const angle = i * 30
                  const radians = (angle - 90) * Math.PI / 180
                  const radius = 39

                  const x = 50 + radius * Math.cos(radians)
                  const y = 50 + radius * Math.sin(radians)

                  let numeral = arabicNumbers[i]

                  if (numeralStyle === 'roman') {
                    numeral = romanNumbers[i]
                  }

                  return (
                    <div
                      key={i}
                      className={`hour-marker ${
                        numeralStyle === 'bold' ? 'bold' : ''
                      } ${
                        numeralStyle === 'minimal' ? 'minimal' : ''
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`
                      }}
                    >
                      {numeralStyle === 'minimal' ? '' : numeral}
                    </div>
                  )
                })}
              </div>

              {/* BRANDING */}
              <div className="branding">
                <div className="brand-name">VIKASH</div>
              </div>

              {/* DATE INSIDE CLOCK */}
              <div className="date-window">
                <span>{weekday}</span>
                <span>{shortDate}</span>
              </div>

              {/* CLOCK HANDS */}
              <div className={`hands hands-${handStyle}`}>

                <div
                  className="hand hour-hand"
                  style={{
                    transform: `translateX(-50%) rotate(${hourAngle}deg)`
                  }}
                />

                <div
                  className="hand minute-hand"
                  style={{
                    transform: `translateX(-50%) rotate(${minuteAngle}deg)`
                  }}
                />

                <div
                  className="hand second-hand"
                  style={{
                    transform: `translateX(-50%) rotate(${secondAngle}deg)`
                  }}
                />

                <div className="center-cap" />
              </div>

              {/* GLASS EFFECT */}
              <div className="glass-effect" />

            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL CLOCK */}
      <section className="digital-display">
        <p className="digital-label">CURRENT TIME</p>

        <div id="digital-time">{formattedTime}</div>

        <div id="digital-date">{formattedDate}</div>
      </section>

      {/* CUSTOMIZATION */}
      <section className="customization">
        <h2>PERSONALIZE YOUR TIMEPIECE</h2>

        <div className="control-grid">

          <label className="control">
            <span>Numeral Style</span>
            <select
              value={numeralStyle}
              onChange={(event) => setNumeralStyle(event.target.value)}
            >
              <option value="arabic">Arabic · 1 2 3</option>
              <option value="roman">Roman · I II III</option>
              <option value="bold">Bold Numbers</option>
              <option value="minimal">Minimal Markers</option>
            </select>
          </label>

          <label className="control">
            <span>Hand Design</span>
            <select
              value={handStyle}
              onChange={(event) => setHandStyle(event.target.value)}
            >
              <option value="classic">Classic</option>
              <option value="slim">Slim</option>
              <option value="sword">Sword</option>
              <option value="leaf">Leaf</option>
              <option value="luminous">Luminous</option>
              <option value="diamond">Diamond</option>
              <option value="needle">Needle</option>
              <option value="royal">Royal</option>
            </select>
          </label>

          <label className="control">
            <span>Dial Design</span>
            <select
              value={dialDesign}
              onChange={(event) => setDialDesign(event.target.value)}
            >
              <option value="sunburst">Sunburst</option>
              <option value="clean">Minimal</option>
              <option value="concentric">Concentric</option>
              <option value="guilloche">Guilloche</option>
              <option value="crosshair">Crosshair</option>
              <option value="geometric">Geometric</option>
              <option value="star">Star Pattern</option>
            </select>
          </label>

          <label className="control">
            <span>Watch Color</span>
            <select
              value={watchColor}
              onChange={(event) => setWatchColor(event.target.value)}
            >
              <option value="midnight">Midnight Blue</option>
              <option value="emerald">Emerald Green</option>
              <option value="black">Classic Black</option>
              <option value="burgundy">Burgundy</option>
              <option value="ivory">Ivory</option>
              <option value="silver">Silver Blue</option>
            </select>
          </label>

          <label className="control">
            <span>Background</span>
            <select
              value={backgroundColor}
              onChange={(event) => setBackgroundColor(event.target.value)}
            >
              <option value="navy">Deep Navy</option>
              <option value="black">Black</option>
              <option value="charcoal">Charcoal</option>
              <option value="slate">Slate Blue</option>
              <option value="cream">Cream</option>
              <option value="wine">Wine</option>
            </select>
          </label>

        </div>

        {/* CUSTOM COLOR PICKERS */}
        <div className="custom-colors">

          <label>
            Custom Dial Color
            <input
              type="color"
              value={customDial}
              onChange={(event) => setCustomDial(event.target.value)}
            />
          </label>

          <label>
            Custom Background
            <input
              type="color"
              value={customBackground}
              onChange={(event) => setCustomBackground(event.target.value)}
            />
          </label>

          <button type="button" onClick={resetDesign}>
            Reset Design
          </button>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="page-footer">
        Made By <span className="heart">♥</span> with VIKASH
      </footer>

      {/* BACKEND CONNECTION STATUS */}
      <p
        className="backend-status"
        role="status"
        aria-live="polite"
        style={{
          marginTop: '12px',
          textAlign: 'center',
          fontSize: '0.85rem',
          opacity: 0.8
        }}
      >
        Backend: {backendStatus}
      </p>

    </main>
  )
}

export default App
