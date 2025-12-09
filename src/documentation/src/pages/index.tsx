import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [typedText, setTypedText] = useState('');
  const fullText = 'From Fundamentals to Autonomous Humanoids';
  const subtitles = [
    'with ROS 2, Isaac Sim, and VLA Models',
    'Building the Future of Robotics',
    'Learn by Doing, Build by Creating'
  ];
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [fade, setFade] = useState(true);

  // Typing effect for main heading
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Subtitle rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      {/* Animated background elements */}
      <div className={styles.floatingShapes}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
      </div>

      <div className="container">
        <div className={styles.headerContent}>
          {/* Badge/Chip for trending topic */}
          <div className={styles.trendingBadge}>
            <span className={styles.badgeIcon}>🔥</span>
            Trending in AI & Robotics
          </div>

          <Heading as="h1" className={clsx('hero__title', styles.animatedTitle)}>
            <span className={styles.gradientText}>Physical AI &</span>
            <br />
            <span className={styles.humanoidText}>Humanoid Robotics</span>
          </Heading>

          {/* Typewriter effect container */}
          <div className={styles.typewriterContainer}>
            <p className={styles.typedText}>{typedText}<span className={styles.cursor}>|</span></p>
          </div>

          {/* Animated subtitle */}
          <p className={clsx('hero__subtitle', styles.heroSubtitle, { [styles.fadeIn]: fade, [styles.fadeOut]: !fade })}>
            {subtitles[currentSubtitle]}
          </p>

          {/* Key features chips */}
          <div className={styles.featureChips}>
            <span className={styles.chip}>
              <span className={styles.chipIcon}>🤖</span> ROS 2
            </span>
            <span className={styles.chip}>
              <span className={styles.chipIcon}>🎮</span> Isaac Sim
            </span>
            <span className={styles.chip}>
              <span className={styles.chipIcon}>🧠</span> VLA Models
            </span>
            <span className={styles.chip}>
              <span className={styles.chipIcon}>⚡</span> Real-time
            </span>
          </div>

          {/* CTA Buttons */}
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--primary button--lg', styles.ctaButton)}
              to="/docs/chapters/module1/chapter1">
              <span className={styles.buttonContent}>
                <span className={styles.buttonIcon}>🚀</span>
                Start Learning - Chapter 1
              </span>
            </Link>
            
            <Link
              className={clsx('button button--outline button--lg', styles.secondaryButton)}
              to="/docs/chapters/introduction">
              <span className={styles.buttonContent}>
                <span className={styles.buttonIcon}>📚</span>
                View Full Curriculum
              </span>
            </Link>
          </div>

          {/* Quick stats */}
          <div className={styles.quickStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>12+</div>
              <div className={styles.statLabel}>Chapters</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Practical Labs</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Community Support</div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={styles.scrollIndicator}>
            <div className={styles.mouse}>
              <div className={styles.wheel}></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const features = [
    {
      icon: '🌀',
      title: 'ROS 2 Fundamentals',
      desc: 'Modern robotics ke liye complete framework'
    },
    {
      icon: '🎮',
      title: 'Isaac Sim',
      desc: 'NVIDIA ka powerful simulation platform'
    },
    {
      icon: '🧠',
      title: 'VLA Models',
      desc: 'Vision-Language-Action for intelligent robots'
    },
    {
      icon: '🤖',
      title: 'Humanoid Systems',
      desc: 'Complete autonomous humanoid robot build'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
      title={`${siteConfig.title} - Master Physical AI & Robotics`}
      description="Learn to build intelligent robots with ROS 2, Isaac Sim, and VLA models. Complete guide from basics to advanced humanoid systems.">
      
      <HomepageHeader />
      
      <main className={styles.mainContent}>
        {/* Journey Section */}
        <section className={styles.journeySection}>
          <div className="container">
            <div className={styles.journeyContainer}>
              <div className={styles.journeyBadge}>
                <span className={styles.badgeIcon}>🚀</span>
                START YOUR JOURNEY
              </div>
              
              <Heading as="h2" className={styles.journeyTitle}>
                Embodied Intelligence ka <span className={styles.gradientText}>Safar</span>
              </Heading>
              
              <p className={styles.journeyDesc}>
                AI ko physical world se milayein. Yeh comprehensive guide aapko ROS 2 fundamentals se 
                le kar autonomous humanoid robots tak le jayegi. Gazebo, Unity, NVIDIA Isaac Sim, aur 
                cutting-edge VLA models ka practical experience hasil karein.
              </p>
              
              {/* Animated Features */}
              <div className={styles.animatedFeatures}>
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={clsx(styles.featureCard, {
                      [styles.activeFeature]: index === activeIndex
                    })}
                  >
                    <div className={styles.featureIcon}>{feature.icon}</div>
                    <div className={styles.featureContent}>
                      <h4 className={styles.featureTitle}>{feature.title}</h4>
                      <p className={styles.featureText}>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Tech Stack */}
              <div className={styles.techStack}>
                <div className={styles.techLabel}>Master These Tools:</div>
                <div className={styles.techIcons}>
                  <span className={styles.techIcon}>📦 ROS 2</span>
                  <span className={styles.techIcon}>⚡ Isaac Sim</span>
                  <span className={styles.techIcon}>🔤 VLA Models</span>
                  <span className={styles.techIcon}>🤖 Humanoids</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className={styles.ctaButtons}>
                <Link
                  className={clsx('button button--primary button--lg', styles.primaryBtn)}
                  to="/docs">
                  <span className={styles.btnIcon}>📚</span>
                  Explore All Chapters
                </Link>
                
                <Link
                  className={clsx('button button--outline button--lg', styles.secondaryBtn)}
                  to="/docs/chapters/module1/chapter1">
                  <span className={styles.btnIcon}>🚀</span>
                  Start Reading Chapter 1
                </Link>
              </div>
              
              {/* Quick Stats */}
             
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className={styles.finalCTASection}>
          <div className="container">
            <div className={styles.finalCTA}>
              <Heading as="h2" className={styles.ctaTitle}>
                Ready to Build the <span className={styles.ctaHighlight}>Future?</span>
              </Heading>
              
              <p className={styles.ctaDesc}>
                Join thousands of developers and researchers mastering Physical AI. 
                Start your journey today with our free first chapter.
              </p>
              
              <Link
                className={clsx('button button--primary button--lg', styles.finalBtn)}
                to="/docs/chapters/module1/chapter1">
                <span className={styles.btnIcon}>🔥</span>
                Get Started Now - Free
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}