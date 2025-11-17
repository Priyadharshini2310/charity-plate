import React, { JSX, useEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

type InfiniteMovingCardsProps = {
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    addAnimation();
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    const scroller = scrollerRef.current;
    const container = containerRef.current;
    if (!scroller || !container) return;

    // If already duplicated, skip duplicating again
    // We'll mark the scroller with a data attribute after duplication
    if (scroller.dataset.duplicated === "true") {
      applyDirectionAndSpeed(container);
      setStarted(true);
      return;
    }

    const children = Array.from(scroller.children);

    // Clone each child and append to create continuous scroll
    children.forEach((child) => {
      const duplicated = child.cloneNode(true) as HTMLElement;
      scroller.appendChild(duplicated);
    });

    scroller.dataset.duplicated = "true";

    applyDirectionAndSpeed(container);
    setStarted(true);
  }

  const applyDirectionAndSpeed = (container: HTMLDivElement) => {
    if (!container) return;

    if (direction === "left") {
      container.style.setProperty("--animation-direction", "forwards");
    } else {
      container.style.setProperty("--animation-direction", "reverse");
    }

    if (speed === "fast") {
      container.style.setProperty("--animation-duration", "20s");
    } else if (speed === "normal") {
      container.style.setProperty("--animation-duration", "40s");
    } else {
      container.style.setProperty("--animation-duration", "80s");
    }
  };

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 max-w-7xl overflow-hidden ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap ${
          started ? "animate-scroll" : ""
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] h-[250px] max-w-full relative rounded-2xl border border-gray-200 px-8 py-6 md:w-[450px] bg-white shadow-lg flex-shrink-0"
            key={idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              />
              <span className="relative z-20 text-sm leading-[1.6] text-gray-700 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-gray-900 font-semibold">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-gray-600 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>

      {/* Use plain <style> so TypeScript DOM typings are satisfied (no jsx prop) */}
      <style>{`
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.5rem));
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
        }
      `}</style>
    </div>
  );
};

// Testimonials section
export default function TestimonialsSection(): JSX.Element {
  const testimonials: Testimonial[] = [
    {
      quote:
        "CharityPlate made it so easy to find a cause that I genuinely believe in. The transparency is incredible!",
      name: "Jane Smith",
      title: "Donor",
    },
    {
      quote:
        "The platform is a game-changer for small charities. It has significantly increased our reach and donor base.",
      name: "David Chen",
      title: "Charity Director",
    },
    {
      quote:
        "I love that I can see exactly how my donation is being used. It builds so much trust.",
      name: "Mark Johnson",
      title: "Donor",
    },
    {
      quote:
        "The verification process gives me confidence that my donations are going to legitimate causes.",
      name: "Sarah Williams",
      title: "Monthly Donor",
    },
    {
      quote:
        "CharityPlate has helped us connect with donors who truly care about our mission. It's been transformative.",
      name: "Michael Torres",
      title: "Non-Profit Founder",
    },
    {
      quote:
        "The best charity platform I've used. Simple, transparent, and truly makes a difference.",
      name: "Emily Rodriguez",
      title: "Donor",
    },
  ];

  return (
    <section id="testimonials" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            WORDS FROM OUR COMMUNITY
          </h2>
          <p className="text-lg text-gray-600">What people are saying about us</p>
        </div>

        <div className="relative flex flex-col items-center justify-center overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
