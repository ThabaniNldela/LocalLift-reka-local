import { useState } from 'react'

const FOREST = '#1a4731'
const FOREST_MID = '#2d6a4f'
const AMBER = '#e07b22'
const AMBER_LIGHT = '#f5a623'
const CREAM = '#faf7f2'
const SAND = '#f0ebe3'
const INK = '#1a1612'
const INK_MUTED = '#6b5e52'

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav style={{ background: CREAM, borderBottom: '1px solid #e8e0d6', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: FOREST, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={AMBER_LIGHT}/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 22, color: FOREST }}>Reka <span style={{ color: AMBER }}>Local</span></span>
        </a>
        <div className="nav-links" style={{ gap: 32, alignItems: 'center' }}>
          {['For Customers', 'For Vendors', 'How It Works', 'Pricing'].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, color: INK_MUTED, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = FOREST)}
              onMouseLeave={e => (e.currentTarget.style.color = INK_MUTED)}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button style={{ padding: '8px 20px', borderRadius: 8, border: `1.5px solid ${FOREST}`, background: 'transparent', color: FOREST, fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Log In</button>
          <button style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: FOREST, color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Sign Up Free</button>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section style={{ background: CREAM, overflow: 'hidden', position: 'relative' }}>
      <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 0' }}>
        {/* Left */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e8f4ee', borderRadius: 100, padding: '6px 14px', marginBottom: 28 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2d6a4f' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500, color: FOREST_MID, letterSpacing: '0.04em' }}>Support Local. Grow Together.</span>
          </div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(44px, 5vw, 68px)', fontWeight: 700, lineHeight: 1.05, color: INK, margin: '0 0 20px' }}>
            Find Local.<br />
            Support Local.<br />
            <span style={{ color: AMBER }}>Grow Together.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: INK_MUTED, maxWidth: 440, margin: '0 0 36px' }}>
            <strong style={{ color: FOREST }}>Reka Local</strong> connects you with trusted street vendors near you. Discover, shop, and support the heart of your community.
          </p>
          <div className="hero-cta-btns">
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, border: 'none', background: FOREST, color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#fff"/></svg>
              Explore Vendors Near You
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, border: `1.5px solid #d4c9bc`, background: 'transparent', color: INK, fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.33C18 2.53 15.96 1 13.5 1c-1.5 0-2.85.64-3.79 1.67L9 3.5l-.71-.83C7.35 1.64 6 1 4.5 1 2.04 1 0 2.53 0 4.67c0 .45.11.89.18 1.33H0c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" fill={AMBER}/></svg>
              I'm a Vendor
            </button>
          </div>
          {/* Trust pills */}
          <div className="hero-trust-pills">
            {[
              { icon: '📍', label: 'Discover', sub: 'Vendors nearby' },
              { icon: '✅', label: 'Trust', sub: 'Verified & reviewed' },
              { icon: '💳', label: 'Pay', sub: 'Cash or digital' },
              { icon: '🤝', label: 'Support', sub: 'Our local heroes' },
            ].map(p => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{p.label}</div>
                  <div style={{ fontSize: 11, color: INK_MUTED }}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Hero image + app mockup */}
        <div className="hero-mockup-wrap">
          {/* Green blob */}
          <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: '#d4eddb', top: -40, right: -40, zIndex: 0 }} />
          {/* Vendor photo */}
          <div style={{ position: 'relative', zIndex: 1, borderRadius: 24, overflow: 'hidden', width: 340, height: 420, background: SAND }}>
            <img
              src="https://images.unsplash.com/photo-1585540083814-ea6ee8af9e4f?w=680&h=840&fit=crop&auto=format"
              alt="Street vendor at fruit stand"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* App mockup card */}
          <div style={{ position: 'absolute', right: -16, bottom: -16, zIndex: 2, background: '#fff', borderRadius: 20, padding: 16, width: 220, boxShadow: '0 20px 60px rgba(0,0,0,0.14)', border: '1px solid #f0e8df' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: FOREST, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={AMBER_LIGHT}/></svg>
              </div>
              <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 14, color: FOREST }}>Reka <span style={{ color: AMBER }}>Local</span></span>
            </div>
            <div style={{ background: SAND, borderRadius: 8, padding: '6px 10px', fontSize: 11, color: INK_MUTED, marginBottom: 10 }}>🔍 Search vendors near you…</div>
            <div style={{ fontSize: 10, color: INK_MUTED, marginBottom: 8 }}>📍 Near you: Hatfield, Pretoria</div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {['🍊 Food', '🥤 Drinks', '👗 Clothing'].map(c => (
                <div key={c} style={{ background: SAND, borderRadius: 6, padding: '3px 6px', fontSize: 9, fontWeight: 500 }}>{c}</div>
              ))}
            </div>
            <div style={{ fontWeight: 600, fontSize: 10, marginBottom: 6, color: INK }}>Popular Near You</div>
            {[
              { name: "Mama Thandi's Vetkoek", rating: 4.7, dist: '0.2km' },
              { name: "Fresh Produce Stand", rating: 4.8, dist: '0.3km' },
            ].map(v => (
              <div key={v.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid #f0e8df' }}>
                <div style={{ fontSize: 10, color: INK, fontWeight: 500, maxWidth: 130 }}>{v.name}</div>
                <div style={{ fontSize: 9, color: INK_MUTED }}>⭐{v.rating} · {v.dist}</div>
              </div>
            ))}
            {/* Vendor of week */}
            <div style={{ marginTop: 10, background: '#e8f4ee', borderRadius: 8, padding: '6px 8px' }}>
              <div style={{ fontSize: 9, color: FOREST_MID, fontWeight: 600 }}>Vendor of the Week</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: FOREST }}>Nomsa's Fresh Fruits</div>
              <div style={{ fontSize: 9, color: AMBER }}>⭐ 4.8</div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats bar */}
      <div style={{ background: FOREST, marginTop: 80 }}>
        <div className="stats-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px', gap: 0 }}>
          {[
            { val: '12,000+', label: 'Vendors Registered' },
            { val: '85,000+', label: 'Customers Connected' },
            { val: '47', label: 'Cities & Towns' },
            { val: '4.8★', label: 'Average Vendor Rating' },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none', padding: '0 16px' }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, color: AMBER_LIGHT, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Problem() {
  const problems = [
    { icon: '👁️', title: 'Invisible to Customers', body: 'People walk past vendors every day without knowing what they sell or where to find them tomorrow.' },
    { icon: '💸', title: 'Cash-Only Barriers', body: 'Many customers no longer carry cash, meaning vendors lose sales they never even knew about.' },
    { icon: '📍', title: 'Always on the Move', body: 'Vendors change locations constantly, making it impossible for loyal customers to find them again.' },
    { icon: '📵', title: 'No Digital Presence', body: 'Without online tools, vendors can\'t build a brand, earn reviews, or reach new customers.' },
    { icon: '📱', title: 'Limited Smartphone Access', body: 'Many vendors don\'t own smartphones or have reliable internet — traditional apps just won\'t work.' },
    { icon: '🤔', title: 'Trust Deficit', body: 'Customers hesitate to buy from strangers with no ratings, reviews, or verified identity.' },
  ]
  return (
    <section id="for-customers" className="section-pad" style={{ background: '#fff', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="problem-grid">
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: AMBER, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>The Problem</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: INK, margin: '0 0 24px' }}>
              Street vendors power our economy.<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>They just can't be found.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: INK_MUTED }}>
              Street vendors are the backbone of South Africa's informal economy, but they face challenges that formal businesses never deal with. <strong style={{ color: INK }}>Reka Local exists to fix that.</strong>
            </p>
            <div style={{ marginTop: 32, padding: '20px 24px', background: '#fff9f0', border: `1.5px solid ${AMBER}`, borderRadius: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: AMBER, marginBottom: 8 }}>Key Insight</div>
              <p style={{ fontSize: 15, color: INK, lineHeight: 1.6, margin: 0 }}>
                "Street vendors provide valuable services, but they lack the digital tools that formal businesses take for granted."
              </p>
            </div>
          </div>
          <div className="problem-cards">
            {problems.map(p => (
              <div key={p.title} style={{ background: CREAM, borderRadius: 14, padding: '24px', border: '1px solid #ede6db', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: INK, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: INK_MUTED }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Solution() {
  return (
    <section className="section-pad" style={{ background: FOREST, padding: '100px 24px', overflow: 'hidden', position: 'relative' }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', top: -150, right: -100 }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', bottom: -80, left: 60 }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="solution-grid">
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: AMBER_LIGHT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Our Solution</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: '#fff', margin: '0 0 24px' }}>
              Digital identity for every vendor.<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: AMBER_LIGHT }}>No vendor left behind.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', marginBottom: 40 }}>
              Reka Local is a simple, inclusive platform that helps people discover street vendors and gives vendors the digital tools they need to grow — without replacing what makes them special.
            </p>
            <div className="solution-features">
              {[
                { label: 'Digital Identity', desc: 'Every vendor gets a free verified profile' },
                { label: 'Live Location', desc: 'Real-time updates when vendors move' },
                { label: 'Digital Payments', desc: 'QR, EFT, and cash accepted' },
                { label: 'Trust Reviews', desc: 'Community-backed ratings system' },
                { label: 'Works on Feature Phones', desc: 'USSD *123# — no smartphone needed' },
                { label: 'WhatsApp Integration', desc: 'Manage your store via WhatsApp Business' },
              ].map(f => (
                <div key={f.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{f.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: map mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, overflow: 'hidden', aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1687422808277-2334638f09fb?w=700&h=520&fit=crop&auto=format"
                alt="Vendor cooking at street stall"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              {/* Overlay map pins */}
              <div style={{ position: 'absolute', inset: 0, padding: 20 }}>
                {[
                  { top: '20%', left: '30%', name: "Mama Thandi's", cat: 'Vetkoek' },
                  { top: '50%', left: '55%', name: "Sipho's Shoes", cat: 'Clothing' },
                  { top: '70%', left: '25%', name: "Fresh Produce", cat: 'Fruits' },
                ].map(pin => (
                  <div key={pin.name} style={{ position: 'absolute', top: pin.top, left: pin.left }}>
                    <div style={{ background: FOREST, borderRadius: 8, padding: '4px 10px', color: '#fff', fontSize: 11, fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', whiteSpace: 'nowrap' }}>
                      {pin.name}
                      <div style={{ fontSize: 9, color: AMBER_LIGHT, fontWeight: 400 }}>{pin.cat}</div>
                    </div>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: AMBER, margin: '2px auto 0', boxShadow: '0 0 0 3px rgba(245,166,35,0.3)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const [tab, setTab] = useState<'customers' | 'vendors'>('customers')
  const customerSteps = [
    { num: '01', title: 'Open the App', body: 'Search by location, category, or vendor name. See vendors live on an interactive map.' },
    { num: '02', title: 'Browse & Discover', body: 'Explore vendor profiles, menus, photos, prices, hours, and community reviews.' },
    { num: '03', title: 'Navigate & Pay', body: 'Get directions directly to the vendor. Pay with cash, card, QR, or EFT.' },
    { num: '04', title: 'Earn Rewards', body: 'Collect loyalty points for every purchase. Redeem for discounts at future visits.' },
  ]
  const vendorSteps = [
    { num: '01', title: 'Register Free', body: 'Create your digital profile with business name, products, prices, photos, and location.' },
    { num: '02', title: 'Update Your Status', body: 'Let customers know where you are today. Use the app, SMS, or dial *123# — no smartphone required.' },
    { num: '03', title: 'Accept Payments', body: 'Receive digital payments via QR code printed and given to you at no cost. Cash always works too.' },
    { num: '04', title: 'Grow Your Business', body: 'View your dashboard: track visits, popular products, and customer reviews to make better decisions.' },
  ]
  const steps = tab === 'customers' ? customerSteps : vendorSteps
  return (
    <section id="how-it-works" className="section-pad" style={{ background: CREAM, padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: AMBER, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>How It Works</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: INK, margin: '0 0 40px' }}>Simple for everyone.</h2>
          <div style={{ display: 'inline-flex', background: SAND, borderRadius: 12, padding: 4, gap: 4 }}>
            {(['customers', 'vendors'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, transition: 'all 0.2s',
                background: tab === t ? FOREST : 'transparent',
                color: tab === t ? '#fff' : INK_MUTED,
              }}>
                {t === 'customers' ? '👤 For Customers' : '🏪 For Vendors'}
              </button>
            ))}
          </div>
        </div>
        <div className="hiw-grid">
          {steps.map((s, i) => (
            <div key={s.num} style={{ position: 'relative' }}>
              {i < steps.length - 1 && (
                <div style={{ position: 'absolute', top: 28, left: '60%', width: '80%', height: 1, background: 'linear-gradient(to right, #d4c9bc, transparent)', zIndex: 0 }} />
              )}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: tab === 'customers' ? FOREST : AMBER, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, color: '#fff' }}>{s.num}</span>
                </div>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 20, color: INK, margin: '0 0 10px' }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    { icon: '🗺️', title: 'Live Vendor Map', body: 'See all active vendors near you on a real-time interactive map. Updated every few minutes.' },
    { icon: '🔍', title: 'Smart Search', body: 'Search by category — kota, fruit, crafts, clothing, barbers and more. Find exactly what you need.' },
    { icon: '✅', title: 'Verified Profiles', body: 'Every vendor is verified by municipalities, NGOs, or community organisations for trusted buying.' },
    { icon: '⭐', title: 'Ratings & Reviews', body: 'Community-backed reviews help you choose the best vendors and help vendors improve their service.' },
    { icon: '💳', title: 'Digital Payments', body: 'Pay with QR code, EFT, or cash. Vendors receive a free printed QR code sticker at registration.' },
    { icon: '🎁', title: 'Loyalty Rewards', body: 'Earn points for every vendor you support. Get badges and unlock discounts for repeat visits.' },
    { icon: '🤖', title: 'AI Recommendations', body: 'The app learns your preferences and suggests vendors based on your interests and past purchases.' },
    { icon: '📊', title: 'Vendor Dashboard', body: 'Track visits, views, popular products, and customer trends — all in a simple, clear dashboard.' },
    { icon: '🌍', title: 'Tourist Mode', body: 'Visiting a new city? Discover trusted local vendors hand-picked by the community for visitors.' },
  ]
  return (
    <section id="for-vendors" className="section-pad" style={{ background: '#fff', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="features-grid">
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: AMBER, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Key Features</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: INK, margin: '0 0 24px' }}>
              Everything you need.<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Nothing you don't.</em>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: INK_MUTED, marginBottom: 32 }}>
              Built specifically for the informal economy. No complicated dashboards, no subscription traps — just tools that work for real people.
            </p>
            <div style={{ background: SAND, borderRadius: 16, overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1687422808565-929533931584?w=640&h=380&fit=crop&auto=format"
                alt="Vendor giving thumbs up at fruit stand"
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
              />
              <div style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: INK, marginBottom: 4 }}>Built for South Africa</div>
                <div style={{ fontSize: 13, color: INK_MUTED, lineHeight: 1.6 }}>From Soweto to Stellenbosch, Reka Local is designed for the streets where South Africa's real economy lives.</div>
              </div>
            </div>
          </div>
          <div className="features-cards">
            {features.map(f => (
              <div key={f.title} style={{ background: CREAM, borderRadius: 14, padding: 24, border: '1px solid #ede6db', cursor: 'default', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = CREAM; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: INK, marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 12, lineHeight: 1.6, color: INK_MUTED }}>{f.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Inclusive() {
  return (
    <section className="section-pad" style={{ background: AMBER, padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', top: -100, right: 100 }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="inclusive-grid">
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Inclusive for Everyone</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: '#fff', margin: '0 0 20px' }}>
              No vendor left behind.<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Not a single one.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)' }}>
              One of our most important commitments: technology should never be a barrier. Reka Local works even if you've never owned a smartphone.
            </p>
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { icon: '📟', code: '*123#', title: 'USSD Support', body: 'Dial *123# from any basic phone. Update your location, check reviews, and manage your profile — no data required.' },
              { icon: '💬', code: 'SMS', title: 'SMS Updates', body: 'Get alerts about customer visits and reviews directly via SMS. No app. No internet. Just a message.' },
              { icon: '💚', code: 'WhatsApp', title: 'WhatsApp Business', body: 'Manage your entire vendor profile through WhatsApp. Send products, update hours, and respond to customers.' },
              { icon: '🖨️', code: 'QR Print', title: 'Printed QR Codes', body: 'We print and deliver your payment QR sticker to you for free. Customers scan it — you get paid instantly.' },
            ].map(item => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'flex-start', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{item.icon}</div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>{item.title}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, background: 'rgba(255,255,255,0.2)', borderRadius: 4, padding: '1px 6px', color: '#fff' }}>{item.code}</span>
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', margin: 0 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatMakesDifferent() {
  const items = [
    { icon: '🏛️', title: 'Vendor Verification', body: 'Verified by municipalities, NGOs, and community organisations — not just self-reported. Customers can trust who they\'re buying from.' },
    { icon: '📖', title: 'Vendor Stories', body: 'Customers don\'t just see products — they meet the people. Knowing someone\'s story makes people far more likely to support them.' },
    { icon: '🤖', title: 'AI Recommendations', body: 'Smart suggestions based on past behaviour. The more you use it, the better it gets at finding vendors you\'ll love.' },
    { icon: '🏆', title: 'Community Rewards', body: 'Earn points and badges for supporting local vendors. See your monthly impact: "You\'ve supported 12 local businesses this month."' },
    { icon: '📈', title: 'Local Economic Impact', body: 'We show users and municipalities the real data: how much money is staying local, which vendors are thriving, where support is needed.' },
    { icon: '🔗', title: 'One Complete Platform', body: 'Google Maps, Facebook Marketplace, and WhatsApp each do part of the job. Reka Local is the only platform built to do all of it.' },
  ]
  return (
    <section className="section-pad" style={{ background: SAND, padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: FOREST_MID, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Our Edge</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: INK, margin: '0 0 16px' }}>
            What makes Reka Local<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: FOREST }}>genuinely different?</em>
          </h2>
          <p style={{ fontSize: 16, color: INK_MUTED, maxWidth: 560, margin: '0 auto' }}>Most platforms focus on selling products. We focus on building trust and helping communities discover the people who make them whole.</p>
        </div>
        <div className="diff-grid">
          {items.map(item => (
            <div key={item.title} style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #ede6db', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = FOREST; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#ede6db'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 20, color: INK, margin: '0 0 10px' }}>{item.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: INK_MUTED, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [annual, setAnnual] = useState(false)
  return (
    <section id="pricing" className="section-pad" style={{ background: '#fff', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: AMBER, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Pricing</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: INK, margin: '0 0 12px' }}>Start free. Grow at your pace.</h2>
          <p style={{ fontSize: 16, color: INK_MUTED, marginBottom: 32 }}>No hidden fees. No lock-in. Cancel any time.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: SAND, borderRadius: 100, padding: '8px 20px' }}>
            <span style={{ fontSize: 14, color: annual ? INK_MUTED : INK, fontWeight: annual ? 400 : 600 }}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} style={{ width: 44, height: 24, borderRadius: 12, border: 'none', background: annual ? FOREST : '#ccc', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: '#fff', top: 3, left: annual ? 23 : 3, transition: 'left 0.2s' }} />
            </button>
            <span style={{ fontSize: 14, color: annual ? INK : INK_MUTED, fontWeight: annual ? 600 : 400 }}>Annual <span style={{ color: FOREST, fontWeight: 700 }}>−20%</span></span>
          </div>
        </div>
        <div className="pricing-grid">
          {/* Basic */}
          <div style={{ border: '1.5px solid #ede6db', borderRadius: 20, padding: 32, background: CREAM }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: INK_MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Basic</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 48, fontWeight: 700, color: INK, lineHeight: 1 }}>Free</div>
            <div style={{ fontSize: 13, color: INK_MUTED, margin: '8px 0 28px' }}>Forever. No credit card needed.</div>
            <div style={{ borderTop: '1px solid #ede6db', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {['Vendor profile (name, location, hours)', 'Up to 5 product listings', 'Community reviews & ratings', 'Basic location pin on map', 'QR code payment sticker'].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: INK }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 1 }} fill="none"><circle cx="8" cy="8" r="8" fill="#e8f4ee"/><path d="M5 8l2.5 2.5L11 5.5" stroke={FOREST_MID} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </div>
              ))}
            </div>
            <button style={{ width: '100%', padding: '14px', borderRadius: 10, border: `1.5px solid ${FOREST}`, background: 'transparent', color: FOREST, fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Get Started Free
            </button>
          </div>
          {/* Premium */}
          <div style={{ border: `2px solid ${FOREST}`, borderRadius: 20, padding: 32, background: FOREST, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 16, right: 16, background: AMBER, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 100, padding: '3px 10px', fontFamily: 'JetBrains Mono, monospace' }}>MOST POPULAR</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Premium</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1 }}>R{annual ? 39 : 49}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>/month</div>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: '8px 0 28px' }}>{annual ? 'Billed annually · save R120/yr' : 'Billed monthly · cancel anytime'}</div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                'Everything in Basic',
                'Featured homepage placement',
                'Higher search ranking',
                'Unlimited product listings',
                'Business analytics dashboard',
                'Promotional campaigns',
                'Customer insights & trends',
                'Priority customer support',
              ].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#fff' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 1 }} fill="none"><circle cx="8" cy="8" r="8" fill="rgba(245,166,35,0.2)"/><path d="M5 8l2.5 2.5L11 5.5" stroke={AMBER_LIGHT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </div>
              ))}
            </div>
            <button style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: AMBER, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Start Premium — R{annual ? 39 : 49}/mo
            </button>
          </div>
          {/* Municipality */}
          <div style={{ border: '1.5px solid #ede6db', borderRadius: 20, padding: 32, background: CREAM }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: INK_MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Municipality / NGO</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 40, fontWeight: 700, color: INK, lineHeight: 1 }}>Custom</div>
            <div style={{ fontSize: 13, color: INK_MUTED, margin: '8px 0 28px' }}>Annual licensing. Let's talk.</div>
            <div style={{ borderTop: '1px solid #ede6db', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                'Bulk vendor registration',
                'Informal trading data & analytics',
                'Plan and manage trading zones',
                'Community announcements',
                'B2G dashboard & reporting',
                'Dedicated onboarding support',
              ].map(f => (
                <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: INK }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 1 }} fill="none"><circle cx="8" cy="8" r="8" fill="#e8f4ee"/><path d="M5 8l2.5 2.5L11 5.5" stroke={FOREST_MID} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </div>
              ))}
            </div>
            <button style={{ width: '100%', padding: '14px', borderRadius: 10, border: `1.5px solid ${FOREST}`, background: 'transparent', color: FOREST, fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              Contact Us
            </button>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 48, padding: '28px', background: SAND, borderRadius: 16 }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, color: INK, marginBottom: 8 }}>The math is simple</div>
          <div className="revenue-grid">
            {[
              { label: '1,000 Premium Vendors', val: 'R49,000/month' },
              { label: '20,000 Transactions (2% fee)', val: 'R32,000/month' },
              { label: 'Combined Revenue Potential', val: 'R81,000+/month' },
            ].map(r => (
              <div key={r.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 700, color: FOREST }}>{r.val}</div>
                <div style={{ fontSize: 12, color: INK_MUTED, marginTop: 4 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    { name: 'Nomsa Dlamini', role: 'Fresh Fruit Vendor · Pretoria', rating: 5, body: '"Before Reka Local, I moved to three different spots every week and my regulars could never find me. Now they just open the app and I\'m right there. My sales are up 40% since I joined."', img: 'https://images.unsplash.com/photo-1610722839611-f7837e1dd39f?w=80&h=80&fit=crop&auto=format' },
    { name: 'Sipho Ndlovu', role: 'Shoe Repair · Johannesburg', rating: 5, body: '"I don\'t have a smartphone but my nephew helped me register. Now customers scan my QR code and pay — I don\'t even touch a phone during the sale. It\'s magic."', img: 'https://images.unsplash.com/photo-1680713660046-67b7350ed679?w=80&h=80&fit=crop&auto=format' },
    { name: 'Lerato Mokoena', role: 'Customer · Soweto', rating: 5, body: '"I used to drive past the same vendors every day not knowing what they sold. Now I use Reka Local to find who has the best vetkoek near me before I even leave home."', img: 'https://images.unsplash.com/photo-1497271679421-ce9c3d6a31da?w=80&h=80&fit=crop&auto=format' },
  ]
  return (
    <section className="section-pad" style={{ background: CREAM, padding: '100px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: FOREST_MID, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Real Stories</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 44, lineHeight: 1.1, color: INK }}>The community speaks.</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.name} style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #ede6db', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: t.rating }).map((_, i) => <span key={i} style={{ color: AMBER, fontSize: 18 }}>★</span>)}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: INK, margin: 0, fontStyle: 'italic', fontFamily: 'Fraunces, serif', fontWeight: 300 }}>{t.body}</p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 'auto' }}>
                <img src={t.img} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', background: SAND }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: INK }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: INK_MUTED }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="section-pad" style={{ background: FOREST, padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, color: AMBER_LIGHT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Join the Movement</div>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, color: '#fff', margin: '0 0 24px' }}>
          Find Local.<br />Support Local.<br />
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: AMBER_LIGHT }}>Grow Together.</em>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: '0 0 40px' }}>
          Join thousands of customers and vendors already building a stronger, more connected South African community.
        </p>
        <div className="cta-buttons">
          <button style={{ padding: '16px 36px', borderRadius: 12, border: 'none', background: AMBER, color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Explore Vendors Near You
          </button>
          <button style={{ padding: '16px 36px', borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff', fontWeight: 600, fontSize: 16, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            Register as a Vendor
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#0f2a1e', padding: '60px 24px 32px', color: 'rgba(255,255,255,0.55)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: FOREST, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={AMBER_LIGHT}/></svg>
              </div>
              <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 18, color: '#fff' }}>Reka <span style={{ color: AMBER }}>Local</span></span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 280, margin: '0 0 20px' }}>
              Connecting communities with trusted street vendors. Building the digital future of South Africa's informal economy.
            </p>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: AMBER_LIGHT, background: 'rgba(245,166,35,0.1)', borderRadius: 6, padding: '6px 12px', display: 'inline-block' }}>
              Dial *123# to register
            </div>
          </div>
          {[
            { head: 'Platform', links: ['For Customers', 'For Vendors', 'How It Works', 'Pricing', 'Tourist Mode'] },
            { head: 'Company', links: ['About Us', 'Blog', 'Careers', 'Press', 'Contact'] },
            { head: 'Support', links: ['Help Centre', 'Community', 'Partnerships', 'Municipalities', 'NGO Program'] },
          ].map(col => (
            <div key={col.head}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>{col.head}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
          <div style={{ fontSize: 13 }}>© 2026 Reka Local. Built for South Africa's street economy.</div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Accessibility'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Inclusive />
      <WhatMakesDifferent />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
