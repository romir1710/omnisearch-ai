const pptxgen = require('pptxgenjs');

async function createPresentation() {
    const pres = new pptxgen();

    // Set presentation layout
    pres.layout = 'LAYOUT_16x9';

    // Define global colors
    const bgColor = '0F172A'; // Tailwind slate-900
    const textColor = 'F8FAFC'; // Tailwind slate-50
    const accentColor = '3B82F6'; // Tailwind blue-500
    const mutedColor = '94A3B8'; // Tailwind slate-400

    // ---------------------------------------------------------
    // SLIDE 1: Title Slide
    // ---------------------------------------------------------
    let slide1 = pres.addSlide();
    slide1.background = { color: bgColor };

    // Title
    slide1.addText('OmniSearch AI', {
        x: 1, y: 1.5, w: '80%', h: 1.5,
        fontSize: 54, bold: true, color: textColor,
        fontFace: 'Inter', align: 'left'
    });

    // Subtitle
    slide1.addText('Accessible Search for Everyone', {
        x: 1, y: 3, w: '80%', h: 0.8,
        fontSize: 28, color: accentColor, bold: true,
        fontFace: 'Inter', align: 'left'
    });

    // Author/Date
    slide1.addText('A Hackathon Prototype', {
        x: 1, y: 4.5, w: '80%', h: 0.5,
        fontSize: 18, color: mutedColor,
        fontFace: 'Inter', align: 'left'
    });

    // ---------------------------------------------------------
    // SLIDE 2: The Problem
    // ---------------------------------------------------------
    let slide2 = pres.addSlide();
    slide2.background = { color: bgColor };

    slide2.addText('The Problem with the Web Today', {
        x: 1, y: 0.5, w: '80%', h: 1,
        fontSize: 36, bold: true, color: accentColor,
        fontFace: 'Inter'
    });

    slide2.addText(
        [
            { text: 'Most websites are built for the "average" user.', options: { bullet: true } },
            { text: 'They are cluttered with ads, pop-ups, and complex layouts.', options: { bullet: true } },
            { text: 'High cognitive load makes reading difficult for many.', options: { bullet: true } },
            { text: 'Millions of users with visual, cognitive, or motor needs are left behind.', options: { bullet: true } }
        ],
        {
            x: 1, y: 1.8, w: '80%', h: 3,
            fontSize: 24, color: textColor, fontFace: 'Inter',
            lineSpacing: 48
        }
    );

    // ---------------------------------------------------------
    // SLIDE 3: The Solution
    // ---------------------------------------------------------
    let slide3 = pres.addSlide();
    slide3.background = { color: bgColor };

    slide3.addText('Our Solution: OmniSearch AI', {
        x: 1, y: 0.5, w: '80%', h: 1,
        fontSize: 36, bold: true, color: accentColor,
        fontFace: 'Inter'
    });

    slide3.addText(
        [
            { text: 'A Google-inspired, minimalist search engine.', options: { bullet: true } },
            { text: 'Zero clutter. Strict high-contrast styling.', options: { bullet: true } },
            { text: 'Built-in Accessibility Profiles: Vision, Cognitive, and Motor.', options: { bullet: true } },
            { text: 'Full WCAG 2.2 AA Compliance (Keyboard navigation, ARIA, Focus traps).', options: { bullet: true } }
        ],
        {
            x: 1, y: 1.8, w: '80%', h: 3,
            fontSize: 24, color: textColor, fontFace: 'Inter',
            lineSpacing: 48
        }
    );

    // ---------------------------------------------------------
    // SLIDE 4: The Core Feature
    // ---------------------------------------------------------
    let slide4 = pres.addSlide();
    slide4.background = { color: accentColor };

    slide4.addText('The "AI Access View"', {
        x: 1, y: 0.5, w: '80%', h: 1,
        fontSize: 36, bold: true, color: 'FFFFFF',
        fontFace: 'Inter'
    });

    slide4.addText(
        [
            { text: 'We bypass inaccessible websites entirely.', options: { bullet: true } },
            { text: 'For any search result, click "Open in AI Access View".', options: { bullet: true } },
            { text: 'An LLM extracts the target site\'s core content.', options: { bullet: true } },
            { text: 'It simplifies the text to a B1 reading level and formats it with clear steps.', options: { bullet: true } },
            { text: 'The result is rendered in a distraction-free, fully accessible overlay with TTS and Dyslexia font options.', options: { bullet: true } }
        ],
        {
            x: 1, y: 1.8, w: '80%', h: 3,
            fontSize: 22, color: 'FFFFFF', fontFace: 'Inter',
            lineSpacing: 40
        }
    );

    // ---------------------------------------------------------
    // SLIDE 5: Tech Stack
    // ---------------------------------------------------------
    let slide5 = pres.addSlide();
    slide5.background = { color: bgColor };

    slide5.addText('How We Built It', {
        x: 1, y: 0.5, w: '80%', h: 1,
        fontSize: 36, bold: true, color: accentColor,
        fontFace: 'Inter'
    });

    slide5.addText(
        [
            { text: 'Framework: Next.js 16 (App Router)', options: { bullet: true } },
            { text: 'Styling: Tailwind CSS with Strict Theming', options: { bullet: true } },
            { text: 'Icons: lucide-react', options: { bullet: true } },
            { text: 'A11y Features: Web Speech API (TTS), Context API for theming, semantic HTML', options: { bullet: true } }
        ],
        {
            x: 1, y: 1.8, w: '80%', h: 3,
            fontSize: 24, color: textColor, fontFace: 'Inter',
            lineSpacing: 48
        }
    );

    // ---------------------------------------------------------
    // SLIDE 6: Demo Time
    // ---------------------------------------------------------
    let slide6 = pres.addSlide();
    slide6.background = { color: bgColor };

    slide6.addText('Let\'s See It In Action', {
        x: 0, y: 2, w: '100%', h: 1.5,
        fontSize: 48, bold: true, color: accentColor,
        align: 'center', fontFace: 'Inter'
    });

    // Export presentation
    await pres.writeFile({ fileName: 'OmniSearch_AI_Presentation.pptx' });
    console.log('Presentation created successfully: OmniSearch_AI_Presentation.pptx');
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
});
