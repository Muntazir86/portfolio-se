'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAnimationTrigger } from '@/hooks/useAnimationTrigger';
import { fadeInUp, apiResponse } from '@/lib/animations';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormResponse {
  status: string,
  data: string,
}

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<{ success: boolean; data?: ContactFormResponse; error?: string } | null>(null);
  const { ref, shouldAnimate } = useAnimationTrigger({ threshold: 0.3 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setResponse(null);

    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backend}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await res.json();

      if(result.success) {
        setResponse(result);
        toast.success('Message sent successfully!');
        reset();
      } else {
        setResponse(result);
        toast.error('Failed to send message');
      }
    } catch (error) {
      const errorResponse = {
        success: false,
        error: 'Failed to send message. Please try again.',
      };
      setResponse(errorResponse);
      toast.error('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-8">
            Let&apos;s discuss your next project or opportunity
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* API Documentation Style Form */}
          <motion.div
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="bg-[var(--color-surface)] rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-2 py-1 bg-[var(--color-accent)] text-black text-xs font-bold rounded">
                  POST
                </span>
                <code className="text-[var(--color-primary)] font-mono">/api/contact</code>
              </div>
              
              <p className="text-[var(--color-text-secondary)] mb-6">
                Send a message to initiate contact and collaboration opportunities.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    name <span className="text-[var(--color-secondary)]">*</span>
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-surface)] rounded-lg text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-[var(--color-secondary)] text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    email <span className="text-[var(--color-secondary)]">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-surface)] rounded-lg text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-[var(--color-secondary)] text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    subject <span className="text-[var(--color-secondary)]">*</span>
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    type="text"
                    className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-surface)] rounded-lg text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="Project inquiry, job opportunity, etc."
                  />
                  {errors.subject && (
                    <p className="text-[var(--color-secondary)] text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    message <span className="text-[var(--color-secondary)]">*</span>
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-surface)] rounded-lg text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                  {errors.message && (
                    <p className="text-[var(--color-secondary)] text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* API Response */}
            {response && (
              <motion.div
                variants={apiResponse}
                initial="hidden"
                animate="visible"
                className="bg-[var(--color-surface)] rounded-lg p-6"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded ${
                    response.success 
                      ? 'bg-[var(--color-accent)] text-black' 
                      : 'bg-[var(--color-secondary)] text-white'
                  }`}>
                    {response.success ? '200 OK' : '500 ERROR'}
                  </span>
                  <code className="text-[var(--color-text-secondary)] font-mono text-sm">
                    Response
                  </code>
                </div>
                
                <pre className="bg-[var(--color-background)] p-4 rounded text-sm overflow-x-auto">
                  <code className={response.success ? 'text-[var(--color-accent)]' : 'text-[var(--color-secondary)]'}>
                    {JSON.stringify(response, null, 2)}
                  </code>
                </pre>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={fadeInUp}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-[var(--color-surface)] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    icon: '📧',
                    label: 'Email',
                    value: 'eng.shabbirr@gmail.com',
                    href: 'mailto:eng.shabbirr@gmail.com'
                  },
                  {
                    icon: '💼',
                    label: 'LinkedIn',
                    value: '/in/ghulam-shabbir-a396bc5',
                    href: 'https://linkedin.com//in/ghulam-shabbir-a396bc5'
                  },
                  {
                    icon: '🐙',
                    label: 'GitHub',
                    value: '/Muntazir86',
                    href: 'https://github.com/Muntazir86'
                  },
                  {
                    icon: '📍',
                    label: 'Location',
                    value: 'Lahore, PK',
                    href: null
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-3 rounded hover:bg-[var(--color-background)] transition-colors"
                  >
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <div className="text-sm text-[var(--color-text-secondary)]">{contact.label}</div>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <div className="text-[var(--color-text-primary)]">{contact.value}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-[var(--color-surface)] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                Current Availability
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--color-text-primary)]">Available for new projects</span>
                </div>
                
                <div className="text-sm text-[var(--color-text-secondary)]">
                  <p>• Full-time opportunities</p>
                  <p>• Freelance projects</p>
                  <p>• Consulting engagements</p>
                  <p>• Technical mentoring</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-[var(--color-surface)] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                Response Time
              </h3>
              
              <div className="text-[var(--color-text-secondary)]">
                <p className="mb-2">I typically respond within:</p>
                <div className="space-y-1 text-sm">
                  <p>• Email: 24 hours</p>
                  <p>• LinkedIn: 48 hours</p>
                  <p>• Urgent matters: Same day</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
