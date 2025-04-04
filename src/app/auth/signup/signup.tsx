"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// OOP Class for Animations
class SignUpAnimations {
  static container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  static item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  static buttonHover = {
    scale: 1.02,
    boxShadow: "0 5px 15px rgba(103, 103, 183, 0.4)"
  };

  static buttonTap = {
    scale: 0.98
  };

  static imageFloat = {
    y: [-5, 5],
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  static footer = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.4 }
  };
}

// OOP Class for Layout
class SignUpLayout {
  static mainContainer = "flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200";
  
  static imageSection = "flex-1 relative p-8 flex flex-col justify-center items-center";
  
  static formSection = "flex-1 flex flex-col items-center justify-center p-8 bg-white shadow-xl md:shadow-2xl";
  
  static logoContainer = "w-[111px] h-[111px] relative mb-8";
  
  static inputField = "w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7171c1] transition-all duration-300";
  
  static submitButton = "w-full h-[44px] bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-lg hover:opacity-90 disabled:opacity-70 font-medium tracking-wide";
  
  static footer = "text-center space-y-4 pt-4 w-full max-w-[424px]";
  
  static loginLink = "text-[#7171c1] text-sm md:text-base";
  
  static footerLinks = "flex flex-wrap justify-center gap-2 text-xs md:text-sm text-gray-500";
}

// Content Class
class SignUpContent {
  static footerLinks = [
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms", href: "/terms" },
    { text: "Contact", href: "/contact" }
  ];
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fullName: ''
  });
  const [step, setStep] = useState<'form' | 'confirm' | 'complete'>('form');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('confirm');
    }, 2000);
  };

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('complete');
    }, 1500);
  };

  const handleComplete = () => {
    // Redirect to feed section after successful signup
    window.location.href = '/feed';
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className={SignUpLayout.mainContainer}
    >
      {/* Image Section */}
      <motion.div 
        className={SignUpLayout.imageSection}
        variants={SignUpAnimations.container}
      >
        <motion.div 
          className="relative w-full max-w-[563px] h-[433px]"
          variants={{
            float: SignUpAnimations.imageFloat
          }}
          initial="hidden"
          animate="float"
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-o9pwz4-w8v6Rqn/frame-20-6.png"
            alt="Empower Women"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        <motion.div 
          className="mt-8 text-center max-w-md"
          variants={SignUpAnimations.item}
        >
          <motion.h2 
            className="text-3xl font-bold text-[#7171c1] mb-2"
            whileHover={{ scale: 1.02 }}
          >
            Empower Women,
          </motion.h2>
          <motion.h2 
            className="text-3xl font-bold text-[#7171c1] mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Transform Workplaces
          </motion.h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to BW2CLUB, a global community that empowers women and girls and partners with companies to create inclusive spaces for personal growth, professional success, and meaningful connections.
          </p>
        </motion.div>
      </motion.div>

      {/* Form Section */}
      <motion.div 
        className={SignUpLayout.formSection}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className={SignUpLayout.logoContainer}
          whileHover={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-o9pwz4-w8v6Rqn/logo-6.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-[424px]"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-[#6767b7] mb-8 md:mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Sign Up
              </motion.h1>

              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                variants={SignUpAnimations.container}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={SignUpAnimations.item}>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={SignUpLayout.inputField}
                    placeholder="Full Name"
                    required
                  />
                </motion.div>

                <motion.div variants={SignUpAnimations.item}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={SignUpLayout.inputField}
                    placeholder="Email address"
                    required
                  />
                </motion.div>

                <motion.div variants={SignUpAnimations.item}>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={SignUpLayout.inputField}
                    placeholder="Choose a username"
                    required
                  />
                </motion.div>

                <motion.div 
                  className="relative"
                  variants={SignUpAnimations.item}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={SignUpLayout.inputField}
                    placeholder="Password"
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image
                      src="https://dashboard.codeparrot.ai/api/image/Z-o9pwz4-w8v6Rqn/eye-1-6.png"
                      alt="Toggle password"
                      width={24}
                      height={24}
                    />
                  </motion.button>
                </motion.div>

                <motion.div variants={SignUpAnimations.item}>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={SignUpLayout.submitButton}
                    whileHover={SignUpAnimations.buttonHover}
                    whileTap={SignUpAnimations.buttonTap}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Creating account...
                      </span>
                    ) : (
                      'Sign Up'
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-[424px] text-center"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-[#6767b7] mb-8 md:mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                Confirm Email
              </motion.h1>

              <motion.div className="space-y-6">
                <p className="text-gray-600 mb-6">
                  We've sent a confirmation link to {formData.email}. Please check your inbox and click the link to verify your account.
                </p>

                <motion.button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className={SignUpLayout.submitButton}
                  whileHover={SignUpAnimations.buttonHover}
                  whileTap={SignUpAnimations.buttonTap}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Verifying...
                    </span>
                  ) : (
                    'I have confirmed my email'
                  )}
                </motion.button>

                <p className="text-sm text-gray-500">
                  Didn't receive the email? <button className="text-[#7171c1] hover:underline">Resend</button>
                </p>
              </motion.div>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-[424px] text-center"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-[#6767b7] mb-8 md:mb-12"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                Welcome, {formData.username}!
              </motion.h1>

              <motion.div className="space-y-6">
                <div className="mb-6">
                  <motion.div 
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <p className="text-gray-600">
                    Your account has been successfully created! You can now access all the features of our platform.
                  </p>
                </div>

                <motion.button
                  onClick={handleComplete}
                  className={SignUpLayout.submitButton}
                  whileHover={SignUpAnimations.buttonHover}
                  whileTap={SignUpAnimations.buttonTap}
                >
                  Continue to Dashboard
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {step === 'form' && (
          <motion.div
            className={SignUpLayout.footer}
            initial={SignUpAnimations.footer.initial}
            animate={SignUpAnimations.footer.animate}
            transition={SignUpAnimations.footer.transition}
          >
            <p className={SignUpLayout.loginLink}>
              Already have an account?{' '}
              <Link href="/auth/signin" className={SignUpLayout.loginLink}>
                Log in
              </Link>
            </p>
            <div className={SignUpLayout.footerLinks}>
              {SignUpContent.footerLinks.map((link) => (
                <Link 
                  key={link.text}
                  href={link.href}
                  className="hover:underline hover:text-[#7171c1]"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SignUp;