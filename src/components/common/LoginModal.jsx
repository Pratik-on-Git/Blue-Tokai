import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import logo from "../../assets/img/logo.png";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "##00000050", 
  backdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
};

const modalStyle = {
  background: "#fff",
  borderRadius: 8,
  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  display: "flex",
  flexDirection: "row",
  minWidth: 720,
  maxWidth: 900,
  minHeight: 420,
  overflow: "hidden",
  position: "relative",
};

const leftStyle = {
  background: "#111",
  color: "#fff",
  flex: 1.1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "3.5rem 2.5rem 2.5rem 2.5rem",
  position: "relative",
  minWidth: 320,
};

const blurStyle = {
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  height: 160,
  background: "linear-gradient(100deg, #ff7a00 0%, #ffb22c 60%, #fff 100%)",
  filter: "blur(55px)"
};

const rightStyle = {
  flex: 1.3,
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "2.5rem 2.5rem 2rem 2.5rem",
  position: "relative",
};

const closeStyle = {
  position: "absolute",
  top: 18,
  right: 18,
  fontSize: 22,
  color: "#888",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  zIndex: 2,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  margin: "14px 0",
  borderRadius: 8,
  border: "1.5px solid #ddd",
  fontSize: 17,
  background: "#fff",
  transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s"
};

const buttonStyle = {
  width: "100%",
  padding: "15px 0",
  background: "#ff7a00",
  color: "#fff",
  fontWeight: 700,
  fontSize: 20,
  border: "none",
  borderRadius: 8,
  marginTop: 24,
  cursor: "pointer",
  letterSpacing: 1,
  boxShadow: "0 2px 8px rgba(255,122,0,0.08)",
  transition: "background 0.18s, color 0.18s",
};

const coffeeImages = [
  "https://bluetokaicoffee.com/cdn/shop/files/img5.jpg?v=1747993563&width=1800",
  "https://bluetokaicoffee.com/cdn/shop/files/Lifestyle_4_bcc19eef-90f6-43ba-8ca2-c5571d31a385.jpg?v=1717566552&width=1800",
  ];

const LoginModal = ({ open, onClose }) => {
  const overlayRef = useRef(null);
  const boxRef = useRef(null);
  const formRef = useRef(null);
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const [visible, setVisible] = useState(open);
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [randomCoffeeImg, setRandomCoffeeImg] = useState(null);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Validation logic
  const isEmailValid = signupEmail.includes("@") && signupEmail.includes(".com");
  const isEmailBlank = signupEmail.trim() === "";
  const isPasswordBlank = signupPassword.trim() === "";
  const isConfirmBlank = signupConfirm.trim() === "";
  const isConfirmValid = signupConfirm === signupPassword && !isConfirmBlank;
  const isConfirmInvalid = signupConfirm !== signupPassword && !isConfirmBlank;

  // Login validation
  const isLoginEmailValid = loginEmail.includes("@") && loginEmail.includes(".com");
  const isLoginEmailBlank = loginEmail.trim() === "";
  const isLoginPasswordBlank = loginPassword.trim() === "";

  // Show/hide logic for modal
  useEffect(() => {
    if (open) {
      setVisible(true);
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        boxRef.current,
        { scale: 0.7, opacity: 0, y: 60 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }
      );
    } else if (visible) {
      gsap.to(boxRef.current, {
        scale: 0.7,
        opacity: 0,
        y: 60,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setVisible(false),
      });
    }
  }, [open, visible]);

  // Animate form content on mode change
  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [mode]);

  // Animate left/right section slide on mode change
  useEffect(() => {
    if (!leftSectionRef.current || !rightSectionRef.current) return;
    if (mode === "signup") {
      gsap.to(leftSectionRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power2.inOut"
      });
      gsap.fromTo(
        rightSectionRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power2.inOut" }
      );
    } else {
      gsap.to(leftSectionRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power2.inOut"
      });
      gsap.fromTo(
        rightSectionRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power2.inOut" }
      );
    }
  }, [mode]);

  if (!visible) return null;

  return (
    <div ref={overlayRef} style={overlayStyle} onClick={onClose}>
      <div ref={boxRef} style={modalStyle} onClick={e => e.stopPropagation()}>
        {/* Left */}
        <div ref={leftSectionRef} style={leftStyle}>
          <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.18, marginBottom: 12 }}>
            Hey!<br />Sipping Coffee <br />Makes Me Feel Like<br />I’m winning at life.
          </div>
          <div style={{ fontSize: 38, fontWeight: 600, lineHeight: 1.18, marginBottom: 12, color: "#000", zIndex: "1" }}>
            What About You?
          </div>
          <div style={blurStyle}></div>
        </div>
        {/* Show random coffee image when left is out (signup mode) */}
        {mode === "signup" && randomCoffeeImg && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <img
              src={randomCoffeeImg}
              alt="Coffee"
              style={{
                width: "24vw",
                height: "100vh",
                objectFit: "cover",
                boxShadow: "0 2px 24px rgba(0,0,0,0.18)",
              }}
            />
          </div>
        )}
        {/* Right */}
        <div ref={rightSectionRef} style={rightStyle}>
          <button style={closeStyle} onClick={onClose} aria-label="Close">&times;</button>
          <div style={{ marginBottom: 18 }}>
            <img src={logo} alt="Logo" style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", margin: "0 auto 10px auto", display: "block", boxShadow: "0 2px 8px rgba(0,0,0,0.10)", background: "#000"}} />
          </div>
          <div ref={formRef}>
            {mode === "login" ? (
              <>
                <div style={{ fontSize: 30, fontWeight: 700, marginBottom: 6, color: "#000" }}>Let's Get Started</div>
                <div style={{ color: "#888", fontSize: 16, marginBottom: 18 }}>Welcome to Blue Tokai Coffee Roasters</div>
                <div style={{ width: "100%", borderBottom: "1.5px solid #eee", margin: "18px 0 10px 0" }}></div>
                <div style={{ width: "100%", textAlign: "left", fontWeight: 500, color: "#888", fontSize: 15, marginTop: 8 }}>Your Email</div>
                <input
                  type="email"
                  placeholder="hi@bluetokai.in"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: isLoginEmailBlank ? "1.5px solid #ddd" : isLoginEmailValid ? "1.5px solid #ffb22c" : "1.5px solid #e74c3c"
                  }}
                />
                <div style={{ width: "100%", textAlign: "left", fontWeight: 500, color: "#888", fontSize: 15, marginTop: 8 }}>Password</div>
                <input
                  type="password"
                  placeholder="**********"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: isLoginPasswordBlank ? "1.5px solid #ddd" : "1.5px solid #ffb22c"
                  }}
                />
                <button style={buttonStyle}>Login</button>
                <div style={{ marginTop: 18, fontSize: 15, color: "#888" }}>
                  Don't have an account?{" "}
                  <span
                    style={{ color: "#ff7a00", cursor: "pointer", fontWeight: 600 }}
                    onClick={() => {
                      const randomImg = coffeeImages[Math.floor(Math.random() * coffeeImages.length)];
                      setRandomCoffeeImg(randomImg);
                      gsap.to(formRef.current, {
                        opacity: 0,
                        y: -40,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => setMode("signup"),
                      });
                    }}
                  >
                    Sign Up
                  </span>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 30, fontWeight: 700, marginBottom: 2, color: "#000" }}>Create Account</div>
                <div style={{ color: "#888", fontSize: 16, marginBottom: 10 }}>Join Blue Tokai Coffee Roasters</div>
                <div style={{ width: "100%", borderBottom: "1.5px solid #eee", margin: "10px 0 10px 0", }}></div>
                <div style={{ width: "100%", textAlign: "left", fontWeight: 500, color: "#888", fontSize: 15, marginTop: 4,  }}>Your Email</div>
                <input
                  type="email"
                  placeholder="hi@bluetokai.in"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  style={{
                    ...inputStyle,
                    padding: "6px 16px",
                    border: isEmailBlank ? "1.5px solid #ddd" : isEmailValid ? "1.5px solid #ffb22c" : "1.5px solid #e74c3c"
                  }}
                />
                <div style={{ width: "100%", textAlign: "left", fontWeight: 500, color: "#888", fontSize: 15, marginTop: 4,  }}>Create Password</div>
                <input
                  type="password"
                  placeholder="**********"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: isPasswordBlank ? "1.5px solid #ddd" : "1.5px solid #ffb22c",
                    padding: "6px 16px"
                  }}
                />
                <div style={{ width: "100%", textAlign: "left", fontWeight: 500, color: "#888", fontSize: 15, marginTop: 4,  }}>Confirm Password</div>
                <input
                  type="password"
                  placeholder="**********"
                  value={signupConfirm}
                  onChange={e => setSignupConfirm(e.target.value)}
                  style={{
                    ...inputStyle,
                    border: isConfirmBlank ? "1.5px solid #ddd" : isConfirmValid ? "1.5px solid #ffb22c" : isConfirmInvalid ? "1.5px solid #e74c3c" : "1.5px solid #ddd",
                    padding: "6px 16px"
                  }}
                />
                <button style={buttonStyle}>Sign Up</button>
                <div style={{ marginTop: 18, fontSize: 15, color: "#888" }}>
                  Already have an account?{" "}
                  <span
                    style={{ color: "#ff7a00", cursor: "pointer", fontWeight: 600 }}
                    onClick={() => {
                      setRandomCoffeeImg(null);
                      gsap.to(formRef.current, {
                        opacity: 0,
                        y: -40,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => setMode("login"),
                      });
                    }}
                  >
                    Login
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 