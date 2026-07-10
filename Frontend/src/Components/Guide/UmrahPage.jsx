// pages/UmrahPage.js
import React, { useState, useEffect, useRef } from "react";
import { HelpCircle } from "lucide-react";
import gsap from "gsap";
import { useScrollLock } from "../../Hooks/useScrollLock";
import guideHeroBg from "../../assets/Images/Guide/guide-2.jpg";
import introImage from "../../assets/Images/Guide/Umrah Guide/umrah-introduction-kaaba.jpg";
import stepsImage from "../../assets/Images/Guide/Umrah Guide/how-to-perform-umrah.jpg";
import tawafImage from "../../assets/Images/Guide/Umrah Guide/tawaf-kaaba.jpg";
import saiImage from "../../assets/Images/Guide/Umrah Guide/sai-safa-marwah.jpg";
import halqImage from "../../assets/Images/Guide/Umrah Guide/halq-taqsir.jpg";
import ihramImage from "../../assets/Images/Guide/Umrah Guide/ihram-clothing.jpg";
import violationsImage from "../../assets/Images/Guide/Umrah Guide/violations-penalties.jpg";

function UmrahPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  useScrollLock(Boolean(selectedCard));

  // Hero Section Refs
  const containerRef = useRef(null);
  const iconSectionRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);

  // Hero Section Animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Initial state
    gsap.set(
      [
        containerRef.current,
        iconSectionRef.current,
        titleRef.current,
        subtitleRef.current,
        badgeRef.current,
      ],
      { opacity: 0, y: 30 },
    );
    gsap.set([leftLineRef.current, rightLineRef.current], { scaleX: 0 });
    gsap.set(leftLineRef.current, { transformOrigin: "right center" });
    gsap.set(rightLineRef.current, { transformOrigin: "left center" });
    gsap.set(iconRef.current, { scale: 0, rotation: 180, opacity: 0 });

    // Faster GSAP sequence
    tl.to(containerRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0)
      .to(iconSectionRef.current, { opacity: 1, y: 0, duration: 0.45 }, 0.15)
      .to(leftLineRef.current, { scaleX: 1, duration: 0.5 }, 0.3)
      .to(rightLineRef.current, { scaleX: 1, duration: 0.5 }, 0.3)
      .to(
        iconRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.45,
          ease: "back.out(1.8)",
        },
        0.75,
      )
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.05)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.4)
      .to(
        badgeRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.4 },
        1.75,
      );
  }, []);

  const HeroSection = () => {
    return (
      <div
        style={{
          backgroundImage: `linear-gradient(135deg,
                                        rgba(15, 15, 15, 0.75) 0%,
                                        rgba(0, 0, 0, 0.7) 50%,
                                        rgba(10, 10, 10, 0.8) 100%),
                                        url('${guideHeroBg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="h-[85vh] flex items-center justify-center relative"
      >
        <div
          className="text-gray-800 w-full h-full relative flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          {/* Sparkles - CSS animated, no GSAP */}
          <div className="absolute inset-0 opacity-8 sm:opacity-12 pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-600 rounded-full animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${1.5 + Math.random() * 2}s`,
                  animationDelay: `${Math.random()}s`,
                  boxShadow: `0 0 6px rgba(217, 119, 6, 0.6), 0 0 12px rgba(217, 119, 6, 0.4)`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div
            ref={containerRef}
            className="relative z-10 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8"
          >
            <div className="text-center max-w-6xl mx-auto">
              {/* Icon and Lines */}
              <div
                ref={iconSectionRef}
                className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 mb-3 xs:mb-4 sm:mb-6"
              >
                {/* Left line */}
                <div
                  ref={leftLineRef}
                  className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
                />
                {/* Icon */}
                <div ref={iconRef}>
                  <HelpCircle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-600 flex-shrink-0" />
                </div>
                {/* Right line */}
                <div
                  ref={rightLineRef}
                  className="h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-8 xs:w-12 sm:w-16 md:w-20"
                />
              </div>

              {/* Title - Changed for Umrah Page */}
              <div ref={titleRef}>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 text-white">
                  The Sacred <span className="text-yellow-600">Umrah</span>{" "}
                  Pilgrimage
                </h1>
              </div>

              {/* Subtitle */}
              <div ref={subtitleRef}>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 xs:mb-6 sm:mb-8 leading-relaxed">
                  Complete guide to performing Umrah with spiritual significance
                  and step-by-step instructions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const umrahCards = [
    {
      title: "UMRAH: INTRODUCTION",
      description:
        "Umrah is a pilgrimage to Mecca that can be performed at any time of the year, unlike Hajj which has specific dates.",
      detailedContent: `
                <h3>What is Umrah?</h3>
                <p>The word "Umrah" comes from an Arabic root meaning "to visit a populated place," and in Islam it refers to a visit to the Kaaba in Makkah to perform a specific set of rituals. It is often called the "lesser pilgrimage," to distinguish it from Hajj, the "greater pilgrimage." Unlike Hajj, which can only be performed during a few fixed days in the Islamic month of Dhul Hijjah, Umrah can be performed at any time of the year — which is exactly why it is such an accessible act of worship for Muslims all over the world.</p>
                <p>Umrah is not obligatory in the same way Hajj is (Hajj is one of the Five Pillars of Islam, required once in a lifetime for those who are physically and financially able). Most scholars consider Umrah a strongly recommended Sunnah — an act the Prophet Muhammad (peace be upon him) performed himself and encouraged others to perform — while some schools of thought consider it obligatory at least once, similar to Hajj. Either way, it is regarded as one of the most rewarding acts of worship a Muslim can undertake.</p>
                <p>Historically, the rituals of Umrah trace back to Prophet Ibrahim (Abraham) and his family, and were later confirmed and demonstrated in their present form by Prophet Muhammad (PBUH), who performed Umrah four times during his lifetime.</p>

                <h3>Significance</h3>
                <ul>
                    <li><strong>Spiritual purification and renewal:</strong> Umrah is often described as a spiritual "reset" — a chance to leave behind bad habits, mend your relationship with Allah, and return home with a lighter heart.</li>
                    <li><strong>Forgiveness of sins:</strong> The Prophet (PBUH) taught that performing one Umrah after another is an expiation for the sins committed in between them — a powerful reason so many pilgrims return to Makkah again and again.</li>
                    <li><strong>Following the Sunnah:</strong> By performing Umrah, pilgrims walk in the footsteps of the Prophet (PBUH), physically re-enacting the same rituals he performed centuries ago.</li>
                    <li><strong>Strengthening faith and connection with Allah:</strong> Standing before the Kaaba for the first time is, for many pilgrims, one of the most emotional and faith-affirming moments of their lives.</li>
                    <li><strong>Unity of the Ummah:</strong> Every pilgrim, regardless of nationality, language, or wealth, performs the exact same rituals side by side — a living reminder of the equality of the global Muslim community.</li>
                    <li><strong>Answered prayers:</strong> The Haram in Makkah is widely regarded as a place where supplications are especially likely to be accepted, and many pilgrims set aside time during their trip specifically for heartfelt dua.</li>
                </ul>

                <h3>Key Facts</h3>
                <p>The core rituals of Umrah can typically be completed in just two to three hours, though most pilgrims spend several days or weeks in Makkah to also pray in the Haram, visit historical sites, and rest. Umrah consists of four essential rituals, performed in order:</p>
                <ol>
                    <li><strong>Ihram</strong> — entering a sacred state of purity and intention</li>
                    <li><strong>Tawaf</strong> — circling the Kaaba seven times</li>
                    <li><strong>Sa'i</strong> — walking between the hills of Safa and Marwah seven times</li>
                    <li><strong>Halq or Taqsir</strong> — shaving or trimming the hair to mark completion</li>
                </ol>
                <p>Unlike Hajj, Umrah does not include standing at Arafat, staying overnight at Mina or Muzdalifah, or the symbolic stoning of the pillars, which is why it can be completed so much more quickly. Many scholars also teach that performing Umrah during the month of Ramadan carries a reward equivalent to performing Hajj, making Ramadan one of the most spiritually significant — and busiest — times to go.</p>
            `,
      image: introImage,
    },
    {
      title: "HOW TO PERFORM UMRAH",
      description:
        "Follow the prescribed steps in order: Enter Ihram, perform Tawaf, perform Sa'i, and complete with Halq or Taqsir.",
      detailedContent: `
                <h3>Step-by-Step Guide</h3>
                <ol>
                    <li><strong>Enter Ihram:</strong> Before reaching the Miqat (the boundary point around Makkah), take a bath (ghusl) if possible, trim your nails, and put on the Ihram garments. Men wear two plain, unstitched white cloths; women wear any modest, everyday clothing that covers the body except the face and hands.</li>
                    <li><strong>Make Niyyah:</strong> With sincerity, form the intention in your heart that you are entering the sacred state specifically to perform Umrah for the sake of Allah alone. No special wording is required — a heartfelt intention in your own language is enough, though many pilgrims say "Labbayk Allahumma Umrah" ("Here I am, O Allah, for Umrah").</li>
                    <li><strong>Recite Talbiyah:</strong> From the moment you make your intention until you begin Tawaf, continuously and joyfully recite the Talbiyah: <em>"Labbayk Allahumma Labbayk. Labbayka la sharika laka labbayk. Innal hamda wan-ni'mata laka wal mulk, la sharika lak."</em> ("Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, blessing, and sovereignty belong to You. You have no partner.")</li>
                    <li><strong>Perform Tawaf:</strong> Once inside the Haram, circle the Kaaba seven times counter-clockwise, starting and ending at the Black Stone. (See the Tawaf card for the full details.)</li>
                    <li><strong>Pray at Maqam Ibrahim:</strong> After completing Tawaf, offer two short voluntary rak'ahs near the Station of Ibrahim if space allows — if the area is too crowded, you may pray these two rak'ahs anywhere else within the mosque.</li>
                    <li><strong>Perform Sa'i:</strong> Walk seven times between the hills of Safa and Marwah, commemorating Hajar's search for water. (See the Sa'i card for the full details.)</li>
                    <li><strong>Shave or Trim Hair:</strong> Complete your Umrah by having your head shaved (men) or trimming a small length of hair (women). This single act instantly ends your state of Ihram.</li>
                </ol>

                <h3>Important Notes</h3>
                <p>Every restriction of Ihram remains in effect until the final step (Halq or Taqsir) is complete, so keep the prohibitions in mind throughout the entire process, not just at the beginning. While the steps are listed in order, there is no strict time limit between them — it is perfectly fine to rest, eat, or take a short break between Tawaf and Sa'i, for example, though it's best not to let unnecessary days pass in between.</p>
                <p>The Haram complex today is fully equipped for pilgrims of all abilities. Wheelchairs, electric carts, and dedicated lanes are available for elderly or disabled pilgrims performing both Tawaf and Sa'i. Keep yourself hydrated throughout with the freely available Zamzam water, and don't hesitate to pace yourself, especially in hot weather or large crowds.</p>
                <p>This guide is meant to give you a clear, general overview, but every pilgrim's situation is a little different. If you're travelling with a group, your religious guide or a qualified scholar can help with any questions specific to your circumstances.</p>
            `,
      image: stepsImage,
    },
    {
      title: "TAWAF",
      description:
        "Circumambulate the Kaaba seven times in a counter-clockwise direction, starting from the Black Stone.",
      detailedContent: `
                <h3>The Ritual of Tawaf</h3>
                <p>"Tawaf" literally means "to circle" or "to go around," and it is the ritual of walking seven times around the Kaaba in a counter-clockwise direction, always keeping the Kaaba on your left. It takes place in the "Mataf," the large marble courtyard that surrounds the Kaaba.</p>
                <p>Tawaf is a profound act of devotion. Muslims believe that angels in the heavens perform a similar circling around Al-Bayt al-Ma'mur, a sacred structure said to sit directly above the Kaaba, and by performing Tawaf, pilgrims on earth mirror this same act of worship. Each full circuit is called a "shawt," and completing seven of them finishes one Tawaf.</p>

                <h3>Steps for Tawaf</h3>
                <ol>
                    <li>Make sure you are in a state of wudu (ablution) before beginning.</li>
                    <li>Start level with the Black Stone (Hajar al-Aswad), marked by a green light on the floor and a brass line in the marble.</li>
                    <li>If you can safely reach it, kiss or touch the Black Stone; if the crowd is too large, simply raise your hand toward it and say "Bismillahi Allahu Akbar" ("In the name of Allah, Allah is greatest"). Never push or endanger yourself or others to reach it — the intention matters more than the physical touch.</li>
                    <li>Circle the Kaaba keeping it on your left, at a natural, unhurried pace.</li>
                    <li>Between the Yemeni Corner and the Black Stone, it is Sunnah to recite: <em>"Rabbana atina fid-dunya hasanatan wa fil akhirati hasanatan wa qina adhaban-nar"</em> ("Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire").</li>
                    <li>Complete all seven circuits, ending once again at the Black Stone.</li>
                    <li>Afterwards, pray two rak'ahs near Maqam Ibrahim if possible, then drink Zamzam water.</li>
                </ol>

                <h3>Prayers During Tawaf</h3>
                <p>There is no single fixed prayer that must be recited during Tawaf — this is one of the most flexible and personal parts of Umrah. You are free to recite Qur'anic verses, make dhikr (remembrance of Allah, such as SubhanAllah, Alhamdulillah, and Allahu Akbar), or simply speak to Allah in your own words about whatever is on your heart.</p>
                <p>What matters most is khushu: sincerity and focus. Try to stay present in the moment rather than rushing through the circuits, avoid loud conversation or distraction, and be mindful of the pilgrims around you, especially in crowded conditions.</p>
            `,
      image: tawafImage,
    },
    {
      title: "SA'I",
      description:
        "Walk seven times between the hills of Safa and Marwah, commemorating Hajar's search for water.",
      detailedContent: `
                <h3>The Ritual of Sa'i</h3>
                <p>"Sa'i" means "to stride" or "to strive," and it refers to walking seven times between the two small hills of Safa and Marwah, which today sit inside a long, air-conditioned, multi-level marble gallery within the Masjid al-Haram complex. Sa'i is performed immediately after Tawaf and is considered an essential pillar of Umrah by the majority of scholars.</p>
                <p>At its heart, Sa'i is a beautiful symbol of human effort combined with complete trust in Allah — a lesson taken directly from the story of Hajar, the wife of Prophet Ibrahim (AS), explained in more detail below.</p>

                <h3>Procedure</h3>
                <ol>
                    <li>Begin at Safa. As you approach, it is Sunnah to recite the Qur'anic verse: <em>"Inna as-Safa wal Marwata min sha'a'irillah"</em> ("Indeed, Safa and Marwah are among the symbols of Allah," Qur'an 2:158).</li>
                    <li>Climb a few steps up Safa, face the direction of the Kaaba, raise your hands, and make dua — this is an unhurried, personal moment to ask Allah for anything you need.</li>
                    <li>Walk toward Marwah — this is your first "trip."</li>
                    <li>At Marwah, face the Kaaba's direction again and repeat your dua, then walk back toward Safa for your second trip.</li>
                    <li>Continue alternating between the two hills until you have completed seven one-way trips in total, finishing at Marwah (not Safa).</li>
                    <li>Men are encouraged to walk at a brisk pace for a short stretch marked by two green lights along the path; women walk normally the entire way.</li>
                    <li>Escalators, wheelchairs, and a dedicated ground-floor lane for those with disabilities are all available, so pilgrims of every ability can complete Sa'i comfortably.</li>
                </ol>

                <h3>Historical Significance</h3>
                <p>Sa'i re-enacts one of the most moving stories in Islamic tradition. When Prophet Ibrahim (AS), acting on Allah's command, left his wife Hajar and their infant son Ismail alone in the barren valley of Makkah with very limited provisions, Hajar did not despair. As their water ran out and baby Ismail cried from thirst, she ran back and forth between Safa and Marwah seven times, desperately searching the horizon for help or water.</p>
                <p>Her trust in Allah never wavered, and her effort was rewarded. As Ismail's heel struck the ground, the miraculous spring of Zamzam burst forth beneath him, a well that still flows abundantly today, thousands of years later. Muslims perform Sa'i to honor Hajar's faith, patience, and effort: a timeless reminder that sincere striving, paired with trust in Allah (tawakkul), is never wasted.</p>

                <h3>Supplications</h3>
                <p>As with Tawaf, there is no single mandatory prayer for Sa'i beyond the verse recited when first approaching Safa. Many pilgrims use the walk to ask Allah for guidance, good health, provision, and the well-being of their families, in whatever language feels most natural. Zamzam water is available along the Sa'i path, and it is Sunnah to drink it while facing the Kaaba and making dua, such as: <em>"Allahumma inni as'aluka ilman nafi'an, wa rizqan wasi'an, wa shifa'an min kulli da'"</em> ("O Allah, I ask You for beneficial knowledge, abundant provision, and healing from every illness").</p>
            `,
      image: saiImage,
    },
    {
      title: "HALQ & TAQSIR",
      description:
        "Men either shave their head (Halq) or trim their hair (Taqsir). Women trim a fingertip length of hair.",
      detailedContent: `
                <h3>Completion of Umrah</h3>
                <p>Halq (shaving the head) and Taqsir (trimming the hair) mark the final act of Umrah, and the moment your state of Ihram officially ends. As soon as this step is complete, every restriction you observed during Ihram is lifted immediately, and you may return to normal daily life, including wearing regular clothing and using perfume again.</p>
                <p>This step is traditionally performed within or very near the Haram in Makkah. Today, licensed barbershops are available in and around the mosque complex specifically for this purpose, using sanitary, single-use blades for hygiene and safety.</p>

                <h3>For Men</h3>
                <ul>
                    <li><strong>Halq:</strong> Shaving the entire head completely bald, not just a partial shave. This is the more highly recommended option.</li>
                    <li><strong>Taqsir:</strong> Trimming hair evenly from all over the head, not just snipping a token lock, removing roughly a fingertip's width (about 2–3 cm) of length all around.</li>
                    <li>According to a well-known hadith, the Prophet (PBUH) prayed for Allah's mercy three times upon those who shave their heads, and only once upon those who merely trim, which is why many pilgrims, especially first-timers, choose Halq as a meaningful, visible symbol of a fresh spiritual start.</li>
                    <li>Practical tip: licensed barbers near the Haram are quick, inexpensive, and experienced with large crowds, especially during peak season, but always make sure fresh, sanitary blades are used.</li>
                </ul>

                <h3>For Women</h3>
                <ul>
                    <li>Women only perform Taqsir — shaving the head (Halq) is not permitted for women in Islam.</li>
                    <li>The correct method is to gather a small section of hair and trim approximately a fingertip's length (roughly 2–3 cm) from the ends.</li>
                    <li>This can be done by the woman herself or with the help of a mahram (a close family member). Even though the amount of hair removed is small, it is still considered a complete and valid fulfillment of the ritual.</li>
                    <li>Out of modesty, women typically perform this step privately, for example back at the hotel, rather than at a public barbershop the way men often do.</li>
                </ul>

                <h3>Significance</h3>
                <p>Cutting or shaving the hair after such a significant spiritual journey is a powerful act of humility. It represents letting go of vanity, pride, and worldly attachment, and it symbolizes a kind of spiritual "rebirth," emerging from the pilgrimage cleansed of sin, much like a newborn child. This practice has been observed by Muslims since the time of the Prophet's (PBUH) own Farewell Pilgrimage, and completing it is what officially seals your Umrah as accepted, insha'Allah.</p>
            `,
      image: halqImage,
    },
    {
      title: "IHRAM",
      description:
        "Enter the sacred state by wearing specific garments and making intention at the Miqat boundary.",
      detailedContent: `
                <h3>The State of Ihram</h3>
                <p>"Ihram" has two closely linked meanings: it is both the sacred, consecrated state of mind and body that a pilgrim enters, and the name of the simple garments worn while in that state. Entering Ihram marks the formal beginning of Umrah — from this point on, a specific set of rules applies to everything you do until the ritual is complete.</p>
                <p>Ihram must be entered at or before crossing a "Miqat," one of several designated boundary points surrounding Makkah. The five main Miqat points are Dhul Hulaifah, Al-Juhfah, Qarn al-Manazil, Yalamlam, and Dhat Irq, each corresponding to a different direction of travel; pilgrims arriving by air are typically told which Miqat they will cross so they can prepare in advance. The simplicity of the Ihram garments carries deep meaning: dressed alike, a wealthy business owner and someone who saved for years to make this trip look indistinguishable from one another before Allah, a powerful, visible symbol of equality.</p>

                <h3>Ihram Clothing</h3>
                <p><strong>For Men:</strong> Two plain, unstitched (seamless) white cloths — the "izar," wrapped around the waist and lower body, and the "rida," draped over the shoulders like a shawl. Simple sandals that leave the ankle bones uncovered are worn instead of regular shoes. White is Sunnah but not strictly required; the seamless, unstitched design is the key requirement, symbolizing simplicity and equality.</p>
                <p><strong>For Women:</strong> Any modest, everyday clothing that covers the entire body except the face and hands. There is no special color required for women — this is a common misconception, and any modest, non-revealing outfit is acceptable, provided it meets the same modesty standards a woman would follow in daily prayer. Women should not wear a face-covering niqab or gloves while in the state of Ihram, though many still cover the face temporarily with a loose cloth if unrelated men are nearby, without it touching the skin.</p>

                <h3>Prohibitions in Ihram</h3>
                <ul>
                    <li><strong>Cutting hair or nails:</strong> Must wait until after Halq/Taqsir completes the Umrah.</li>
                    <li><strong>Using perfume or scented products:</strong> Avoid applying fragrance to your body or clothing once you're in Ihram. (Applying perfume to the body just before making your intention is actually a Sunnah for many, so this restriction begins right after niyyah, not before.)</li>
                    <li><strong>Hunting or killing wild animals:</strong> The sanctity of the Haram extends this protection to all animal life within its boundaries.</li>
                    <li><strong>Marital or intimate relations:</strong> Along with anything that leads toward it, such as flirtation or discussing marriage proposals.</li>
                    <li><strong>Arguing, fighting, or sinful speech:</strong> The Qur'an (2:197) specifically instructs pilgrims to avoid "obscenity, wickedness, and quarreling" during this sacred time.</li>
                    <li><strong>Wearing stitched or tailored clothing (men only):</strong> Women's normal, modest clothing is unaffected by this rule.</li>
                    <li><strong>Covering the head directly (men) or the face (women):</strong> An umbrella or other shade held above the head is fine for men — direct contact with a covering is what's restricted.</li>
                    <li><strong>Wearing gloves</strong> is also avoided by both men and women while in Ihram.</li>
                </ul>

                <h3>Entering Ihram</h3>
                <p>Before formally entering Ihram, it is Sunnah to trim your nails, remove excess body hair, and take a full ritual bath (ghusl), or perform wudu if ghusl isn't possible. Many pilgrims also apply perfume to the body (not the clothing) at this point, just before making their intention, since fragrance already on the skin is not required to be removed afterward.</p>
                <p>Once dressed in the Ihram garments, formally make your niyyah (intention) specifically for Umrah, then begin reciting the Talbiyah. It's recommended to pray two voluntary rak'ahs before setting off, if your travel schedule allows. Remember: Ihram must be entered before you cross the Miqat boundary — pilgrims who accidentally pass it without being in Ihram are generally required to return to the Miqat to correct this, or offer a penalty, covered in more detail in the Violations & Penalties card.</p>
            `,
      image: ihramImage,
    },
    {
      title: "VIOLATIONS & PENALTIES",
      description:
        "Certain actions are prohibited in Ihram. Violations may require expiation through sacrifice or fasting.",
      detailedContent: `
                <h3>Types of Violations</h3>
                <p>Islam recognizes that pilgrims are human, and mistakes can happen, which is why a clear, merciful system of expiation (called "fidyah" or "dam") exists for violations committed while in the state of Ihram. Broadly speaking, violations fall into two categories: major violations, which are more serious and can affect the pilgrimage itself, and minor violations, which simply require a specific, manageable act of expiation.</p>
                <p>Many scholars also draw a distinction between violations done knowingly and those done by genuine mistake or forgetfulness — the latter is often treated more leniently. That said, this guide offers general information only; if you're ever unsure about a specific situation, it's always best to ask a qualified scholar or your pilgrimage group's religious guide rather than guess.</p>

                <h3>Major Violations</h3>
                <ul>
                    <li><strong>Sexual intercourse:</strong> The most serious violation. If it occurs before all the rituals of Umrah are complete, the pilgrim must still finish every remaining ritual, but the Umrah is considered invalidated for reward purposes, meaning it must be repeated afterward, along with offering a sacrifice as expiation. Scholars differ somewhat on the exact expiation required, which is another reason to seek specific guidance if this situation arises.</li>
                    <li><strong>Hunting or killing game animals:</strong> Requires compensating with a similar domestic animal, feeding the poor to an equivalent value, or fasting, based on the Qur'anic guidance in Surah Al-Ma'idah (5:95).</li>
                    <li><strong>Deliberately abandoning an essential ritual</strong> (such as skipping Sa'i entirely): Generally requires either completing the missed ritual or offering a specific expiation in its place.</li>
                </ul>

                <h3>Minor Violations</h3>
                <ul>
                    <li><strong>Cutting hair or nails:</strong> Typically expiated with a small act of charity, such as feeding a small number of people in need.</li>
                    <li><strong>Using perfume:</strong> A similar minor expiation applies as with cutting hair or nails.</li>
                    <li><strong>Covering the head (men):</strong> Expiated using the well-known "fidyah of comfort" formula from the hadith of Ka'b ibn Ujrah — the pilgrim may choose between fasting three days, feeding six poor people, or sacrificing an animal.</li>
                    <li><strong>Wearing stitched clothing (men):</strong> The same three-option fidyah formula above applies here as well.</li>
                    <li>Genuine, unintentional slips, done out of forgetfulness or lack of knowledge, are generally treated with more leniency by most scholars, though it's still good practice to correct the matter once you realize it.</li>
                </ul>

                <h3>Expiation Options</h3>
                <p>Depending on the specific violation, expiation generally falls into one of three categories:</p>
                <ol>
                    <li><strong>Sacrifice (Dam):</strong> Slaughtering a sheep or goat, or a share of a larger animal, with the meat distributed to the poor, usually arranged through official channels within the Haram area.</li>
                    <li><strong>Feeding the poor:</strong> Providing meals to a specific number of people in need, which varies depending on the violation.</li>
                    <li><strong>Fasting:</strong> Observing a specific number of fasting days, which can often be done even after returning home.</li>
                </ol>
                <p>Many of these options can be arranged in advance through reputable charities or your pilgrimage travel group, so you don't need to worry about handling every detail alone while in Makkah. Above all, remember that these provisions exist as a mercy, not a punishment — Allah is described in the Qur'an as Al-Ghafoor (The Most Forgiving) and Ar-Raheem (The Most Merciful), and these rulings exist to make sincere worship achievable for everyone, not to create fear or anxiety.</p>
            `,
      image: violationsImage,
    },
  ];

  const Modal = ({ card, onClose }) => {
    if (!card) return null;

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleModalScroll = (e) => {
      e.stopPropagation();
    };

    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden overscroll-none"
        onClick={handleBackdropClick}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div
          className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-48">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 shadow-lg"
            >
              <svg
                className="w-5 h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                {card.title}
              </h2>
              <p className="text-white/90 text-sm mt-1 drop-shadow">
                {card.description}
              </p>
            </div>
          </div>

          <div
            className="p-8 max-h-[calc(85vh-12rem)] overflow-y-auto"
            onWheel={handleModalScroll}
            onTouchMove={handleModalScroll}
          >
            <div
              className="text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: card.detailedContent
                  .replace(
                    /<h3>/g,
                    '<h3 class="text-2xl font-bold text-amber-600 mb-3">',
                  )
                  .replace(
                    /<p>/g,
                    '<p class="text-gray-700 leading-relaxed mb-4">',
                  )
                  .replace(
                    /<ul>/g,
                    '<ul class="list-disc list-inside space-y-2 text-gray-700 mb-4">',
                  )
                  .replace(
                    /<ol>/g,
                    '<ol class="list-decimal list-inside space-y-2 text-gray-700 mb-4">',
                  )
                  .replace(/<li>/g, '<li class="mb-1">')
                  .replace(
                    /<strong>/g,
                    '<strong class="text-gray-800 font-semibold">',
                  )
                  .replace(
                    /<em>/g,
                    '<em class="text-gray-600 not-italic font-medium">',
                  ),
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderCards = (cards) => {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cards.slice(0, 2).map((card, index) => (
            <div
              key={index}
              onClick={() => setSelectedCard(card)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative h-80 border border-gray-200"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-normal tracking-wide uppercase">
                  {card.title}
                </span>
              </div>
              <div className="absolute top-4 right-4 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600">
              Rites of Umrah
            </h2>
            <p className="text-gray-600 mt-2">
              The essential rituals that complete your Umrah pilgrimage
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.slice(2, 5).map((card, index) => (
              <div
                key={index + 2}
                onClick={() => setSelectedCard(card)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative h-80 border border-gray-200"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                    {card.title}
                  </span>
                </div>
                <div className="absolute top-4 right-4 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cards.slice(5, 7).map((card, index) => (
            <div
              key={index + 5}
              onClick={() => setSelectedCard(card)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer relative h-80 border border-gray-200"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/90 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase">
                  {card.title}
                </span>
              </div>
              <div className="absolute top-4 right-4 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Content Section */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Sacred <span className="text-amber-600">Umrah</span> Guide
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Learn the steps and significance of performing Umrah, the lesser
              pilgrimage that can be undertaken anytime.
            </p>
          </div>

          <div className="mt-8">
            <div className="animate-fade-in">
              {renderCards(umrahCards)}
              <Modal
                card={selectedCard}
                onClose={() => setSelectedCard(null)}
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              May your pilgrimage be accepted and your journey blessed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UmrahPage;
